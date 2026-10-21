import type { PaymentProcessor } from "./PaymentProcessor.ts";
import type { PaymentDetails } from "../../Types/PaymentInput.ts";

export class PayPal implements PaymentProcessor {
  async pay(input: PaymentDetails): Promise<void> {
    console.log(
      `Processing payment of ${input.amount}$ from ${input.sender} to ${input.receiver} using PayPal...`,
    );
  }
}
