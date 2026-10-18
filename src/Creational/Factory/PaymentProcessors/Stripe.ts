import type { PaymentProcessor } from "./PaymentProcessor.ts";

export class Stripe implements PaymentProcessor {
  pay(): void {
    console.log("Processing payment using stripe...");
  }
}
