import React from 'react';
import { NavigationTab } from '../types';
import { Download, SlidersHorizontal, User, Check, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  fileName: string;
  savedStatus: string;
  onOpenGuidelines?: () => void;
  onDownload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  fileName,
  savedStatus,
  onOpenGuidelines,
  onDownload,
}) => {
  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'import-et-analyse', label: 'Import & Analyse' },
    { id: 'editeur-ia', label: 'Éditeur IA' },
    { id: 'consignes-et-audit', label: 'Consignes & Audit' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5eeff] px-4 lg:px-6 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand + File info */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => setActiveTab('accueil')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#4b41e1] to-[#645efb] flex items-center justify-center text-white shadow-sm relative shrink-0">
              <span className="font-bold text-base tracking-tighter">M</span>
              <Sparkles className="w-2.5 h-2.5 absolute top-1 right-1 text-white/90" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-base tracking-tight text-[#001428] flex items-center gap-1.5">
                MémoireAI
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-sm bg-[#e5eeff] text-[#4b41e1] tracking-wider">
                  Pro
                </span>
              </div>
            </div>
          </button>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-[#dce9ff]" />

          {/* File Name & Auto-save Status */}
          <div className="hidden md:flex flex-col text-xs min-w-0">
            <span className="font-medium text-[#0b1c30] truncate max-w-[220px] lg:max-w-[280px]">
              {fileName}
            </span>
            <span className="text-[11px] text-[#00a270] flex items-center gap-1">
              <Check className="w-3 h-3 text-[#00a270]" />
              {savedStatus}
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#4b41e1] font-semibold shadow-2xs'
                    : 'text-[#43474d] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenGuidelines || (() => setActiveTab('consignes-et-audit'))}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c3c6ce] text-xs font-medium text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#43474d]" />
            <span className="hidden lg:inline">Consignes de mise en forme</span>
            <span className="lg:hidden">Consignes</span>
          </button>

          <button
            onClick={onDownload || (() => setActiveTab('export'))}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#001428] text-white text-xs font-medium hover:bg-[#0f2942] transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger</span>
          </button>

          {/* User profile */}
          <div className="w-8 h-8 rounded-full bg-[#e5eeff] border border-[#dce9ff] flex items-center justify-center text-[#4b41e1] shrink-0 font-semibold text-xs">
            <User className="w-4 h-4 text-[#43474d]" />
          </div>
        </div>
      </div>
    </header>
  );
};
