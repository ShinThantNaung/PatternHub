import type { PaymentProcessor } from "../../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { PaymentProcessorFactory } from "./PaymentProcessorFactory.ts";
import { PayPal } from "../../../Payment/PaymentProcessors/Paypal.ts";

export class PayPalFactory implements PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor {
    return new PayPal();
  }
}
