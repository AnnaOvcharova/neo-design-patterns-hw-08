import { RenderEventSubscriber } from '../interfaces/RenderEventSubscriber';
import { RenderContext } from '../interfaces/RenderContext';

export class RenderLoggerSubscriber implements RenderEventSubscriber {
  update(context: RenderContext): void {
    if (context.type === 'Paragraph') {
      console.log(`[Log] Rendered Paragraph (${context.content.length} chars)`);
    } else if (context.type === 'List') {
      const count = context.items ? context.items.length : 0;
      console.log(`[Log] Rendered List (${count} items)`);
    } else if (context.type === 'Section') {
      console.log(`[Log] Rendered Section ("${context.content}", level ${context.level ?? 1})`);
    }
  }
}