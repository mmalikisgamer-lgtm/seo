import React, { useState } from 'react';
import {
  FileKey,
  Copy,
  Check,
  Upload,
  ArrowRightLeft,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Code,
} from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'text' | 'image'>('text');

  // Text state
  const [plainText, setPlainText] = useState<string>(
    'DevSEO Tools: High-Performance Web Developer and SEO Utilities'
  );
  const [base64Text, setBase64Text] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Image / File state
  const [imageFile, setImageFile] = useState<{
    name: string;
    size: number;
    type: string;
    dataUri: string;
  } | null>(null);

  // Auto-sync text to base64
  React.useEffect(() => {
    try {
      // UTF-8 safe encode
      const encoded = btoa(unescape(encodeURIComponent(plainText)));
      setBase64Text(encoded);
    } catch {
      setBase64Text('');
    }
  }, [plainText]);

  const handleBase64Change = (val: string) => {
    setBase64Text(val);
    try {
      const decoded = decodeURIComponent(escape(atob(val)));
      setPlainText(decoded);
    } catch {
      // keep plainText as is while user is editing
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageFile({
        name: file.name,
        size: file.size,
        type: file.type || 'image/png',
        dataUri: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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
              <span className="text-xs text-slate-500 font-medium">Encoding & Data URI</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Base64 & Data URI Studio</h1>
            <p className="text-sm text-slate-600 mt-1">
              Encode and decode UTF-8 text strings, or convert images, SVGs, and favicon icons directly into Data URIs for zero-HTTP-request CSS and HTML embedding.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveMode('text')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeMode === 'text' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Text Encoder / Decoder
            </button>
            <button
              onClick={() => setActiveMode('image')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeMode === 'image' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Image to Data URI
            </button>
          </div>
        </div>
      </div>

      {/* --- TEXT ENCODE / DECODE --- */}
      {activeMode === 'text' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plaintext Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Plain Text (UTF-8)
              </span>
              <button
                onClick={() => copyToClipboard(plainText, 'plain')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600"
              >
                {copiedKey === 'plain' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'plain' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              rows={12}
              placeholder="Enter or paste plain text here..."
              className="w-full p-3 text-xs font-sans rounded-xl border border-slate-300 focus:border-indigo-500 outline-none leading-relaxed resize-y"
            />
          </div>

          {/* Base64 Output Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Base64 Encoded String
              </span>
              <button
                onClick={() => copyToClipboard(base64Text, 'base64')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600"
              >
                {copiedKey === 'base64' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'base64' ? 'Copied' : 'Copy Base64'}</span>
              </button>
            </div>
            <textarea
              value={base64Text}
              onChange={(e) => handleBase64Change(e.target.value)}
              rows={12}
              placeholder="Base64 encoded string will appear here or paste base64 to decode..."
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 bg-slate-900 text-emerald-400 outline-none leading-relaxed resize-y shadow-inner"
            />
          </div>
        </div>
      )}

      {/* --- IMAGE TO DATA URI --- */}
      {activeMode === 'image' && (
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-400 transition-colors text-center cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                Click to browse or drag and drop an image
              </span>
              <span className="text-xs text-slate-500">
                Supports PNG, JPG, WebP, SVG, and GIF files
              </span>
            </div>
          </div>

          {imageFile && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Preview */}
              <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Image Preview
                </span>
                <div className="w-full aspect-video bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 p-2">
                  <img
                    src={imageFile.dataUri}
                    alt={imageFile.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">File Name:</span>
                    <span className="font-semibold truncate max-w-[150px]">{imageFile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">File Size:</span>
                    <span className="font-mono">{(imageFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">MIME Type:</span>
                    <span className="font-mono">{imageFile.type}</span>
                  </div>
                </div>
              </div>

              {/* Ready Code Snippets */}
              <div className="lg:col-span-8 space-y-4">
                {/* 1. Full Data URI */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      1. Raw Data URI
                    </span>
                    <button
                      onClick={() => copyToClipboard(imageFile.dataUri, 'dataUri')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md"
                    >
                      {copiedKey === 'dataUri' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'dataUri' ? 'Copied' : 'Copy URI'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-sky-300 font-mono text-[11px] rounded-xl overflow-x-auto max-h-24">
                    {imageFile.dataUri.slice(0, 300)}...
                  </pre>
                </div>

                {/* 2. HTML <img> Tag */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      2. HTML &lt;img&gt; Tag
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<img src="${imageFile.dataUri}" alt="${imageFile.name}" />`,
                          'htmlImg'
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md"
                    >
                      {copiedKey === 'htmlImg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'htmlImg' ? 'Copied' : 'Copy HTML'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto">
                    {`<img src="${imageFile.dataUri.slice(0, 80)}..." alt="${imageFile.name}" />`}
                  </pre>
                </div>

                {/* 3. CSS background-image */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      3. CSS background-image
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(`background-image: url("${imageFile.dataUri}");`, 'cssBg')
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md"
                    >
                      {copiedKey === 'cssBg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'cssBg' ? 'Copied' : 'Copy CSS'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-amber-300 font-mono text-[11px] rounded-xl overflow-x-auto">
                    {`background-image: url("${imageFile.dataUri.slice(0, 80)}...");`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
