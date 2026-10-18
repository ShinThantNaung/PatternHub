import type { PaymentProcessor } from "../PaymentProcessors/PaymentProcessor.ts";

export interface PaymentProcessorFactory {
  createPaymentProcessor(): PaymentProcessor;
}
