import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";

export class PaymentProxy implements PaymentProcessor {
  private paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }
  async pay(amount: number, sender: string, receiver: string): Promise<void> {
    this.validate(amount, sender, receiver);
    await this.paymentProcessor.pay(amount, sender, receiver);
  }
  private validate(amount: number, sender: string, receiver: string): void {
    if (amount <= 0 || !Number.isFinite(amount)) {
      throw new Error(
        "Payment amount must be a finite value greater than zero",
      );
    }
    if (sender.trim() === "" || receiver.trim() === "") {
      throw new Error("Sender or Receiver name cannot be empty");
    }
  }
}
