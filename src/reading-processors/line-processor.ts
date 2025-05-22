import { PageFlowListSettings } from "src/settings";
import { BaseProcessor } from "./base-processor";
import { MarkdownPostProcessorContext } from "obsidian";

export class LineProcessor extends BaseProcessor {

  constructor(protected ctx: MarkdownPostProcessorContext, el: HTMLElement, settings: PageFlowListSettings) {
    super(ctx, el, settings);
  }

  process(): void {
    const paragraphs = this.el.findAll("p, li, h1, h2, h3, h4, h5, h6, pre, blockquote");

    let lineCount = 0;
    
    paragraphs.forEach((para) => {
      lineCount++;
      if (lineCount % this.settings.lineInterval === 0) {
        console.log(lineCount)
        para.after(this.createSeparator());
      }
    });
  }
}
