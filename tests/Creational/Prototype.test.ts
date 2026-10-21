import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PaymentConfiguration } from "../../src/Creational/Prototype/PaymentConfiguration.ts";
import { Stripe } from "../../src/Payment/PaymentProcessors/Stripe.ts";
import type { PaymentInput } from "../../src/Types/PaymentInput.ts";

describe("PaymentConfiguration", () => {
  const input: PaymentInput = {
    paymentMethod: "stripe",
    amount: 25,
    sender: "Alice",
    receiver: "Bob",
  };

  it("clone() returns a separate configuration with the same payment input", () => {
    const original = new PaymentConfiguration(new Stripe(), { ...input });
    const copy = original.clone();

    assert.ok(copy instanceof PaymentConfiguration);
    assert.notEqual(copy, original);
    assert.deepEqual(copy["paymentInput"], original["paymentInput"]);
    assert.notEqual(copy["paymentInput"], original["paymentInput"]);
  });

  it("clone() reuses the same payment processor", () => {
    const original = new PaymentConfiguration(new Stripe(), { ...input });
    const copy = original.clone();

    assert.equal(copy["paymentProcessor"], original["paymentProcessor"]);
  });

  it("setPaymentDetails() on a clone leaves the original unchanged", () => {
    const original = new PaymentConfiguration(new Stripe(), { ...input });
    const copy = original.clone();

    copy.setPaymentDetails({ ...input, amount: 99, receiver: "Carol" });

    assert.deepEqual(original["paymentInput"], input);
    assert.deepEqual(copy["paymentInput"], {
      ...input,
      amount: 99,
      receiver: "Carol",
    });
  });
});
