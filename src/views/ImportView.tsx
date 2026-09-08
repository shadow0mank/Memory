import React, { useState } from 'react';
import { NavigationTab, DocumentState } from '../types';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Clock,
  Terminal,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface ImportViewProps {
  documentState: DocumentState;
  setDocumentState: React.Dispatch<React.SetStateAction<DocumentState>>;
  setActiveTab: (tab: NavigationTab) => void;
}

export const ImportView: React.FC<ImportViewProps> = ({
  documentState,
  setDocumentState,
  setActiveTab,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(100);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file.name, `${(file.size / (1024 * 1024)).toFixed(1)} Mo`);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileSelected(file.name, `${(file.size / (1024 * 1024)).toFixed(1)} Mo`);
    }
  };

  const handleFileSelected = (name: string, size: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(20);
    setTimeout(() => setAnalysisProgress(55), 500);
    setTimeout(() => setAnalysisProgress(85), 1000);
    setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setDocumentState((prev) => ({
        ...prev,
        fileName: name,
        fileSize: size,
        lastSaved: "À l'instant",
      }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-xs font-semibold text-[#4b41e1] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Pipeline d'ingestion académique
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#001428] tracking-tight">
          Importation & Analyse initiale du document
        </h1>
        <p className="text-sm sm:text-base text-[#43474d] mt-1 max-w-3xl">
          Déposez votre fichier Word (.docx) ou PDF pour lancer l’analyse automatisée de la structure,
          de la hiérarchie des styles et de la conformité aux normes universitaires.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all bg-white ${
              isDragging
                ? 'border-[#4b41e1] bg-[#eff4ff]'
                : 'border-[#b0c9e8] hover:border-[#4b41e1]'
            }`}
          >
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#4b41e1] mb-4 shadow-inner">
                <UploadCloud className="w-8 h-8 text-[#4b41e1]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#001428]">
                Glissez-déposez votre mémoire ici
              </h3>
              <p className="text-xs sm:text-sm text-[#43474d] mt-1 mb-5">
                Formats acceptés : Microsoft Word (<span className="font-mono font-semibold">.docx</span>), PDF universitaire (<span className="font-mono font-semibold">.pdf</span>).
                <br />
                <span className="text-xs text-[#74777e]">Taille maximale conseillée : 50 Mo</span>
              </p>

              <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4b41e1] font-semibold text-xs sm:text-sm transition-colors border border-[#dce9ff]">
                <span>Parcourir vos fichiers locaux</span>
                <input
                  type="file"
                  accept=".docx,.doc,.pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Current File Telemetry Card */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#4b41e1] shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#001428]">
                    {documentState.fileName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#43474d] mt-1">
                    <span className="bg-[#f8f9ff] px-2 py-0.5 rounded border border-[#e5eeff]">
                      {documentState.fileSize}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-[#0b1c30]">
                      {documentState.pageCount} pages détectées
                    </span>
                    <span>•</span>
                    <span>42 entrées bibliographiques</span>
                    <span>•</span>
                    <span>118 citations analysées</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isAnalyzing ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    Analyse en cours ({analysisProgress}%)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a270]/10 text-[#00a270] text-xs font-semibold border border-[#00a270]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Analyse prête (100%)
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic 4-step Pipeline */}
            <div className="mt-6 pt-6 border-t border-[#e5eeff] space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#74777e]">
                Résultats du diagnostic automatique
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] text-xs">
                  <div className="flex items-center gap-2 text-[#0b1c30]">
                    <CheckCircle2 className="w-4 h-4 text-[#00a270]" />
                    <span className="font-medium">1. Extraction textuelle & métadonnées</span>
                  </div>
                  <span className="text-[#43474d] text-[11px]">
                    84 pages, 26 410 mots indexés
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] text-xs">
                  <div className="flex items-center gap-2 text-[#0b1c30]">
                    <CheckCircle2 className="w-4 h-4 text-[#00a270]" />
                    <span className="font-medium">2. Cartographie de la hiérarchie des titres</span>
                  </div>
                  <span className="text-[#43474d] text-[11px]">
                    5 chapitres, 19 sous-sections identifiées
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs">
                  <div className="flex items-center gap-2 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="font-medium">3. Audit typographique & marges</span>
                  </div>
                  <span className="text-amber-800 font-semibold text-[11px]">
                    6 anomalies détectées (polices disparates)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] text-xs">
                  <div className="flex items-center gap-2 text-[#0b1c30]">
                    <CheckCircle2 className="w-4 h-4 text-[#00a270]" />
                    <span className="font-medium">4. Synchronisation des citations & figures</span>
                  </div>
                  <span className="text-[#43474d] text-[11px]">
                    Norme APA 7e détectée (taux de conformité 82%)
                  </span>
                </div>
              </div>
            </div>

            {/* Micro-terminal logs */}
            <div className="mt-5 rounded-xl bg-[#001428] text-emerald-400 p-3.5 font-mono text-[11px] leading-relaxed overflow-x-auto">
              <div className="flex items-center gap-1.5 text-white/60 mb-2 border-b border-[#0f2942] pb-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Journal d'audit du moteur d'analyse typographique</span>
              </div>
              <p className="text-gray-400">
                [09:41:02] Initialisation du parseur OpenXML...
              </p>
              <p className="text-emerald-300">
                [09:41:03] Extraction des styles de paragraphes : Calibri 11pt, Times New Roman 12pt, Arial 14pt détectés.
              </p>
              <p className="text-amber-300">
                [09:41:05] Audit des marges : 2.5 cm partout. Marge intérieure de reliure à 3.0 cm absente.
              </p>
              <p className="text-emerald-300">
                [09:41:06] Synchronisation de l'arbre structurel terminée. Document prêt pour l'Éditeur IA.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setActiveTab('editeur-ia')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs sm:text-sm hover:bg-[#645efb] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Analyser le document et ouvrir l'éditeur</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <label className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#c3c6ce] text-center text-xs font-medium text-[#0b1c30] hover:bg-[#eff4ff] cursor-pointer transition-colors">
                <span>Remplacer ou changer de fichier</span>
                <input
                  type="file"
                  accept=".docx,.doc,.pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Rail Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: French academic standards */}
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 shadow-xs space-y-4">
            <div className="w-full h-40 rounded-xl bg-linear-to-br from-[#eff4ff] to-[#dce9ff] border border-[#b0c9e8] flex items-center justify-center overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgCaFDvRQErGQ3jGGlnAJPeGt0POwJ0IIeDcJJ3uc839UkF2AkkCt8bJZq8pKXVWrp7c8xrspMn4NxYbclsFQIiUWk0vRcRDsB3y14duiDdbXcna-uL8rInSJwLr03RfkCKoIfzArUFBaPglswox36lRw4iThpUb4ZsaUQX2CO_nbYer7uU0xqhfrRM9iyp2Yq4-eFUFeKcUWZmimuIX9nRSeYsMycg9mbjkidxkMVvPQwYy4Rxp_c"
                alt="Document académique universitaire"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // graceful fallback
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#001428]/60 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-semibold drop-shadow-xs">
                  Normes de l'Imprimerie Nationale & ABES
                </span>
              </div>
            </div>

            <h3 className="font-bold text-base text-[#001428]">
              Qualité académique certifiée
            </h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              MémoireAI applique automatiquement les conventions typographiques françaises :
              espaces insécables avant ponctuations doubles, majuscules accentuées et guillemets français (« »).
            </p>
          </div>

          {/* Card: Why docx */}
          <div className="rounded-2xl border border-[#e5eeff] bg-white p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#001428]">
              <HelpCircle className="w-4 h-4 text-[#4b41e1]" />
              Pourquoi privilégier le format .docx ?
            </div>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Le format OpenXML Word (.docx) conserve fidèlement les styles de paragraphes,
              les sections de saut de page pour la double pagination et les champs de sommaire dynamique.
            </p>
          </div>

          {/* Card: RGPD & Research Ethics */}
          <div className="rounded-2xl border border-[#00a270]/30 bg-[#00a270]/5 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00a270]">
              <ShieldCheck className="w-4 h-4 text-[#00a270]" />
              Confidentialité de recherche & RGPD
            </div>
            <p className="text-[11px] text-[#43474d] leading-relaxed">
              Vos travaux de recherche, données d'enquêtes et brevets potentiels restent
              strictement votre propriété. Aucune donnée n'est cédée ni exploitée pour l'entraînement d'IA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
