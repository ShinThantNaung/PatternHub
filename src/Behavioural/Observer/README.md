# Sending payment notifications with the Observer pattern

This folder contains the publisher side of the Observer pattern. It allows an order to notify multiple channels after a payment has completed without depending on concrete notifier classes.

## Publisher

`NotificationPublisher` stores observers that implement the `Notifier` interface. Use `addObserver()` to subscribe a notifier, `removeObserver()` to unsubscribe it, and `update()` to notify every subscribed notifier.

## Observers

The concrete observers live in `src/Notifiers`:

- `EmailNotifier` sends an email notification.
- `SMSNotifier` sends an SMS notification.

## Registration

`OrderFacade` is the composition point. Its constructor creates and registers the email and SMS notifiers once. After `completeOrder()` successfully calls `pay()`, it calls `publisher.update()` to notify them.

```ts
this.publisher.addObserver(new EmailNotifier());
this.publisher.addObserver(new SMSNotifier());
```

Keeping registration in the facade lets `NotificationPublisher` depend only on the `Notifier` interface, so new notification channels can be added without changing the publisher.
