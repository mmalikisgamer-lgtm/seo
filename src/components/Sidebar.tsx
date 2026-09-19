import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  ChevronRight,
  Zap,
} from 'lucide-react';
import { ToolId, ToolCategory } from '../types';
import { TOOLS_LIST } from '../data/toolsData';
import { ToolIcon } from './ToolIcon';
import { AdPlaceholder } from './AdPlaceholder';

interface SidebarProps {
  currentTool: ToolId | 'home';
  onSelectTool: (tool: ToolId | 'home') => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTool,
  onSelectTool,
  isMobileOpen,
  onCloseMobile,
}) => {
  const handleToolClick = (tool: ToolId | 'home') => {
    onSelectTool(tool);
    onCloseMobile();
  };

  const categories: ToolCategory[] = [
    'SEO Tools',
    'Niche Research',
    'Developer Utilities',
    'Performance',
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-5">
          {/* Main Navigation */}
          <div>
            <button
              id="sidebar-item-home"
              onClick={() => handleToolClick('home')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentTool === 'home'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-slate-500" />
                <span>All Tools Directory</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Grouped Tools by Category */}
          {categories.map((cat) => {
            const catTools = TOOLS_LIST.filter((t) => t.category === cat);
            if (!catTools.length) return null;

            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between px-2 mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {cat}
                  </span>
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono font-medium">
                    {catTools.length}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {catTools.map((tool) => {
                    const isActive = currentTool === tool.id;
                    return (
                      <button
                        key={tool.id}
                        id={`sidebar-tool-${tool.id}`}
                        onClick={() => handleToolClick(tool.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all text-left group ${
                          isActive
                            ? 'bg-indigo-600 text-white font-medium shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`p-1 rounded-md transition-colors ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                            }`}
                          >
                            <ToolIcon id={tool.id} className="w-3.5 h-3.5" />
                          </div>
                          <span className="truncate font-medium">{tool.title}</span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white ml-2 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Strategic 300x250 Ad Placeholder in Sidebar */}
          <div className="pt-2">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-1.5">
              Sponsor Spot
            </div>
            <AdPlaceholder format="300x250" />
          </div>

          {/* Platform Performance Guarantee */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Core Web Vitals Ready</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Strict client/server boundaries for instant rendering, zero log collection, and SEO optimization.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free & Privacy Respecting</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

