import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { PaymentInput } from "../../Types/PaymentInput.ts";

export class PaymentConfiguration {
  protected paymentProcessor: PaymentProcessor;
  protected paymentInput: PaymentInput;
  constructor(paymentProcessor: PaymentProcessor, paymentInput: PaymentInput) {
    this.paymentProcessor = paymentProcessor;
    this.paymentInput = paymentInput;
  }
  setPaymentDetails(paymentInput: PaymentInput): void {
    this.paymentInput = paymentInput;
  }
  clone(): PaymentConfiguration {
    return new PaymentConfiguration(this.paymentProcessor, {
      ...this.paymentInput,
    });
  }
}
