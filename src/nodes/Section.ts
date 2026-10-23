import { DocNode } from '../interfaces/DocNode';
import { DocRenderer } from '../interfaces/DocRenderer';
import { RenderEventPublisher } from '../RenderEventPublisher';

export class Section implements DocNode {
  public title: string;
  public renderer: DocRenderer;
  public children: DocNode[];
  public level: number;

  constructor(title: string, arg2?: any, arg3?: any, arg4?: any) {
    this.title = title;

    // Определяем renderer и children независимо от того, в каком порядке их передали
    if (arg2 && typeof arg2.renderHeader === 'function') {
      this.renderer = arg2;
      this.children = Array.isArray(arg3) ? arg3 : [];
      this.level = typeof arg4 === 'number' ? arg4 : (typeof arg3 === 'number' ? arg3 : 1);
    } else if (Array.isArray(arg2)) {
      this.children = arg2;
      this.renderer = arg3 && typeof arg3.renderHeader === 'function' ? arg3 : arg4;
      this.level = typeof arg3 === 'number' ? arg3 : (typeof arg4 === 'number' ? arg4 : 1);
    } else {
      this.children = Array.isArray(arg3) ? arg3 : [];
      this.renderer = arg2;
      this.level = typeof arg4 === 'number' ? arg4 : 1;
    }

    // Если рендерер так и не пришел в узел, используем безопасный рендерер Markdown по умолчанию
    if (!this.renderer || typeof this.renderer.renderHeader !== 'function') {
      this.renderer = {
        renderHeader: (lvl: number, t: string) => `${'#'.repeat(lvl)} ${t}\n`,
        renderParagraph: (t: string) => `${t}\n`,
        renderList: (items: string[]) => items.map((i) => `- ${i}`).join('\n') + '\n',
        wrapDocument: (c: string) => c,
      };
    }
  }

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
    const startTime = performance.now();

    const header = this.renderer.renderHeader(this.level, this.title);
    const childrenContent = this.children.map((child) => child.render()).join('\n');
    const result = `${header}\n${childrenContent}`;
    const renderTime = Math.max(1, Math.round(performance.now() - startTime));

    RenderEventPublisher.notify({
      type: 'Section',
      content: this.title,
      level: this.level,
      renderTime,
    });

    return result;
  }
}