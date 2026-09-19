import React, { useState, useMemo } from 'react';
import {
  FileText,
  Clock,
  Mic,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Download,
  Filter,
} from 'lucide-react';

const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more',
  'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through',
  'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves'
]);

const SAMPLE_TEXT = `Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As an internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a website will receive more visitors from a search engine when websites rank higher on the search engine results page (SERP). These visitors can then potentially be converted into customers.

High quality content and proper keyword research form the bedrock of successful on-page SEO. Maintaining an optimal keyword density of between one to two percent helps avoid over-optimization penalties while signaling topical relevance to search algorithms.`;

export const KeywordDensityAnalyzer: React.FC = () => {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [excludeStopWords, setExcludeStopWords] = useState<boolean>(true);
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'1-word' | '2-word' | '3-word'>('1-word');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Core metrics calculation
  const metrics = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      };
    }

    const wordsArray = text.trim().split(/\s+/).filter(Boolean);
    const totalWords = wordsArray.length;
    const totalChars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentencesArray = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const paragraphsArray = text.split(/\n+/).filter((p) => p.trim().length > 0);

    return {
      words: totalWords,
      characters: totalChars,
      charactersNoSpaces: charsNoSpaces,
      sentences: sentencesArray.length || 1,
      paragraphs: paragraphsArray.length || 1,
      readingTime: Math.ceil(totalWords / 200),
      speakingTime: Math.ceil(totalWords / 130),
    };
  }, [text]);

  // Clean tokens extraction
  const tokens = useMemo(() => {
    if (!text.trim()) return [];
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 0);
  }, [text]);

  // Compute 1-word, 2-word, 3-word n-grams
  const { oneWordList, twoWordList, threeWordList } = useMemo(() => {
    const totalWords = tokens.length;
    if (totalWords === 0) {
      return { oneWordList: [], twoWordList: [], threeWordList: [] };
    }

    // 1-Word frequency
    const oneWordMap = new Map<string, number>();
    tokens.forEach((word) => {
      if (word.length < minWordLength) return;
      if (excludeStopWords && COMMON_STOP_WORDS.has(word)) return;
      oneWordMap.set(word, (oneWordMap.get(word) || 0) + 1);
    });

    const oneWords = Array.from(oneWordMap.entries())
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Number(((count / totalWords) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    // 2-Word frequency
    const twoWordMap = new Map<string, number>();
    for (let i = 0; i < totalWords - 1; i++) {
      const w1 = tokens[i];
      const w2 = tokens[i + 1];
      if (w1.length < 2 || w2.length < 2) continue;
      if (excludeStopWords && COMMON_STOP_WORDS.has(w1) && COMMON_STOP_WORDS.has(w2)) continue;
      const phrase = `${w1} ${w2}`;
      twoWordMap.set(phrase, (twoWordMap.get(phrase) || 0) + 1);
    }

    const twoWords = Array.from(twoWordMap.entries())
      .filter(([_, count]) => count > 1 || totalWords < 50)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Number(((count / (totalWords - 1 || 1)) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    // 3-Word frequency
    const threeWordMap = new Map<string, number>();
    for (let i = 0; i < totalWords - 2; i++) {
      const w1 = tokens[i];
      const w2 = tokens[i + 1];
      const w3 = tokens[i + 2];
      if (w1.length < 2 || w2.length < 2 || w3.length < 2) continue;
      if (excludeStopWords && COMMON_STOP_WORDS.has(w1) && COMMON_STOP_WORDS.has(w2) && COMMON_STOP_WORDS.has(w3)) continue;
      const phrase = `${w1} ${w2} ${w3}`;
      threeWordMap.set(phrase, (threeWordMap.get(phrase) || 0) + 1);
    }

    const threeWords = Array.from(threeWordMap.entries())
      .filter(([_, count]) => count > 1 || totalWords < 50)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Number(((count / (totalWords - 2 || 1)) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    return {
      oneWordList: oneWords,
      twoWordList: twoWords,
      threeWordList: threeWords,
    };
  }, [tokens, excludeStopWords, minWordLength]);

  const activeList = useMemo(() => {
    let list = oneWordList;
    if (activeTab === '2-word') list = twoWordList;
    if (activeTab === '3-word') list = threeWordList;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return list.filter((item) => item.phrase.toLowerCase().includes(q));
    }
    return list;
  }, [activeTab, oneWordList, twoWordList, threeWordList, searchFilter]);

  const handleExportCsv = () => {
    if (!activeList.length) return;
    const header = 'Phrase,Count,DensityPercentage\n';
    const rows = activeList.map((item) => `"${item.phrase}",${item.count},${item.density}%`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyword-density-${activeTab}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTop = () => {
    if (!activeList.length) return;
    const textToCopy = activeList.slice(0, 20).map((i) => `${i.phrase}: ${i.count}x (${i.density}%)`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                On-Page SEO
              </span>
              <span className="text-xs text-slate-500 font-medium">Real-Time Analysis</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Keyword Density & Content Word Counter</h1>
            <p className="text-sm text-slate-600 mt-1">
              Audit articles, blog posts, and landing pages to analyze keyword frequency, n-grams, and prevent Google keyword stuffing penalties.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText(SAMPLE_TEXT)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={() => setText('')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Live Content Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-medium text-slate-500 block">Total Words</span>
            <span className="text-xl font-extrabold text-slate-900">{metrics.words}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-medium text-slate-500 block">Characters</span>
            <span className="text-xl font-extrabold text-slate-900">{metrics.characters}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-medium text-slate-500 block">No Spaces</span>
            <span className="text-xl font-extrabold text-slate-900">{metrics.charactersNoSpaces}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-medium text-slate-500 block">Sentences</span>
            <span className="text-xl font-extrabold text-slate-900">{metrics.sentences}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-2">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Reading Time</span>
              <span className="text-xl font-extrabold text-indigo-600">~{metrics.readingTime}m</span>
            </div>
            <Clock className="w-4 h-4 text-indigo-400 ml-auto opacity-70" />
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-2">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Speaking Time</span>
              <span className="text-xl font-extrabold text-amber-600">~{metrics.speakingTime}m</span>
            </div>
            <Mic className="w-4 h-4 text-amber-400 ml-auto opacity-70" />
          </div>
        </div>
      </div>

      {/* Main Grid: Editor & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Content Textarea */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Input Content / Article</span>
            </label>
            <span className="text-xs text-slate-400">{metrics.words} words</span>
          </div>

          <textarea
            id="keyword-content-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your blog post, meta content, or web copy here to analyze keyword densities..."
            rows={18}
            className="w-full p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm text-slate-800 font-sans leading-relaxed bg-white shadow-xs resize-y"
          />

          {/* Density Recommendation Box */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>SEO Best Practice:</strong> Primary target keyword density should stay between <strong>1.0% – 2.5%</strong>. Values exceeding <strong>3.5%</strong> may trigger Google automated spam algorithms for keyword stuffing.
            </p>
          </div>
        </div>

        {/* Right: Frequency & N-Gram Breakdown */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            {/* Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('1-word')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === '1-word' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1-Word ({oneWordList.length})
              </button>
              <button
                onClick={() => setActiveTab('2-word')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === '2-word' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2-Words ({twoWordList.length})
              </button>
              <button
                onClick={() => setActiveTab('3-word')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === '3-word' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3-Words ({threeWordList.length})
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTop}
                disabled={activeList.length === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy Top'}</span>
              </button>
              <button
                onClick={handleExportCsv}
                disabled={activeList.length === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeStopWords}
                  onChange={(e) => setExcludeStopWords(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>Exclude stop words (the, is, and)</span>
              </label>

              <label className="flex items-center gap-1.5">
                <span>Min chars:</span>
                <select
                  value={minWordLength}
                  onChange={(e) => setMinWordLength(Number(e.target.value))}
                  className="px-1.5 py-0.5 rounded border border-slate-200 text-xs bg-white text-slate-700"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            </div>

            <div className="relative w-full sm:w-44">
              <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter keywords..."
                className="w-full pl-8 pr-2 py-1 text-xs rounded-lg border border-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Results Table */}
          <div className="flex-1 overflow-y-auto max-h-[420px] rounded-xl border border-slate-200">
            {activeList.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No keyword phrases found matching current filters.
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Keyword Phrase</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Frequency</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Density</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {activeList.map((item, idx) => {
                    let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    let statusText = 'Optimal';

                    if (item.density > 3.5) {
                      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                      statusText = 'Overused';
                    } else if (item.density > 2.5) {
                      badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                      statusText = 'High';
                    } else if (item.density < 0.5 && item.count === 1) {
                      badgeColor = 'bg-slate-50 text-slate-600 border-slate-200';
                      statusText = 'Normal';
                    }

                    return (
                      <tr key={`${item.phrase}-${idx}`} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-3 font-medium text-slate-800">
                          {item.phrase}
                        </td>
                        <td className="py-2 px-3 text-center text-slate-600 font-mono">
                          {item.count}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-semibold text-slate-800">
                          {item.density}%
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeColor}`}
                          >
                            {statusText}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
