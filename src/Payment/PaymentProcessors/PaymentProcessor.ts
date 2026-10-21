import type { PaymentDetails } from "../../Types/PaymentInput.ts";

export interface PaymentProcessor {
  pay(input: PaymentDetails): Promise<void>;
}
