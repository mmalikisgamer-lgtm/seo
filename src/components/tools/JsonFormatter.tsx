import React, { useState } from 'react';
import {
  Braces,
  Check,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  FileSpreadsheet,
  AlertCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';

const SAMPLE_JSON = `{
  "status": "success",
  "data": {
    "website": "DevSEO Tools",
    "url": "https://www.devseotools.com",
    "metrics": {
      "performance": 98,
      "seo": 100,
      "accessibility": 95
    },
    "features": [
      "Meta Tag Analyzer",
      "Keyword Duplicate Remover",
      "Code Minifier",
      "Speed Audit"
    ],
    "isActive": true
  }
}`;

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>(SAMPLE_JSON);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [csvOutput, setCsvOutput] = useState<string | null>(null);

  const handleFormat = () => {
    setErrorMessage(null);
    setCsvOutput(null);
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, indentSize));
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid JSON syntax.');
    }
  };

  const handleMinify = () => {
    setErrorMessage(null);
    setCsvOutput(null);
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid JSON syntax.');
    }
  };

  const handleConvertToCsv = () => {
    setErrorMessage(null);
    try {
      let parsed = JSON.parse(inputJson);
      if (!Array.isArray(parsed)) {
        if (typeof parsed === 'object' && parsed !== null) {
          // Wrap single object or check if there is an array property
          const arrayProp = Object.values(parsed).find((v) => Array.isArray(v));
          if (arrayProp && Array.isArray(arrayProp)) {
            parsed = arrayProp;
          } else {
            parsed = [parsed];
          }
        }
      }

      if (!Array.isArray(parsed) || !parsed.length) {
        setErrorMessage('JSON must be an array of objects to convert to CSV.');
        return;
      }

      // Extract unique keys
      const headers = Array.from(
        new Set(parsed.flatMap((item) => (typeof item === 'object' && item !== null ? Object.keys(item) : [])))
      );

      if (!headers.length) {
        setErrorMessage('Could not extract table headers from JSON elements.');
        return;
      }

      const csvRows: string[] = [];
      csvRows.push(headers.join(','));

      parsed.forEach((row) => {
        const values = headers.map((header) => {
          let val = row[header];
          if (val === undefined || val === null) return '""';
          if (typeof val === 'object') val = JSON.stringify(val);
          const escaped = ('' + val).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      });

      setCsvOutput(csvRows.join('\n'));
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to parse JSON for CSV conversion.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput || inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const isCsv = !!csvOutput;
    const content = csvOutput || inputJson;
    const blob = new Blob([content], {
      type: isCsv ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isCsv ? 'converted-data.csv' : 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
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
              <span className="text-xs text-slate-500 font-medium">Syntax Validation & CSV</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">JSON Formatter, Validator & Minifier</h1>
            <p className="text-sm text-slate-600 mt-1">
              Beautify nested JSON payloads, fix broken structure, validate parsing errors, compress for production, or export to CSV.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setInputJson(SAMPLE_JSON);
                setErrorMessage(null);
                setCsvOutput(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={() => {
                setInputJson('');
                setErrorMessage(null);
                setCsvOutput(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFormat}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Beautify / Format</span>
            </button>

            <button
              onClick={handleMinify}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Minify</span>
            </button>

            <button
              onClick={handleConvertToCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Convert to CSV</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 ml-2">
              <span>Indent:</span>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-2 py-1 text-xs rounded border border-slate-200 bg-white"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!inputJson.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!inputJson.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span><strong>Syntax Error:</strong> {errorMessage}</span>
          </div>
        )}

        {csvOutput && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
            <span>✓ JSON successfully converted to CSV table format! Preview below or click Download.</span>
            <button
              onClick={() => setCsvOutput(null)}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Back to JSON
            </button>
          </div>
        )}
      </div>

      {/* Editor Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono">{csvOutput ? 'CSV Output' : 'JSON Payload'}</span>
          <span>{inputJson.length.toLocaleString()} characters ({new Blob([inputJson]).size} bytes)</span>
        </div>

        <textarea
          value={csvOutput || inputJson}
          onChange={(e) => {
            if (csvOutput) setCsvOutput(e.target.value);
            else setInputJson(e.target.value);
          }}
          rows={18}
          className="w-full p-4 font-mono text-xs text-slate-900 bg-slate-900 text-emerald-400 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner leading-relaxed resize-y"
          placeholder="Paste or type JSON here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};
