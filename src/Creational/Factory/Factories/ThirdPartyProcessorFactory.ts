import type { PaymentProcessorFactory } from "./PaymentProcessorFactory.ts";
import type { PaymentProcessor } from "../../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { ThirdPartyPaymentProcessor } from "../../../Payment/3rdPartyPaymentProcessors/3rdPartyPaymentProcessor.ts";
import { PaymentProcessorAdapter } from "../../../Structural/Adaptor/PaymentProcessorAdaptor.ts";
export class ThirdPartyProcessorFactory implements PaymentProcessorFactory {
  private thirdPartyProcessor: ThirdPartyPaymentProcessor;
  constructor(thirdPartyProcessor: ThirdPartyPaymentProcessor) {
    this.thirdPartyProcessor = thirdPartyProcessor;
  }
  createPaymentProcessor(): PaymentProcessor {
    return new PaymentProcessorAdapter(this.thirdPartyProcessor);
  }
}
