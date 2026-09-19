import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Cpu, 
  X
} from 'lucide-react';
import { ToolId, ToolItem } from '../types';
import { TOOLS_LIST } from '../data/toolsData';
import { ToolIcon } from './ToolIcon';
import { AdPlaceholder } from './AdPlaceholder';

interface DashboardGridProps {
  onSelectTool: (id: ToolId) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ onSelectTool }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'SEO Tools', 'Niche Research', 'Developer Utilities', 'Performance'];

  const filteredTools = useMemo(() => {
    return TOOLS_LIST.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>High-Performance Free Developer & SEO Toolset</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Supercharge Your Workflow with Instant Web Utilities
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Fast, privacy-conscious tools for search marketers, front-end engineers, and website owners.
          Zero registrations, zero paywalls.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="tool-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a tool (e.g. meta tags, keywords, minifier, speed test)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Strategic Leaderboard Ad Space (728x90) */}
      <AdPlaceholder format="728x90" />

      {/* Grid of Tool Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {selectedCategory === 'All' ? 'All Utilities' : selectedCategory}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredTools.length} of {TOOLS_LIST.length} tools
          </span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No tools found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                id={`card-tool-${tool.id}`}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform text-indigo-600">
                      <ToolIcon id={tool.id} className="w-6 h-6" />
                    </div>
                    {tool.badge && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{tool.category}</span>
                  <button
                    id={`open-tool-btn-${tool.id}`}
                    onClick={() => onSelectTool(tool.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-all group/btn"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Performance & Value Proposition highlights */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Zero Latency Processing</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Text deduplication and code minification run locally in your browser with no remote roundtrips.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Privacy First</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your source codes and confidential keyword databases remain securely on your client machine.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Monetization Ready</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Built with standardized non-intrusive AdSense banner slots that preserve Core Web Vitals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
