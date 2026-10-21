import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PayPal } from "../../src/Payment/PaymentProcessors/Paypal.ts";
import { Stripe } from "../../src/Payment/PaymentProcessors/Stripe.ts";
import { AyaPay } from "../../src/Payment/Third-Party/AyaPay.ts";
import { KPay } from "../../src/Payment/Third-Party/KPay.ts";
import { details } from "../helpers/fakes.ts";

describe("payment processors", () => {
  const processors = [
    { name: "PayPal", processor: new PayPal(), via: "using PayPal..." },
    { name: "Stripe", processor: new Stripe(), via: "using Stripe..." },
  ];
  for (const { name, processor, via } of processors) {
    it(`${name} processes the payment details`, async (t) => {
      const log = t.mock.method(console, "log", () => {});
      await processor.pay(details);
      assert.deepEqual(
        log.mock.calls.map((call) => call.arguments),
        [[`Processing payment of 25$ from Alice to Bob ${via}`]],
      );
    });
  }
});

describe("third-party payment processors", () => {
  const processors = [
    { name: "KPay", processor: new KPay() },
    { name: "AyaPay", processor: new AyaPay() },
  ];
  for (const { name, processor } of processors) {
    it(`${name} processes the payment details`, async (t) => {
      const log = t.mock.method(console, "log", () => {});
      await processor.thirdPartyPay(details);
      assert.deepEqual(
        log.mock.calls.map((call) => call.arguments),
        [
          [
            `Processing payment of 25$ from Alice to Bob with ${name} third party api...`,
          ],
        ],
      );
    });
  }
});
