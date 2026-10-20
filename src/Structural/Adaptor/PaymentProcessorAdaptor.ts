import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "../../Payment/Third-Party/3rdPartyPaymentProcessor.ts";

export class PaymentProcessorAdapter implements PaymentProcessor {
  constructor(private readonly thirdPartyPayment: ThirdPartyPaymentProcessor) {}

  pay(amount: number, sender: string, receiver: string): void {
    this.thirdPartyPayment.thirdPartyPay(amount, sender, receiver);
  }
}
