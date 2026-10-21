import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessor.ts";
import type { PaymentDetails } from "../../Types/PaymentInput.ts";

export class AyaPay implements ThirdPartyPaymentProcessor {
  async thirdPartyPay(input: PaymentDetails): Promise<void> {
    console.log(
      `Processing payment of ${input.amount}$ from ${input.sender} to ${input.receiver} with AyaPay third party api...`,
    );
  }
}
