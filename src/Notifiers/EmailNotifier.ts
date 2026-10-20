import type { Notifier } from "./Notifiers.ts";

export class EmailNotifier implements Notifier {
  async update(): Promise<void> {
    await this.notify();
  }
  async notify(): Promise<void> {
    console.log(`Customer has been notified via email`);
  }
}
