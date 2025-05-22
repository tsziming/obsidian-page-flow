import { BaseDecoration } from "./base-decoration";
import { Decoration, DecorationSet } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

export class WordDecoration extends BaseDecoration {
  buildDecorations(): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const separator = this.createSeparator();
    let wordCount = 0;

    for (let i = 1; i <= this.view.state.doc.lines; i++) {
      const line = this.view.state.doc.line(i);
      const words = line.text.split(/\s+/);

      for (let j = 0; j < words.length; j++) {
        wordCount++;
        if (wordCount % this.settings.wordsInterval === 0) {
          builder.add(line.from, line.from, separator);
        }
      }
    }

    return builder.finish();
  }
}
