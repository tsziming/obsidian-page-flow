import { BaseDecoration } from "./base-decoration";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

export class LineDecoration extends BaseDecoration {
  buildDecorations(): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const separator = this.createSeparator();
    const lineCount = this.view.state.doc.lines;

    for (let i = 1; i <= lineCount; i++) {
      if (i % this.settings.lineInterval === 0) {
        const line = this.view.state.doc.line(i);
        builder.add(line.from, line.from, separator);
      }
    }

    return builder.finish();
  }
}
