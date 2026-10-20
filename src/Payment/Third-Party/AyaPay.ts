import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessor.ts";

export class AyaPay implements ThirdPartyPaymentProcessor {
  async thirdPartyPay(
    amount: number,
    sender: string,
    receiver: string,
  ): Promise<void> {
    console.log(
      `Processing payment of ${amount}$ from ${sender} to ${receiver} with AyaPay third party api...`,
    );
  }
}
