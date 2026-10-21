import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { readFile, rm } from "node:fs/promises";
import { NotificationLoggerDecorator } from "../../src/Structural/Decorator/NotificationLoggerDecorator.ts";
import { PaymentLoggerDecorator } from "../../src/Structural/Decorator/PaymentLoggerDecorator.ts";
import type { PaymentDetails } from "../../src/Types/PaymentInput.ts";
import { details, fakeNotifier, fakeProcessor } from "../helpers/fakes.ts";
import { enterTempWorkspace } from "../helpers/tempWorkspace.ts";

let leaveWorkspace: () => Promise<void>;
beforeEach(async () => {
  leaveWorkspace = await enterTempWorkspace();
});
afterEach(async () => {
  await leaveWorkspace();
});

describe("PaymentLoggerDecorator", () => {
  it("logs the payment before delegating it", async () => {
    let logWhenPaid = "";
    const processor = {
      pay: mock.fn(async (_input: PaymentDetails) => {
        logWhenPaid = await readFile("Logs/payments.log", "utf8");
      }),
    };

    await new PaymentLoggerDecorator(processor, "kpay").pay(details);

    assert.match(
      logWhenPaid,
      /^\d{4}-\d{2}-\d{2}T[\d:.]+Z\nFrom: Alice\nTo: Bob\nAmount: 25\nVia: kpay\n$/,
    );
    assert.deepEqual(
      processor.pay.mock.calls.map((call) => call.arguments),
      [[details]],
    );
  });

  it("appends one entry per payment", async () => {
    const decorator = new PaymentLoggerDecorator(fakeProcessor(), "stripe");

    await decorator.pay(details);
    await decorator.pay({ ...details, amount: 40 });

    const log = await readFile("Logs/payments.log", "utf8");
    assert.equal(log.match(/^Via: stripe$/gm)?.length, 2);
    assert.match(log, /\nAmount: 40\n/);
  });

  it("fails without paying when the Logs directory is missing", async () => {
    await rm("Logs", { recursive: true });
    const processor = fakeProcessor();

    await assert.rejects(
      new PaymentLoggerDecorator(processor, "paypal").pay(details),
      { code: "ENOENT" },
    );
    assert.equal(processor.pay.mock.callCount(), 0);
  });
});

describe("NotificationLoggerDecorator", () => {
  it("logs the notification before delegating it", async () => {
    let logWhenNotified = "";
    const notifier = {
      update: mock.fn(async () => {}),
      notify: mock.fn(async () => {
        logWhenNotified = await readFile("Logs/notifications.log", "utf8");
      }),
    };

    await new NotificationLoggerDecorator(notifier).notify();

    assert.match(
      logWhenNotified,
      /^Notification sent at \d{4}-\d{2}-\d{2}T[\d:.]+Z\n$/,
    );
    assert.equal(notifier.notify.mock.callCount(), 1);
  });

  it("update() logs and delivers the notification", async () => {
    const notifier = fakeNotifier();

    await new NotificationLoggerDecorator(notifier).update();

    assert.equal(notifier.notify.mock.callCount(), 1);
    assert.match(
      await readFile("Logs/notifications.log", "utf8"),
      /^Notification sent at /,
    );
  });
});
