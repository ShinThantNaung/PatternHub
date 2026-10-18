import type { PaymentProcessor } from "../PaymentProcessors/PaymentProcessor.ts";
import type { PaymentProcessorFactory } from "./PaymentProcessorFactory.ts";
import { Stripe } from "../PaymentProcessors/Stripe.ts";

export class StripeFactory implements PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new Stripe();
  }
}
