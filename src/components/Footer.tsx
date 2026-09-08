import React from 'react';
import { ShieldCheck, GraduationCap, FileCheck2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#e5eeff] bg-white text-[#43474d] text-xs py-8 px-4 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#4b41e1] text-white flex items-center justify-center font-bold text-xs">
            M
          </div>
          <div>
            <span className="font-semibold text-[#0b1c30]">MémoireAI</span> — Conforme aux chartes universitaires (APA 7e, Vancouver, Chicago, Sorbonne, Paris-Saclay).
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#00a270]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Conforme RGPD & Confidentialité de Recherche
          </span>
          <span className="flex items-center gap-1 text-[#4b41e1]">
            <GraduationCap className="w-3.5 h-3.5" />
            Vérifié par plus de 45 écoles doctorales
          </span>
          <span className="flex items-center gap-1 text-[#74777e]">
            <FileCheck2 className="w-3.5 h-3.5" />
            Format DOCX & PDF/A-1b certifié
          </span>
        </div>
      </div>
    </footer>
  );
};
