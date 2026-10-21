import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PayPalFactory } from "../../src/Creational/Factory/Factories/PayPalFactory.ts";
import { StripeFactory } from "../../src/Creational/Factory/Factories/StripeFactory.ts";
import { ThirdPartyProcessorFactory } from "../../src/Creational/Factory/Factories/ThirdPartyProcessorFactory.ts";
import { PayPal } from "../../src/Payment/PaymentProcessors/Paypal.ts";
import { Stripe } from "../../src/Payment/PaymentProcessors/Stripe.ts";
import { PaymentProcessorAdapter } from "../../src/Structural/Adaptor/PaymentProcessorAdaptor.ts";
import { details, fakeThirdPartyProcessor } from "../helpers/fakes.ts";

describe("payment processor factories", () => {
  it("PayPalFactory creates a PayPal processor", () => {
    assert.ok(new PayPalFactory().createPaymentProcessor() instanceof PayPal);
  });

  it("StripeFactory creates a Stripe processor", () => {
    assert.ok(new StripeFactory().createPaymentProcessor() instanceof Stripe);
  });

  it("ThirdPartyProcessorFactory wraps the third-party processor in an adapter", async () => {
    const thirdParty = fakeThirdPartyProcessor();
    const processor = new ThirdPartyProcessorFactory(
      thirdParty,
    ).createPaymentProcessor();

    assert.ok(processor instanceof PaymentProcessorAdapter);
    await processor.pay(details);
    assert.deepEqual(
      thirdParty.thirdPartyPay.mock.calls.map((call) => call.arguments),
      [[details]],
    );
  });
});
