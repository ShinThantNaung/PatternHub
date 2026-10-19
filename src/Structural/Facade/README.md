# Processing orders with the Facade pattern

This folder provides a simple entry point for completing an order. Clients call `OrderFacade` without needing to know which payment processor, factory, or third-party adapter is used.

## Facade

`OrderFacade` accepts a payment method, amount, sender, and receiver through `completeOrder()`. It selects the appropriate payment processor and completes the payment.

The facade uses the Factory pattern for `paypal` and `stripe`. For `kpay` and `ayapay`, it uses `ThirdPartyProcessorFactory` and `PaymentProcessorAdapter` so that third-party processors work through the common `PaymentProcessor` interface.
