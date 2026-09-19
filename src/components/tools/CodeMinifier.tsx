import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  FileCode, 
  Download, 
  Sparkles, 
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';
import { AdPlaceholder } from '../AdPlaceholder';

type SupportedLanguage = 'html' | 'css' | 'javascript' | 'json';

const SAMPLES: Record<SupportedLanguage, string> = {
  html: `<!DOCTYPE html>
<html lang="en">
  <!-- Main Application Header -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SEO Optimized Application</title>
    <!-- Stylesheet Link -->
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <h1>Welcome to DevSEO</h1>
      <p>High performance utilities for modern web engineers.</p>
    </header>
  </body>
</html>`,
  css: `/* Global Site Typography & Root Variables */
:root {
  --primary-color: #4f46e5;
  --secondary-color: #06b6d4;
  --font-base: 16px;
}

/* Reset default margins */
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
  color: #1e293b;
  background-color: #f8fafc;
}

/* Header container styling */
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
}`,
  javascript: `// DevSEO Performance Calculator
function calculateSavings(originalSize, minifiedSize) {
  // Guard against invalid numbers
  if (!originalSize || originalSize <= 0) {
    return 0;
  }
  
  /* Compute delta and percentage */
  const delta = originalSize - minifiedSize;
  const percentage = (delta / originalSize) * 100;
  
  console.log("Calculated savings successfully:", percentage);
  return Math.round(percentage);
}

// Export utility
export { calculateSavings };`,
  json: `{
  "name": "devseo-tools",
  "version": "1.0.0",
  "description": "Free SEO and web development utilities platform",
  "features": [
    "keyword-duplicate-remover",
    "code-minifier",
    "on-page-meta-analyzer",
    "speed-test"
  ],
  "author": {
    "name": "DevSEO Team",
    "openSource": true
  }
}`,
};

