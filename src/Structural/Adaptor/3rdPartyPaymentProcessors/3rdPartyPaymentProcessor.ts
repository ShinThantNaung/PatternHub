export interface ThirdPartyPaymentProcessor {
  thirdPartyPay(amount: string, sender: string, receiver: string): void;
}
