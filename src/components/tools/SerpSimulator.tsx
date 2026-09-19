import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Copy,
  Check,
  Star,
  Sparkles,
  RotateCcw,
  Globe,
  ExternalLink,
} from 'lucide-react';

export const SerpSimulator: React.FC = () => {
  const [title, setTitle] = useState('10 Best SEO Tools for 2026: Boost Your Search Rankings');
  const [description, setDescription] = useState(
    'Discover the ultimate list of free and premium SEO tools to supercharge your organic rankings, track keywords, perform on-page audits, and drive qualified web traffic.'
  );
  const [url, setUrl] = useState('https://www.mysite.com/blog/seo-tools-guide');
  const [siteName, setSiteName] = useState('MySite SEO');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showRating, setShowRating] = useState<boolean>(true);
  const [ratingVal, setRatingVal] = useState<number>(4.9);
  const [reviewsCount, setReviewsCount] = useState<number>(142);
  const [showDate, setShowDate] = useState<boolean>(true);
  const [publishDate, setPublishDate] = useState('May 15, 2026');
  const [copied, setCopied] = useState<boolean>(false);

  // Approximate pixel width calculations
  // Average proportional width per char in Arial / Roboto is ~9.2px for title (20px font) and ~7.5px for description (14px font)
  const titlePixelWidth = Math.round(title.length * 9.2);
  const maxTitlePixels = 580;
  const isTitleOver = titlePixelWidth > maxTitlePixels;

  const descPixelWidth = Math.round(description.length * 7.5);
  const maxDescPixels = viewMode === 'mobile' ? 750 : 960;
  const isDescOver = descPixelWidth > maxDescPixels;

  // Breadcrumbs representation
  const formatBreadcrumb = (rawUrl: string) => {
    try {
      const u = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      const parts = u.pathname.split('/').filter(Boolean);
      if (!parts.length) return `${u.origin}`;
      return `${u.hostname} › ${parts.join(' › ')}`;
    } catch {
      return rawUrl.replace(/^https?:\/\//, '').replace(/\//g, ' › ');
    }
  };

  const generatedHtml = `<title>${title}</title>\n<meta name="description" content="${description}" />\n<link rel="canonical" href="${url}" />`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPreset = (type: 'blog' | 'product' | 'saas') => {
    if (type === 'blog') {
      setTitle('How to Do Keyword Research in 2026 (Beginner Friendly Guide)');
      setDescription('Learn the exact step-by-step keyword research process top marketers use to find low-competition, high-ROI search queries and rank #1 on Google.');
      setUrl('https://www.mysite.com/blog/keyword-research-guide');
      setSiteName('GrowthHub');
      setShowRating(false);
      setShowDate(true);
    } else if (type === 'product') {
      setTitle('Ergonomic Mechanical Keyboard with RGB Backlight - Free Shipping');
      setDescription('Buy the award-winning Wireless Ergonomic Mechanical Keyboard. Features hot-swappable switches, sound dampening foam, 200hr battery life, and 2-year warranty.');
      setUrl('https://www.gearstore.com/keyboards/ergonomic-pro-wireless');
      setSiteName('GearStore');
      setShowRating(true);
      setRatingVal(4.8);
      setReviewsCount(310);
      setShowDate(false);
    } else {
      setTitle('All-in-One Developer & SEO Toolkit - Free Online Utilities');
      setDescription('Access over 15+ browser-based utilities including meta tag analyzer, code minifier, JSON validator, speed audits, and keyword deduplication tools.');
      setUrl('https://www.devseotools.com');
      setSiteName('DevSEO Tools');
      setShowRating(true);
      setRatingVal(5.0);
      setReviewsCount(94);
      setShowDate(false);
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
                SERP & CTR Optimization
              </span>
              <span className="text-xs text-slate-500 font-medium">Google Search Preview</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Google SERP Snippet Simulator</h1>
            <p className="text-sm text-slate-600 mt-1">
              Visualize how your web pages will appear in Google search results on desktop and mobile screens. Prevent title cuts and optimize Click-Through Rates (CTR).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Presets:</span>
            <button
              onClick={() => loadPreset('blog')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => loadPreset('product')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => loadPreset('saas')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              SaaS
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs & Form Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Snippet Content Configuration
            </h2>

            {/* Site Name & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Site Brand / Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="e.g. My Website"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Page URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Title Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">SEO Page Title</label>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className={title.length >= 50 && title.length <= 60 ? 'text-emerald-600 font-semibold' : 'text-slate-500'}>
                    {title.length} chars (opt. 50-60)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className={isTitleOver ? 'text-amber-600 font-semibold' : 'text-slate-500'}>
                    ~{titlePixelWidth}px / {maxTitlePixels}px
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title tag..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    titlePixelWidth <= maxTitlePixels ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (titlePixelWidth / maxTitlePixels) * 100)}%` }}
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Meta Description</label>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className={description.length >= 120 && description.length <= 160 ? 'text-emerald-600 font-semibold' : 'text-slate-500'}>
                    {description.length} chars (opt. 120-160)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className={isDescOver ? 'text-amber-600 font-semibold' : 'text-slate-500'}>
                    ~{descPixelWidth}px / {maxDescPixels}px
                  </span>
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter meta description..."
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
              />
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    descPixelWidth <= maxDescPixels ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (descPixelWidth / maxDescPixels) * 100)}%` }}
                />
              </div>
            </div>

            {/* Rich Features Toggle */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Rich Snippet Options</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Rating toggle */}
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRating}
                      onChange={(e) => setShowRating(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Review Star Rating</span>
                  </label>
                  {showRating && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={ratingVal}
                        onChange={(e) => setRatingVal(Number(e.target.value))}
                        className="w-16 px-1.5 py-1 text-xs border rounded bg-white text-slate-800"
                      />
                      <span className="text-slate-400">Score</span>
                      <input
                        type="number"
                        value={reviewsCount}
                        onChange={(e) => setReviewsCount(Number(e.target.value))}
                        className="w-18 px-1.5 py-1 text-xs border rounded bg-white text-slate-800 ml-auto"
                      />
                      <span className="text-slate-400">Reviews</span>
                    </div>
                  )}
                </div>

                {/* Date toggle */}
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showDate}
                      onChange={(e) => setShowDate(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Publish Date Prefix</span>
                  </label>
                  {showDate && (
                    <div className="pt-1">
                      <input
                        type="text"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        placeholder="e.g. May 15, 2026"
                        className="w-full px-2 py-1 text-xs border rounded bg-white text-slate-800"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Generated Meta Code */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ready HTML Meta Tags</span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed">
              {generatedHtml}
            </pre>
          </div>
        </div>

        {/* Right: Live Simulated Google Search Interface */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Google SERP
                </span>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    viewMode === 'desktop'
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google Search Browser Mockup */}
            <div className="mt-4 p-4 sm:p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl">
              {/* Simulated Search Header */}
              <div className="mb-4 pb-3 border-b border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-blue-600 font-bold text-sm tracking-tight">G</span>
                  <span className="text-slate-600 truncate max-w-[200px]">{title.slice(0, 28)}...</span>
                </div>
                <span>About 4,210,000 results (0.34s)</span>
              </div>

              {/* SERP Item Container */}
              <div
                className={`bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all ${
                  viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                }`}
              >
                {/* 1. Favicon & URL / Breadcrumb */}
                <div className="flex items-center gap-2 text-xs mb-1">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 leading-tight truncate">
                      {siteName || 'Example Domain'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {formatBreadcrumb(url)}
                    </div>
                  </div>
                </div>

                {/* 2. Title Link */}
                <div className="mt-1">
                  <h3
                    className="text-base sm:text-lg font-normal text-indigo-900 hover:underline cursor-pointer leading-snug break-words"
                    style={{ fontFamily: 'arial, sans-serif' }}
                  >
                    {title.length > 65 ? `${title.slice(0, 62)}...` : title}
                  </h3>
                </div>

                {/* 3. Rich Review Rating if active */}
                {showRating && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-700">Rating: {ratingVal}</span>
                    <span className="text-slate-400">({reviewsCount} reviews)</span>
                  </div>
                )}

                {/* 4. Description Snippet */}
                <div className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed break-words" style={{ fontFamily: 'arial, sans-serif' }}>
                  {showDate && (
                    <span className="text-slate-500 font-medium mr-1.5">
                      {publishDate} —
                    </span>
                  )}
                  <span>
                    {description.length > 165 ? `${description.slice(0, 160)}...` : description}
                  </span>
                </div>
              </div>

              {/* Warnings / Advice */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2">
                {isTitleOver && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    ⚠️ <strong>Title Warning:</strong> Estimated pixel width ({titlePixelWidth}px) exceeds the ~580px desktop cutoff and may be truncated with ellipsis (...) on Google.
                  </div>
                )}
                {isDescOver && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    ⚠️ <strong>Description Warning:</strong> Estimated width ({descPixelWidth}px) is longer than typical snippet viewports and may cut off midway.
                  </div>
                )}
                {!isTitleOver && !isDescOver && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    ✓ <strong>Optimal Dimensions:</strong> Title and meta description lengths are within Google desktop and mobile boundaries.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
