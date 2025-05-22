import { BaseDecoration } from "./base-decoration";
import { DecorationSet, Decoration } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { estimateWrappedHeight } from "../utils";

export class HeightDecoration extends BaseDecoration {
  buildDecorations(): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const { defaultLineWidth, defaultLineHeight, heightInterval } = this.settings;
    const singleLineHeight = defaultLineHeight;
    const approximateWrapWidth = defaultLineWidth;

    let cumulativeHeight = 0;

    for (let i = 1; i <= this.view.state.doc.lines; i++) {
      const line = this.view.state.doc.line(i);
      const lineHeight = estimateWrappedHeight(line.text, approximateWrapWidth, singleLineHeight);
      cumulativeHeight += lineHeight;

      if (cumulativeHeight >= heightInterval) {
        builder.add(line.from, line.from, this.createSeparator());
        cumulativeHeight = 0;
      }
    }

    return builder.finish();
  }
}
