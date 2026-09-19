import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  Layers,
  Sparkles,
  Calculator,
  Compass,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface NicheProfile {
  name: string;
  category: string;
  profitScore: number;
  avgCpc: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Very High';
  adsenseRpm: string;
  affiliatePotential: 'Excellent' | 'High' | 'Moderate';
  topAffiliates: string[];
  intentDistribution: {
    informational: number;
    commercial: number;
    transactional: number;
    navigational: number;
  };
  recommendedPillars: string[];
  keyStrengths: string[];
}

const PRESET_NICHES: Record<string, NicheProfile> = {
  'personal-finance': {
    name: 'Personal Finance & Credit Cards',
    category: 'Finance',
    profitScore: 96,
    avgCpc: '$6.50 - $24.00',
    difficulty: 'Very High',
    adsenseRpm: '$35 - $65',
    affiliatePotential: 'Excellent',
    topAffiliates: ['Bankrate', 'Credit Karma', 'Rakuten', 'Brokerage Referral Programs'],
    intentDistribution: { informational: 40, commercial: 35, transactional: 20, navigational: 5 },
    recommendedPillars: [
      'Best Travel Rewards Credit Cards',
      'High Yield Savings Accounts Comparison',
      'Roth IRA & Index Fund Investing for Beginners',
      'Debt Consolidation Strategies',
    ],
    keyStrengths: ['Highest CPC in digital media', 'High lifetime value customer referrals', 'Evergreen organic demand'],
  },
  'ai-saas': {
    name: 'AI Productivity Software & SaaS',
    category: 'Technology',
    profitScore: 92,
    avgCpc: '$3.80 - $12.00',
    difficulty: 'Medium',
    adsenseRpm: '$22 - $45',
    affiliatePotential: 'Excellent',
    topAffiliates: ['Notion', 'Jasper', 'Make.com', 'Descript', 'Cursor'],
    intentDistribution: { informational: 35, commercial: 45, transactional: 15, navigational: 5 },
    recommendedPillars: [
      'Best AI Video Generators Compared',
      'Top AI Coding Assistants for Developers',
      'Automated Workflow Recipes with Make & Zapier',
      'AI Copywriting Software Alternatives',
    ],
    keyStrengths: ['Recurring monthly affiliate commissions', 'Exploding global search interest', 'B2B budget readiness'],
  },
  'home-fitness': {
    name: 'Home Gym Equipment & Calisthenics',
    category: 'Health & Fitness',
    profitScore: 84,
    avgCpc: '$1.80 - $4.50',
    difficulty: 'High',
    adsenseRpm: '$14 - $28',
    affiliatePotential: 'High',
    topAffiliates: ['Rogue Fitness', 'Amazon Associates', 'Bowflex', 'MyProtein'],
    intentDistribution: { informational: 45, commercial: 35, transactional: 15, navigational: 5 },
    recommendedPillars: [
      'Best Power Racks for Garage Gyms',
      'Adjustable Dumbbells In-Depth Review',
      '12-Week Bodyweight Progression Guide',
      'Gym Flooring & Soundproofing Guide',
    ],
    keyStrengths: ['High-ticket cart values ($500 - $3,000)', 'Passionate community', 'Visual video/social potential'],
  },
  'espresso-coffee': {
    name: 'Specialty Coffee & Espresso Machines',
    category: 'Lifestyle',
    profitScore: 78,
    avgCpc: '$1.20 - $3.20',
    difficulty: 'Medium',
    adsenseRpm: '$12 - $22',
    affiliatePotential: 'High',
    topAffiliates: ['Seattle Coffee Gear', 'Clive Coffee', 'Amazon Associates', 'Fellow Products'],
    intentDistribution: { informational: 40, commercial: 40, transactional: 15, navigational: 5 },
    recommendedPillars: [
      'Best Espresso Machines Under $500',
      'Conical vs Flat Burr Grinder Comparison',
      'Dialing In Espresso: Troubleshooting Bitter vs Sour',
      'Water Chemistry for Specialty Brewing',
    ],
    keyStrengths: ['High hobbyist willingness to invest', 'Strong visual and recipe content', 'Continuous consumable purchases (beans)'],
  },
  'pet-nutrition': {
    name: 'Organic Dog Food & Pet Wellness',
    category: 'Pets',
    profitScore: 81,
    avgCpc: '$2.10 - $5.50',
    difficulty: 'Medium',
    adsenseRpm: '$15 - $26',
    affiliatePotential: 'High',
    topAffiliates: ["The Farmer's Dog", 'Chewy', 'Ollie', 'Petco'],
    intentDistribution: { informational: 50, commercial: 30, transactional: 15, navigational: 5 },
    recommendedPillars: [
      'Fresh Dog Food Delivery Services Compared',
      'Best Grain-Free Kibble for Sensitive Stomachs',
      'Supplements for Aging Dogs with Arthritis',
      'Homemade Dog Food Vet-Approved Recipes',
    ],
    keyStrengths: ['Emotional purchase triggers', 'Subscription recurring order models', 'Broad demographic appeal'],
  },
};

