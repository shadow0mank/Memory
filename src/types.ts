export type NavigationTab =
  | 'accueil'
  | 'import-et-analyse'
  | 'editeur-ia'
  | 'consignes-et-audit'
  | 'export';

export interface AnomalyItem {
  id: string;
  title: string;
  detail: string;
  location: string;
  severity: 'Critique' | 'À vérifier';
  fixed: boolean;
}

export interface ModificationHistoryItem {
  id: number;
  time: string;
  type: string;
  title: string;
  description: string;
  canUndo?: boolean;
  undone?: boolean;
}

export interface DocumentState {
  fileName: string;
  fileSize: string;
  pageCount: number;
  wordCount: number;
  citationCount: number;
  sectionsCount: number;
  lastSaved: string;
  activeChapter: number;
  mainFont: string;
  fontSize: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  alignment: 'left' | 'center' | 'right' | 'justify';
  lineSpacing: '1.0' | '1.5' | '2.0';
  chapterTitleFont: string;
  chapterTitleAlignment: 'left' | 'center';
  appliedStylePatch: boolean;
}
