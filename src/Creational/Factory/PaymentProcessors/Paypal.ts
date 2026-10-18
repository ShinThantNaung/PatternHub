import type { PaymentProcessor } from "./PaymentProcessor.ts";

export class PayPal implements PaymentProcessor {
  pay(): void {
    console.log("Processing payment using PayPal...");
  }
}
