import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessor.ts";

export class AyaPay implements ThirdPartyPaymentProcessor {
  thirdPartyPay(amount: string, sender: string, receiver: string): void {
    console.log(
      `Processing payment of ${amount}$ from ${sender} to ${receiver} with AyaPay third party api...`,
    );
  }
}
