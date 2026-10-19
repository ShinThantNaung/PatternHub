import type { PaymentProcessor } from "./PaymentProcessor.ts";

export class PayPal implements PaymentProcessor {
  pay(amount: string, sender: string, receiver: string): void {
    console.log(
      `Processing payment of ${amount}$ from ${sender} to ${receiver} using PayPal...`,
    );
  }
}
