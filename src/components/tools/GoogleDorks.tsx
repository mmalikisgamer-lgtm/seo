import React, { useState, useMemo } from 'react';
import {
  Binary,
  Search,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Bookmark,
  Share2,
  FileSearch,
} from 'lucide-react';

interface DorkItem {
  id: string;
  category: 'Guest Posts' | 'Resource Pages' | 'Technical Audits' | 'Competitor Research';
  title: string;
  template: (keyword: string, domain: string) => string;
  explanation: string;
}

const DORK_TEMPLATES: DorkItem[] = [
  // 1. Guest Post Opportunities
  {
    id: 'gp-1',
    category: 'Guest Posts',
    title: 'Write For Us Footprint',
    template: (kw) => `"${kw}" "write for us"`,
    explanation: 'Finds authoritative blogs in your niche actively inviting guest contributors.',
  },
  {
    id: 'gp-2',
    category: 'Guest Posts',
    title: 'Guest Post Guidelines',
    template: (kw) => `"${kw}" ("guest post guidelines" OR "submit guest post")`,
    explanation: 'Discovers sites with explicit submission guidelines and editorial requirements.',
  },
  {
    id: 'gp-3',
    category: 'Guest Posts',
    title: 'Contribute To Our Site',
    template: (kw) => `"${kw}" inurl:contribute OR inurl:guest-post`,
    explanation: 'Finds dedicated URL slugs used specifically for editorial outreach and contributors.',
  },

  // 2. Resource Page Link Building
  {
    id: 'res-1',
    category: 'Resource Pages',
    title: 'Helpful Resource Links',
    template: (kw) => `"${kw}" (intitle:resources OR inurl:resources) "useful links"`,
    explanation: 'Targets curated link hubs where webmasters link out to high-quality niche tools.',
  },
  {
    id: 'res-2',
    category: 'Resource Pages',
    title: 'Best Tools Directory',
    template: (kw) => `"${kw}" "recommended tools" OR "favorite resources"`,
    explanation: 'Locates roundup recommendation pages eager to feature relevant software.',
  },

  // 3. Technical & Indexation Audits
  {
    id: 'tech-1',
    category: 'Technical Audits',
    title: 'Non-HTTPS Indexation Leak',
    template: (_, dom) => `site:${dom || 'example.com'} -inurl:https`,
    explanation: 'Checks if Google has indexed insecure HTTP pages that should redirect to HTTPS.',
  },
  {
    id: 'tech-2',
    category: 'Technical Audits',
    title: 'Indexed PDF & Documents',
    template: (_, dom) => `site:${dom || 'example.com'} (filetype:pdf OR filetype:doc OR filetype:xls)`,
    explanation: 'Identifies leaked whitepapers, internal PDFs, or spreadsheets visible in SERPs.',
  },
  {
    id: 'tech-3',
    category: 'Technical Audits',
    title: 'Unintended Staging / Admin Pages',
    template: (_, dom) => `site:${dom || 'example.com'} (inurl:staging OR inurl:test OR inurl:wp-admin)`,
    explanation: 'Detects dev environments or login portals exposed to search crawlers.',
  },

  // 4. Competitor & Unlinked Mentions
  {
    id: 'comp-1',
    category: 'Competitor Research',
    title: 'Competitor Mention Footprint',
    template: (kw, dom) => `"${kw}" -site:${dom || 'yourbrand.com'}`,
    explanation: 'Tracks discussions, reviews, and community threads about a topic excluding your site.',
  },
  {
    id: 'comp-2',
    category: 'Competitor Research',
    title: 'Product Reviews & Comparisons',
    template: (kw) => `"${kw}" ("vs" OR "review" OR "alternative") -site:amazon.com`,
    explanation: 'Finds independent affiliate reviews and head-to-head comparison roundups.',
  },
];

export const GoogleDorks: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('seo tools');
  const [domain, setDomain] = useState<string>('example.com');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Guest Posts', 'Resource Pages', 'Technical Audits', 'Competitor Research'];

  const filteredDorks = useMemo(() => {
    return DORK_TEMPLATES.filter((d) => selectedCategory === 'All' || d.category === selectedCategory);
  }, [selectedCategory]);

  const handleCopyQuery = (query: string, id: string) => {
    navigator.clipboard.writeText(query);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLaunchGoogle = (query: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Advanced SEO Footprints
              </span>
              <span className="text-xs text-slate-500 font-medium">Google Dorks Engine</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Google Search Operators (SEO Dork) Builder</h1>
            <p className="text-sm text-slate-600 mt-1">
              Construct high-precision Google search queries (`site:`, `inurl:`, `intitle:`, `"write for us"`) for guest posts, backlink prospecting, and site audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setKeyword('fitness equipment');
                setDomain('roguefitness.com');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Preset: Fitness
            </button>
            <button
              onClick={() => {
                setKeyword('crypto wallet');
                setDomain('coinbase.com');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Preset: Crypto
            </button>
          </div>
        </div>

        {/* Input parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Keyword / Niche
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. email marketing, coffee grinder, web hosting"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-500 outline-none bg-white font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Domain (For Site Audits & Competitors)
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. example.com or competitor.com"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-500 outline-none bg-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Query Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDorks.map((item) => {
          const generatedQuery = item.template(keyword, domain);

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{item.title}</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.explanation}
                </p>

                {/* Query Display Box */}
                <div className="mt-3 p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl break-all shadow-inner select-all">
                  {generatedQuery}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleCopyQuery(generatedQuery, item.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy Query'}</span>
                </button>

                <button
                  onClick={() => handleLaunchGoogle(generatedQuery)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                >
                  <span>Search on Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
