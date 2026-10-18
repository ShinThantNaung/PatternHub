import type { PaymentProcessor } from "../PaymentProcessors/PaymentProcessor.ts";
import { PaymentProcessorFactory } from "./PaymentProcessorFactory.ts";
import { Stripe } from "../PaymentProcessors/Stripe.ts";

export class StripeFactory extends PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new Stripe();
  }
}
