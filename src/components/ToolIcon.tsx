import React from 'react';
import {
  ListFilter,
  FileCode2,
  SearchCheck,
  Gauge,
  Hash,
  LayoutTemplate,
  Bot,
  Share2,
  ArrowRightLeft,
  TrendingUp,
  Shuffle,
  Binary,
  Braces,
  FileKey,
  Link,
  Palette,
  Wrench,
} from 'lucide-react';
import { ToolId } from '../types';

interface ToolIconProps {
  id: ToolId | string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ id, className = 'w-4 h-4' }) => {
  switch (id) {
    case 'meta-analyzer':
      return <SearchCheck className={className} />;
    case 'keyword-density':
      return <Hash className={className} />;
    case 'serp-simulator':
      return <LayoutTemplate className={className} />;
    case 'robots-sitemap-gen':
      return <Bot className={className} />;
    case 'og-generator':
      return <Share2 className={className} />;
    case 'redirect-checker':
      return <ArrowRightLeft className={className} />;
    case 'niche-evaluator':
      return <TrendingUp className={className} />;
    case 'keyword-combiner':
      return <Shuffle className={className} />;
    case 'google-dorks':
      return <Binary className={className} />;
    case 'code-minifier':
      return <FileCode2 className={className} />;
    case 'json-formatter':
      return <Braces className={className} />;
    case 'base64-tool':
      return <FileKey className={className} />;
    case 'url-encoder':
      return <Link className={className} />;
    case 'css-generator':
      return <Palette className={className} />;
    case 'speed-test':
      return <Gauge className={className} />;
    case 'keyword-remover':
      return <ListFilter className={className} />;
    default:
      return <Wrench className={className} />;
  }
};
