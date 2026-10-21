import { mock } from "node:test";
import type { PaymentDetails } from "../../src/Types/PaymentInput.ts";

export const details: PaymentDetails = {
  amount: 25,
  sender: "Alice",
  receiver: "Bob",
};

export function fakeProcessor() {
  return { pay: mock.fn(async (_input: PaymentDetails) => {}) };
}

export function fakeThirdPartyProcessor() {
  return { thirdPartyPay: mock.fn(async (_input: PaymentDetails) => {}) };
}

export function fakeNotifier() {
  return {
    update: mock.fn(async () => {}),
    notify: mock.fn(async () => {}),
  };
}
