import { RenderEventSubscriber } from './interfaces/RenderEventSubscriber';
import { RenderContext } from './interfaces/RenderContext';

export class RenderEventPublisher {
  private static subscribers: RenderEventSubscriber[] = [];

  static subscribe(subscriber: RenderEventSubscriber): void {
    if (!this.subscribers.includes(subscriber)) {
      this.subscribers.push(subscriber);
    }
  }

  static unsubscribe(subscriber: RenderEventSubscriber): void {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  static notify(context: RenderContext): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(context);
    }
  }
}