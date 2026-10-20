import type { PaymentProcessor } from "../../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { PaymentProcessorFactory } from "./PaymentProcessorFactory.ts";
import { Stripe } from "../../../Payment/PaymentProcessors/Stripe.ts";

export class StripeFactory implements PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new Stripe();
  }
}
