import { DocRenderer } from "../interfaces/DocRenderer";
import { HTMLRenderer } from "../renderers/HTMLRenderer";
import { MarkdownRenderer } from "../renderers/MarkdownRenderer";
import { PlainTextRenderer } from "../renderers/PlainTextRenderer";

export type RendererType = "html" | "markdown" | "plain";

export class RendererFactory {
  static create(type: RendererType): DocRenderer {
    switch (type) {
      case "html":
        return new HTMLRenderer();
      case "markdown":
        return new MarkdownRenderer();
      case "plain":
        return new PlainTextRenderer();
      default:
        throw new Error(`Unsupported renderer type: ${type}`);
    }
  }

  static getSupportedFormats(): RendererType[] {
    return ["html", "markdown", "plain"];
  }
}
