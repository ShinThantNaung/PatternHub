import type { PaymentProcessor } from "../PaymentProcessors/PaymentProcessor.ts";
import type { PaymentProcessorFactory } from "./PaymentProcessorFactory.ts";
import { PayPal } from "../PaymentProcessors/Paypal.ts";

export class PayPalFactory implements PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new PayPal();
  }
}
