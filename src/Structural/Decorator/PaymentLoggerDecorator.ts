import { appendFile } from "node:fs/promises";
import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
import type { PaymentDetails } from "../../Types/PaymentInput.ts";
import type { PaymentMethod } from "../../Types/PaymentInput.ts";
export class PaymentLoggerDecorator implements PaymentProcessor {
  private readonly paymentProcessor: PaymentProcessor;
  private readonly paymentMethod: PaymentMethod;
  constructor(
    paymentProcessor: PaymentProcessor,
    paymentMethod: PaymentMethod,
  ) {
    this.paymentProcessor = paymentProcessor;
    this.paymentMethod = paymentMethod;
  }
  private constructLogData(input: PaymentDetails): string {
    return `${new Date().toISOString()}\nFrom: ${input.sender}\nTo: ${input.receiver}\nAmount: ${input.amount}\nVia: ${this.paymentMethod}\n`;
  }
  private async log(input: PaymentDetails): Promise<void> {
    await appendFile("Logs/payments.log", this.constructLogData(input), "utf8");
  }
  async pay(input: PaymentDetails): Promise<void> {
    await this.log(input);
    await this.paymentProcessor.pay(input);
  }
}
