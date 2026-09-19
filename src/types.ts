export type ToolId =
  | 'keyword-remover'
  | 'code-minifier'
  | 'meta-analyzer'
  | 'speed-test'
  | 'keyword-density'
  | 'robots-sitemap-gen'
  | 'serp-simulator'
  | 'og-generator'
  | 'redirect-checker'
  | 'niche-evaluator'
  | 'keyword-combiner'
  | 'google-dorks'
  | 'json-formatter'
  | 'base64-tool'
  | 'url-encoder'
  | 'css-generator';

export type ToolCategory = 'SEO Tools' | 'Niche Research' | 'Developer Utilities' | 'Performance';

export interface ToolItem {
  id: ToolId;
  title: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  icon: string;
  badge?: string;
  isPopular?: boolean;
}

export interface MetaTagAnalysisResult {
  url: string;
  domain: string;
  responseTime: number;
  statusCode: number;
  overallScore: number;
  meta: {
    title: string;
    titleLength: number;
    titleStatus: 'optimal' | 'suboptimal' | 'missing';
    description: string;
    descriptionLength: number;
    descriptionStatus: 'optimal' | 'suboptimal' | 'missing';
    canonical: string;
    robots: string;
    charset: string;
    viewport: string;
  };
  social: {
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  headings: {
    h1Count: number;
    h1Items: string[];
    h2Count: number;
    h2Items: string[];
  };
  images: {
    total: number;
    missingAltCount: number;
    missingAltSample: { src: string; fallbackText?: string }[];
  };
  issues: {
    type: 'error' | 'warning' | 'success';
    message: string;
  }[];
}

export interface SpeedTestResult {
  url: string;
  strategy: 'mobile' | 'desktop';
  fetchTime: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    fcp: string;
    lcp: string;
    tbt: string;
    cls: string;
    si: string;
  };
  opportunities: {
    title: string;
    savings: string;
    score?: number;
  }[];
  source: string;
}
