export interface PaymentProcessor {
  pay(amount: string, sender: string, receiver: string): void;
}
