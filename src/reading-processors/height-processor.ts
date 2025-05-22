import { BaseProcessor } from "./base-processor";
import { PageFlowListSettings } from "../settings";
import { estimateWrappedHeight } from "src/utils";
import { MarkdownPostProcessorContext } from "obsidian";

export class HeightProcessor extends BaseProcessor {
    constructor(protected ctx: MarkdownPostProcessorContext, el: HTMLElement, settings: PageFlowListSettings) {
        super(ctx, el, settings);
    }

    process(): void {
        const { defaultLineWidth, defaultLineHeight, heightInterval } = this.settings;

        if (!heightInterval) return;

        const singleLineHeight = defaultLineHeight;

        const para = this.el;
            console.log("Offset top:" + para.offsetTop);
            let cumulativeHeight = para.offsetTop % this.settings.heightInterval;
            // const estimatedHeight = estimateWrappedHeight(para.textContent || "", defaultLineWidth, singleLineHeight);
            cumulativeHeight += para.innerHeight;

            if (cumulativeHeight >= heightInterval) {
                console.log(para.innerHeight)
                para.after(this.createSeparator());
                cumulativeHeight = 0;
            }
    }

}
