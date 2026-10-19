export interface ThirdPartyPaymentProcessor {
  thirdPartyPay(amount: number, sender: string, receiver: string): void;
}
