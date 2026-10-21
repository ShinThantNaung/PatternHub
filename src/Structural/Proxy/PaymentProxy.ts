import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { PaymentDetails } from "../../Types/PaymentInput.ts";

export class PaymentProxy implements PaymentProcessor {
  private paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }
  async pay(input: PaymentDetails): Promise<void> {
    this.validate(input);
    await this.paymentProcessor.pay(input);
  }
  private validate(input: PaymentDetails): void {
    if (input.amount <= 0 || !Number.isFinite(input.amount)) {
      throw new Error(
        "Payment amount must be a finite value greater than zero",
      );
    }
    if (input.sender.trim() === "" || input.receiver.trim() === "") {
      throw new Error("Sender or Receiver name cannot be empty");
    }
  }
}
