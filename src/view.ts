import { DecorationSet, EditorView, PluginSpec, PluginValue, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { EventEmitter } from "events";
import { PageFlowListSettings } from "./settings";
import { PageFlowEvents } from "./events";
import { createDecoration } from "./editor-decorations/decorations";
import { BaseDecoration } from "./editor-decorations/base-decoration";

export class PageFlowListViewPlugin implements PluginValue {
  private decoration: BaseDecoration;
  decorations: DecorationSet;

  constructor(
    view: EditorView,
    private settingsEventEmitter: EventEmitter,
    public settings: PageFlowListSettings
  ) {
    this.decoration = createDecoration(view, settings);
    this.decorations = this.decoration.buildDecorations();
    this.settingsEventEmitter.addListener("settingsUpdated", (settings) => {
      this.settings = settings;
      this.decoration = createDecoration(view, settings);
      this.decorations = this.decoration.buildDecorations();
    });
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.decoration.buildDecorations();
    }
  }

  destroy() {}
}

const pluginSpec: PluginSpec<PageFlowListViewPlugin> = {
  decorations: (value: PageFlowListViewPlugin) => value.decorations,
};

export default (pageFlowEventEmitter: EventEmitter<PageFlowEvents>, settings: PageFlowListSettings) =>
  ViewPlugin.fromClass(
    class extends PageFlowListViewPlugin {
      constructor(view: EditorView) {
        super(view, pageFlowEventEmitter, settings);
      }
    },
    pluginSpec
  );
