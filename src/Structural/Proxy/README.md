# Creating a middleware class with proxy pattern

This folder provides a simple middleware class with proxy pattern which checks for validation.

## PaymentProxy

The `PaymentProxy` class acts as the `PaymentProcessor` class itself, but validating the input configurations before calling `pay` of actual service. The `OrderFacade` class calls this proxy instead of real service.
