import { PayPalFactory } from "../../Creational/Factory/Factories/PayPalFactory.ts";
import { StripeFactory } from "../../Creational/Factory/Factories/StripeFactory.ts";
import type { PaymentProcessor } from "../../Creational/Factory/PaymentProcessors/PaymentProcessor.ts";
import { PaymentConfiguration } from "../../Creational/Prototype/PaymentConfiguration.ts";
import { AyaPay } from "../Adaptor/3rdPartyPaymentProcessors/AyaPay.ts";
import { KPay } from "../Adaptor/3rdPartyPaymentProcessors/KPay.ts";
import { ThirdPartyProcessorFactory } from "../Adaptor/ThirdPartyProcessorFactory.ts";

type PaymentMethod = "stripe" | "paypal" | "kpay" | "ayapay";

type PaymentInput = {
  paymentMethod: PaymentMethod;
  amount: number;
  sender: string;
  receiver: string;
};
export class OrderFacade {
  private createProcessor(method: PaymentMethod): PaymentProcessor {
    switch (method.toLowerCase()) {
      case "paypal":
        return new PayPalFactory().createPaymentProcessor();
      case "stripe":
        return new StripeFactory().createPaymentProcessor();
      case "kpay":
        return new ThirdPartyProcessorFactory(
          new KPay(),
        ).createPaymentProcessor();
      case "ayapay":
        return new ThirdPartyProcessorFactory(
          new AyaPay(),
        ).createPaymentProcessor();
      default:
        throw new Error("Unknown payment method");
    }
  }
  completeOrder(input: PaymentInput) {
    const paymentProcessor = this.createProcessor(input.paymentMethod);
    paymentProcessor.pay(input.amount, input.sender, input.receiver);
  }
}
