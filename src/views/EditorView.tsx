import React, { useState } from 'react';
import { NavigationTab, DocumentState } from '../types';
import {
  Sparkles,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Send,
  Check,
  X,
  AlertTriangle,
  ChevronDown,
  BookOpen,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface EditorViewProps {
  documentState: DocumentState;
  setDocumentState: React.Dispatch<React.SetStateAction<DocumentState>>;
  setActiveTab: (tab: NavigationTab) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  documentState,
  setDocumentState,
  setActiveTab,
}) => {
  const [leftTab, setLeftTab] = useState<'nav' | 'alerts'>('nav');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isDiffPending, setIsDiffPending] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; hasDiff?: boolean }[]
  >([
    {
      sender: 'user',
      text: "Mets tous les titres de chapitre en Arial 16pt centré et applique l'interligne 1.5 sur tout le document.",
    },
    {
      sender: 'ai',
      text: "J'ai analysé votre demande conformément à la charte Paris-Saclay (2025). Voici les modifications prêtes à être appliquées :",
      hasDiff: true,
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(
    'Style Arial 16pt mis à jour (approuvé selon charte)'
  );

  const handleApplyDiff = () => {
    setIsDiffPending(false);
    setDocumentState((prev) => ({
      ...prev,
      chapterTitleFont: 'Arial',
      chapterTitleAlignment: 'center',
      lineSpacing: '1.5',
      appliedStylePatch: true,
      lastSaved: "À l'instant",
    }));
    setToastMessage('Modifications de styles appliquées avec succès sur 5 chapitres !');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRejectDiff = () => {
    setIsDiffPending(false);
    setToastMessage('Modification refusée. Les styles précédents sont conservés.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text }];
    setMessages(newMsgs);
    setChatInput('');

    // Simulate smart AI response
    setTimeout(() => {
      let aiText = "Demande reçue ! L'IA MémoireAI applique la consigne académique.";
      if (text.toLowerCase().includes('table des matières')) {
        aiText = 'Génération de la Table des matières dynamique avec pagination synchronisée effectuée sur la page 3.';
      } else if (text.toLowerCase().includes('pagination romaine')) {
        aiText = 'Double pagination activée : chiffres romains minuscules (i-iv) pour la page de titre, dédicace et résumé, chiffres arabes (1-84) dès l’Introduction.';
      } else if (text.toLowerCase().includes('aligner les figures') || text.toLowerCase().includes('apa')) {
        aiText = 'Toutes les figures et tableaux ont été recentrés avec numérotation normalisée APA 7e (Titre en italique au-dessus, source en-dessous).';
      }

      setMessages((prev) => [...prev, { sender: 'ai' as const, text: aiText }]);
      setToastMessage('Ajustement IA appliqué avec succès');
      setTimeout(() => setToastMessage(null), 3000);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-[#f8f9ff] overflow-hidden">
      {/* 1. Ribbon / Toolbar */}
      <div className="bg-white border-b border-[#e5eeff] px-4 py-2 shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
        {/* Left Toolbar Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Mode switch */}
          <div className="flex items-center rounded-lg bg-[#eff4ff] p-0.5 border border-[#dce9ff]">
            <button className="px-2.5 py-1 rounded-md bg-white font-semibold text-[#4b41e1] shadow-2xs">
              Éditeur
            </button>
            <button className="px-2.5 py-1 rounded-md text-[#43474d] hover:text-[#0b1c30]">
              Révision
            </button>
          </div>

          <div className="h-4 w-px bg-[#dce9ff]" />

          {/* Template Badge Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[#0b1c30] font-medium cursor-pointer hover:bg-[#dce9ff]">
            <span className="w-2 h-2 rounded-full bg-[#00a270]" />
            <span className="truncate max-w-[170px]">APA 7e (Univ. Paris-Saclay 2025)</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#74777e]" />
          </div>

          <div className="h-4 w-px bg-[#dce9ff]" />

          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5">
            <button
              title="Annuler (Ctrl+Z)"
              className="p-1.5 rounded hover:bg-[#eff4ff] text-[#43474d] hover:text-[#0b1c30]"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              title="Rétablir (Ctrl+Y)"
              className="p-1.5 rounded hover:bg-[#eff4ff] text-[#43474d] hover:text-[#0b1c30]"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-[#dce9ff]" />

          {/* Font Family */}
          <select
            value={documentState.mainFont}
            onChange={(e) =>
              setDocumentState((prev) => ({ ...prev, mainFont: e.target.value }))
            }
            className="border border-[#c3c6ce] rounded-lg px-2.5 py-1 bg-white text-[#0b1c30] font-medium focus:outline-hidden focus:border-[#4b41e1]"
          >
            <option value="Source Serif 4">Source Serif 4 (Recommandé)</option>
            <option value="Times New Roman">Times New Roman (Standard)</option>
            <option value="Arial">Arial (Sans-serif APA)</option>
            <option value="Calibri">Calibri (Word par défaut)</option>
            <option value="Inter">Inter (Épuré moderne)</option>
          </select>

          {/* Font Size */}
          <select
            value={documentState.fontSize}
            onChange={(e) =>
              setDocumentState((prev) => ({ ...prev, fontSize: e.target.value }))
            }
            className="border border-[#c3c6ce] rounded-lg px-2 py-1 bg-white text-[#0b1c30] font-medium focus:outline-hidden focus:border-[#4b41e1]"
          >
            <option value="10 pt">10 pt</option>
            <option value="11 pt">11 pt</option>
            <option value="12 pt">12 pt (Corps)</option>
            <option value="14 pt">14 pt (Sous-titre)</option>
            <option value="16 pt">16 pt (Titre 1)</option>
          </select>

          {/* B / I / U / S */}
          <div className="flex items-center gap-0.5 border border-[#c3c6ce] rounded-lg p-0.5 bg-white">
            <button
              onClick={() =>
                setDocumentState((prev) => ({ ...prev, isBold: !prev.isBold }))
              }
              className={`p-1 rounded ${
                documentState.isBold
                  ? 'bg-[#e5eeff] text-[#4b41e1]'
                  : 'text-[#43474d] hover:bg-[#eff4ff]'
              }`}
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setDocumentState((prev) => ({ ...prev, isItalic: !prev.isItalic }))
              }
              className={`p-1 rounded ${
                documentState.isItalic
                  ? 'bg-[#e5eeff] text-[#4b41e1]'
                  : 'text-[#43474d] hover:bg-[#eff4ff]'
              }`}
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setDocumentState((prev) => ({
                  ...prev,
                  isUnderline: !prev.isUnderline,
                }))
              }
              className={`p-1 rounded ${
                documentState.isUnderline
                  ? 'bg-[#e5eeff] text-[#4b41e1]'
                  : 'text-[#43474d] hover:bg-[#eff4ff]'
              }`}
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded text-[#43474d] hover:bg-[#eff4ff]">
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Alignments */}
          <div className="flex items-center gap-0.5 border border-[#c3c6ce] rounded-lg p-0.5 bg-white">
            {(['left', 'center', 'right', 'justify'] as const).map((align) => (
              <button
                key={align}
                onClick={() =>
                  setDocumentState((prev) => ({ ...prev, alignment: align }))
                }
                className={`p-1 rounded ${
                  documentState.alignment === align
                    ? 'bg-[#e5eeff] text-[#4b41e1]'
                    : 'text-[#43474d] hover:bg-[#eff4ff]'
                }`}
              >
                {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                {align === 'justify' && <AlignJustify className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          {/* Line spacing */}
          <button
            onClick={() =>
              setDocumentState((prev) => ({
                ...prev,
                lineSpacing:
                  prev.lineSpacing === '1.5'
                    ? '2.0'
                    : prev.lineSpacing === '2.0'
                    ? '1.0'
                    : '1.5',
              }))
            }
            className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[#c3c6ce] bg-white text-[#0b1c30] hover:bg-[#eff4ff]"
          >
            <span className="font-semibold text-[11px]">
              Interligne {documentState.lineSpacing}
            </span>
          </button>
        </div>

        {/* Right Toolbar Quick Style Insertions */}
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-1 rounded-md bg-[#eff4ff] text-[#4b41e1] font-medium cursor-pointer hover:bg-[#dce9ff]">
            Corps normal
          </span>
          <span className="px-2 py-1 rounded-md bg-white border border-[#c3c6ce] text-[#43474d] font-medium cursor-pointer hover:bg-[#eff4ff]">
            Titre 1
          </span>
          <span className="px-2 py-1 rounded-md bg-white border border-[#c3c6ce] text-[#43474d] font-medium cursor-pointer hover:bg-[#eff4ff]">
            Titre 2
          </span>
          <div className="h-4 w-px bg-[#dce9ff]" />
          <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#c3c6ce] text-[#0b1c30] hover:bg-[#eff4ff]">
            <ImageIcon className="w-3.5 h-3.5 text-[#4b41e1]" />
            <span className="hidden sm:inline">+ Figure</span>
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#c3c6ce] text-[#0b1c30] hover:bg-[#eff4ff]">
            <TableIcon className="w-3.5 h-3.5 text-[#4b41e1]" />
            <span className="hidden sm:inline">+ Tableau</span>
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#c3c6ce] text-[#0b1c30] hover:bg-[#eff4ff]">
            <Quote className="w-3.5 h-3.5 text-[#4b41e1]" />
            <span className="hidden sm:inline">+ Citation APA</span>
          </button>
        </div>
      </div>

      {/* 2. Graduated Academic Ruler */}
      <div className="bg-[#eff4ff] border-b border-[#dce9ff] px-8 py-0.5 shrink-0 flex items-center justify-center overflow-x-hidden text-[9px] text-[#74777e] font-mono select-none">
        <div className="w-full max-w-[760px] flex items-center justify-between relative h-4">
          {/* Left margin area indicator (2.5 cm) */}
          <div className="absolute left-0 top-0 bottom-0 w-[12%] bg-[#dce9ff]/50 border-r border-[#b0c9e8] flex items-center justify-center text-[8px] text-[#4b41e1]">
            2.5 cm
          </div>
          {/* Paragraph indent pointer at 1.25 cm */}
          <div
            className="absolute left-[16%] top-0 text-[#4b41e1] font-bold"
            title="Alinéa 1.25 cm"
          >
            ▼
          </div>
          {/* Graduations */}
          <div className="w-full flex justify-between px-2 pl-[14%] pr-[12%]">
            {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18].map((val) => (
              <span key={val} className="flex flex-col items-center">
                <span>{val}</span>
                <span className="h-1.5 w-px bg-[#b0c9e8]" />
              </span>
            ))}
          </div>
          {/* Right margin area indicator (2.5 cm) */}
          <div className="absolute right-0 top-0 bottom-0 w-[12%] bg-[#dce9ff]/50 border-l border-[#b0c9e8] flex items-center justify-center text-[8px] text-[#4b41e1]">
            2.5 cm
          </div>
        </div>
      </div>

      {/* 3. Three-Column Main Workspace */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Column: Document Structure & Quick Alerts */}
        <div className="hidden md:flex md:col-span-3 lg:col-span-3 border-r border-[#e5eeff] bg-white flex-col overflow-hidden">
          {/* Left Header */}
          <div className="p-3 border-b border-[#e5eeff]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-[#001428] uppercase tracking-wider">
                Structure du mémoire
              </h3>
              <span className="text-[10px] text-[#74777e]">
                {documentState.pageCount} pages • 5 chapitres
              </span>
            </div>

            {/* Sub-tabs */}
            <div className="flex gap-1 mt-2.5 bg-[#eff4ff] p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setLeftTab('nav')}
                className={`flex-1 py-1 rounded-md font-medium transition-all ${
                  leftTab === 'nav'
                    ? 'bg-white text-[#4b41e1] font-semibold shadow-2xs'
                    : 'text-[#43474d]'
                }`}
              >
                Navigation
              </button>
              <button
                onClick={() => setLeftTab('alerts')}
                className={`flex-1 py-1 rounded-md font-medium transition-all flex items-center justify-center gap-1 ${
                  leftTab === 'alerts'
                    ? 'bg-white text-[#4b41e1] font-semibold shadow-2xs'
                    : 'text-[#43474d]'
                }`}
              >
                <span>Alertes IA</span>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Structure Tree / Alerts list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
            {leftTab === 'nav' ? (
              <div className="space-y-1">
                <div className="p-2 rounded-lg text-[#43474d] hover:bg-[#eff4ff] cursor-pointer flex justify-between items-center">
                  <span>1. Introduction générale</span>
                  <span className="text-[#74777e] text-[10px]">p. 1</span>
                </div>

                <div className="bg-[#eff4ff] border-l-2 border-[#4b41e1] p-2 rounded-r-lg">
                  <div className="flex justify-between items-center text-[#4b41e1] font-bold">
                    <span>2. Cadre conceptuel & Revue</span>
                    <span className="text-xs">p. 14</span>
                  </div>
                  <div className="mt-1.5 pl-3 space-y-1 text-[11px]">
                    <div className="text-[#43474d] hover:text-[#4b41e1] cursor-pointer flex justify-between">
                      <span>2.1 Les modèles d'attention</span>
                      <span className="text-[#74777e]">p. 18</span>
                    </div>
                    <div className="text-[#4b41e1] font-semibold flex justify-between items-center bg-white/80 p-1 rounded border border-[#dce9ff]">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        2.2 Analyse comparative
                      </span>
                      <span>p. 24</span>
                    </div>
                    <div className="text-[#43474d] hover:text-[#4b41e1] cursor-pointer flex justify-between">
                      <span>2.3 Limites calculatoires</span>
                      <span className="text-[#74777e]">p. 28</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-lg text-[#43474d] hover:bg-[#eff4ff] cursor-pointer flex justify-between items-center">
                  <span>3. Méthodologie expérimentale</span>
                  <span className="text-[#74777e] text-[10px]">p. 31</span>
                </div>

                <div className="p-2 rounded-lg text-[#43474d] hover:bg-[#eff4ff] cursor-pointer flex justify-between items-center">
                  <span>4. Résultats & Discussions</span>
                  <span className="text-[#74777e] text-[10px]">p. 52</span>
                </div>

                <div className="p-2 rounded-lg text-[#43474d] hover:bg-[#eff4ff] cursor-pointer flex justify-between items-center">
                  <span>5. Conclusion & Perspectives</span>
                  <span className="text-[#74777e] text-[10px]">p. 74</span>
                </div>

                <div className="p-2 rounded-lg text-[#43474d] hover:bg-[#eff4ff] cursor-pointer flex justify-between items-center border-t border-[#e5eeff] mt-2 pt-2">
                  <span className="font-semibold text-[#001428]">Références bibliographiques</span>
                  <span className="text-[#74777e] text-[10px]">p. 78</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="flex items-center gap-1.5 font-semibold text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Police discordante (p. 24)
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Le titre 2.2 est en Calibri 14pt au lieu d'Arial 16pt (règle Paris-Saclay).
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="flex items-center gap-1.5 font-semibold text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Interligne irrégulier (p. 31)
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Interligne simple détecté sur 3 paragraphes. La charte exige 1.5.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[#001428]">
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-[#4b41e1]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00a270]" />
                    Légende de la Figure 2.1
                  </div>
                  <p className="text-[11px] text-[#43474d] mt-1">
                    Formatée aux normes APA 7e avec source mentionnée en-dessous.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Compliance Score Widget */}
          <div className="p-3 border-t border-[#e5eeff] bg-[#f8f9ff]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#001428]">
                Conformité charte
              </span>
              <span className="text-xs font-bold text-[#4b41e1]">82 / 100</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden mb-2.5">
              <div
                className="bg-[#4b41e1] h-full rounded-full transition-all duration-500"
                style={{ width: documentState.appliedStylePatch ? '99.4%' : '82%' }}
              />
            </div>
            <button
              onClick={() => setActiveTab('consignes-et-audit')}
              className="w-full py-1.5 rounded-lg border border-[#c3c6ce] text-[11px] font-semibold text-[#0b1c30] hover:bg-white transition-colors"
            >
              Voir l'audit complet & consignes
            </button>
          </div>
        </div>

        {/* Central Column: Virtual A4 Sheet Canvas */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col bg-[#f0f4f9] overflow-hidden relative">
          {/* Toast feedback pill */}
          {toastMessage && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-[#001428] text-white text-xs font-medium shadow-lg flex items-center gap-2 animate-bounce-short">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Canvas Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
            <div
              className="w-full max-w-[740px] bg-white rounded shadow-xl border border-gray-200 p-8 sm:p-12 text-[#0b1c30] relative transition-all duration-300"
              style={{
                fontFamily:
                  documentState.mainFont === 'Times New Roman'
                    ? 'Times New Roman, serif'
                    : documentState.mainFont === 'Arial'
                    ? 'Arial, sans-serif'
                    : 'Source Serif 4, Georgia, serif',
                lineHeight:
                  documentState.lineSpacing === '2.0'
                    ? 2.0
                    : documentState.lineSpacing === '1.0'
                    ? 1.2
                    : 1.6,
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
              }}
            >
              {/* Virtual A4 Header */}
              <div className="border-b border-gray-200 pb-2 mb-6 text-[10px] text-gray-500 flex justify-between items-center uppercase tracking-wider font-sans">
                <span>Université Paris-Saclay — Master 2 Informatique & IA</span>
                <span>Session 2025</span>
              </div>

              {/* Chapter 2 Title */}
              <div
                className={`mb-6 transition-all ${
                  documentState.chapterTitleAlignment === 'center'
                    ? 'text-center'
                    : 'text-left'
                }`}
              >
                <div className="text-xs uppercase tracking-widest text-[#4b41e1] font-sans font-bold mb-1">
                  Chapitre 2
                </div>
                <h1
                  className={`text-xl sm:text-2xl font-bold text-[#001428] ${
                    documentState.chapterTitleFont === 'Arial'
                      ? 'font-sans'
                      : 'font-serif'
                  }`}
                >
                  Modèles d'apprentissage profond et mécanismes d'attention
                </h1>
                <div className="h-0.5 w-16 bg-[#4b41e1] mt-2 mb-4" />
              </div>

              {/* Sub-section 2.2 */}
              <h2 className="text-base sm:text-lg font-bold text-[#001428] font-sans mb-3 mt-6 flex items-center justify-between group">
                <span>2.2 Analyse comparative des architectures Transformers</span>
                <span className="text-[10px] text-[#4b41e1] bg-[#eff4ff] px-2 py-0.5 rounded font-mono font-normal">
                  APA 7e Titre Niv. 2
                </span>
              </h2>

              {/* Academic Paragraph 1 */}
              <p className="text-sm text-gray-800 indent-6 text-justify mb-4">
                Dans les architectures neuronales récentes, le mécanisme d'attention introduit par
                Vaswani et al. (2017) a profondément transformé le traitement automatique du langage
                naturel. Contrairement aux réseaux récurrents traditionnels (LSTM, GRU), qui imposent
                un traitement séquentiel intrinsèque, les Transformers autorisent une parallélisation
                totale des calculs sur les séquences d'apprentissage.
              </p>

              {/* Academic Paragraph 2 with citation */}
              <p className="text-sm text-gray-800 indent-6 text-justify mb-6">
                Le produit scalaire mis à l'échelle (Scaled Dot-Product Attention) constitue le cœur
                algorithmique de cette rupture méthodologique. Comme le rappellent Devlin et al. (2019)
                ainsi que Radford et al. (2021), l'intégration de plusieurs têtes d'attention permet
                de projeter conjointement les représentations dans des espaces sémantiques distincts.
              </p>

              {/* Figure 2.1 Container */}
              <div className="my-6 p-5 rounded-xl bg-[#f8f9ff] border border-[#dce9ff] text-center">
                <div className="font-sans font-semibold text-xs text-[#001428] mb-1">
                  Figure 2.1 — Mécanisme de projection multi-têtes et couche d'attention
                </div>
                <div className="text-[10px] text-gray-500 italic mb-3 font-sans">
                  Représentation schématique normalisée selon les recommandations APA 7e
                </div>

                {/* Vector Diagram Visual */}
                <div className="max-w-[440px] mx-auto bg-white rounded-lg border border-[#c3c6ce] p-4 shadow-2xs">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="p-2 rounded bg-[#eff4ff] border border-[#dce9ff] text-[11px] font-mono text-[#4b41e1]">
                      Queries (Q)
                    </div>
                    <div className="p-2 rounded bg-[#eff4ff] border border-[#dce9ff] text-[11px] font-mono text-[#4b41e1]">
                      Keys (K)
                    </div>
                    <div className="p-2 rounded bg-[#eff4ff] border border-[#dce9ff] text-[11px] font-mono text-[#4b41e1]">
                      Values (V)
                    </div>
                  </div>
                  <div className="py-1 px-3 bg-[#001428] text-white rounded text-[11px] font-mono font-medium max-w-[280px] mx-auto">
                    Softmax(Q · Kᵀ / √dₖ) · V
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-gray-500 font-sans text-left">
                  <span className="font-bold">Note.</span> Adapté de « Attention Is All You Need »,
                  par A. Vaswani et al., 2017, Advances in Neural Information Processing Systems, 30,
                  p. 5998–6008. Droits réservés.
                </div>
              </div>

              {/* Academic Paragraph 3 */}
              <p className="text-sm text-gray-800 indent-6 text-justify mb-8">
                L'impact pratique de cette normalisation réside dans la stabilité du calcul de gradient.
                Pour des dimensions de vecteurs élevées, la variance des produits scalaires croît
                linéairement, repoussant les valeurs de la fonction softmax vers des régions à gradient
                infime. L'introduction du facteur d'échelle 1/√dₖ compense précisément ce phénomène.
              </p>

              {/* Footnote separator and content */}
              <div className="pt-4 border-t border-gray-200 text-[11px] text-gray-600 font-sans space-y-1">
                <p>
                  1. Voir notamment les développements théoriques présentés par Brown et al. (2020)
                  concernant les lois d'échelle (scaling laws).
                </p>
              </div>

              {/* Virtual A4 Footer Pagination */}
              <div className="border-t border-gray-200 mt-10 pt-2 text-[10px] text-gray-500 flex justify-between font-sans">
                <span>Mémoire de Master 2 — Alexandre Dupont</span>
                <span className="font-bold text-[#001428]">Page 24</span>
              </div>
            </div>
          </div>

          {/* Bottom Sheet Status Bar */}
          <div className="bg-white border-t border-[#e5eeff] px-4 py-2 shrink-0 flex items-center justify-between text-xs text-[#43474d]">
            <div className="flex items-center gap-3">
              <span>Page 24 sur {documentState.pageCount}</span>
              <span>•</span>
              <span>{documentState.wordCount.toLocaleString()} mots</span>
              <span>•</span>
              <span className="hidden sm:inline">Sélection : 1 paragraphe (128 mots)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1 rounded hover:bg-[#eff4ff]"
                title="Dézoomer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
                className="p-1 rounded hover:bg-[#eff4ff]"
                title="Zoomer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Assistant IA Mémoire */}
        <div className="hidden lg:flex lg:col-span-3 border-l border-[#e5eeff] bg-white flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3.5 border-b border-[#e5eeff] flex items-center justify-between bg-linear-to-r from-white to-[#eff4ff]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#4b41e1] text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-xs text-[#001428]">Assistant IA Mémoire</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-[#00a270] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a270] animate-pulse" />
              En ligne
            </span>
          </div>

          {/* Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`space-y-2 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-2xl max-w-[92%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#001428] text-white rounded-br-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] rounded-bl-xs border border-[#dce9ff]'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Diff Preview Card */}
                {msg.hasDiff && isDiffPending && (
                  <div className="text-left p-3 rounded-xl bg-white border border-[#b0c9e8] shadow-xs space-y-2.5">
                    <div className="text-[11px] font-bold text-[#001428] flex items-center justify-between">
                      <span>Proposition de style IA</span>
                      <span className="text-[10px] font-semibold text-[#4b41e1] bg-[#eff4ff] px-2 py-0.5 rounded">
                        Charte Paris-Saclay
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="p-1.5 rounded bg-red-50 text-red-700 border border-red-200">
                        <span className="font-bold">Avant :</span> Calibri 14pt Gras, Gauche
                      </div>
                      <div className="p-1.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="font-bold">Après :</span> Arial 16pt Gras, Centré
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 leading-tight">
                      Impact : 5 titres de chapitres modifiés (pages 1, 14, 31, 52, 74).
                    </p>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleApplyDiff}
                        className="flex-1 py-1.5 rounded-lg bg-[#00a270] hover:bg-[#00875c] text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Appliquer
                      </button>
                      <button
                        onClick={handleRejectDiff}
                        className="px-3 py-1.5 rounded-lg border border-[#c3c6ce] text-[#43474d] hover:bg-[#eff4ff] font-medium text-xs transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Refuser
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Recent History Badge */}
            {documentState.appliedStylePatch && (
              <div className="p-2.5 rounded-xl bg-[#00a270]/10 border border-[#00a270]/30 text-[#00a270] text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Titres en Arial 16pt & interligne 1.5 appliqués avec succès.</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2.5 border-t border-[#e5eeff] bg-[#f8f9ff] flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSendMessage('Générer la table des matières automatique')}
              className="text-[11px] px-2 py-1 rounded-full bg-white border border-[#dce9ff] text-[#4b41e1] hover:bg-[#eff4ff] font-medium"
            >
              + Table des matières
            </button>
            <button
              onClick={() => handleSendMessage('Appliquer la pagination romaine sur les liminaires')}
              className="text-[11px] px-2 py-1 rounded-full bg-white border border-[#dce9ff] text-[#4b41e1] hover:bg-[#eff4ff] font-medium"
            >
              + Pagination romaine
            </button>
            <button
              onClick={() => handleSendMessage('Recentrer et normaliser les figures APA')}
              className="text-[11px] px-2 py-1 rounded-full bg-white border border-[#dce9ff] text-[#4b41e1] hover:bg-[#eff4ff] font-medium"
            >
              + Aligner figures APA
            </button>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-[#e5eeff] bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Demandez une mise en forme à l'IA..."
                className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-[#c3c6ce] text-xs focus:outline-hidden focus:border-[#4b41e1] bg-[#f8f9ff]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#001428] text-white flex items-center justify-center hover:bg-[#0f2942] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
