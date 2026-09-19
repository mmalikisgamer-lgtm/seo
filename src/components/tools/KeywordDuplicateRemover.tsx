import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  Sparkles, 
  ArrowRightLeft, 
  Download, 
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { AdPlaceholder } from '../AdPlaceholder';

const SAMPLE_KEYWORDS = `seo audit tools
keyword research
meta tag generator
seo audit tools
website speed test
google lighthouse
page speed insights
KEYWORD RESEARCH
backlink checker
duplicate content checker
website speed test
meta description length
keyword research
canonical tag checker
seo audit tools`;

export const KeywordDuplicateRemover: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [convertToLowerCase, setConvertToLowerCase] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [delimiter, setDelimiter] = useState<'newline' | 'comma'>('newline');
  const [copied, setCopied] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    if (!inputText.trim()) {
      return { inputCount: 0, outputCount: 0, removedCount: 0, savingsPercent: 0 };
    }
    const splitRegex = delimiter === 'newline' ? /\r?\n/ : /[,;\n]+/;
    const rawItems = inputText.split(splitRegex);
    const inputCount = rawItems.filter(item => item.trim().length > 0).length;

    if (!outputText.trim()) {
      return { inputCount, outputCount: 0, removedCount: 0, savingsPercent: 0 };
    }
    const outItems = outputText.split(delimiter === 'newline' ? /\r?\n/ : /[,;\n]+/).filter(item => item.trim().length > 0);
    const outputCount = outItems.length;
    const removedCount = Math.max(0, inputCount - outputCount);
    const savingsPercent = inputCount > 0 ? Math.round((removedCount / inputCount) * 100) : 0;

    return { inputCount, outputCount, removedCount, savingsPercent };
  }, [inputText, outputText, delimiter]);

  // Core deduplication logic using JavaScript Sets
  const handleRemoveDuplicates = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const splitRegex = delimiter === 'newline' ? /\r?\n/ : /[,;\n]+/;
    const items = inputText.split(splitRegex);

    const processedItems: string[] = [];
    for (let item of items) {
      if (trimWhitespace) {
        item = item.trim();
      }
      if (convertToLowerCase) {
        item = item.toLowerCase();
      }
      if (item.length > 0) {
        processedItems.push(item);
      }
    }

    // 100% Client-side Deduplication using JavaScript Sets
    const uniqueSet = new Set<string>(processedItems);
    let resultList = Array.from(uniqueSet);

    if (sortAlphabetical) {
      resultList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }

    const separator = delimiter === 'newline' ? '\n' : ', ';
    setOutputText(resultList.join(separator));
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = outputText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    const element = document.createElement('a');
    const file = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'cleaned-keywords.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_KEYWORDS);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="space-y-6">
      {/* Tool Header & Description */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Client-Side
              </span>
              <span className="text-xs text-slate-500">JavaScript Set Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Keyword Duplicate Remover</h2>
            <p className="text-sm text-slate-600 mt-1">
              Clean, deduplicate, and sort keyword lists for Google Ads, SEO campaigns, and spreadsheets in real time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="load-sample-keywords-btn"
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Load Sample</span>
            </button>
            <button
              id="clear-keywords-btn"
              onClick={handleClear}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-medium text-slate-600 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Configuration Toggles */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <input
              id="toggle-sort-alphabetical"
              type="checkbox"
              checked={sortAlphabetical}
              onChange={(e) => setSortAlphabetical(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Sort Alphabetically (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <input
              id="toggle-convert-lowercase"
              type="checkbox"
              checked={convertToLowerCase}
              onChange={(e) => setConvertToLowerCase(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Convert to Lowercase</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <input
              id="toggle-trim-whitespace"
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Trim Leading/Trailing Space</span>
          </label>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 p-2 rounded-lg bg-slate-50">
            <span className="text-slate-500 whitespace-nowrap">Format:</span>
            <select
              id="select-delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as any)}
              className="bg-white border border-slate-300 text-slate-800 text-xs rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full"
            >
              <option value="newline">One per Line</option>
              <option value="comma">Comma Separated (,)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Two Textarea Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Input Textarea */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label htmlFor="keywords-input" className="text-sm font-bold text-slate-900">
                Input Keywords
              </label>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                {stats.inputCount} lines/items
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.readText().then((text) => setInputText(text)).catch(() => {});
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Paste from clipboard
            </button>
          </div>

          <textarea
            id="keywords-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your raw keyword list here (one per line or separated by commas)..."
            rows={14}
            className="w-full flex-1 p-4 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-800 font-mono text-xs leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
          />

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Paste raw lists up to 100,000+ items
            </span>
            <button
              id="btn-remove-duplicates-main"
              onClick={handleRemoveDuplicates}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Remove Duplicates</span>
            </button>
          </div>
        </div>

        {/* Right Column: Output Textarea */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label htmlFor="keywords-output" className="text-sm font-bold text-slate-900">
                Cleaned Unique Keywords
              </label>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                {stats.outputCount} unique
              </span>
            </div>
            {stats.removedCount > 0 && (
              <span className="text-xs font-semibold text-amber-600">
                -{stats.removedCount} duplicates removed ({stats.savingsPercent}%)
              </span>
            )}
          </div>

          <textarea
            id="keywords-output"
            readOnly
            value={outputText}
            placeholder="Cleaned unique keyword results will appear here after clicking 'Remove Duplicates'..."
            rows={14}
            className="w-full flex-1 p-4 rounded-xl border border-slate-300 bg-slate-50/70 text-slate-800 font-mono text-xs leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
          />

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-slate-500">
              Ready for Google Keyword Planner, Ahrefs, SEMrush
            </div>
            <div className="flex items-center gap-2">
              <button
                id="btn-download-keywords"
                onClick={handleDownload}
                disabled={!outputText}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .txt</span>
              </button>
              <button
                id="btn-copy-keywords-output"
                onClick={handleCopy}
                disabled={!outputText}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Ad Space (728x90) */}
      <AdPlaceholder format="728x90" />

      {/* Quick Summary & Best Practices Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Why Deduplicate Keyword Lists for SEO & PPC?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Prevent Ad Cannibalization</span>
            Avoid bidding against your own ad groups in Google Ads campaigns by ensuring every keyword query target is unique.
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Clean Search Volume Data</span>
            Eliminate duplicate lines before importing keyword exports into Google Sheets, Excel, or SEO clustering software.
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">100% Client-Side Privacy</span>
            No keywords or client lists ever leave your browser. All set deduplication processes operate in local JavaScript memory.
          </div>
        </div>
      </div>
    </div>
  );
};
