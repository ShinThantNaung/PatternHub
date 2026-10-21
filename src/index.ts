import { OrderFacade } from "./Structural/Facade/OrderFacade.ts";

const orderClient = new OrderFacade();
orderClient.completeOrder({
  paymentMethod: "stripe",
  amount: -3,
  sender: "Shin Thant",
  receiver: "U thein maung",
});
