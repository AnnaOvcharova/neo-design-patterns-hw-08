import { DocNode } from '../interfaces/DocNode';
import { DocRenderer } from '../interfaces/DocRenderer';
import { RenderEventPublisher } from '../RenderEventPublisher';

export class List implements DocNode {
  private items: string[];
  private renderer: DocRenderer;

  constructor(arg1: any, arg2?: any) {
    if (Array.isArray(arg1)) {
      this.items = arg1;
      this.renderer = arg2;
    } else {
      this.items = Array.isArray(arg2) ? arg2 : [];
      this.renderer = arg1;
    }

    if (!this.renderer || typeof this.renderer.renderList !== 'function') {
      this.renderer = {
        renderHeader: (lvl: number, t: string) => `${'#'.repeat(lvl)} ${t}\n`,
        renderParagraph: (t: string) => `${t}\n`,
        renderList: (items: string[]) => items.map((i) => `- ${i}`).join('\n') + '\n',
        wrapDocument: (c: string) => c,
      };
    }
  }

  render(): string {
    const startTime = performance.now();
    const result = this.renderer.renderList(this.items);
    const renderTime = Math.max(1, Math.round(performance.now() - startTime));

    RenderEventPublisher.notify({
      type: 'List',
      content: result,
      items: this.items,
      renderTime,
    });

    return result;
  }
}