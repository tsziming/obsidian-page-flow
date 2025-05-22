import { PageFlowListSettings } from "src/settings";
import { BaseProcessor } from "./base-processor";
import { MarkdownPostProcessorContext } from "obsidian";

export class WordProcessor extends BaseProcessor {

  constructor(protected ctx: MarkdownPostProcessorContext, el: HTMLElement, settings: PageFlowListSettings) {
    super(ctx, el, settings);
  }


  process(): void {
    let wordCount = 0;

    const paragraphs = this.el.querySelectorAll("p, li, blockquote");

    paragraphs.forEach((para) => {
      const words = para.textContent?.split(/\s+/) ?? [];
      wordCount += words.length;

      if (wordCount >= this.settings.wordsInterval) {
        para.after(this.createSeparator());
        wordCount = 0;
      }
    });
  }
}
