import { PayPalFactory } from "../../Creational/Factory/Factories/PayPalFactory.ts";
import { StripeFactory } from "../../Creational/Factory/Factories/StripeFactory.ts";
import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import { AyaPay } from "../../Payment/Third-Party/AyaPay.ts";
import { KPay } from "../../Payment/Third-Party/KPay.ts";
import { ThirdPartyProcessorFactory } from "../../Creational/Factory/Factories/ThirdPartyProcessorFactory.ts";
import { PaymentProxy } from "../Proxy/PaymentProxy.ts";
import { NotificationPublisher } from "../../Behavioural/Observer/NotificationPublisher.ts";
import type { Notifier } from "../../Notifiers/Notifiers.ts";
import { EmailNotifier } from "../../Notifiers/EmailNotifier.ts";
import { SMSNotifier } from "../../Notifiers/SMSNotifier.ts";

type PaymentMethod = "stripe" | "paypal" | "kpay" | "ayapay";

type PaymentInput = {
  paymentMethod: PaymentMethod;
  amount: number;
  sender: string;
  receiver: string;
};
export class OrderFacade {
  private publisher = new NotificationPublisher();
  constructor() {
    this.publisher.addObserver(new EmailNotifier());
    this.publisher.addObserver(new SMSNotifier());
  }
  private createProcessor(method: PaymentMethod): PaymentProcessor {
    switch (method.toLowerCase()) {
      case "paypal":
        return new PaymentProxy(new PayPalFactory().createPaymentProcessor());
      case "stripe":
        return new PaymentProxy(new StripeFactory().createPaymentProcessor());
      case "kpay":
        return new PaymentProxy(
          new ThirdPartyProcessorFactory(new KPay()).createPaymentProcessor(),
        );
      case "ayapay":
        return new PaymentProxy(
          new ThirdPartyProcessorFactory(new AyaPay()).createPaymentProcessor(),
        );
      default:
        throw new Error("Unknown payment method");
    }
  }
  completeOrder(input: PaymentInput) {
    const paymentProcessor = this.createProcessor(input.paymentMethod);
    paymentProcessor.pay(input.amount, input.sender, input.receiver);

    this.publisher.update();
  }
}
