import { appendFile } from "node:fs/promises";
import type { PaymentProcessor } from "../../Payment/PaymentProcessors/PaymentProcessor.ts";
type PaymentMethod = "stripe" | "paypal" | "kpay" | "ayapay";
export class PaymentLoggerDecorator implements PaymentProcessor {
  constructor(
    private readonly paymentProcessor: PaymentProcessor,
    private readonly paymentMethod: PaymentMethod,
  ) {
  }
  private constructLogData(
    amount: number,
    sender: string,
    receiver: string,
  ): string {
    return `${new Date().toISOString()}\nFrom: ${sender}\nTo: ${receiver}\nAmount: ${amount}\nVia: ${this.paymentMethod}\n`;
  }
  private async log(amount: number, sender: string, receiver: string): Promise<void> {
    await appendFile(
      "Logs/payments.log",
      this.constructLogData(amount, sender, receiver),
      "utf8",
    );
  }
  async pay(amount: number, sender: string, receiver: string): Promise<void> {
    await this.log(amount, sender, receiver);
    await this.paymentProcessor.pay(amount, sender, receiver);
  }
}
