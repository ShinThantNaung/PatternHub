# Logging notifications with the Decorator pattern

`NotificationLoggerDecorator` adds file logging to any object that implements the shared `Notifier` interface. It preserves the same `update()` and `notify()` operations, so the decorator can be registered wherever an ordinary notifier is expected.

## Structure

```text
NotificationPublisher
  -> NotificationLoggerDecorator
       -> EmailNotifier

NotificationPublisher
  -> NotificationLoggerDecorator
       -> SMSNotifier
```

The decorator writes a timestamped notification entry to `Logs/notifications.log` and then delegates delivery to the wrapped notifier. The `Logs/` directory is ignored by Git because it contains generated runtime data.

## Composition

`OrderFacade` is the composition point. It creates the concrete notification channels, wraps each channel in `NotificationLoggerDecorator`, and registers the decorated notifiers with `NotificationPublisher`.

This keeps each responsibility separate:

- `EmailNotifier` and `SMSNotifier` deliver through their respective channels.
- `NotificationLoggerDecorator` handles notification logging.
- `NotificationPublisher` manages observer subscriptions and dispatch.
- `OrderFacade` coordinates payment completion and notification setup.

## Async contract

`Notifier.update()` and `Notifier.notify()` return `Promise<void>`. To make that contract effective, every delegating implementation must await (or return) the promise it receives, and the publisher must await or collect the promises from all observers. This lets callers wait for logging and notification delivery before considering the workflow complete. Any additional notifier or decorator must preserve this asynchronous contract.

## Payment logging

`PaymentLoggerDecorator` implements `PaymentProcessor` and records the payment method, timestamp, sender, receiver, and amount before it delegates payment processing. `OrderFacade` composes it inside `PaymentProxy`, so payment input is validated before it is logged and processed:

```text
PaymentProxy
  -> PaymentLoggerDecorator
       -> selected payment processor
```

`PaymentProcessor.pay()` and the third-party payment adapter now return `Promise<void>`, allowing the facade to wait for payment logging and processing before it publishes notifications.
