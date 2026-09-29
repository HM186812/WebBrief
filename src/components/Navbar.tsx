import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
            WB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900">
                WebBrief<span className="text-blue-600">.la</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200/70">
                Client Intake
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              ແບບຟອມເກັບກຳຂໍ້ມູນ ແລະ ຄວາມຕ້ອງການສ້າງເວັບໄຊ
            </p>
          </div>
        </div>

        {/* Right side status indicator */}
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-full border border-neutral-200/80 text-[11px] font-medium text-neutral-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ພ້ອມບັນທຶກຂໍ້ມູນ</span>
          </div>
        </div>
      </div>
    </header>
  );
};
