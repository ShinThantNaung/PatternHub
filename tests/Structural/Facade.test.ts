import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { Stripe } from "../../src/Payment/PaymentProcessors/Stripe.ts";
import { KPay } from "../../src/Payment/Third-Party/KPay.ts";
import { OrderFacade } from "../../src/Structural/Facade/OrderFacade.ts";
import type { PaymentMethod } from "../../src/Types/PaymentInput.ts";
import { details } from "../helpers/fakes.ts";
import { enterTempWorkspace } from "../helpers/tempWorkspace.ts";

let leaveWorkspace: () => Promise<void>;
beforeEach(async () => {
  leaveWorkspace = await enterTempWorkspace();
});
afterEach(async () => {
  await leaveWorkspace();
});

describe("OrderFacade", () => {
  const routes: [PaymentMethod, string][] = [
    ["stripe", "using Stripe..."],
    ["paypal", "using PayPal..."],
    ["kpay", "with KPay third party api..."],
    ["ayapay", "with AyaPay third party api..."],
  ];
  for (const [paymentMethod, via] of routes) {
    it(`completes a ${paymentMethod} order and notifies the customer`, async (t) => {
      const log = t.mock.method(console, "log", () => {});

      await new OrderFacade().completeOrder({ paymentMethod, ...details });

      const [payment, ...notifications] = log.mock.calls.map(
        (call) => call.arguments,
      );
      assert.deepEqual(payment, [
        `Processing payment of 25$ from Alice to Bob ${via}`,
      ]);
      // Email and SMS are notified in parallel, so their order can vary.
      assert.deepEqual(notifications.sort(), [
        ["Customer has been notified via SMS"],
        ["Customer has been notified via email"],
      ]);
      assert.match(
        await readFile("Logs/payments.log", "utf8"),
        new RegExp(`\\nVia: ${paymentMethod}\\n$`),
      );
      assert.equal(
        (await readFile("Logs/notifications.log", "utf8")).match(
          /^Notification sent at /gm,
        )?.length,
        2,
      );
    });
  }

  it("hands processors the payment details without the payment method", async (t) => {
    t.mock.method(console, "log", () => {});
    const stripePay = t.mock.method(Stripe.prototype, "pay");
    const kpayPay = t.mock.method(KPay.prototype, "thirdPartyPay");
    const facade = new OrderFacade();

    await facade.completeOrder({ paymentMethod: "stripe", ...details });
    await facade.completeOrder({ paymentMethod: "kpay", ...details });

    assert.deepEqual(
      stripePay.mock.calls.map((call) => call.arguments),
      [[details]],
    );
    assert.deepEqual(
      kpayPay.mock.calls.map((call) => call.arguments),
      [[details]],
    );
  });

  it("reports a failed payment instead of throwing, and skips notifications", async (t) => {
    const log = t.mock.method(console, "log", () => {});
    const error = t.mock.method(console, "error", () => {});

    await new OrderFacade().completeOrder({
      paymentMethod: "stripe",
      ...details,
      amount: -3,
    });

    const errors = error.mock.calls.map((call) => call.arguments.join(" "));
    assert.equal(errors.length, 1);
    assert.match(
      errors[0] ?? "",
      /Payment amount must be a finite value greater than zero/,
    );
    assert.equal(log.mock.callCount(), 0);
    assert.equal(existsSync("Logs/payments.log"), false);
    assert.equal(existsSync("Logs/notifications.log"), false);
  });

  it("throws for an unknown payment method", async () => {
    await assert.rejects(
      new OrderFacade().completeOrder({
        ...details,
        paymentMethod: "bitcoin" as unknown as PaymentMethod,
      }),
      { message: "Unknown payment method" },
    );
  });
});
