import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Search,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ChainItem {
  url: string;
  status: number;
  statusText: string;
  location?: string;
}

interface HeaderCheckResult {
  originalUrl: string;
  finalUrl: string;
  isRedirected: boolean;
  totalHops: number;
  totalTimeMs: number;
  chain: ChainItem[];
  headers: Record<string, string>;
  securityAnalysis: {
    hasHsts: boolean;
    hstsValue: string | null;
    hasXRobotsTag: boolean;
    xRobotsTag: string | null;
    hasCsp: boolean;
    hasXFrameOptions: boolean;
    server: string;
    contentType: string;
    cacheControl: string;
  };
}

export const RedirectChecker: React.FC = () => {
  const [url, setUrl] = useState('http://github.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HeaderCheckResult | null>(null);
  const [headerFilter, setHeaderFilter] = useState('');

  const handleCheck = async (targetUrl?: string) => {
    const urlToCheck = (targetUrl || url).trim();
    if (!urlToCheck) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/check-headers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToCheck }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to inspect headers.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Connection error while inspecting headers.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status >= 300 && status < 400) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (status >= 400 && status < 500) return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-purple-50 text-purple-700 border-purple-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Technical SEO & HTTP Headers
              </span>
              <span className="text-xs text-slate-500 font-medium">Redirect Chain Audit</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">HTTP Status & Redirect Chain Checker</h1>
            <p className="text-sm text-slate-600 mt-1">
              Test HTTP status codes (200, 301, 302, 404), follow redirect hops, and verify critical SEO and security headers like X-Robots-Tag and HSTS.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setUrl('http://github.com');
                handleCheck('http://github.com');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Test GitHub 301
            </button>
            <button
              onClick={() => {
                setUrl('https://example.com');
                handleCheck('https://example.com');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Test Example 200
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck();
          }}
          className="mt-6 flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (e.g. http://example.com or https://mysite.com/old-page)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRightLeft className="w-4 h-4" />}
            <span>{loading ? 'Inspecting...' : 'Check Status'}</span>
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Final HTTP Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-lg font-bold px-2.5 py-0.5 rounded-lg border font-mono ${getStatusColor(
                    result.chain[result.chain.length - 1]?.status || 200
                  )}`}
                >
                  {result.chain[result.chain.length - 1]?.status}{' '}
                  {result.chain[result.chain.length - 1]?.statusText}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Redirect Hops</span>
              <div className="text-xl font-bold text-slate-900 mt-1">
                {result.isRedirected ? `${result.totalHops - 1} Redirects` : 'Direct (0 Hops)'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Response Time</span>
              <div className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>{result.totalTimeMs} ms</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Server Software</span>
              <div className="text-base font-bold text-slate-800 mt-1 truncate">
                {result.securityAnalysis.server}
              </div>
            </div>
          </div>

          {/* Visual Redirect Chain */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Redirect Path Execution Chain
            </h2>

            <div className="space-y-3">
              {result.chain.map((hop, idx) => {
                const isLast = idx === result.chain.length - 1;
                return (
                  <div key={idx} className="relative">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <span className="font-mono text-xs font-semibold text-slate-900 truncate block">
                            {hop.url}
                          </span>
                          {hop.location && (
                            <span className="text-[11px] text-slate-500 truncate block mt-0.5">
                              ↳ Redirects to: <span className="font-mono text-indigo-600">{hop.location}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono border ${getStatusColor(
                            hop.status
                          )}`}
                        >
                          {hop.status} {hop.statusText}
                        </span>
                      </div>
                    </div>

                    {!isLast && (
                      <div className="w-0.5 h-3 bg-slate-300 mx-auto my-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security & SEO Header Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                SEO & Indexing Headers
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-700">X-Robots-Tag Directive:</span>
                  {result.securityAnalysis.hasXRobotsTag ? (
                    <span className="font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {result.securityAnalysis.xRobotsTag}
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium">None (Standard index, follow)</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-700">Content-Type:</span>
                  <span className="font-mono text-slate-700 font-semibold truncate max-w-[200px]">
                    {result.securityAnalysis.contentType}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-700">Cache-Control:</span>
                  <span className="font-mono text-slate-700 truncate max-w-[200px]">
                    {result.securityAnalysis.cacheControl}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                HTTPS & Security Headers
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-700">HSTS (Strict-Transport-Security):</span>
                  {result.securityAnalysis.hasHsts ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Present
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> Missing HSTS
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-700">Content-Security-Policy (CSP):</span>
                  {result.securityAnalysis.hasCsp ? (
                    <span className="text-emerald-700 font-semibold">Configured</span>
                  ) : (
                    <span className="text-slate-500">Not detected</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-700">X-Frame-Options:</span>
                  {result.securityAnalysis.hasXFrameOptions ? (
                    <span className="text-emerald-700 font-semibold">Protected</span>
                  ) : (
                    <span className="text-slate-500">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Raw Headers Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Raw HTTP Response Headers ({Object.keys(result.headers).length})
              </h2>
              <input
                type="text"
                value={headerFilter}
                onChange={(e) => setHeaderFilter(e.target.value)}
                placeholder="Filter headers..."
                className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg outline-none w-full sm:w-48"
              />
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-2 px-3 font-semibold w-1/3">Header Name</th>
                    <th className="py-2 px-3 font-semibold">Header Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(result.headers)
                    .filter(
                      ([k, v]) =>
                        !headerFilter ||
                        k.toLowerCase().includes(headerFilter.toLowerCase()) ||
                        v.toLowerCase().includes(headerFilter.toLowerCase())
                    )
                    .map(([key, val]) => (
                      <tr key={key} className="hover:bg-slate-50/80">
                        <td className="py-1.5 px-3 font-semibold text-indigo-700">{key}</td>
                        <td className="py-1.5 px-3 text-slate-700 break-all">{val}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
