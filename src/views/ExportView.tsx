import React, { useState } from 'react';
import { NavigationTab, DocumentState, ModificationHistoryItem } from '../types';
import {
  CheckCircle2,
  Download,
  FileText,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Lightbulb,
  Clock,
  Printer,
  Sliders,
  Check,
  Loader2,
  Share2,
} from 'lucide-react';

interface ExportViewProps {
  documentState: DocumentState;
  setDocumentState: React.Dispatch<React.SetStateAction<DocumentState>>;
  setActiveTab: (tab: NavigationTab) => void;
}

export const ExportView: React.FC<ExportViewProps> = ({
  documentState,
  setDocumentState,
  setActiveTab,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Pre-generation toggles
  const [includeToc, setIncludeToc] = useState(true);
  const [metadataEmbed, setMetadataEmbed] = useState(true);
  const [embedFonts, setEmbedFonts] = useState(true);
  const [compressImages, setCompressImages] = useState(true);

  // History timeline
  const [historyItems, setHistoryItems] = useState<ModificationHistoryItem[]>([
    {
      id: 1,
      time: '09:44',
      type: 'Style Titre',
      title: 'Titres de chapitre reformatés en Arial 16pt Centré',
      description: 'Alignement et police normalisés sur 5 chapitres selon la charte.',
      canUndo: true,
      undone: false,
    },
    {
      id: 2,
      time: '09:42',
      type: 'Marges',
      title: 'Marge intérieure de reliure ajustée à 3.0 cm',
      description: 'Conformité d’impression offset garantie pour reliure thermocollée.',
      canUndo: true,
      undone: false,
    },
    {
      id: 3,
      time: '09:38',
      type: 'Pagination',
      title: 'Double pagination romaine & arabe initialisée',
      description: 'Chiffres romains (i-iv) pour liminaires, arabes (1-84) dès l’Intro.',
      canUndo: true,
      undone: false,
    },
    {
      id: 4,
      time: '09:35',
      type: 'Import',
      title: 'Ingestion du manuscrit brut & détection Paris-Saclay',
      description: 'Extraction de 84 pages, 26 410 mots et 118 références APA.',
      canUndo: false,
      undone: false,
    },
  ]);

  const handleDownload = (format: 'docx' | 'pdf') => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const ext = format === 'docx' ? '.docx' : '.pdf';
      const base = documentState.fileName.replace(/\.(docx|pdf)$/i, '');
      const downloadName = `${base}_CONFORME_UNIVERSITE${ext}`;

      // Trigger dummy clean file download in browser
      const blob = new Blob(
        [
          `Mémoire Universitaire Certifié MémoireAI\nDocument: ${documentState.fileName}\nFormat: ${format.toUpperCase()}\nConformité: 100% Charte Paris-Saclay\nDate: ${new Date().toLocaleDateString('fr-FR')}`,
        ],
        { type: format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccessToast(
        `Fichier ${downloadName} généré avec succès ! Le téléchargement a démarré.`
      );
      setTimeout(() => setDownloadSuccessToast(null), 4500);
    }, 1200);
  };

  const handleUndoHistory = (id: number) => {
    setHistoryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, undone: true } : item))
    );
    setDownloadSuccessToast('Modification annulée. Version précédente restaurée.');
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {downloadSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#001428] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-fade-in border border-[#0f2942]">
          <CheckCircle2 className="w-4 h-4 text-[#00a270]" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Top Banner Status 100% */}
      <div className="rounded-2xl bg-linear-to-r from-[#002e1d] to-[#0f2942] text-white p-5 sm:p-6 shadow-md border border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00a270] flex items-center justify-center text-white shrink-0 shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold">
              Votre mémoire est prêt pour le dépôt universitaire !
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
              Conformité validée à 100% selon la charte de l’Université Paris-Saclay • Audit #8492-FR certifié
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
            Prêt pour soutenance
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-xs font-semibold text-[#4b41e1] mb-2">
          <Download className="w-3.5 h-3.5" />
          Livraison finale du manuscrit
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#001428] tracking-tight">
          Finalisation & Exportation de votre mémoire
        </h1>
        <p className="text-sm text-[#43474d] mt-1">
          Générez votre document dans le format requis pour le jury, l'impression papier reliée et l'archivage pérenne CINES.
        </p>

        {/* Telemetry Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474d]">
          <span className="bg-white px-3 py-1 rounded-lg border border-[#dce9ff] font-semibold text-[#001428]">
            {documentState.pageCount} pages
          </span>
          <span>•</span>
          <span className="bg-white px-3 py-1 rounded-lg border border-[#dce9ff]">
            {documentState.wordCount.toLocaleString()} mots
          </span>
          <span>•</span>
          <span className="bg-white px-3 py-1 rounded-lg border border-[#dce9ff]">
            42 références APA 7e
          </span>
          <span>•</span>
          <span className="bg-white px-3 py-1 rounded-lg border border-[#dce9ff]">
            Poids estimé : 14.8 Mo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Download Cards & Parameters */}
        <div className="lg:col-span-8 space-y-6">
          {/* Two Export Format Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Microsoft Word (.docx) */}
            <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 flex flex-col justify-between shadow-xs hover:border-[#b0c9e8] transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#4b41e1]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#eff4ff] text-[#4b41e1]">
                    Éditable OpenXML
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#001428] mb-1">
                  Microsoft Word (.docx)
                </h3>
                <p className="text-xs text-[#43474d] mb-4 leading-relaxed">
                  Idéal pour transmettre à votre directeur de mémoire et intégrer de nouvelles corrections éditoriales.
                </p>

                <ul className="space-y-2 text-xs text-[#43474d] mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Styles typographiques natifs hiérarchisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Sommaire dynamique modifiable en 1 clic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Section de sauts de page pour double pagination</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleDownload('docx')}
                disabled={isGenerating}
                className="w-full py-3 rounded-xl border border-[#c3c6ce] hover:border-[#001428] bg-white text-[#001428] font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#eff4ff]"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#4b41e1]" />
                ) : (
                  <Download className="w-4 h-4 text-[#4b41e1]" />
                )}
                <span>Télécharger au format Word (.docx)</span>
              </button>
            </div>

            {/* 2. PDF Universitaire (Recommandé) */}
            <div className="rounded-2xl border-2 border-[#4b41e1] bg-linear-to-b from-[#f8f9ff] to-white p-6 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#4b41e1] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                Recommandé pour le jury
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4b41e1] flex items-center justify-center text-white shadow-xs">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    PDF/A-1b ABES
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#001428] mb-1">
                  PDF Universitaire HD (.pdf)
                </h3>
                <p className="text-xs text-[#43474d] mb-4 leading-relaxed">
                  Le format officiel requis pour l'impression finale et le dépôt sur l'espace numérique de votre université.
                </p>

                <ul className="space-y-2 text-xs text-[#43474d] mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Conforme à la norme d’archivage pérenne CINES</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Polices vectorielles incorporées à 100%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Marge de reliure 3.0 cm optimisée impression</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00a270]" />
                    <span>Signets interactifs et liens cliquables</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleDownload('pdf')}
                disabled={isGenerating}
                className="w-full py-3 rounded-xl bg-[#001428] hover:bg-[#0f2942] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Download className="w-4 h-4 text-emerald-400" />
                )}
                <span>Télécharger le PDF officiel (.pdf)</span>
              </button>
            </div>
          </div>

          {/* Pre-generation Checklist */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
              <h3 className="font-bold text-sm text-[#001428] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#4b41e1]" />
                Options de compilation avancée
              </h3>
              <span className="text-xs text-[#74777e]">4 options actives</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer hover:bg-[#eff4ff]">
                <input
                  type="checkbox"
                  checked={includeToc}
                  onChange={(e) => setIncludeToc(e.target.checked)}
                  className="mt-0.5 rounded text-[#4b41e1]"
                />
                <div>
                  <div className="font-semibold text-[#001428]">
                    Table des matières & figures
                  </div>
                  <div className="text-[11px] text-[#74777e]">
                    Pagination synchronisée avec liens actifs
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer hover:bg-[#eff4ff]">
                <input
                  type="checkbox"
                  checked={metadataEmbed}
                  onChange={(e) => setMetadataEmbed(e.target.checked)}
                  className="mt-0.5 rounded text-[#4b41e1]"
                />
                <div>
                  <div className="font-semibold text-[#001428]">
                    Métadonnées universitaires
                  </div>
                  <div className="text-[11px] text-[#74777e]">
                    Auteur, titre, école doctorale, mots-clés
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer hover:bg-[#eff4ff]">
                <input
                  type="checkbox"
                  checked={embedFonts}
                  onChange={(e) => setEmbedFonts(e.target.checked)}
                  className="mt-0.5 rounded text-[#4b41e1]"
                />
                <div>
                  <div className="font-semibold text-[#001428]">
                    Incorporation des polices
                  </div>
                  <div className="text-[11px] text-[#74777e]">
                    Empêche toute altération sur l'ordinateur du jury
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer hover:bg-[#eff4ff]">
                <input
                  type="checkbox"
                  checked={compressImages}
                  onChange={(e) => setCompressImages(e.target.checked)}
                  className="mt-0.5 rounded text-[#4b41e1]"
                />
                <div>
                  <div className="font-semibold text-[#001428]">
                    Optimisation des figures (300 DPI)
                  </div>
                  <div className="text-[11px] text-[#74777e]">
                    Haute netteté pour l'impression papier
                  </div>
                </div>
              </label>
            </div>

            {/* Master Compile Button */}
            <div className="pt-2">
              <button
                onClick={() => handleDownload('pdf')}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-[#4b41e1] hover:bg-[#645efb] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Compilation en cours (PDF/A-1b)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Générer mon document final</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Final Audit, Modification History, Jury Advice */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real-time Quality Gauge */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#001428] uppercase tracking-wider text-xs">
              Indice de conformité finale
            </h3>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-black text-[#00a270]">99.4%</div>
              <div className="text-xs text-[#43474d]">
                <div className="font-semibold text-[#001428]">Excellence typographique</div>
                <div>Approuvé pour soutenance de Master 2</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#e5eeff] text-xs">
              <div className="flex justify-between items-center text-[#43474d]">
                <span>Erreurs de style APA 7e</span>
                <span className="font-semibold text-[#00a270]">0 détectée</span>
              </div>
              <div className="flex justify-between items-center text-[#43474d]">
                <span>Hiérarchie des titres</span>
                <span className="font-semibold text-[#00a270]">100% conforme</span>
              </div>
              <div className="flex justify-between items-center text-[#43474d]">
                <span>Lignes orphelines & veuves</span>
                <span className="font-semibold text-[#00a270]">0 détectée</span>
              </div>
              <div className="flex justify-between items-center text-[#43474d]">
                <span>Marge de reliure d'impression</span>
                <span className="font-semibold text-[#00a270]">3.0 cm (Parfait)</span>
              </div>
            </div>
          </div>

          {/* Modification History Timeline */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5eeff] pb-2">
              <h3 className="font-bold text-xs text-[#001428] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#4b41e1]" />
                Historique des modifications
              </h3>
            </div>

            <div className="space-y-3">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className={`relative pl-4 border-l-2 text-xs space-y-1 transition-opacity ${
                    item.undone
                      ? 'border-gray-300 opacity-40 line-through'
                      : 'border-[#4b41e1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#001428]">{item.title}</span>
                    <span className="text-[10px] text-[#74777e] font-mono">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-[#43474d]">{item.description}</p>
                  {item.canUndo && !item.undone && (
                    <button
                      onClick={() => handleUndoHistory(item.id)}
                      className="text-[10px] font-semibold text-[#4b41e1] hover:underline flex items-center gap-1 pt-0.5"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Annuler cette modification
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setDownloadSuccessToast('Snapshot de sauvegarde généré.');
                setTimeout(() => setDownloadSuccessToast(null), 2500);
              }}
              className="w-full py-2 rounded-lg border border-[#c3c6ce] text-xs font-semibold text-[#001428] hover:bg-[#eff4ff] transition-colors"
            >
              Restaurer une version précédente du document
            </button>
          </div>

          {/* Jury Advice Card */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Conseil du jury de soutenance
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Prévoyez 3 exemplaires papier imprimés en recto-verso sur papier 90g avec reliure
              thermique collée (dos carré). Déposez la version numérique sur l'ENT au moins 15 jours
              avant la date de soutenance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
