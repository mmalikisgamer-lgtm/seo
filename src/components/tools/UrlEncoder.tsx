import React, { useState, useEffect } from 'react';
import {
  Link as LinkIcon,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  RotateCcw,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';

const SAMPLE_URL = 'https://www.example.com/products/headphones?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale_2026&utm_content=text_ad&coupon=SAVE20';

export const UrlEncoder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'encode' | 'query'>('query');

  // Basic Encoder / Decoder state
  const [rawText, setRawText] = useState<string>('https://example.com/search?query=react 19 & seo tools+framework');
  const [encodedText, setEncodedText] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Query Parameter Parser state
  const [fullUrlInput, setFullUrlInput] = useState<string>(SAMPLE_URL);
  const [baseUrl, setBaseUrl] = useState<string>('https://www.example.com/products/headphones');
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([
    { key: 'utm_source', value: 'google' },
    { key: 'utm_medium', value: 'cpc' },
    { key: 'utm_campaign', value: 'summer_sale_2026' },
    { key: 'utm_content', value: 'text_ad' },
    { key: 'coupon', value: 'SAVE20' },
  ]);

  // Sync basic encoder
  useEffect(() => {
    try {
      setEncodedText(encodeURIComponent(rawText));
    } catch {
      setEncodedText('');
    }
  }, [rawText]);

  // Parse URL input into base + params
  const handleParseUrl = (input: string) => {
    setFullUrlInput(input);
    try {
      const u = new URL(input.startsWith('http') ? input : `https://${input}`);
      setBaseUrl(`${u.origin}${u.pathname}`);

      const paramsArr: { key: string; value: string }[] = [];
      u.searchParams.forEach((value, key) => {
        paramsArr.push({ key, value });
      });
      setQueryParams(paramsArr);
    } catch {
      // If incomplete URL, split by ?
      const parts = input.split('?');
      setBaseUrl(parts[0] || '');
      if (parts[1]) {
        const pairs = parts[1].split('&');
        const paramsArr = pairs.map((p) => {
          const [k, v] = p.split('=');
          return { key: decodeURIComponent(k || ''), value: decodeURIComponent(v || '') };
        });
        setQueryParams(paramsArr);
      }
    }
  };

  // Re-build clean URL
  const reconstructedUrl = React.useMemo(() => {
    if (!baseUrl.trim()) return '';
    const activeParams = queryParams.filter((p) => p.key.trim().length > 0);
    if (!activeParams.length) return baseUrl;

    const queryString = activeParams
      .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join('&');
    return `${baseUrl}?${queryString}`;
  }, [baseUrl, queryParams]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const addParam = () => {
    setQueryParams([...queryParams, { key: 'new_param', value: '' }]);
  };

  const updateParam = (index: number, key: string, value: string) => {
    const copy = [...queryParams];
    copy[index] = { key, value };
    setQueryParams(copy);
  };

  const removeParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Developer Utilities
              </span>
              <span className="text-xs text-slate-500 font-medium">Query String & UTM Builder</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">URL Encoder / Decoder & Query Parser</h1>
            <p className="text-sm text-slate-600 mt-1">
              Safely escape special URI characters or dissect, modify, and rebuild tracking URLs and marketing campaign parameters.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('query')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'query' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Query & UTM Parser</span>
            </button>
            <button
              onClick={() => setActiveTab('encode')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'encode' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Encode / Decode</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- QUERY & UTM PARSER TAB --- */}
      {activeTab === 'query' && (
        <div className="space-y-6">
          {/* URL Input Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Target URL to Inspect
              </label>
              <button
                onClick={() => handleParseUrl(SAMPLE_URL)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Campaign URL</span>
              </button>
            </div>
            <input
              type="text"
              value={fullUrlInput}
              onChange={(e) => handleParseUrl(e.target.value)}
              placeholder="Paste any URL containing query parameters (?key=value)..."
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Query Table */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Parsed Query Parameters ({queryParams.length})
                </span>
                <button
                  onClick={addParam}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Parameter</span>
                </button>
              </div>

              {/* Base URL row */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Base URL / Endpoint</span>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 bg-slate-50 outline-none"
                />
              </div>

              {/* Parameters list */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {queryParams.map((param, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={param.key}
                      onChange={(e) => updateParam(idx, e.target.value, param.value)}
                      placeholder="key (e.g. utm_source)"
                      className="w-1/3 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
                    />
                    <span className="text-slate-400 font-bold">=</span>
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => updateParam(idx, param.key, e.target.value)}
                      placeholder="value"
                      className="flex-1 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
                    />
                    <button
                      onClick={() => removeParam(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Re-built URL Output */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Reconstructed Clean URL
                </span>
                <button
                  onClick={() => copyToClipboard(reconstructedUrl, 'reconstructed')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md"
                >
                  {copiedKey === 'reconstructed' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'reconstructed' ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={reconstructedUrl}
                rows={6}
                className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-900 text-emerald-400 rounded-xl outline-none leading-relaxed shadow-inner select-all resize-none"
              />

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
                <strong>UTM Tracking Tip:</strong> Always keep campaign parameters lowercase to prevent duplicate campaign rows in Google Analytics 4 (GA4).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ENCODE / DECODE TAB --- */}
      {activeTab === 'encode' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Decoded / Raw String
              </span>
              <button
                onClick={() => copyToClipboard(rawText, 'raw')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600"
              >
                {copiedKey === 'raw' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'raw' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={10}
              placeholder="Enter text or URL to encode..."
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-300 focus:border-indigo-500 outline-none leading-relaxed resize-y"
            />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Encoded URI Component
              </span>
              <button
                onClick={() => copyToClipboard(encodedText, 'encoded')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600"
              >
                {copiedKey === 'encoded' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'encoded' ? 'Copied' : 'Copy Encoded'}</span>
              </button>
            </div>
            <textarea
              value={encodedText}
              onChange={(e) => {
                setEncodedText(e.target.value);
                try {
                  setRawText(decodeURIComponent(e.target.value));
                } catch {
                  // editing
                }
              }}
              rows={10}
              placeholder="Encoded output will appear here or paste encoded to decode..."
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 bg-slate-900 text-emerald-400 outline-none leading-relaxed resize-y shadow-inner"
            />
          </div>
        </div>
      )}
    </div>
  );
};
