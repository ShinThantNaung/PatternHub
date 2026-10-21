export type PaymentMethod = "stripe" | "paypal" | "kpay" | "ayapay";

export type PaymentInput = {
  paymentMethod: PaymentMethod;
  amount: number;
  sender: string;
  receiver: string;
};

export type PaymentDetails = Omit<PaymentInput, "paymentMethod">;
