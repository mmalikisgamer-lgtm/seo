import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';

export const OgGenerator: React.FC = () => {
  const [title, setTitle] = useState('Mastering Modern SEO & Full-Stack Development in 2026');
  const [description, setDescription] = useState(
    'A comprehensive handbook covering on-page optimization, technical Core Web Vitals, API building, and keyword growth strategies.'
  );
  const [url, setUrl] = useState('https://www.devseotools.com/guide/mastering-seo');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80'
  );
  const [siteName, setSiteName] = useState('DevSEO Tools');
  const [twitterHandle, setTwitterHandle] = useState('@devseotools');
  const [twitterCard, setTwitterCard] = useState<'summary_large_image' | 'summary'>('summary_large_image');
  const [previewPlatform, setPreviewPlatform] = useState<'facebook' | 'twitter' | 'linkedin'>('twitter');
  const [copied, setCopied] = useState<boolean>(false);

  const cleanDomain = React.useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'example.com';
    }
  }, [url]);

  const generatedHtml = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:site" content="${twitterHandle}" />
<meta name="twitter:creator" content="${twitterHandle}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setTitle('DevSEO Tools - 16+ Free Developer & SEO Utilities');
    setDescription('High-performance browser tools for keyword density, code minification, SERP simulation, Google dorks, and speed audits.');
    setUrl('https://www.devseotools.com');
    setImageUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80');
    setSiteName('DevSEO Tools');
    setTwitterHandle('@devseotools');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Social Meta Optimization
              </span>
              <span className="text-xs text-slate-500 font-medium">OpenGraph & Twitter Card</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">OpenGraph & Social Card Studio</h1>
            <p className="text-sm text-slate-600 mt-1">
              Design, test, and generate social share cards for Facebook, X (Twitter), and LinkedIn to maximize social engagement and click-through rates.
            </p>
          </div>

          <button
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors self-start md:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Load Sample Data</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Social Metadata Configuration
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Social Title (og:title)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title that appears when shared on social media"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Social Description (og:description)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="2-3 sentence teaser to encourage clicks"
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Canonical Page URL (og:url)
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>Social Share Image URL (og:image)</span>
                <span className="text-[10px] text-slate-400">Rec: 1200 x 630 px</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/social-cover.jpg"
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Brand Name"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">X / Twitter Handle</label>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@username"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Twitter Card</label>
                <select
                  value={twitterCard}
                  onChange={(e: any) => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white outline-none"
                >
                  <option value="summary_large_image">Large Image</option>
                  <option value="summary">Small Thumbnail</option>
                </select>
              </div>
            </div>
          </div>

          {/* Copyable HTML code */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Ready-to-Paste Meta Tags
              </span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Tags'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-sky-300 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed shadow-inner">
              {generatedHtml}
            </pre>
          </div>
        </div>

        {/* Right: Live Social Card Mockups */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* Platform Selector */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Live Card Preview
              </span>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setPreviewPlatform('twitter')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    previewPlatform === 'twitter'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  X (Twitter)
                </button>
                <button
                  onClick={() => setPreviewPlatform('facebook')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    previewPlatform === 'facebook'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Facebook
                </button>
                <button
                  onClick={() => setPreviewPlatform('linkedin')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    previewPlatform === 'linkedin'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Simulated Platform Card */}
            <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
              {/* --- TWITTER / X PREVIEW --- */}
              {previewPlatform === 'twitter' && (
                <div className="bg-black text-white p-4 rounded-2xl max-w-md mx-auto shadow-md">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">
                      {siteName.charAt(0) || 'D'}
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1">
                        <span>{siteName}</span>
                        <span className="text-slate-500 font-normal">{twitterHandle}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Just now</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 mb-3">
                    Excited to share our latest release! Check it out below:
                  </p>

                  {/* Card Box */}
                  <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#16181c]">
                    <div className="relative aspect-[1.91/1] w-full bg-slate-800 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e: any) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                          <ImageIcon className="w-6 h-6 mr-2" /> No image specified
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white backdrop-blur-xs">
                        {cleanDomain}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-bold text-white line-clamp-1">{title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{description}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- FACEBOOK PREVIEW --- */}
              {previewPlatform === 'facebook' && (
                <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-200 max-w-md mx-auto shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      {siteName.charAt(0) || 'F'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{siteName}</div>
                      <div className="text-[10px] text-slate-400">Published by Page • 2 hrs</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 mb-3 leading-relaxed">
                    Check out our newest article and resources for developers and marketers:
                  </p>

                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <div className="aspect-[1.91/1] w-full bg-slate-200 overflow-hidden">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-3 bg-[#f0f2f5] border-t border-slate-200">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                        {cleanDomain}
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">{title}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{description}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- LINKEDIN PREVIEW --- */}
              {previewPlatform === 'linkedin' && (
                <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-200 max-w-md mx-auto shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-sm bg-[#0a66c2] text-white flex items-center justify-center font-bold text-xs">
                      in
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{siteName}</div>
                      <div className="text-[10px] text-slate-400">1,420 followers • Promoted</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 mb-3">
                    Sharing high-value insights on search strategy and tech workflows. Read more below:
                  </p>

                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <div className="aspect-[1.91/1] w-full bg-slate-200 overflow-hidden">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-200">
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{title}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{cleanDomain} • 4 min read</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
