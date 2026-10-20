import type { Notifier } from "../../Notifiers/Notifiers.ts";
export class NotificationPublisher {
  private notifiers: Notifier[] = [];
  addObserver(notifier: Notifier) {
    this.notifiers.push(notifier);
  }
  removeObserver(notifier: Notifier) {
    this.notifiers = this.notifiers.filter((item) => item !== notifier);
  }
  async update(): Promise<void> {
    await Promise.all(
      this.notifiers.map(async (notifier) => notifier.update()),
    );
  }
}
