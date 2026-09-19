import React, { useState, useMemo } from 'react';
import {
  Palette,
  Box,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface ShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

export const CssGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shadow' | 'gradient'>('shadow');

  // Box Shadow state
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: '1', x: 0, y: 10, blur: 25, spread: -5, color: '#000000', opacity: 0.1, inset: false },
    { id: '2', x: 0, y: 8, blur: 10, spread: -6, color: '#000000', opacity: 0.1, inset: false },
  ]);
  const [boxRadius, setBoxRadius] = useState<number>(16);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Gradient state
  const [gradType, setGradType] = useState<'linear' | 'radial'>('linear');
  const [gradAngle, setGradAngle] = useState<number>(135);
  const [color1, setColor1] = useState<string>('#4f46e5');
  const [color2, setColor2] = useState<string>('#06b6d4');

  // Compute CSS box-shadow string
  const cssBoxShadow = useMemo(() => {
    return layers
      .map((l) => {
        // convert hex to rgba
        const hex = l.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) || 0;
        const g = parseInt(hex.substring(2, 4), 16) || 0;
        const b = parseInt(hex.substring(4, 6), 16) || 0;
        const rgba = `rgba(${r}, ${g}, ${b}, ${l.opacity})`;
        return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba}`;
      })
      .join(',\n  ');
  }, [layers]);

  // Compute CSS gradient string
  const cssGradient = useMemo(() => {
    if (gradType === 'radial') {
      return `radial-gradient(circle at center, ${color1}, ${color2})`;
    }
    return `linear-gradient(${gradAngle}deg, ${color1}, ${color2})`;
  }, [gradType, gradAngle, color1, color2]);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyShadowPreset = (type: 'subtle' | 'card' | 'floating' | 'glow') => {
    if (type === 'subtle') {
      setLayers([
        { id: '1', x: 0, y: 1, blur: 3, spread: 0, color: '#000000', opacity: 0.08, inset: false },
      ]);
    } else if (type === 'card') {
      setLayers([
        { id: '1', x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 0.1, inset: false },
        { id: '2', x: 0, y: 2, blur: 4, spread: -2, color: '#000000', opacity: 0.06, inset: false },
      ]);
    } else if (type === 'floating') {
      setLayers([
        { id: '1', x: 0, y: 20, blur: 35, spread: -8, color: '#000000', opacity: 0.18, inset: false },
        { id: '2', x: 0, y: 10, blur: 15, spread: -5, color: '#000000', opacity: 0.1, inset: false },
      ]);
    } else {
      setLayers([
        { id: '1', x: 0, y: 0, blur: 25, spread: 2, color: '#6366f1', opacity: 0.45, inset: false },
      ]);
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
                Developer & CSS Styling
              </span>
              <span className="text-xs text-slate-500 font-medium">Visual Generator</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">CSS Box Shadow & Gradient Generator</h1>
            <p className="text-sm text-slate-600 mt-1">
              Design multi-layered smooth box shadows and vibrant CSS linear/radial gradients with instant live preview and one-click code copy.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('shadow')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'shadow' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Box Shadow Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('gradient')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'gradient' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Gradient Generator</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- BOX SHADOW TAB --- */}
      {activeTab === 'shadow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Presets & Layers
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => applyShadowPreset('subtle')}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Subtle
                  </button>
                  <button
                    onClick={() => applyShadowPreset('card')}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Card
                  </button>
                  <button
                    onClick={() => applyShadowPreset('floating')}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Floating
                  </button>
                  <button
                    onClick={() => applyShadowPreset('glow')}
                    className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
                  >
                    Glow
                  </button>
                </div>
              </div>

              {/* Layers List */}
              <div className="space-y-3">
                {layers.map((layer, idx) => (
                  <div key={layer.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Layer {idx + 1}</span>
                      {layers.length > 1 && (
                        <button
                          onClick={() => setLayers(layers.filter((l) => l.id !== layer.id))}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block">X Offset ({layer.x}px)</span>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={layer.x}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLayers(layers.map((l) => (l.id === layer.id ? { ...l, x: val } : l)));
                          }}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Y Offset ({layer.y}px)</span>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={layer.y}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLayers(layers.map((l) => (l.id === layer.id ? { ...l, y: val } : l)));
                          }}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Blur ({layer.blur}px)</span>
                        <input
                          type="range"
                          min="0"
                          max="80"
                          value={layer.blur}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLayers(layers.map((l) => (l.id === layer.id ? { ...l, blur: val } : l)));
                          }}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Spread ({layer.spread}px)</span>
                        <input
                          type="range"
                          min="-20"
                          max="40"
                          value={layer.spread}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLayers(layers.map((l) => (l.id === layer.id ? { ...l, spread: val } : l)));
                          }}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={layer.color}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLayers(layers.map((l) => (l.id === layer.id ? { ...l, color: val } : l)));
                          }}
                          className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                        />
                        <span className="font-mono text-slate-600">{layer.color}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Opacity:</span>
                        <input
                          type="range"
                          min="0.05"
                          max="1"
                          step="0.05"
                          value={layer.opacity}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLayers(layers.map((l) => (l.id === layer.id ? { ...l, opacity: val } : l)));
                          }}
                          className="w-20 accent-indigo-600"
                        />
                        <span className="font-mono font-bold text-slate-700 w-8">
                          {Math.round(layer.opacity * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setLayers([
                    ...layers,
                    {
                      id: String(Date.now()),
                      x: 0,
                      y: 4,
                      blur: 10,
                      spread: 0,
                      color: '#000000',
                      opacity: 0.1,
                      inset: false,
                    },
                  ])
                }
                className="w-full py-2 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:border-indigo-400 transition-colors"
              >
                + Add Another Shadow Layer
              </button>
            </div>

            {/* Generated CSS Code */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  CSS Code
                </span>
                <button
                  onClick={() => copyCode(`box-shadow: ${cssBoxShadow};`, 'shadowCode')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md"
                >
                  {copiedKey === 'shadowCode' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'shadowCode' ? 'Copied' : 'Copy CSS'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed shadow-inner">
                {`box-shadow:\n  ${cssBoxShadow};`}
              </pre>
            </div>
          </div>

          {/* Right: Live Interactive Canvas Preview */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center min-h-[420px] bg-slate-50/50">
            <div
              className="w-64 h-64 bg-white flex flex-col items-center justify-center p-6 text-center border border-slate-100 transition-all cursor-pointer"
              style={{
                borderRadius: `${boxRadius}px`,
                boxShadow: cssBoxShadow,
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Box className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900">Interactive Preview</span>
              <span className="text-xs text-slate-500 mt-1">
                {layers.length} {layers.length === 1 ? 'layer' : 'layers'} applied
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-slate-600">
              <span>Corner Radius:</span>
              <input
                type="range"
                min="0"
                max="40"
                value={boxRadius}
                onChange={(e) => setBoxRadius(Number(e.target.value))}
                className="accent-indigo-600"
              />
              <span className="font-mono font-bold">{boxRadius}px</span>
            </div>
          </div>
        </div>
      )}

      {/* --- GRADIENT TAB --- */}
      {activeTab === 'gradient' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Gradient Configuration
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Color 1</label>
                  <div className="flex items-center gap-2 p-2 border rounded-xl">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="text-xs font-mono text-slate-800 outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Color 2</label>
                  <div className="flex items-center gap-2 p-2 border rounded-xl">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="text-xs font-mono text-slate-800 outline-none w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Type and angle */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Type</span>
                  <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setGradType('linear')}
                      className={`px-3 py-1 rounded-md ${
                        gradType === 'linear' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      onClick={() => setGradType('radial')}
                      className={`px-3 py-1 rounded-md ${
                        gradType === 'radial' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Radial
                    </button>
                  </div>
                </div>

                {gradType === 'linear' && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Direction Angle</span>
                      <span className="font-mono font-bold">{gradAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={gradAngle}
                      onChange={(e) => setGradAngle(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Output Code */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  CSS Code
                </span>
                <button
                  onClick={() => copyCode(`background: ${cssGradient};`, 'gradCode')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md"
                >
                  {copiedKey === 'gradCode' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'gradCode' ? 'Copied' : 'Copy CSS'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-sky-300 font-mono text-[11px] rounded-xl overflow-x-auto">
                {`background: ${cssGradient};`}
              </pre>
            </div>
          </div>

          {/* Right: Live Gradient Canvas */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center min-h-[380px]">
            <div
              className="w-full h-72 rounded-2xl shadow-lg transition-all flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-slate-900/10"
              style={{ background: cssGradient }}
            >
              <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                {gradType === 'linear' ? `${gradAngle}° Linear` : 'Radial Center'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
