import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "../../Payment/Third-Party/3rdPartyPaymentProcessor.ts";
import type { PaymentDetails } from "../../Types/PaymentInput.ts";

export class PaymentProcessorAdapter implements PaymentProcessor {
  private thirdPartyPayment: ThirdPartyPaymentProcessor;
  constructor(thirdPartyPayment: ThirdPartyPaymentProcessor) {
    this.thirdPartyPayment = thirdPartyPayment;
  }

  async pay(input: PaymentDetails): Promise<void> {
    await this.thirdPartyPayment.thirdPartyPay(input);
  }
}
