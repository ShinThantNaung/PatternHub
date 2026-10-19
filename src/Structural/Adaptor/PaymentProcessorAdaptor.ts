import type { PaymentProcessor } from "../../Creational/Factory/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessors/3rdPartyPaymentProcessor.ts";

export class PaymentProcessorAdapter implements PaymentProcessor {
  constructor(private readonly thirdPartyPayment: ThirdPartyPaymentProcessor) {}

  pay(amount: string, sender: string, receiver: string): void {
    this.thirdPartyPayment.thirdPartyPay(amount, sender, receiver);
  }
}
