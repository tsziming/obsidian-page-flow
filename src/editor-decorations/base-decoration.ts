import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { PageFlowListSettings } from "../settings";

export abstract class BaseDecoration {
  constructor(protected view: EditorView, protected settings: PageFlowListSettings) {}

  abstract buildDecorations(): DecorationSet;

  protected createSeparator(): Decoration {
    return Decoration.line({
      attributes: {
        style: `border-top: 100px solid var(--background-modifier-border);`,
      },
    });
  }
}
