import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessor.ts";

export class KPay implements ThirdPartyPaymentProcessor {
  thirdPartyPay(amount: string, sender: string, receiver: string): void {
    console.log(
      `Processing payment of ${amount}$ from ${sender} to ${receiver} with KPay third party api...`,
    );
  }
}
