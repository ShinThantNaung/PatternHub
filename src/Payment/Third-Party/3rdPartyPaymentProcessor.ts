import type { PaymentDetails } from "../../Types/PaymentInput.ts";

export interface ThirdPartyPaymentProcessor {
  thirdPartyPay(input: PaymentDetails): Promise<void>;
}
