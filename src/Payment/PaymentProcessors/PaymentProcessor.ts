export interface PaymentProcessor {
  pay(amount: number, sender: string, receiver: string): Promise<void>;
}
