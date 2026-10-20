import type { Notifier } from "../../Notifiers/Notifiers.ts";
import { appendFile } from "node:fs/promises";

export class LoggerDecorator implements Notifier {
  private notifier: Notifier;
  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }
  private constructLogData(): string {
    return `Notification sent at ${new Date().toISOString()}`;
  }
  private async log(): Promise<void> {
    await appendFile("Logs/notifications.log", this.constructLogData(), "utf8");
  }
  async update(): Promise<void> {
    await this.notify();
  }
  async notify(): Promise<void> {
    await this.log();
    this.notifier.notify();
  }
}
