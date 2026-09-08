import React, { useState } from 'react';
import { NavigationTab, DocumentState, AnomalyItem } from '../types';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  SlidersHorizontal,
  RotateCcw,
  Save,
  Check,
  ArrowRight,
  Ruler,
  Type,
  AlignLeft,
  ListOrdered,
  FileCheck,
} from 'lucide-react';

interface GuidelinesAuditViewProps {
  documentState: DocumentState;
  setDocumentState: React.Dispatch<React.SetStateAction<DocumentState>>;
  setActiveTab: (tab: NavigationTab) => void;
}

export const GuidelinesAuditView: React.FC<GuidelinesAuditViewProps> = ({
  documentState,
  setDocumentState,
  setActiveTab,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('paris-saclay');
  const [activeTab, setActiveSettingTab] = useState<
    'police' | 'paragraphes' | 'marges' | 'titres' | 'pagination'
  >('police');

  // Guidelines form state
  const [bodyFont, setBodyFont] = useState('Source Serif 4');
  const [bodyFontSize, setBodyFontSize] = useState('12 pt');
  const [fontColor, setFontColor] = useState('#0b1c30');
  const [footnoteSize, setFootnoteSize] = useState('10 pt');

  const [lineSpacing, setLineSpacing] = useState('1.5');
  const [alignment, setAlignment] = useState('justify');
  const [firstLineIndent, setFirstLineIndent] = useState('1.25 cm');
  const [spaceAfter, setSpaceAfter] = useState('6 pt');

  const [marginTop, setMarginTop] = useState(2.5);
  const [marginBottom, setMarginBottom] = useState(2.5);
  const [marginLeft, setMarginLeft] = useState(3.0); // Gutter
  const [marginRight, setMarginRight] = useState(2.5);

  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Anomalies state
  const [anomalies, setAnomalies] = useState<AnomalyItem[]>([
    {
      id: '1',
      title: 'Police de titre discordante (Titre 2.2)',
      detail: "Calibri 14pt détecté au lieu d'Arial 16pt Gras requis par la charte Paris-Saclay.",
      location: 'Page 24',
      severity: 'Critique',
      fixed: false,
    },
    {
      id: '2',
      title: 'Marge intérieure de reliure insuffisante',
      detail: "2.5 cm actuel au lieu de 3.0 cm requis pour permettre la reliure thermique officielle.",
      location: 'Global (84 pages)',
      severity: 'Critique',
      fixed: false,
    },
    {
      id: '3',
      title: 'Interligne variable détecté',
      detail: '3 paragraphes sont restés en interligne simple 1.0 au lieu de 1.5 standard.',
      location: 'Page 31',
      severity: 'À vérifier',
      fixed: false,
    },
    {
      id: '4',
      title: 'Retrait de première ligne manquant',
      detail: 'Alinéa de 1.25 cm absent sur 12 paragraphes après les sous-titres.',
      location: 'Pages 18-22',
      severity: 'À vérifier',
      fixed: false,
    },
    {
      id: '5',
      title: 'Pagination absente sur liminaires',
      detail: 'La numérotation romaine (i, ii) doit apparaître dès la page de dédicace.',
      location: 'Pages ii-iv',
      severity: 'À vérifier',
      fixed: false,
    },
    {
      id: '6',
      title: 'Légendes de figures non centrées',
      detail: 'Les Figures 2.1 et 3.4 sont ferrées à gauche au lieu d’être centrées avec source APA.',
      location: 'Pages 24 & 45',
      severity: 'À vérifier',
      fixed: false,
    },
  ]);

  const fixedCount = anomalies.filter((a) => a.fixed).length;
  const currentScore = Math.min(100, Math.round(82 + (fixedCount / anomalies.length) * 18));

  const handleFixOne = (id: string) => {
    setAnomalies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fixed: true } : item))
    );
    if (id === '1') {
      setDocumentState((d) => ({
        ...d,
        chapterTitleFont: 'Arial',
        chapterTitleAlignment: 'center',
        appliedStylePatch: true,
      }));
    }
  };

  const handleFixAll = () => {
    setAnomalies((prev) => prev.map((item) => ({ ...item, fixed: true })));
    setDocumentState((d) => ({
      ...d,
      chapterTitleFont: 'Arial',
      chapterTitleAlignment: 'center',
      lineSpacing: '1.5',
      appliedStylePatch: true,
      lastSaved: "À l'instant",
    }));
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3500);
  };

  const handleSaveGuidelines = () => {
    setDocumentState((d) => ({
      ...d,
      mainFont: bodyFont,
      fontSize: bodyFontSize,
      lineSpacing: lineSpacing as any,
      lastSaved: "À l'instant",
    }));
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {saveSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#001428] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Charte enregistrée et appliquée à l'ensemble du mémoire !</span>
        </div>
      )}

      {/* Header with Template Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-xs font-semibold text-[#4b41e1] mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Audit typographique & Charte académique
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#001428] tracking-tight">
            Paramètres de mise en forme & Audit de conformité
          </h1>
          <p className="text-sm text-[#43474d] mt-1">
            Configurez les règles imposées par votre école doctorale ou corrigez les anomalies détectées en temps réel.
          </p>
        </div>

        {/* University Dropdown */}
        <div className="shrink-0">
          <label className="block text-[11px] font-semibold text-[#74777e] uppercase mb-1">
            Gabarit d'établissement actif
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2 rounded-xl border border-[#b0c9e8] bg-white text-xs sm:text-sm font-semibold text-[#001428] focus:outline-hidden focus:border-[#4b41e1] shadow-2xs"
          >
            <option value="paris-saclay">Université Paris-Saclay (Sciences & Ingénierie - 2025)</option>
            <option value="sorbonne">Sorbonne Université (Lettres & Sciences Humaines)</option>
            <option value="sciences-po">Sciences Po Paris (Mémoire Affaires Publiques)</option>
            <option value="apa-7">Normes APA 7e (Standard International)</option>
            <option value="epfl">EPFL (Thèse de doctorat)</option>
            <option value="custom">Règles personnalisées...</option>
          </select>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Real-Time Audit & Detected Anomalies */}
        <div className="lg:col-span-6 space-y-6">
          {/* Health Score Card */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Circular Gauge */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#eff4ff]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#4b41e1] transition-all duration-700 ease-out"
                    strokeDasharray={`${currentScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-[#001428]">{currentScore}</span>
                  <span className="text-[10px] uppercase font-bold text-[#74777e]">/ 100</span>
                </div>
              </div>

              {/* Stats and description */}
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-bold text-base text-[#001428]">
                  Score global de conformité charte
                </h3>
                <p className="text-xs text-[#43474d] leading-relaxed">
                  Basé sur l'analyse de 84 pages, 24 titres et 118 références par rapport aux directives de Paris-Saclay.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs pt-1 justify-center sm:justify-start">
                  <span className="flex items-center gap-1 text-[#00a270] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {18 + fixedCount} conformes
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {Math.max(0, 4 - Math.floor(fixedCount / 2))} à vérifier
                  </span>
                  <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <XCircle className="w-3.5 h-3.5" />
                    {anomalies.filter((a) => a.severity === 'Critique' && !a.fixed).length} critiques
                  </span>
                </div>
              </div>
            </div>

            {/* Master Fix All Button */}
            <div className="mt-6 pt-5 border-t border-[#e5eeff] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#43474d]">
                {anomalies.length - fixedCount} anomalie(s) restante(s) à corriger
              </span>
              <button
                onClick={handleFixAll}
                disabled={fixedCount === anomalies.length}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#001428] text-white text-xs font-semibold hover:bg-[#0f2942] disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Appliquer toutes les corrections automatiques ({anomalies.length - fixedCount})</span>
              </button>
            </div>
          </div>

          {/* List of Detected Anomalies */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[#001428]">
              Anomalies identifiées dans votre manuscrit
            </h3>

            {anomalies.map((anom) => (
              <div
                key={anom.id}
                className={`p-4 rounded-xl border transition-all ${
                  anom.fixed
                    ? 'bg-[#f8f9ff] border-[#dce9ff] opacity-75'
                    : anom.severity === 'Critique'
                    ? 'bg-red-50/50 border-red-200'
                    : 'bg-amber-50/50 border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          anom.fixed
                            ? 'bg-[#00a270]/10 text-[#00a270]'
                            : anom.severity === 'Critique'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {anom.fixed ? 'Corrigé ✓' : anom.severity}
                      </span>
                      <span className="text-xs font-bold text-[#001428]">
                        {anom.title}
                      </span>
                      <span className="text-[11px] text-[#74777e]">({anom.location})</span>
                    </div>
                    <p className="text-xs text-[#43474d] leading-relaxed">{anom.detail}</p>
                  </div>

                  {!anom.fixed ? (
                    <button
                      onClick={() => handleFixOne(anom.id)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-white border border-[#c3c6ce] hover:border-[#4b41e1] hover:text-[#4b41e1] text-xs font-medium transition-colors shadow-2xs"
                    >
                      Corriger en 1 clic
                    </button>
                  ) : (
                    <span className="shrink-0 flex items-center gap-1 text-xs text-[#00a270] font-semibold">
                      <Check className="w-4 h-4" />
                      Appliqué
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Typographic Live Diff Preview */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-5 space-y-3">
            <h4 className="font-bold text-xs text-[#001428] uppercase tracking-wider">
              Aperçu comparatif typographique
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 space-y-1">
                <span className="text-[10px] font-bold text-red-700 uppercase">Non conforme (Actuel)</span>
                <p className="font-sans text-xs font-normal text-gray-800">
                  2.2 Analyse comparative des Transformers (Calibri 14pt sans alinéa, marge 2.5cm)
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Conforme Charte (IA)</span>
                <p className="font-sans text-xs font-bold text-[#001428]">
                  2.2 Analyse comparative des Transformers (Arial 16pt Gras, retrait 1.25cm, marge reliure 3.0cm)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: University Guidelines Settings Tabs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-[#dce9ff] bg-white shadow-xs overflow-hidden">
            {/* Setting Tabs */}
            <div className="flex border-b border-[#e5eeff] bg-[#f8f9ff] overflow-x-auto">
              {[
                { id: 'police', label: 'Police', icon: <Type className="w-3.5 h-3.5" /> },
                { id: 'paragraphes', label: 'Paragraphes', icon: <AlignLeft className="w-3.5 h-3.5" /> },
                { id: 'marges', label: 'Marges', icon: <Ruler className="w-3.5 h-3.5" /> },
                { id: 'titres', label: 'Titres & Styles', icon: <FileCheck className="w-3.5 h-3.5" /> },
                { id: 'pagination', label: 'Pagination', icon: <ListOrdered className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#4b41e1] text-[#4b41e1] bg-white'
                      : 'border-transparent text-[#43474d] hover:text-[#001428]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 space-y-6">
              {/* TAB: Police */}
              {activeTab === 'police' && (
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="font-semibold text-[#001428] block mb-1.5">
                      Police du corps de texte
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Source Serif 4', tag: 'Sérif élégant (Recommandé)' },
                        { name: 'Times New Roman', tag: 'Standard traditionnel' },
                        { name: 'Arial', tag: 'Sans-serif moderne' },
                        { name: 'Calibri', tag: 'Standard bureautique' },
                      ].map((item) => (
                        <div
                          key={item.name}
                          onClick={() => setBodyFont(item.name)}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                            bodyFont === item.name
                              ? 'border-[#4b41e1] bg-[#eff4ff]'
                              : 'border-[#c3c6ce] hover:border-[#b0c9e8]'
                          }`}
                        >
                          <div className="font-semibold text-[#001428]">{item.name}</div>
                          <div className="text-[10px] text-[#74777e]">{item.tag}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#001428] block mb-1.5">
                        Taille du corps principal
                      </label>
                      <select
                        value={bodyFontSize}
                        onChange={(e) => setBodyFontSize(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#c3c6ce] text-xs font-medium"
                      >
                        <option value="11 pt">11 pt</option>
                        <option value="12 pt">12 pt (Standard universitaire)</option>
                        <option value="13 pt">13 pt</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[#001428] block mb-1.5">
                        Taille notes de bas de page
                      </label>
                      <select
                        value={footnoteSize}
                        onChange={(e) => setFootnoteSize(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#c3c6ce] text-xs font-medium"
                      >
                        <option value="9 pt">9 pt</option>
                        <option value="10 pt">10 pt (Recommandé)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#001428] block mb-1.5">
                      Couleur du texte
                    </label>
                    <div className="flex items-center gap-3">
                      {[
                        { color: '#000000', label: 'Noir pur (#000)' },
                        { color: '#0b1c30', label: 'Anthracite université (#0B1C30)' },
                        { color: '#1a1a1a', label: 'Gris très sombre' },
                      ].map((c) => (
                        <label
                          key={c.color}
                          className="flex items-center gap-2 cursor-pointer text-xs"
                        >
                          <input
                            type="radio"
                            name="fontColor"
                            checked={fontColor === c.color}
                            onChange={() => setFontColor(c.color)}
                            className="text-[#4b41e1]"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                            style={{ backgroundColor: c.color }}
                          />
                          <span>{c.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Paragraphes */}
              {activeTab === 'paragraphes' && (
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="font-semibold text-[#001428] block mb-1.5">
                      Interligne obligatoire
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: '1.0', label: 'Simple (1.0)', desc: 'Résumés & notes' },
                        { val: '1.5', label: 'Interligne 1.5', desc: 'Standard officiel' },
                        { val: '2.0', label: 'Double (2.0)', desc: 'Revue éditoriale' },
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setLineSpacing(item.val)}
                          className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                            lineSpacing === item.val
                              ? 'border-[#4b41e1] bg-[#eff4ff]'
                              : 'border-[#c3c6ce] hover:border-[#b0c9e8]'
                          }`}
                        >
                          <div className="font-semibold text-[#001428]">{item.label}</div>
                          <div className="text-[10px] text-[#74777e]">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#001428] block mb-1.5">
                        Alignement du texte
                      </label>
                      <select
                        value={alignment}
                        onChange={(e) => setAlignment(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#c3c6ce] text-xs font-medium"
                      >
                        <option value="justify">Justifié (Recommandé en France)</option>
                        <option value="left">Aligné à gauche (Drapeau droit)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[#001428] block mb-1.5">
                        Retrait de 1ère ligne (Alinéa)
                      </label>
                      <select
                        value={firstLineIndent}
                        onChange={(e) => setFirstLineIndent(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#c3c6ce] text-xs font-medium"
                      >
                        <option value="0 cm">Aucun retrait (0 cm)</option>
                        <option value="1.0 cm">1.0 cm</option>
                        <option value="1.25 cm">1.25 cm (Standard APA 7e)</option>
                        <option value="1.5 cm">1.5 cm</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#001428] block mb-1.5">
                      Espacement après paragraphe
                    </label>
                    <div className="flex gap-2">
                      {['0 pt', '6 pt (Conseillé)', '12 pt'].map((sp) => (
                        <button
                          key={sp}
                          type="button"
                          onClick={() => setSpaceAfter(sp)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${
                            spaceAfter === sp
                              ? 'border-[#4b41e1] bg-[#eff4ff] text-[#4b41e1]'
                              : 'border-[#c3c6ce] text-[#43474d]'
                          }`}
                        >
                          {sp}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Marges */}
              {activeTab === 'marges' && (
                <div className="space-y-5 text-xs">
                  {/* Visual Sheet Diagram */}
                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#dce9ff] flex flex-col items-center">
                    <div className="w-48 h-56 bg-white border border-[#b0c9e8] rounded shadow-xs relative flex flex-col justify-between p-3 text-[10px] text-[#4b41e1] font-mono">
                      {/* Top margin mark */}
                      <div className="text-center border-b border-dashed border-[#b0c9e8] pb-1">
                        Haut : {marginTop} cm
                      </div>

                      {/* Middle area with left and right margins */}
                      <div className="flex justify-between items-center my-auto">
                        <span className="border-r border-dashed border-[#4b41e1] pr-1.5 font-bold text-[#001428]">
                          Reliure : {marginLeft} cm
                        </span>
                        <span className="text-gray-400 italic text-[9px]">Corps du texte</span>
                        <span className="border-l border-dashed border-[#b0c9e8] pl-1.5">
                          Droite : {marginRight} cm
                        </span>
                      </div>

                      {/* Bottom margin mark */}
                      <div className="text-center border-t border-dashed border-[#b0c9e8] pt-1">
                        Bas : {marginBottom} cm
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="font-semibold text-[#001428] block mb-1">Haut (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={marginTop}
                        onChange={(e) => setMarginTop(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg border-[#c3c6ce]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#001428] block mb-1">Bas (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={marginBottom}
                        onChange={(e) => setMarginBottom(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg border-[#c3c6ce]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#4b41e1] block mb-1">Reliure / Gauche (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={marginLeft}
                        onChange={(e) => setMarginLeft(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg border-[#4b41e1] bg-[#eff4ff] font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#001428] block mb-1">Droite (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={marginRight}
                        onChange={(e) => setMarginRight(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg border-[#c3c6ce]"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#74777e] italic">
                    Note : La marge intérieure de reliure à 3.0 cm est indispensable pour éviter que le texte ne disparaisse dans la reliure collée.
                  </p>
                </div>
              )}

              {/* TAB: Titres & Hiérarchie */}
              {activeTab === 'titres' && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl border border-[#dce9ff] bg-[#f8f9ff] space-y-1">
                    <div className="font-bold text-[#001428] flex justify-between">
                      <span>Niveau 1 : Chapitres</span>
                      <span className="text-[#4b41e1]">Arial 18pt Gras Centré</span>
                    </div>
                    <p className="text-[11px] text-[#43474d]">
                      Saut de page automatique avant chaque chapitre • Numérotation en chiffres arabes (Chapitre 1).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-[#dce9ff] bg-[#f8f9ff] space-y-1">
                    <div className="font-bold text-[#001428] flex justify-between">
                      <span>Niveau 2 : Sections</span>
                      <span className="text-[#4b41e1]">Arial 14pt Gras Aligné à gauche</span>
                    </div>
                    <p className="text-[11px] text-[#43474d]">
                      Numérotation décimale automatique (ex: 2.1, 2.2) • Espacement 12pt avant, 6pt après.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-[#dce9ff] bg-[#f8f9ff] space-y-1">
                    <div className="font-bold text-[#001428] flex justify-between">
                      <span>Niveau 3 : Sous-sections</span>
                      <span className="text-[#4b41e1]">Arial 12pt Italique Aligné à gauche</span>
                    </div>
                    <p className="text-[11px] text-[#43474d]">
                      Numérotation décimale (ex: 2.1.1) • Sans saut de page.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB: Pagination */}
              {activeTab === 'pagination' && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <label className="font-semibold text-[#001428] block">
                      Emplacement du numéro de page
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-lg border border-[#c3c6ce] text-center">
                        Bas centré
                      </div>
                      <div className="p-2.5 rounded-lg border border-[#4b41e1] bg-[#eff4ff] text-center font-bold text-[#4b41e1]">
                        Bas à droite (Recommandé)
                      </div>
                      <div className="p-2.5 rounded-lg border border-[#c3c6ce] text-center">
                        Haut à droite
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#4b41e1]" />
                      <span className="font-medium text-[#001428]">
                        Masquer la pagination sur la page de garde officielle
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#4b41e1]" />
                      <span className="font-medium text-[#001428]">
                        Double pagination : Chiffres romains (i, ii) pour liminaires, arabes (1, 2...) dès l'Introduction
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="bg-[#f8f9ff] border-t border-[#e5eeff] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setBodyFont('Source Serif 4');
                  setLineSpacing('1.5');
                  setAlignment('justify');
                  setFirstLineIndent('1.25 cm');
                  setMarginLeft(3.0);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#c3c6ce] bg-white text-[#43474d] hover:bg-[#eff4ff] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser selon APA 7e</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveGuidelines}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#4b41e1] text-white hover:bg-[#645efb] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer et appliquer les règles</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick link to Editor */}
          <div className="p-4 rounded-2xl bg-linear-to-r from-[#001428] to-[#0f2942] text-white flex items-center justify-between shadow-md">
            <div>
              <h4 className="font-bold text-sm">Prêt à visualiser vos modifications ?</h4>
              <p className="text-xs text-white/80">Ouvrez l'Éditeur IA pour inspecter le rendu A4 en temps réel.</p>
            </div>
            <button
              onClick={() => setActiveTab('editeur-ia')}
              className="px-4 py-2 rounded-xl bg-white text-[#001428] font-bold text-xs hover:bg-[#eff4ff] transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Éditeur IA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
