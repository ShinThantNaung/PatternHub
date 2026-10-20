import type { PaymentProcessor } from "../../../Payment/PaymentProcessors/PaymentProcessor.ts";

export interface PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor;
}
