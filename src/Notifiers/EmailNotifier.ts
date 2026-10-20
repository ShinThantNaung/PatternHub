import type { Notifier } from "./Notifiers.ts";

export class EmailNotifier implements Notifier {
  update(): void {
    this.notify();
  }
  notify(): void {
    console.log(`Customer has been notified via email`);
  }
}
