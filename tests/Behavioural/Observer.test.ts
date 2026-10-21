import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import { NotificationPublisher } from "../../src/Behavioural/Observer/NotificationPublisher.ts";
import { fakeNotifier } from "../helpers/fakes.ts";

describe("NotificationPublisher", () => {
  it("update() notifies every registered observer", async () => {
    const publisher = new NotificationPublisher();
    const email = fakeNotifier();
    const sms = fakeNotifier();
    publisher.addObserver(email);
    publisher.addObserver(sms);

    await publisher.update();

    assert.equal(email.update.mock.callCount(), 1);
    assert.equal(sms.update.mock.callCount(), 1);
  });

  it("removeObserver() stops notifying only that observer", async () => {
    const publisher = new NotificationPublisher();
    const email = fakeNotifier();
    const sms = fakeNotifier();
    publisher.addObserver(email);
    publisher.addObserver(sms);

    publisher.removeObserver(email);
    await publisher.update();

    assert.equal(email.update.mock.callCount(), 0);
    assert.equal(sms.update.mock.callCount(), 1);
  });

  it("update() waits for every observer to finish", async () => {
    const publisher = new NotificationPublisher();
    let finished = false;
    publisher.addObserver({
      update: mock.fn(async () => {
        await delay(20);
        finished = true;
      }),
      notify: mock.fn(async () => {}),
    });

    await publisher.update();

    assert.equal(finished, true);
  });

  it("update() resolves when there are no observers", async () => {
    await new NotificationPublisher().update();
  });
});
