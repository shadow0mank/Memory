import React from 'react';
import { NavigationTab } from '../types';
import {
  Sparkles,
  ArrowRight,
  Play,
  FileCheck2,
  SlidersHorizontal,
  Download,
  BookOpen,
  LayoutTemplate,
  Hash,
  Ruler,
  AlignLeft,
  ListOrdered,
  Quote,
  Split,
  Image,
  ShieldAlert,
  FileText,
  Bot,
  CheckCircle2,
  Star,
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const steps = [
    {
      num: '01',
      icon: <FileCheck2 className="w-6 h-6 text-[#4b41e1]" />,
      title: '1. Déposez votre manuscrit',
      desc: 'Importez votre document Word (.docx) ou texte brut. Aucune préparation complexe n’est requise.',
    },
    {
      num: '02',
      icon: <SlidersHorizontal className="w-6 h-6 text-[#4b41e1]" />,
      title: '2. Choisissez votre université',
      desc: 'Sélectionnez votre charte (APA 7e, Sorbonne, Paris-Saclay, Sciences Po, EPFL...) ou personnalisez vos règles.',
    },
    {
      num: '03',
      icon: <Download className="w-6 h-6 text-[#4b41e1]" />,
      title: '3. Exportez votre mémoire parfait',
      desc: 'Téléchargez un document DOCX ou PDF/A-1b 100% conforme, prêt pour l’impression et le dépôt officiel sur votre ENT.',
    },
  ];

  const features = [
    {
      icon: <Hash className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Hiérarchie des titres',
      desc: 'Numérotation décimale automatique (1.1, 1.1.1) avec sauts de page automatiques pour les chapitres.',
    },
    {
      icon: <ListOrdered className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Pagination double',
      desc: 'Chiffres romains (i, ii, iii) pour les pages liminaires et chiffres arabes (1, 2...) dès l’introduction.',
    },
    {
      icon: <Ruler className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Marges universitaires',
      desc: 'Marge de reliure à 3 cm et marges extérieures normalisées à 2.5 cm pour une reliure impeccable.',
    },
    {
      icon: <AlignLeft className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Interligne & Alinéas',
      desc: 'Interligne standard 1.5, texte justifié et retrait systématique de première ligne à 1.25 cm.',
    },
    {
      icon: <LayoutTemplate className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Table des matières & figures',
      desc: 'Génération dynamique synchronisée avec les numéros de page réels et les styles de titres.',
    },
    {
      icon: <Quote className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Styles de citations APA 7e',
      desc: 'Formatage automatisé des citations dans le texte (Auteur, Année) et bibliographie indentée.',
    },
    {
      icon: <Split className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Veuves & Orphelines',
      desc: 'Élimination algorithmique des lignes isolées en début ou fin de page pour une lecture continue.',
    },
    {
      icon: <Image className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Légendes des tableaux & figures',
      desc: 'Numérotation continue, police spécifique et alignement centré avec mention des sources.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Page de garde officielle',
      desc: 'Gabarit prêt à l’emploi avec emplacement pour logo d’établissement, jury et année académique.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#00a270]" />,
      title: 'Audit & Détection d’anomalies',
      desc: 'Scan en temps réel identifiant polices divergentes, espacements non conformes et styles orphelins.',
    },
    {
      icon: <FileText className="w-5 h-5 text-[#4b41e1]" />,
      title: 'Export Word & PDF/A-1b',
      desc: 'Fichiers archivables conformes aux spécifications CINES et ABES pour le dépôt électronique.',
    },
    {
      icon: <Bot className="w-5 h-5 text-[#645efb]" />,
      title: 'Assistant IA conversationnel',
      desc: 'Demandez des ajustements en langage naturel : « Passe tous les sous-titres en gras et justifie le texte ».',
    },
  ];

  const universities = [
    'Université Paris-Saclay',
    'Sorbonne Université',
    'Sciences Po',
    'EPFL Lausanne',
    'Université de Genève',
    'HEC Paris',
    'UCLouvain',
    'Aix-Marseille Université',
  ];

  const testimonials = [
    {
      name: 'Camille L.',
      role: 'Master 2 Droit Public • Sorbonne Université',
      text: 'J’ai gagné au moins 3 nuits de sommeil avant la date butoir. Mon document de 95 pages a été mis en conformité avec la charte de l’école doctorale en 4 minutes chrono.',
      score: 5,
    },
    {
      name: 'Alexandre R.',
      role: 'Doctorant en Neurosciences • Paris-Saclay',
      text: 'La gestion de la double pagination (romaine pour les remerciements et arabe dès l’intro) ainsi que l’alignement des figures APA m’ont évité les reproches du jury.',
      score: 5,
    },
    {
      name: 'Manon D.',
      role: 'Master 2 Affaires Européennes • Sciences Po',
      text: 'L’audit en direct est exceptionnel : il a repéré 6 polices différentes et des marges asymétriques oubliées par mon correcteur. Mention Très Bien obtenue !',
      score: 5,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Announcement Banner */}
      <div className="bg-[#eff4ff] border-b border-[#dce9ff] py-2 px-4 text-center">
        <p className="text-xs sm:text-sm font-medium text-[#4b41e1] flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4b41e1] animate-pulse" />
          <span>Charte 2025/2026 mise à jour : APA 7e, Sorbonne, Paris-Saclay, Sciences Po et gabarits personnalisés disponibles</span>
        </p>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#4b41e1] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00a270]" />
          L’outil d’ingénierie typographique universitaire #1 en France
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#001428] max-w-4xl mx-auto leading-[1.15]">
          La mise en forme de votre mémoire universitaire,{' '}
          <span className="text-[#4b41e1] underline decoration-[#dce9ff] decoration-wavy">
            automatisée et sans stress
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#43474d] max-w-3xl mx-auto leading-relaxed">
          Importez votre document Word ou PDF. Notre moteur intelligent applique rigoureusement
          la charte de votre établissement : typographie, marges de reliure, hiérarchie des titres,
          double pagination et bibliographie en quelques secondes.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => setActiveTab('import-et-analyse')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#001428] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#0f2942] transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <span>Commencer mon mémoire</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('editeur-ia')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#c3c6ce] bg-white text-[#0b1c30] font-medium text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#eff4ff] transition-all"
          >
            <Play className="w-4 h-4 text-[#4b41e1] fill-[#4b41e1]" />
            <span>Voir une démonstration interactive</span>
          </button>
        </div>

        {/* Rating proof */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#43474d]">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-semibold text-[#0b1c30]">4.9/5</span>
          <span>sur plus de 12 400 mémoires et thèses analysés</span>
        </div>

        {/* Hero Interactive UI Preview Card */}
        <div className="mt-12 rounded-2xl border border-[#dce9ff] bg-white shadow-xl overflow-hidden text-left max-w-5xl mx-auto">
          {/* Mockup Title bar */}
          <div className="bg-[#001428] text-white px-4 py-3 flex items-center justify-between border-b border-[#0f2942]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-white/80 truncate">
                MémoireAI Workspace — Mémoire_Fin_Etudes_Master2_v3.docx (APA 7e)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Conformité 99.4%
              </span>
            </div>
          </div>

          {/* Mockup Body Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#f8f9ff] min-h-[380px]">
            {/* Left rail mockup */}
            <div className="hidden md:block md:col-span-3 border-r border-[#e5eeff] p-4 bg-white text-xs space-y-3">
              <div className="font-semibold text-[#0b1c30] uppercase text-[10px] tracking-wider text-[#74777e]">
                Plan du document
              </div>
              <div className="space-y-1.5 font-medium">
                <div className="p-1.5 rounded text-[#43474d] hover:bg-[#eff4ff] cursor-pointer">
                  1. Introduction générale <span className="float-right text-gray-400">p. 1</span>
                </div>
                <div className="p-1.5 rounded bg-[#eff4ff] text-[#4b41e1] font-semibold border-l-2 border-[#4b41e1]">
                  2. Cadre conceptuel <span className="float-right text-[#4b41e1]">p. 14</span>
                </div>
                <div className="pl-4 py-1 text-xs text-[#43474d]">
                  2.1 Les modèles d'attention <span className="float-right text-gray-400">p. 18</span>
                </div>
                <div className="pl-4 py-1 text-xs text-[#43474d]">
                  2.2 Analyse comparative <span className="float-right text-gray-400">p. 24</span>
                </div>
                <div className="p-1.5 rounded text-[#43474d] hover:bg-[#eff4ff] cursor-pointer">
                  3. Méthodologie expérimentale <span className="float-right text-gray-400">p. 31</span>
                </div>
              </div>
              <div className="pt-4 border-t border-[#e5eeff]">
                <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[11px] text-[#4b41e1]">
                  <p className="font-semibold">Charte active :</p>
                  <p className="text-[#43474d]">Univ. Paris-Saclay (2025)</p>
                </div>
              </div>
            </div>

            {/* Central A4 sheet mockup */}
            <div className="col-span-12 md:col-span-6 p-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-[420px] bg-white border border-[#c3c6ce] rounded shadow-md p-6 font-serif text-[11px] leading-relaxed relative">
                <div className="text-center text-[9px] text-[#74777e] border-b border-gray-200 pb-1 mb-3">
                  Université Paris-Saclay — Faculté des Sciences • Master 2 Informatique
                </div>
                <h3 className="font-bold text-sm text-[#001428] mb-2 font-sans">
                  Chapitre 2 : Modèles d'apprentissage profond et mécanismes d'attention
                </h3>
                <p className="text-gray-700 indent-4 mb-3 text-justify">
                  Dans les architectures neuronales récentes, le mécanisme d'attention introduit par
                  Vaswani et al. (2017) a profondément transformé le traitement du langage naturel.
                  Cette section explicite la formulation mathématique du produit scalaire mis à l'échelle.
                </p>
                <div className="p-2 rounded bg-[#f8f9ff] border border-dashed border-[#b0c9e8] text-center my-2 text-[10px] text-[#4b41e1] font-mono">
                  [Figure 2.1 — Architecture multi-têtes normalisée APA 7e]
                </div>
                <div className="text-right text-[9px] text-[#74777e] pt-2 border-t border-gray-100">
                  Page 24
                </div>
              </div>
            </div>

            {/* Right assistant mockup */}
            <div className="hidden md:block md:col-span-3 border-l border-[#e5eeff] p-4 bg-white text-xs space-y-3">
              <div className="flex items-center gap-1.5 font-semibold text-[#4b41e1] text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#4b41e1]" />
                Assistant IA Mémoire
              </div>
              <div className="p-2.5 rounded-lg bg-[#eff4ff] text-[11px] space-y-1.5 border border-[#dce9ff]">
                <p className="font-medium text-[#0b1c30]">Correction de conformité :</p>
                <p className="text-[#43474d]">
                  Le titre du chapitre 2 utilisait la police Calibri 14pt. Il a été reformaté en
                  <strong> Arial 16pt Gras</strong> conformément au guide Paris-Saclay.
                </p>
                <div className="flex gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-[#4b41e1] text-white text-[10px]">
                    Appliqué ✓
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('editeur-ia')}
                className="w-full py-2 rounded-lg bg-[#001428] text-white text-xs font-medium hover:bg-[#0f2942] transition-colors"
              >
                Ouvrir dans l'éditeur
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - 3 steps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#001428]">
            Comment fonctionne MémoireAI ?
          </h2>
          <p className="text-[#43474d] text-sm sm:text-base mt-2">
            Trois étapes simples pour transformer un brouillon en mémoire irréprochable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#e5eeff] shadow-xs hover:shadow-md transition-all relative group"
            >
              <div className="text-3xl font-black text-[#dce9ff] mb-4">{step.num}</div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#001428] mb-2">{step.title}</h3>
              <p className="text-sm text-[#43474d] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12 Academic Strict Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-xs font-semibold text-[#4b41e1] mb-3">
            Conformité totale
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#001428]">
            Conçu selon les standards académiques les plus stricts
          </h2>
          <p className="text-[#43474d] text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Chaque paramètre typographique et structurel répond aux exigences des jurys de Master,
            Doctorat et HDR.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-[#e5eeff] hover:border-[#b0c9e8] transition-all hover:shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#eff4ff] shrink-0">{feat.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-[#001428] mb-1">{feat.title}</h3>
                  <p className="text-xs text-[#43474d] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Universities Trust Logos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="p-8 rounded-2xl bg-linear-to-b from-[#eff4ff] to-[#f8f9ff] border border-[#dce9ff] text-center">
          <p className="text-xs uppercase font-semibold text-[#74777e] tracking-widest mb-6">
            Utilisé par les étudiants et chercheurs des plus grands établissements
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {universities.map((uni, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-lg bg-white border border-[#dce9ff] text-xs sm:text-sm font-semibold text-[#0b1c30] shadow-2xs"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#001428]">
            Ils ont réussi leur soutenance
          </h2>
          <p className="text-[#43474d] text-sm sm:text-base mt-2">
            Retours d'expérience vérifiés d'étudiants ayant validé leur mémoire avec MémoireAI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#e5eeff] flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(test.score)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#0b1c30] italic leading-relaxed mb-6">
                  « {test.text} »
                </p>
              </div>
              <div className="border-t border-[#eff4ff] pt-4">
                <div className="font-semibold text-sm text-[#001428]">{test.name}</div>
                <div className="text-xs text-[#74777e]">{test.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <div className="rounded-3xl bg-[#001428] text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Prêt à déposer un mémoire d’une qualité professionnelle ?
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              Ne laissez pas des erreurs de pagination ou de typographie pénaliser des mois de travail acharné.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab('import-et-analyse')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#4b41e1] text-white font-medium text-sm sm:text-base hover:bg-[#645efb] transition-all shadow-md active:scale-98"
              >
                Analyser mon mémoire gratuitement
              </button>
              <button
                onClick={() => setActiveTab('consignes-et-audit')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white font-medium text-sm sm:text-base hover:bg-white/20 transition-all"
              >
                Consulter les règles de conformité
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
