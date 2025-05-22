import { MarkdownPostProcessorContext } from "obsidian";
import { PageFlowListSettings } from "../settings";
import { BaseProcessor } from "./base-processor";
import { HeightProcessor } from "./height-processor";
import { LineProcessor } from "./line-processor";
import { WordProcessor } from "./word-processor";

export function createProcessor(ctx: MarkdownPostProcessorContext, el: HTMLElement, settings: PageFlowListSettings): BaseProcessor {
  switch (settings.type) {
    case "line":
      return new LineProcessor(ctx, el, settings);
    case "height":
      return new HeightProcessor(ctx, el, settings);
    case "word":
      return new WordProcessor(ctx, el, settings);
    default:
      throw new Error(`Unknown settings type: ${settings.type}`);
  }
}
