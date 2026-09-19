import React, { useState, useMemo } from 'react';
import {
  Shuffle,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';

export const KeywordCombiner: React.FC = () => {
  const [colA, setColA] = useState<string>('best\ntop 10\ncheap\naffordable\nreviews on');
  const [colB, setColB] = useState<string>('seo tools\nkeyword tracker\nbacklink checker\nwebsite speed test');
  const [colC, setColC] = useState<string>('for beginners\nin 2026\nunder $50\nfree vs paid\nfor small business');

  const [mode, setMode] = useState<'all' | 'abc' | 'ab' | 'bc'>('all');
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate combined list
  const combinedKeywords = useMemo(() => {
    const listA = colA.split('\n').map((s) => s.trim()).filter(Boolean);
    const listB = colB.split('\n').map((s) => s.trim()).filter(Boolean);
    const listC = colC.split('\n').map((s) => s.trim()).filter(Boolean);

    if (listB.length === 0) return [];

    const results = new Set<string>();

    // 1. A + B + C
    if (mode === 'all' || mode === 'abc') {
      listA.forEach((a) => {
        listB.forEach((b) => {
          listC.forEach((c) => {
            results.add(`${a} ${b} ${c}`);
          });
        });
      });
    }

    // 2. A + B
    if (mode === 'all' || mode === 'ab') {
      listA.forEach((a) => {
        listB.forEach((b) => {
          results.add(`${a} ${b}`);
        });
      });
    }

    // 3. B + C
    if (mode === 'all' || mode === 'bc') {
      listB.forEach((b) => {
        listC.forEach((c) => {
          results.add(`${b} ${c}`);
        });
      });
    }

    let arr = Array.from(results);
    if (lowercase) {
      arr = arr.map((k) => k.toLowerCase());
    }
    return arr;
  }, [colA, colB, colC, mode, lowercase]);

  const handleCopy = () => {
    if (!combinedKeywords.length) return;
    navigator.clipboard.writeText(combinedKeywords.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!combinedKeywords.length) return;
    const blob = new Blob([combinedKeywords.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'longtail-keywords.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    if (!combinedKeywords.length) return;
    const csvContent = 'Keyword,IntentGroup\n' + combinedKeywords.map((k) => `"${k}","Long-Tail Target"`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'longtail-keywords.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const applyPreset = (type: 'buyer' | 'questions' | 'ecommerce') => {
    if (type === 'buyer') {
      setColA('best\nreviews for\ntop rated\nvs\nalternatives to');
      setColB('project management software\nemail marketing tool\naccounting software\ncrm platform');
      setColC('for startups\npricing comparison\nin 2026\nwith free trial');
    } else if (type === 'questions') {
      setColA('how to use\nwhat is the best\nwhy choose\nstep by step guide to');
      setColB('local seo\nschema markup\nkeyword clustering\ninternal linking');
      setColC('for beginners\nwithout coding\nfast\nwith examples');
    } else {
      setColA('buy\ncheap\ndiscount\nwhere to purchase\nbest deal on');
      setColB('wireless earbuds\nmechanical keyboard\nstanding desk\nnoise cancelling headphones');
      setColC('under $100\nfree shipping\nwith warranty\nonline');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Niche Research & Keyword Expansion
              </span>
              <span className="text-xs text-slate-500 font-medium">Bulk Combiner</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Long-Tail Keyword Permutation Combiner</h1>
            <p className="text-sm text-slate-600 mt-1">
              Cross-multiply prefixes, core seed niches, and commercial modifiers to rapidly generate hundreds of high-intent long-tail keywords.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-500 font-medium">Presets:</span>
            <button
              onClick={() => applyPreset('buyer')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Buyer Intent
            </button>
            <button
              onClick={() => applyPreset('questions')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Questions
            </button>
            <button
              onClick={() => applyPreset('ecommerce')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              E-Commerce
            </button>
          </div>
        </div>
      </div>

      {/* Input Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column A: Prefixes */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Prefixes / Modifiers (A)
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {colA.split('\n').filter((s) => s.trim()).length} terms
            </span>
          </div>
          <textarea
            value={colA}
            onChange={(e) => setColA(e.target.value)}
            placeholder="best&#10;cheap&#10;top rated&#10;reviews for"
            rows={8}
            className="w-full p-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-500 bg-slate-50 font-mono resize-none leading-relaxed"
          />
        </div>

        {/* Column B: Core Seed Keywords */}
        <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              2. Core Seed Topics (B) *
            </label>
            <span className="text-[11px] text-indigo-500 font-mono font-semibold">
              {colB.split('\n').filter((s) => s.trim()).length} seeds
            </span>
          </div>
          <textarea
            value={colB}
            onChange={(e) => setColB(e.target.value)}
            placeholder="running shoes&#10;coffee grinder&#10;project management"
            rows={8}
            className="w-full p-3 text-xs border border-indigo-200 rounded-xl outline-none focus:border-indigo-500 bg-indigo-50/30 font-mono resize-none leading-relaxed"
          />
        </div>

        {/* Column C: Suffixes */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              3. Suffixes / Locations (C)
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {colC.split('\n').filter((s) => s.trim()).length} terms
            </span>
          </div>
          <textarea
            value={colC}
            onChange={(e) => setColC(e.target.value)}
            placeholder="for beginners&#10;under $100&#10;in 2026&#10;near me"
            rows={8}
            className="w-full p-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-500 bg-slate-50 font-mono resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Options Bar & Output */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          {/* Combiner Mode */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Permutation Formula:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setMode('all')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  mode === 'all' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                All Permutations
              </button>
              <button
                onClick={() => setMode('abc')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  mode === 'abc' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                A + B + C Only
              </button>
              <button
                onClick={() => setMode('ab')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  mode === 'ab' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                A + B Only
              </button>
              <button
                onClick={() => setMode('bc')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  mode === 'bc' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                B + C Only
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer mr-2">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Force lowercase</span>
            </label>

            <button
              onClick={handleCopy}
              disabled={!combinedKeywords.length}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              disabled={!combinedKeywords.length}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Results Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Generated Keywords ({combinedKeywords.length})
            </span>
            <span className="text-xs text-slate-400">Ready for Google Ads or Ahrefs import</span>
          </div>

          <textarea
            readOnly
            value={combinedKeywords.join('\n')}
            rows={10}
            className="w-full p-4 text-xs font-mono rounded-xl border border-slate-200 bg-slate-900 text-emerald-400 outline-none leading-relaxed shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};
