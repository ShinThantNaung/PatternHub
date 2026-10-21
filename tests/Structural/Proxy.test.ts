import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PaymentProxy } from "../../src/Structural/Proxy/PaymentProxy.ts";
import type { PaymentDetails } from "../../src/Types/PaymentInput.ts";
import { details, fakeProcessor } from "../helpers/fakes.ts";

describe("PaymentProxy", () => {
  it("passes valid payment details to the wrapped processor", async () => {
    const processor = fakeProcessor();

    await new PaymentProxy(processor).pay(details);

    assert.deepEqual(
      processor.pay.mock.calls.map((call) => call.arguments),
      [[details]],
    );
  });

  for (const amount of [0, -5, Number.NaN, Number.POSITIVE_INFINITY]) {
    it(`rejects an amount of ${amount} without paying`, async () => {
      const processor = fakeProcessor();

      await assert.rejects(new PaymentProxy(processor).pay({ ...details, amount }), {
        message: "Payment amount must be a finite value greater than zero",
      });
      assert.equal(processor.pay.mock.callCount(), 0);
    });
  }

  const blankNames: [string, PaymentDetails][] = [
    ["an empty sender", { ...details, sender: "" }],
    ["a whitespace-only sender", { ...details, sender: "   " }],
    ["an empty receiver", { ...details, receiver: "" }],
    ["a whitespace-only receiver", { ...details, receiver: "   " }],
  ];
  for (const [description, input] of blankNames) {
    it(`rejects ${description} without paying`, async () => {
      const processor = fakeProcessor();

      await assert.rejects(new PaymentProxy(processor).pay(input), {
        message: "Sender or Receiver name cannot be empty",
      });
      assert.equal(processor.pay.mock.callCount(), 0);
    });
  }
});
