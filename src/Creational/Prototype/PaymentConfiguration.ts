import type { PaymentProcessor } from "../Factory/PaymentProcessors/PaymentProcessor.ts";

export class PaymentConfiguration {
  protected paymentProcessor: PaymentProcessor;
  protected amount: number;
  protected sender: string;
  protected receiver: string;
  constructor(
    paymentProcessor: PaymentProcessor,
    amount: number,
    sender: string,
    receiver: string,
  ) {
    this.paymentProcessor = paymentProcessor;
    this.amount = amount;
    this.sender = sender;
    this.receiver = receiver;
  }
  clone(): PaymentConfiguration {
    return new PaymentConfiguration(
      this.paymentProcessor,
      this.amount,
      this.sender,
      this.receiver,
    );
  }
}
