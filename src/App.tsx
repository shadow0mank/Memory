import React, { useState } from 'react';
import { NavigationTab, DocumentState } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ImportView } from './views/ImportView';
import { EditorView } from './views/EditorView';
import { GuidelinesAuditView } from './views/GuidelinesAuditView';
import { ExportView } from './views/ExportView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('accueil');

  const [documentState, setDocumentState] = useState<DocumentState>({
    fileName: 'Mémoire_Fin_Etudes_Master2_v3.docx',
    fileSize: '14.8 Mo',
    pageCount: 84,
    wordCount: 26410,
    citationCount: 118,
    sectionsCount: 19,
    lastSaved: 'Enregistré automatiquement',
    activeChapter: 2,
    mainFont: 'Source Serif 4',
    fontSize: '12 pt',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    alignment: 'justify',
    lineSpacing: '1.5',
    chapterTitleFont: 'Calibri',
    chapterTitleAlignment: 'left',
    appliedStylePatch: false,
  });

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#dce9ff] selection:text-[#4b41e1]">
      {/* Global Persistent Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fileName={documentState.fileName}
        savedStatus={documentState.lastSaved}
        onOpenGuidelines={() => setActiveTab('consignes-et-audit')}
        onDownload={() => setActiveTab('export')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'accueil' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'import-et-analyse' && (
          <ImportView
            documentState={documentState}
            setDocumentState={setDocumentState}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'editeur-ia' && (
          <EditorView
            documentState={documentState}
            setDocumentState={setDocumentState}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'consignes-et-audit' && (
          <GuidelinesAuditView
            documentState={documentState}
            setDocumentState={setDocumentState}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'export' && (
          <ExportView
            documentState={documentState}
            setDocumentState={setDocumentState}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer on non-editor views */}
      {activeTab !== 'editeur-ia' && <Footer />}
    </div>
  );
}

export default App;