export const NicheEvaluator: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('ai-saas');
  const [customNiche, setCustomNiche] = useState<string>('');

  // Profit Calculator State
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(30000);
  const [monetizationModel, setMonetizationModel] = useState<'affiliate' | 'adsense' | 'mixed'>('mixed');
  const [conversionRate, setConversionRate] = useState<number>(1.8);
  const [avgCommission, setAvgCommission] = useState<number>(45);
  const [customRpm, setCustomRpm] = useState<number>(24);

  const currentProfile: NicheProfile = useMemo(() => {
    if (customNiche.trim()) {
      // Dynamic profile generated from custom niche string
      let seed = 0;
      for (let i = 0; i < customNiche.length; i++) {
        seed = (seed + customNiche.charCodeAt(i)) % 100;
      }
      return {
        name: customNiche,
        category: 'Custom Research',
        profitScore: 70 + (seed % 28),
        avgCpc: `$${(1.5 + (seed % 8)).toFixed(2)} - $${(8.0 + (seed % 12)).toFixed(2)}`,
        difficulty: seed % 2 === 0 ? 'Medium' : 'High',
        adsenseRpm: `$${15 + (seed % 20)} - $${35 + (seed % 25)}`,
        affiliatePotential: 'High',
        topAffiliates: ['Direct Merchant Programs', 'ShareASale', 'Amazon Associates', 'Impact Radius'],
        intentDistribution: {
          informational: 40 + (seed % 10),
          commercial: 35,
          transactional: 15 + (seed % 10),
          navigational: 5,
        },
        recommendedPillars: [
          `Ultimate Buyer's Guide to ${customNiche}`,
          `Top 10 Common Mistakes in ${customNiche}`,
          `Best Tools & Resources for ${customNiche} in 2026`,
          `Cost Analysis & ROI Guide for ${customNiche}`,
        ],
        keyStrengths: ['Targeted audience engagement', 'Low broad competition', 'Focused affiliate conversions'],
      };
    }
    return PRESET_NICHES[selectedKey] || PRESET_NICHES['ai-saas'];
  }, [selectedKey, customNiche]);

  // Projected Income Calculations
  const calculatedIncome = useMemo(() => {
    // Ad revenue: (Traffic / 1000) * RPM
    const adRevenue = (monthlyTraffic / 1000) * customRpm;

    // Affiliate revenue: Traffic * (convRate / 100) * avgCommission
    const buyers = monthlyTraffic * (conversionRate / 100);
    const affiliateRevenue = buyers * avgCommission;

    let monthly = 0;
    if (monetizationModel === 'adsense') {
      monthly = adRevenue;
    } else if (monetizationModel === 'affiliate') {
      monthly = affiliateRevenue;
    } else {
      monthly = adRevenue * 0.4 + affiliateRevenue * 0.8;
    }

    return {
      monthly: Math.round(monthly),
      annual: Math.round(monthly * 12),
      adRevenue: Math.round(adRevenue),
      affiliateRevenue: Math.round(affiliateRevenue),
    };
  }, [monthlyTraffic, monetizationModel, conversionRate, avgCommission, customRpm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Market & Niche Intelligence
              </span>
              <span className="text-xs text-slate-500 font-medium">Affiliate & AdSense Strategy</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Niche Profitability & Competition Evaluator</h1>
            <p className="text-sm text-slate-600 mt-1">
              Analyze monetization potential, search intent breakdown, estimated CPC, and revenue forecasts before launching a niche website or product.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            {Object.entries(PRESET_NICHES).map(([k, p]) => (
              <button
                key={k}
                onClick={() => {
                  setCustomNiche('');
                  setSelectedKey(k);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  selectedKey === k && !customNiche
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Custom search / input */}
        <div className="mt-5 flex gap-2">
          <input
            type="text"
            value={customNiche}
            onChange={(e) => setCustomNiche(e.target.value)}
            placeholder="Or enter any custom niche (e.g. Mechanical Keyboards, Hydroponics, Solar Generators)..."
            className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-500 outline-none bg-white"
          />
          {customNiche && (
            <button
              onClick={() => setCustomNiche('')}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
            >
              Reset to Presets
            </button>
          )}
        </div>
      </div>

      {/* Main Analysis Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Niche Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Scorecard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Profit Score
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-indigo-600">{currentProfile.profitScore}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Average CPC
              </span>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">
                {currentProfile.avgCpc}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                SEO Difficulty
              </span>
              <div className="mt-1">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    currentProfile.difficulty === 'Very High'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : currentProfile.difficulty === 'High'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {currentProfile.difficulty}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                AdSense RPM
              </span>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">
                {currentProfile.adsenseRpm}
              </div>
            </div>
          </div>

          {/* Search Intent Distribution Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Keyword Search Intent Breakdown
              </span>
              <span className="text-xs text-slate-500 font-medium">Buyer readiness</span>
            </div>

            {/* Segmented Bar */}
            <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${currentProfile.intentDistribution.informational}%` }}
                className="bg-sky-500 h-full transition-all"
                title={`Informational: ${currentProfile.intentDistribution.informational}%`}
              />
              <div
                style={{ width: `${currentProfile.intentDistribution.commercial}%` }}
                className="bg-indigo-600 h-full transition-all"
                title={`Commercial: ${currentProfile.intentDistribution.commercial}%`}
              />
              <div
                style={{ width: `${currentProfile.intentDistribution.transactional}%` }}
                className="bg-emerald-500 h-full transition-all"
                title={`Transactional: ${currentProfile.intentDistribution.transactional}%`}
              />
              <div
                style={{ width: `${currentProfile.intentDistribution.navigational}%` }}
                className="bg-slate-400 h-full transition-all"
                title={`Navigational: ${currentProfile.intentDistribution.navigational}%`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span className="text-slate-600">
                  Info ({currentProfile.intentDistribution.informational}%)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-slate-600 font-medium">
                  Commercial ({currentProfile.intentDistribution.commercial}%)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 font-medium">
                  Transactional ({currentProfile.intentDistribution.transactional}%)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-slate-600">
                  Nav ({currentProfile.intentDistribution.navigational}%)
                </span>
              </div>
            </div>
          </div>

          {/* Recommended Pillar Content Strategy */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Recommended Pillar & Cluster Topics</span>
            </span>

            <div className="space-y-2">
              {currentProfile.recommendedPillars.map((topic, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs hover:bg-indigo-50/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{topic}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    High Search Intent
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Affiliate Programs & Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Top Monetization Channels
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentProfile.topAffiliates.map((aff, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{aff}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Market Advantages
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentProfile.keyStrengths.map((str, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Interactive Revenue Projection Calculator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                  Niche Revenue Calculator
                </span>
              </div>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-indigo-100">
                Simulation Model
              </span>
            </div>

            {/* Big Projected Earnings Display */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
              <span className="text-xs text-indigo-200 block">Estimated Monthly Revenue</span>
              <div className="text-3xl font-black text-white mt-1">
                ${calculatedIncome.monthly.toLocaleString()}
                <span className="text-xs font-normal text-indigo-200 ml-1">/ month</span>
              </div>
              <div className="text-xs text-indigo-300 mt-1 flex items-center justify-between">
                <span>Annualized Run-Rate:</span>
                <span className="font-bold text-white">
                  ${calculatedIncome.annual.toLocaleString()} / year
                </span>
              </div>
            </div>

            {/* Calculator Controls */}
            <div className="space-y-4 text-xs">
              {/* Traffic slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300">Target Monthly Traffic</span>
                  <span className="font-bold text-white font-mono">
                    {monthlyTraffic.toLocaleString()} visitors
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="2000"
                  value={monthlyTraffic}
                  onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
              </div>

              {/* Monetization Model */}
              <div>
                <span className="text-slate-300 block mb-1.5">Primary Model</span>
                <div className="grid grid-cols-3 gap-1.5 bg-black/30 p-1 rounded-lg">
                  <button
                    onClick={() => setMonetizationModel('mixed')}
                    className={`py-1.5 rounded-md font-semibold text-[11px] transition-colors ${
                      monetizationModel === 'mixed'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hybrid (Ads + Aff)
                  </button>
                  <button
                    onClick={() => setMonetizationModel('affiliate')}
                    className={`py-1.5 rounded-md font-semibold text-[11px] transition-colors ${
                      monetizationModel === 'affiliate'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Affiliate Only
                  </button>
                  <button
                    onClick={() => setMonetizationModel('adsense')}
                    className={`py-1.5 rounded-md font-semibold text-[11px] transition-colors ${
                      monetizationModel === 'adsense'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    AdSense Only
                  </button>
                </div>
              </div>

              {/* Affiliate sliders if applicable */}
              {monetizationModel !== 'adsense' && (
                <div className="space-y-3 pt-1 border-t border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300">Affiliate Conversion Rate</span>
                      <span className="font-bold text-white font-mono">{conversionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300">Avg Affiliate Payout / Order</span>
                      <span className="font-bold text-white font-mono">${avgCommission}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="250"
                      step="5"
                      value={avgCommission}
                      onChange={(e) => setAvgCommission(Number(e.target.value))}
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Display Ad RPM */}
              {monetizationModel !== 'affiliate' && (
                <div className="pt-1 border-t border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300">Ad RPM (Per 1,000 Visitors)</span>
                    <span className="font-bold text-white font-mono">${customRpm}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={customRpm}
                    onChange={(e) => setCustomRpm(Number(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
