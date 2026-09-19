import React, { useState, useRef, useEffect } from 'react';
import { 
  Wrench, 
  ChevronDown, 
  Menu, 
  X, 
  Search,
  Sparkles
} from 'lucide-react';
import { ToolId } from '../types';
import { TOOLS_LIST } from '../data/toolsData';
import { ToolIcon } from './ToolIcon';

interface NavbarProps {
  currentTool: ToolId | 'home';
  onSelectTool: (tool: ToolId | 'home') => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSearchOpen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTool,
  onSelectTool,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              id="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
              aria-label="Toggle Navigation Sidebar"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              id="brand-logo-btn"
              onClick={() => onSelectTool('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">DevSEO</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    Pro Suite
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">SEO, Niche & Developer Hub</p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links & Tools Dropdown */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => onSelectTool('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentTool === 'home'
                  ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Overview
            </button>

            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-tools-dropdown-btn"
                onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isToolsMenuOpen || currentTool !== 'home'
                    ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-expanded={isToolsMenuOpen}
              >
                <span>Tools Directory ({TOOLS_LIST.length})</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToolsMenuOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in-50 duration-150 max-h-[75vh] overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Full Toolset ({TOOLS_LIST.length} Free Tools)
                  </div>
                  {TOOLS_LIST.map((tool) => (
                    <button
                      key={tool.id}
                      id={`nav-dropdown-${tool.id}`}
                      onClick={() => {
                        onSelectTool(tool.id);
                        setIsToolsMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                        currentTool === tool.id ? 'bg-indigo-50/60 font-semibold text-indigo-700' : ''
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
                        <ToolIcon id={tool.id} className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">{tool.title}</p>
                        <p className="text-[10px] text-slate-500 truncate">{tool.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links to primary categories */}
            <button
              id="nav-quick-niche-btn"
              onClick={() => onSelectTool('niche-evaluator')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Niche Evaluator
            </button>
            <button
              id="nav-quick-meta-btn"
              onClick={() => onSelectTool('meta-analyzer')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Meta Analyzer
            </button>
            <button
              id="nav-quick-json-btn"
              onClick={() => onSelectTool('json-formatter')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              JSON & Dev
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>16 Tools • 100% Free</span>
            </div>

            <button
              id="nav-search-all-btn"
              onClick={() => onSelectTool('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search Tools</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
