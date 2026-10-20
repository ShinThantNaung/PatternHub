import type { Notifier } from "../../Notifiers/Notifiers.ts";
export class NotificationPublisher {
  private notifiers: Notifier[] = [];
  addObserver(notifier: Notifier) {
    this.notifiers.push(notifier);
  }
  removeObserver(notifier: Notifier) {
    this.notifiers = this.notifiers.filter((item) => item !== notifier);
  }
  update() {
    this.notifiers.forEach((notifier) => {
      notifier.update();
    });
  }
}
