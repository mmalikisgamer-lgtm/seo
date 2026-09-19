import React from 'react';
import { Sparkles } from 'lucide-react';

interface AdPlaceholderProps {
  format: '728x90' | '300x250';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ format, className = '' }) => {
  if (format === '728x90') {
    return (
      <div
        id="ad-slot-728x90"
        className={`w-full max-w-[728px] mx-auto min-h-[90px] border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 p-3 flex flex-col items-center justify-center text-center transition-all ${className}`}
      >
        <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-500 mb-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>Advertisement Space</span>
        </div>
        <div className="text-xs text-slate-500 font-mono font-medium">
          Responsive Leaderboard Banner • 728 × 90
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Google AdSense / High-CTR Affiliate Partner Slot
        </p>
      </div>
    );
  }

  return (
    <div
      id="ad-slot-300x250"
      className={`w-full max-w-[300px] mx-auto min-h-[250px] border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 p-4 flex flex-col items-center justify-center text-center transition-all ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-500 mb-2">
        <Sparkles className="w-3 h-3 text-amber-600" />
        <span>Advertisement</span>
      </div>
      <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-2 font-mono font-semibold text-xs">
        300×250
      </div>
      <div className="text-xs text-slate-500 font-mono font-medium">
        Medium Rectangle Ad Space
      </div>
      <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
        Reserved for AdSense or Developer Tool Sponsorships
      </p>
    </div>
  );
};
