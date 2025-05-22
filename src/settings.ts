
export interface PageFlowListSettings {
    lineInterval: number;
    wordsInterval: number;
    type: 'line' | 'word' | 'height';
    heightInterval: number;
    defaultLineHeight: number;
    defaultLineWidth: number;
}


export const DEFAULT_SETTINGS: PageFlowListSettings = {
  lineInterval: 25,
  wordsInterval: 450,
  heightInterval: 1000,
  type: 'height',
  defaultLineHeight: 20,
  defaultLineWidth: 80,
};