export const CodeMinifier: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('html');
  const [inputCode, setInputCode] = useState(SAMPLES.html);
  const [outputCode, setOutputCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Minification functions
  const minifyCode = (code: string, lang: SupportedLanguage): string => {
    if (!code.trim()) return '';

    try {
      if (lang === 'html') {
        // Strip HTML comments <!-- ... -->
        let res = code.replace(/<!--[\s\S]*?-->/g, '');
        // Collapse whitespace between tags
        res = res.replace(/>\s+</g, '><');
        // Collapse multiple spaces/newlines
        res = res.replace(/\s{2,}/g, ' ');
        return res.trim();
      }

      if (lang === 'css') {
        // Strip multi-line comments /* ... */
        let res = code.replace(/\/\*[\s\S]*?\*\//g, '');
        // Remove spaces around colons, semicolons, braces, commas
        res = res.replace(/\s*([\{\}:;,>~+])\s*/g, '$1');
        // Remove trailing semicolons before closing brace
        res = res.replace(/;\}/g, '}');
        // Remove extra spaces & newlines
        res = res.replace(/\s{2,}/g, ' ');
        return res.trim();
      }

      if (lang === 'javascript') {
        // Strip multi-line comments /* ... */
        let res = code.replace(/\/\*[\s\S]*?\*\//g, '');
        // Strip single line comments // ... (line by line to preserve strings where possible)
        res = res
          .split('\n')
          .map((line) => {
            const commentIdx = line.indexOf('//');
            if (commentIdx !== -1) {
              // Basic check if // is inside quotes
              const quoteCount = (line.substring(0, commentIdx).match(/["'`]/g) || []).length;
              if (quoteCount % 2 === 0) {
                return line.substring(0, commentIdx);
              }
            }
            return line;
          })
          .join('\n');
        // Collapse whitespace around symbols
        res = res.replace(/\s*([\{\}\(\)\[\]=+\-*/;,<>!?:])\s*/g, '$1');
        // Collapse multiple whitespace
        res = res.replace(/\s{2,}/g, ' ');
        return res.trim();
      }

      if (lang === 'json') {
        const parsed = JSON.parse(code);
        return JSON.stringify(parsed);
      }

      return code.trim();
    } catch (err: any) {
      throw new Error(`Minification syntax error: ${err.message}`);
    }
  };

  const handleMinify = () => {
    setErrorMessage(null);
    try {
      const minified = minifyCode(inputCode, language);
      setOutputCode(minified);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred during minification.');
    }
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setInputCode(SAMPLES[newLang]);
    setOutputCode('');
    setErrorMessage(null);
  };

  const handleCopy = async () => {
    if (!outputCode) return;
    try {
      await navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = outputCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!outputCode) return;
    const extensions: Record<SupportedLanguage, string> = {
      html: 'html',
      css: 'css',
      javascript: 'js',
      json: 'json',
    };
    const element = document.createElement('a');
    const file = new Blob([outputCode], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `minified-bundle.${extensions[language]}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setInputCode('');
    setOutputCode('');
    setErrorMessage(null);
  };

  // Metrics
  const metrics = useMemo(() => {
    const inBytes = new Blob([inputCode]).size;
    const outBytes = new Blob([outputCode]).size;
    const savedBytes = Math.max(0, inBytes - outBytes);
    const reductionPercent = inBytes > 0 && outputCode ? Math.round((savedBytes / inBytes) * 100) : 0;

    return {
      inBytes,
      outBytes,
      savedBytes,
      reductionPercent,
      inLines: inputCode ? inputCode.split('\n').length : 0,
      outLines: outputCode ? outputCode.split('\n').length : 0,
    };
  }, [inputCode, outputCode]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                Client-Side Engine
              </span>
              <span className="text-xs text-slate-500">HTML • CSS • JS • JSON</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Code Minifier & Compressor</h2>
            <p className="text-sm text-slate-600 mt-1">
              Remove dead whitespace, comments, and redundant line breaks to reduce payload sizes and boost Core Web Vitals.
            </p>
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="select-language" className="text-xs font-semibold text-slate-600">
              Language:
            </label>
            <select
              id="select-language"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="html">HTML5 (.html)</option>
              <option value="css">CSS3 (.css)</option>
              <option value="javascript">JavaScript (.js)</option>
              <option value="json">JSON (.json)</option>
            </select>
            <button
              id="minifier-sample-btn"
              onClick={() => {
                setInputCode(SAMPLES[language]);
                setOutputCode('');
                setErrorMessage(null);
              }}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sample</span>
            </button>
            <button
              id="minifier-clear-btn"
              onClick={handleClear}
              className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-medium text-slate-600 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] text-slate-500 font-medium">Original Size</div>
            <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">{metrics.inBytes} bytes</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] text-slate-500 font-medium">Minified Size</div>
            <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">{metrics.outBytes} bytes</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="text-[11px] text-emerald-700 font-medium">Savings</div>
            <div className="text-sm font-bold text-emerald-800 font-mono mt-0.5">{metrics.savedBytes} bytes</div>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
            <div className="text-[11px] text-indigo-700 font-medium">Size Reduction</div>
            <div className="text-sm font-bold text-indigo-800 font-mono mt-0.5">
              {metrics.reductionPercent > 0 ? `-${metrics.reductionPercent}%` : '0%'}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <Info className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Main Two Column Textarea Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input Textarea */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label htmlFor="code-input" className="text-sm font-bold text-slate-900">
                Source Code ({language.toUpperCase()})
              </label>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                {metrics.inLines} lines
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.readText().then((txt) => setInputCode(txt)).catch(() => {});
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Paste clipboard
            </button>
          </div>

          <textarea
            id="code-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={`Paste raw ${language.toUpperCase()} code here...`}
            rows={14}
            className="w-full flex-1 p-4 rounded-xl border border-slate-300 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
          />

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Input: {metrics.inBytes} B</span>
            <button
              id="btn-minify-code"
              onClick={handleMinify}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Minify Code</span>
            </button>
          </div>
        </div>

        {/* Output Textarea */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label htmlFor="code-output" className="text-sm font-bold text-slate-900">
                Minified Output
              </label>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                {metrics.outLines} lines
              </span>
            </div>
            {metrics.reductionPercent > 0 && (
              <span className="text-xs font-semibold text-emerald-600">
                Saved {metrics.savedBytes} bytes (-{metrics.reductionPercent}%)
              </span>
            )}
          </div>

          <textarea
            id="code-output"
            readOnly
            value={outputCode}
            placeholder="Minified production code will appear here after clicking 'Minify Code'..."
            rows={14}
            className="w-full flex-1 p-4 rounded-xl border border-slate-300 bg-slate-950 text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
          />

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-500 font-mono">Output: {metrics.outBytes} B</span>
            <div className="flex items-center gap-2">
              <button
                id="btn-download-minified"
                onClick={handleDownload}
                disabled={!outputCode}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
              <button
                id="btn-copy-minified"
                onClick={handleCopy}
                disabled={!outputCode}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Ad Space (728x90) */}
      <AdPlaceholder format="728x90" />
    </div>
  );
};
