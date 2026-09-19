import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardGrid } from './components/DashboardGrid';
import { KeywordDuplicateRemover } from './components/tools/KeywordDuplicateRemover';
import { CodeMinifier } from './components/tools/CodeMinifier';
import { MetaTagAnalyzer } from './components/tools/MetaTagAnalyzer';
import { SpeedTest } from './components/tools/SpeedTest';
import { KeywordDensityAnalyzer } from './components/tools/KeywordDensityAnalyzer';
import { SerpSimulator } from './components/tools/SerpSimulator';
import { RobotsSitemapGenerator } from './components/tools/RobotsSitemapGenerator';
import { OgGenerator } from './components/tools/OgGenerator';
import { RedirectChecker } from './components/tools/RedirectChecker';
import { NicheEvaluator } from './components/tools/NicheEvaluator';
import { KeywordCombiner } from './components/tools/KeywordCombiner';
import { GoogleDorks } from './components/tools/GoogleDorks';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { Base64Tool } from './components/tools/Base64Tool';
import { UrlEncoder } from './components/tools/UrlEncoder';
import { CssGenerator } from './components/tools/CssGenerator';
import { ToolId } from './types';
import { TOOLS_LIST } from './data/toolsData';
import { ChevronRight, Home, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTool, setCurrentTool] = useState<ToolId | 'home'>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeToolData = TOOLS_LIST.find((t) => t.id === currentTool);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sticky Top Navigation Bar */}
      <Navbar
        currentTool={currentTool}
        onSelectTool={setCurrentTool}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Modern Sidebar for navigation */}
      <Sidebar
        currentTool={currentTool}
        onSelectTool={setCurrentTool}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col transition-all duration-200">
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Breadcrumb Bar */}
          <nav
            id="breadcrumb-nav"
            className="flex items-center gap-2 text-xs text-slate-500 py-1"
            aria-label="Breadcrumbs"
          >
            <button
              onClick={() => setCurrentTool('home')}
              className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            {currentTool !== 'home' && activeToolData && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button
                  onClick={() => setCurrentTool('home')}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {activeToolData.category}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-800">{activeToolData.title}</span>
              </>
            )}
          </nav>

          {/* Active Tool or Homepage Component */}
          {currentTool === 'home' && (
            <DashboardGrid onSelectTool={(id) => setCurrentTool(id)} />
          )}

          {/* Core SEO Tools */}
          {currentTool === 'keyword-remover' && <KeywordDuplicateRemover />}
          {currentTool === 'meta-analyzer' && <MetaTagAnalyzer />}
          {currentTool === 'keyword-density' && <KeywordDensityAnalyzer />}
          {currentTool === 'serp-simulator' && <SerpSimulator />}
          {currentTool === 'robots-sitemap-gen' && <RobotsSitemapGenerator />}
          {currentTool === 'og-generator' && <OgGenerator />}
          {currentTool === 'redirect-checker' && <RedirectChecker />}

          {/* Niche Research Tools */}
          {currentTool === 'niche-evaluator' && <NicheEvaluator />}
          {currentTool === 'keyword-combiner' && <KeywordCombiner />}
          {currentTool === 'google-dorks' && <GoogleDorks />}

          {/* Developer Utilities */}
          {currentTool === 'code-minifier' && <CodeMinifier />}
          {currentTool === 'json-formatter' && <JsonFormatter />}
          {currentTool === 'base64-tool' && <Base64Tool />}
          {currentTool === 'url-encoder' && <UrlEncoder />}
          {currentTool === 'css-generator' && <CssGenerator />}

          {/* Performance & Health */}
          {currentTool === 'speed-test' && <SpeedTest />}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">DevSEO Tools</span>
              <span>— Free Developer & Marketer Utilities</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Log Privacy Guarantee</span>
              </span>
              <span>•</span>
              <span>Google AdSense & Affiliate Ready</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
