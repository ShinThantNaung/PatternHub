import type { PaymentProcessorFactory } from "../../Creational/Factory/Factories/PaymentProcessorFactory.ts";
import type { PaymentProcessor } from "../../Creational/Factory/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "./3rdPartyPaymentProcessors/3rdPartyPaymentProcessor.ts";
import { PaymentProcessorAdapter } from "./PaymentProcessorAdaptor.ts";
export class ThirdPartyProcessorFactory implements PaymentProcessorFactory {
  private thirdPartyProcessor: ThirdPartyPaymentProcessor;
  constructor(thirdPartyProcessor: ThirdPartyPaymentProcessor) {
    this.thirdPartyProcessor = thirdPartyProcessor;
  }
  createPaymentProcessor(): PaymentProcessor {
    return new PaymentProcessorAdapter(this.thirdPartyProcessor);
  }
}
