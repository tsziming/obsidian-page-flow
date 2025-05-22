import { EditorView } from "@codemirror/view";
import { PageFlowListSettings } from "src/settings";
import { BaseDecoration } from "./base-decoration";
import { HeightDecoration } from "./height-decoration";
import { LineDecoration } from "./line-decoration";
import { WordDecoration } from "./word-decoration";


export function createDecoration(view: EditorView, settings: PageFlowListSettings): BaseDecoration {
  switch (settings.type) {
    case "line":
      return new LineDecoration(view, settings);
    case "height":
      return new HeightDecoration(view, settings);
    case "word":
      return new WordDecoration(view, settings);
    default:
      throw new Error(`Unknown settings type: ${settings.type}`);
  }
}
