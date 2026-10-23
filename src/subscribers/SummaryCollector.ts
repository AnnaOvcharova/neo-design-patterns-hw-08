import { RenderEventSubscriber } from '../interfaces/RenderEventSubscriber';
import { RenderContext } from '../interfaces/RenderContext';

export class SummaryCollector implements RenderEventSubscriber {
  private sectionsCount: number = 0;
  private paragraphsCount: number = 0;
  private listsCount: number = 0;

  update(context: RenderContext): void {
    if (context.type === 'Section') {
      this.sectionsCount++;
    } else if (context.type === 'Paragraph') {
      this.paragraphsCount++;
    } else if (context.type === 'List') {
      this.listsCount++;
    }
  }

  printSummary(): void {
    console.log(
      `[Summary] Rendered ${this.sectionsCount} sections, ${this.paragraphsCount} paragraphs, ${this.listsCount} lists`
    );
  }
}