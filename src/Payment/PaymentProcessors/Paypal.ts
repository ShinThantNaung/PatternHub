import type { PaymentProcessor } from "./PaymentProcessor.ts";

export class PayPal implements PaymentProcessor {
  async pay(amount: number, sender: string, receiver: string): Promise<void> {
    console.log(
      `Processing payment of ${amount}$ from ${sender} to ${receiver} using PayPal...`,
    );
  }
}
