import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "../../Payment/Third-Party/3rdPartyPaymentProcessor.ts";

export class PaymentProcessorAdapter implements PaymentProcessor {
  private thirdPartyPayment: ThirdPartyPaymentProcessor;
  constructor(thirdPartyPayment: ThirdPartyPaymentProcessor) {
    this.thirdPartyPayment = thirdPartyPayment;
  }

  async pay(amount: number, sender: string, receiver: string): Promise<void> {
    await this.thirdPartyPayment.thirdPartyPay(amount, sender, receiver);
  }
}
