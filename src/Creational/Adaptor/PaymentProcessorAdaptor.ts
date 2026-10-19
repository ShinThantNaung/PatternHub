import type { PaymentProcessor } from "../Factory/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessors/3rdPartyPaymentProcessor.ts";

export class PaymentProcessorAdapter implements PaymentProcessor {
  constructor(private readonly thirdPartyPayment: ThirdPartyPaymentProcessor) {}

  pay(): void {
    this.thirdPartyPayment.thirdPartyPay();
  }
}
