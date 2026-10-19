import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessor.ts";

export class AyaPay implements ThirdPartyPaymentProcessor {
  thirdPartyPay(): void {
    console.log("Processing payment with AyaPay third party api...");
  }
}
