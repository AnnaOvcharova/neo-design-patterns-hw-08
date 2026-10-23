import { DocNode } from '../interfaces/DocNode';
import { DocRenderer } from '../interfaces/DocRenderer';
import { RenderEventPublisher } from '../RenderEventPublisher';

export class Paragraph implements DocNode {
  private text: string;
  private renderer: DocRenderer;

  constructor(arg1: any, arg2?: any) {
    if (typeof arg1 === 'string') {
      this.text = arg1;
      this.renderer = arg2;
    } else {
      this.text = typeof arg2 === 'string' ? arg2 : '';
      this.renderer = arg1;
    }

    if (!this.renderer || typeof this.renderer.renderParagraph !== 'function') {
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
    const result = this.renderer.renderParagraph(this.text);
    const renderTime = Math.max(1, Math.round(performance.now() - startTime));

    RenderEventPublisher.notify({
      type: 'Paragraph',
      content: this.text,
      renderTime,
    });

    return result;
  }
}