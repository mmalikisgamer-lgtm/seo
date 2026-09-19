import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  Image as ImageIcon, 
  Heading1, 
  Heading2, 
  Sparkles, 
  Share2, 
  Eye, 
  Clock, 
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { MetaTagAnalysisResult } from '../../types';
import { AdPlaceholder } from '../AdPlaceholder';

const DEMO_URLS = [
  'https://example.com',
  'https://wikipedia.org',
  'https://news.ycombinator.com',
];

export const MetaTagAnalyzer: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MetaTagAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'serp' | 'headings' | 'images'>('overview');

  const handleAnalyze = async (targetUrl?: string) => {
    const urlToTest = (targetUrl || urlInput).trim();
    if (!urlToTest) {
      setError('Please enter a website URL to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    if (targetUrl) {
      setUrlInput(targetUrl);
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToTest }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze meta tags. Please check the URL.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Network error occurred while analyzing target URL.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: 'optimal' | 'suboptimal' | 'missing', length: number, ideal: string) => {
    if (status === 'optimal') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Optimal ({length} chars)</span>
        </span>
      );
    }
    if (status === 'suboptimal') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Needs Attention ({length} chars • Ideal: {ideal})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
        <XCircle className="w-3.5 h-3.5" />
        <span>Missing (Ideal: {ideal})</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                Live Crawler & Cheerio Parser
              </span>
              <span className="text-xs text-slate-500">Google SERP Best Practices</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">On-Page Meta Tag Analyzer</h2>
            <p className="text-sm text-slate-600 mt-1">
              Inspect on-page SEO meta elements: Title, Meta Description, H1/H2 header hierarchy, and image alt tags.
            </p>
          </div>
        </div>

        {/* URL Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="mt-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="meta-analyzer-url-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter URL to audit (e.g., https://example.com or wikipedia.org)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xs"
              />
            </div>
            <button
              id="btn-analyze-url"
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Crawling URL...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Analyze Meta Tags</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo URLs */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-600">Quick Test Samples:</span>
            {DEMO_URLS.map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() => handleAnalyze(demo)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-mono"
              >
                {demo.replace('https://', '')}
              </button>
            ))}
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Analysis Failed</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Strategic Leaderboard Ad Space */}
      <AdPlaceholder format="728x90" />

      {/* Analysis Results View */}
      {result && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Top Score & Summary Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold text-xl border ${
                  result.overallScore >= 80
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : result.overallScore >= 50
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                <span>{result.overallScore}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Score</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{result.domain}</h3>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600"
                    title="Visit site in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate max-w-md">{result.url}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {result.responseTime} ms response
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    HTTP {result.statusCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs for Analysis */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-xl">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'overview' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Meta Overview
              </button>
              <button
                onClick={() => setActiveTab('serp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'serp' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SERP & Social Preview
              </button>
              <button
                onClick={() => setActiveTab('headings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'headings' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                H1 & H2 Headings ({result.headings.h1Count + result.headings.h2Count})
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'images' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Images & Alt Tags ({result.images.total})
              </button>
            </div>
          </div>

          {/* TAB 1: Overview with Color-coded Cards */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Title Tag Card */}
              <div
                className={`p-5 rounded-2xl bg-white border transition-all ${
                  result.meta.titleStatus === 'optimal'
                    ? 'border-emerald-200'
                    : result.meta.titleStatus === 'suboptimal'
                    ? 'border-amber-200'
                    : 'border-red-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Title Tag</span>
                    {getStatusBadge(result.meta.titleStatus, result.meta.titleLength, '50-60 chars')}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {result.meta.titleLength} / 60 characters
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-800 break-words">
                  {result.meta.title || <span className="text-red-500 italic">No &lt;title&gt; tag found!</span>}
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  The title tag is one of the most critical on-page ranking signals. Google generally displays the first 50–60 characters before truncating.
                </p>
              </div>

              {/* Meta Description Card */}
              <div
                className={`p-5 rounded-2xl bg-white border transition-all ${
                  result.meta.descriptionStatus === 'optimal'
                    ? 'border-emerald-200'
                    : result.meta.descriptionStatus === 'suboptimal'
                    ? 'border-amber-200'
                    : 'border-red-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Meta Description</span>
                    {getStatusBadge(result.meta.descriptionStatus, result.meta.descriptionLength, '120-165 chars')}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {result.meta.descriptionLength} / 165 characters
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-800 break-words leading-relaxed">
                  {result.meta.description || (
                    <span className="text-red-500 italic">No Meta Description tag specified!</span>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  A compelling meta description between 120 and 165 characters boosts click-through rate (CTR) directly from the search engine result pages.
                </p>
              </div>

              {/* Metadata Grid (Canonical, Robots, Charset, Viewport) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Canonical Tag</span>
                  <p className="mt-1 text-xs font-mono text-slate-800 truncate" title={result.meta.canonical || 'None'}>
                    {result.meta.canonical || 'Missing / Self'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Robots Directives</span>
                  <p className="mt-1 text-xs font-mono text-slate-800 truncate">
                    {result.meta.robots}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Character Encoding</span>
                  <p className="mt-1 text-xs font-mono text-slate-800">
                    {result.meta.charset}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Mobile Viewport</span>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    {result.meta.viewport}
                  </p>
                </div>
              </div>

              {/* Actionable Recommendations List */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Audit Diagnostics & Checklist</span>
                </h4>
                <div className="space-y-2">
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                        issue.type === 'success'
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                          : issue.type === 'warning'
                          ? 'bg-amber-50/50 border-amber-200 text-amber-800'
                          : 'bg-red-50/50 border-red-200 text-red-800'
                      }`}
                    >
                      {issue.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : issue.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span>{issue.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERP & Social Preview */}
          {activeTab === 'serp' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Google SERP Snippet Preview */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">Google Search Result Preview</h4>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-white font-sans max-w-lg shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      {result.domain.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-700 truncate">
                      {result.domain}
                    </div>
                  </div>
                  <h3 className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug break-words">
                    {result.meta.title || result.domain}
                  </h3>
                  <p className="mt-1 text-xs text-[#4d5156] leading-relaxed break-words line-clamp-2">
                    {result.meta.description || 'No description available for this result.'}
                  </p>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Simulated preview of how your page appears on Google Desktop Search.
                </p>
              </div>

              {/* Social OpenGraph Preview Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">Social OpenGraph Card Preview</h4>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 max-w-lg shadow-2xs">
                  {result.social.ogImage ? (
                    <img
                      src={result.social.ogImage}
                      alt="OpenGraph visual"
                      className="w-full h-40 object-cover border-b border-slate-200"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-28 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                      No og:image tag found
                    </div>
                  )}
                  <div className="p-4 bg-white">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {result.domain}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                      {result.social.ogTitle || result.meta.title || result.domain}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {result.social.ogDescription || result.meta.description || 'No social description provided.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Headings Structure (H1 and H2) */}
          {activeTab === 'headings' && (
            <div className="space-y-5">
              {/* H1 Tags */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heading1 className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      H1 Headings ({result.headings.h1Count})
                    </h4>
                  </div>
                  {result.headings.h1Count === 1 ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Good: Exactly 1 H1 Tag
                    </span>
                  ) : result.headings.h1Count === 0 ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                      Missing: 0 H1 Tags
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                      Multiple ({result.headings.h1Count} H1 tags detected)
                    </span>
                  )}
                </div>

                {result.headings.h1Items.length === 0 ? (
                  <p className="text-xs text-red-500 italic p-3 bg-red-50 rounded-xl">
                    No &lt;h1&gt; tags were found in the HTML source.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {result.headings.h1Items.map((h1, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
                        &lt;h1&gt; {h1}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* H2 Tags */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heading2 className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      H2 Subheadings ({result.headings.h2Count})
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500">
                    Content topical breakdown
                  </span>
                </div>

                {result.headings.h2Items.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                    No &lt;h2&gt; tags detected.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.headings.h2Items.map((h2, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 truncate">
                        &lt;h2&gt; {h2}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Images & Missing Alt Attributes */}
          {activeTab === 'images' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Images Alt Attribute Audit
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                    Total: {result.images.total}
                  </span>
                  {result.images.missingAltCount === 0 ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      100% Alt Coverage
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                      {result.images.missingAltCount} missing alt
                    </span>
                  )}
                </div>
              </div>

              {result.images.missingAltCount === 0 ? (
                <div className="p-6 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-emerald-800">All images have alt tags!</p>
                  <p className="text-xs text-emerald-600 mt-1">
                    Great for screen readers, web accessibility (WCAG 2.1), and Google Image search ranking.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600">
                    Search engine crawlers and screen readers rely on descriptive alt text. Here are images missing an alt attribute:
                  </p>
                  <div className="space-y-2">
                    {result.images.missingAltSample.map((img, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs font-mono"
                      >
                        <span className="text-slate-800 truncate flex-1">{img.src}</span>
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-semibold whitespace-nowrap">
                          Missing Alt
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
