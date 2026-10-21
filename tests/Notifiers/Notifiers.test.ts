import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EmailNotifier } from "../../src/Notifiers/EmailNotifier.ts";
import { SMSNotifier } from "../../src/Notifiers/SMSNotifier.ts";

describe("notifiers", () => {
  const notifiers = [
    {
      name: "EmailNotifier",
      create: () => new EmailNotifier(),
      message: "Customer has been notified via email",
    },
    {
      name: "SMSNotifier",
      create: () => new SMSNotifier(),
      message: "Customer has been notified via SMS",
    },
  ];
  for (const { name, create, message } of notifiers) {
    it(`${name}.notify() notifies the customer`, async (t) => {
      const log = t.mock.method(console, "log", () => {});
      await create().notify();
      assert.deepEqual(
        log.mock.calls.map((call) => call.arguments),
        [[message]],
      );
    });

    it(`${name}.update() delivers through notify()`, async (t) => {
      const notifier = create();
      const notify = t.mock.method(notifier, "notify", async () => {});
      await notifier.update();
      assert.equal(notify.mock.callCount(), 1);
    });
  }
});
