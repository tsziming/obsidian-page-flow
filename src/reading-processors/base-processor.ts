import { MarkdownPostProcessorContext } from "obsidian";
import { PageFlowListSettings } from "src/settings";

export abstract class BaseProcessor {
    protected settings: PageFlowListSettings;
  
    constructor(protected ctx: MarkdownPostProcessorContext, protected el: HTMLElement, settings: PageFlowListSettings) {
      this.settings = settings;
    }

    abstract process(): void;

    protected createSeparator(): HTMLHRElement {
        const separator = document.createElement("hr");
        separator.style.borderTop = "100px solid var(--background-modifier-border)";
        return separator;
    }
}
