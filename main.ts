import { EventEmitter } from 'events';
import { App, debounce, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { PageFlowEvents } from 'src/events';
import { createProcessor } from 'src/reading-processors/processors';
import { DEFAULT_SETTINGS, PageFlowListSettings } from 'src/settings';
import viewPlugin from 'src/view';




export default class PageFlowPlugin extends Plugin {
  settings: PageFlowListSettings;
  registeredExtensions: any[] = [];
  pageFlowEventEmitter: EventEmitter<PageFlowEvents> = new EventEmitter<PageFlowEvents>();

  async onload() {
    await this.loadSettings();
    this.registerEditorDecorations();
    this.registerReadingProcessors();
    this.addSettingTab(new PageFlowListSettingTab(this.app, this));

  }
  async onunload() {
    // Release any resources configured by the plugin.
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.pageFlowEventEmitter.emit('settingsUpdated', this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.pageFlowEventEmitter.emit('settingsUpdated', this.settings);
    this.app.workspace.updateOptions();
  }

  registerEditorDecorations() {
    const extension = viewPlugin(this.pageFlowEventEmitter, this.settings);
    this.registeredExtensions.push(extension);
    this.registerEditorExtension([extension]); // Register the new extension
  }

  registerReadingProcessors() {
      this.registerMarkdownPostProcessor((el, ctx) => {
          const processor = createProcessor(ctx, el, this.settings);
          processor.process();
      });
  }

}

class PageFlowListSettingTab extends PluginSettingTab {
  plugin: PageFlowPlugin;

  constructor(app: App, plugin: PageFlowPlugin) {
      super(app, plugin);
      this.plugin = plugin;
  }

  display(): void {
      const { containerEl } = this;
      containerEl.empty();

      containerEl.createEl("h2", { text: "Page Flow List Settings" });

      const refreshSettings = () => {
          containerEl.empty();

          // Title
          containerEl.createEl("h2", { text: "Page Flow List Settings" });

          // Type Setting
          new Setting(containerEl)
              .setName("Flow Type")
              .setDesc("Select the type of flow: line, word, or smart.")
              .addDropdown((dropdown) =>
                  dropdown
                      .addOption('line', 'Line')
                      .addOption('word', 'Word')
                      .addOption('height', 'Height')
                      .setValue(this.plugin.settings.type)
                      .onChange(async (value) => {
                          if (value === 'line' || value === 'word' || value === 'height') {
                              this.plugin.settings.type = value;
                              await this.plugin.saveSettings();
                              refreshSettings(); // Re-render settings based on the selected type
                          }
                      })
              );

          // Line Interval Setting (visible for 'line' and 'smart')
          if (this.plugin.settings.type === 'line') {
              new Setting(containerEl)
                  .setName("Line Interval")
                  .setDesc("Set the interval for line separators.")
                  .addText((text) =>
                      text
                          .setPlaceholder("Enter a number (e.g., 30)")
                          .setValue(this.plugin.settings.lineInterval.toString())
                          .onChange(async (value) => {
                              const parsed = parseInt(value, 10);
                              if (!isNaN(parsed) && parsed > 0) {
                                  this.plugin.settings.lineInterval = parsed;
                                  await this.plugin.saveSettings();
                              }
                          })
                  );
          }

          // Words Interval Setting (visible for 'word' and 'smart')
          if (this.plugin.settings.type === 'word') {
              new Setting(containerEl)
                  .setName("Words Interval")
                  .setDesc("Set the interval for word separators.")
                  .addText((text) =>
                      text
                          .setPlaceholder("Enter a number (e.g., 50)")
                          .setValue(this.plugin.settings.wordsInterval.toString())
                          .onChange(async (value) => {
                              const parsed = parseInt(value, 10);
                              if (!isNaN(parsed) && parsed > 0) {
                                  this.plugin.settings.wordsInterval = parsed;
                                  await this.plugin.saveSettings();
                              }
                          })
                  );
          }

          if (this.plugin.settings.type === 'height') {
              new Setting(containerEl)
                  .setName("Height Interval")
                  .setDesc("Set the interval for height separators.")
                  .addText((text) =>
                      text
                          .setPlaceholder("Enter a number (e.g., 50)")
                          .setValue(this.plugin.settings.heightInterval.toString())
                          .onChange(async (value) => {
                              const parsed = parseInt(value, 10);
                              if (!isNaN(parsed) && parsed > 0) {
                                  this.plugin.settings.heightInterval = parsed;
                                  await this.plugin.saveSettings();
                              }
                          })
                  );
          }
      };

      refreshSettings(); // Initial render
  }
}