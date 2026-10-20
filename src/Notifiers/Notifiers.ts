export interface Notifier {
  update(): Promise<void>;
  notify(): Promise<void>;
}
