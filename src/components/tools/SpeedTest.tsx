import React, { useState } from 'react';
import { 
  Gauge, 
  Globe, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { SpeedTestResult } from '../../types';
import { AdPlaceholder } from '../AdPlaceholder';

const DEMO_URLS = [
  'https://web.dev',
  'https://wikipedia.org',
  'https://github.com',
];

interface CircularScoreProps {
  score: number;
  label: string;
}

const CircularScore: React.FC<CircularScoreProps> = ({ score, label }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // emerald-500
  let bgColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score < 50) {
    strokeColor = '#ef4444'; // red-500
    bgColor = 'bg-red-50 text-red-700 border-red-200';
  } else if (score < 90) {
    strokeColor = '#f59e0b'; // amber-500
    bgColor = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={strokeColor}
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 leading-none">{score}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5">/100</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-bold text-slate-700 text-center">{label}</span>
      <span
        className={`mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${bgColor}`}
      >
        {score >= 90 ? 'Good' : score >= 50 ? 'Needs Work' : 'Poor'}
      </span>
    </div>
  );
};

export const SpeedTest: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async (targetUrl?: string) => {
    const urlToTest = (targetUrl || urlInput).trim();
    if (!urlToTest) {
      setError('Please enter a URL to run the speed test.');
      return;
    }

    setIsLoading(true);
    setError(null);
    if (targetUrl) {
      setUrlInput(targetUrl);
    }

    try {
      const response = await fetch('/api/speed-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToTest, strategy }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to benchmark website speed.');
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error occurred while contacting Lighthouse API.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                Lighthouse v12
              </span>
              <span className="text-xs text-slate-500">Google PageSpeed Insights Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Website Speed & Core Web Vitals Test</h2>
            <p className="text-sm text-slate-600 mt-1">
              Test mobile and desktop performance scores, Largest Contentful Paint (LCP), CLS, and page weight opportunities.
            </p>
          </div>
        </div>

        {/* URL Form & Strategy Toggle */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTest();
          }}
          className="mt-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="speedtest-url-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter web address (e.g., https://web.dev)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xs"
              />
            </div>

            {/* Device Strategy toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                id="toggle-strategy-mobile"
                onClick={() => setStrategy('mobile')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  strategy === 'mobile' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
              <button
                type="button"
                id="toggle-strategy-desktop"
                onClick={() => setStrategy('desktop')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  strategy === 'desktop' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
            </div>

            <button
              id="btn-run-speed-test"
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing Speed...</span>
                </>
              ) : (
                <>
                  <Gauge className="w-4 h-4" />
                  <span>Run Speed Test</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-600">Sample Sites:</span>
            {DEMO_URLS.map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() => handleTest(demo)}
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
              <p className="font-semibold">Speed Test Diagnostic Error</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Strategic Leaderboard Ad Space */}
      <AdPlaceholder format="728x90" />

      {/* Speed Test Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Circular Gauges Panel (0-100 Scale) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Lighthouse Audit for
                </span>
                <h3 className="text-lg font-bold text-slate-900 truncate max-w-lg">{result.url}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="capitalize px-2.5 py-1 rounded-md bg-slate-100 font-medium">
                  {result.strategy} Mode
                </span>
                <span className="text-slate-400">•</span>
                <span>{result.source}</span>
              </div>
            </div>

            {/* 4 Circular Progress Gauges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
              <CircularScore score={result.scores.performance} label="Performance" />
              <CircularScore score={result.scores.accessibility} label="Accessibility" />
              <CircularScore score={result.scores.bestPractices} label="Best Practices" />
              <CircularScore score={result.scores.seo} label="SEO Score" />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 90–100 (Fast)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 50–89 (Needs Improvement)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> 0–49 (Poor)
              </span>
            </div>
          </div>

          {/* Core Web Vitals Key Metrics Grid */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Core Web Vitals & Loading Metrics</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Standard Google Ranking Factors
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  First Contentful Paint
                </span>
                <p className="mt-1 text-base font-extrabold text-slate-900 font-mono">
                  {result.metrics.fcp}
                </p>
                <span className="text-[10px] text-slate-500">FCP</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Largest Contentful Paint
                </span>
                <p className="mt-1 text-base font-extrabold text-slate-900 font-mono">
                  {result.metrics.lcp}
                </p>
                <span className="text-[10px] text-slate-500">LCP (Key CWV)</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Blocking Time
                </span>
                <p className="mt-1 text-base font-extrabold text-slate-900 font-mono">
                  {result.metrics.tbt}
                </p>
                <span className="text-[10px] text-slate-500">TBT (Interactivity)</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Cumulative Layout Shift
                </span>
                <p className="mt-1 text-base font-extrabold text-slate-900 font-mono">
                  {result.metrics.cls}
                </p>
                <span className="text-[10px] text-slate-500">CLS (Visual stability)</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Speed Index
                </span>
                <p className="mt-1 text-base font-extrabold text-slate-900 font-mono">
                  {result.metrics.si}
                </p>
                <span className="text-[10px] text-slate-500">SI</span>
              </div>
            </div>
          </div>

          {/* Performance Optimization Opportunities */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Speed Optimization Opportunities</span>
            </h4>
            <div className="space-y-2.5">
              {result.opportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-800">{opp.title}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 font-mono text-[11px]">
                    {opp.savings}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
