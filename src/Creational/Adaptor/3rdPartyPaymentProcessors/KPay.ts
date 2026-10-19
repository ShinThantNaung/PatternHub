import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessor.ts";

export class KPay implements ThirdPartyPaymentProcessor {
  thirdPartyPay(): void {
    console.log("Processing payment with a KPay third party api...");
  }
}
