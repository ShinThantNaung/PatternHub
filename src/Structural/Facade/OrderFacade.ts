import { PayPalFactory } from "../../Creational/Factory/Factories/PayPalFactory.ts";
import { StripeFactory } from "../../Creational/Factory/Factories/StripeFactory.ts";
import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import { AyaPay } from "../../Payment/Third-Party/AyaPay.ts";
import { KPay } from "../../Payment/Third-Party/KPay.ts";
import { ThirdPartyProcessorFactory } from "../../Creational/Factory/Factories/ThirdPartyProcessorFactory.ts";
import { PaymentProxy } from "../Proxy/PaymentProxy.ts";
import { NotificationPublisher } from "../../Behavioural/Observer/NotificationPublisher.ts";
import { EmailNotifier } from "../../Notifiers/EmailNotifier.ts";
import { SMSNotifier } from "../../Notifiers/SMSNotifier.ts";
import { NotificationLoggerDecorator } from "../Decorator/NotificationLoggerDecorator.ts";
import { PaymentLoggerDecorator } from "../Decorator/PaymentLoggerDecorator.ts";
import type {
  PaymentInput,
  PaymentMethod,
} from "../../Types/PaymentInput.ts";

export class OrderFacade {
  private publisher = new NotificationPublisher();
  constructor() {
    this.publisher.addObserver(
      new NotificationLoggerDecorator(new EmailNotifier()),
    );
    this.publisher.addObserver(
      new NotificationLoggerDecorator(new SMSNotifier()),
    );
  }
  private createProcessor(method: PaymentMethod): PaymentProcessor {
    let paymentProcessor: PaymentProcessor;

    switch (method.toLowerCase()) {
      case "paypal":
        paymentProcessor = new PayPalFactory().createPaymentProcessor();
        break;
      case "stripe":
        paymentProcessor = new StripeFactory().createPaymentProcessor();
        break;
      case "kpay":
        paymentProcessor = new ThirdPartyProcessorFactory(
          new KPay(),
        ).createPaymentProcessor();
        break;
      case "ayapay":
        paymentProcessor = new ThirdPartyProcessorFactory(
          new AyaPay(),
        ).createPaymentProcessor();
        break;
      default:
        throw new Error("Unknown payment method");
    }

    return new PaymentProxy(
      new PaymentLoggerDecorator(paymentProcessor, method),
    );
  }
  async completeOrder(input: PaymentInput): Promise<void> {
    const { paymentMethod, ...paymentDetails } = input;
    const paymentProcessor = this.createProcessor(paymentMethod);
    try {
      await paymentProcessor.pay(paymentDetails);
      await this.publisher.update();
    } catch (err) {
      console.error(
        `An unexpect error occurred: ${err instanceof Error ? err.message : "Unknown Cause!"}`,
      );
    }
  }
}
