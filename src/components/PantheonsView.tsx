import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Info, ArrowRight, Sparkles } from 'lucide-react';
import { PANTHEONS_DATA } from '../data/pantheonData';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry, PantheonDeityNode, MythologySystem } from '../types/mythology';

interface PantheonsViewProps {
  onSelectLegend: (legend: LegendEntry) => void;
}

export const PantheonsView: React.FC<PantheonsViewProps> = ({ onSelectLegend }) => {
  const [selectedCulture, setSelectedCulture] = useState<MythologySystem>('Greek');
  const [hoveredNode, setHoveredNode] = useState<PantheonDeityNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<PantheonDeityNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activePantheon = PANTHEONS_DATA.find((p) => p.culture === selectedCulture) || PANTHEONS_DATA[0];

  const handleNodeClick = (node: PantheonDeityNode) => {
    setSelectedNode(node);
    if (node.legendId) {
      const match = ALL_LEGENDS.find((l) => l.id === node.legendId);
      if (match) {
        onSelectLegend(match);
      }
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.6, Math.max(0.7, prev + delta)));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2 block">
          Divine Lineages & Cosmologies
        </span>
        <h1 className="font-serif-ancient text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
          PANTHEONS & DEITIES
        </h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
          Traverse the divine dynasties and generational descents that govern ancient cosmologies. Inspect genealogical relationships, domains, and sacred origins.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {PANTHEONS_DATA.map((p) => (
          <button
            key={p.culture}
            onClick={() => {
              setSelectedCulture(p.culture);
              setSelectedNode(null);
            }}
            className={`px-5 py-2.5 rounded-lg text-xs font-serif-ancient tracking-wider uppercase transition-all cursor-pointer ${
              selectedCulture === p.culture
                ? 'bg-[#D4AF37] text-[#080B12] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-[#111827] text-[#9CA3AF] hover:text-[#F5F5F0] border border-[#243048]'
            }`}
          >
            {p.culture} Pantheon
          </button>
        ))}
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#243048] p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-[#9CA3AF] uppercase block text-[10px]">Supreme Ruler:</span>
            <span className="text-[#F4D58D] font-bold font-serif-ancient text-sm">{activePantheon.supremeRuler}</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-[#243048]" />
          <div>
            <span className="text-[#9CA3AF] uppercase block text-[10px]">Sacred Realm:</span>
            <span className="text-[#F5F5F0]">{activePantheon.sacredRealm}</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-[#243048]" />
          <div>
            <span className="text-[#9CA3AF] uppercase block text-[10px]">Cosmological Model:</span>
            <span className="text-[#9CA3AF]">{activePantheon.cosmology}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#161F30] p-1 rounded-lg border border-[#243048]">
          <button
            onClick={() => handleZoom(0.15)}
            className="p-1.5 text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#1E293B] rounded"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-0.15)}
            className="p-1.5 text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#1E293B] rounded"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="p-1.5 text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#1E293B] rounded"
            title="Reset Scale"
            aria-label="Reset scale"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-[#9CA3AF] font-mono px-2">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
      </div>

      <div className="relative bg-[#0A0E17] rounded-2xl border border-[#243048] p-3 sm:p-8 overflow-hidden shadow-2xl">

        <div className="absolute inset-0 bg-celestial-grid opacity-40 pointer-events-none" />

        <div className="sm:hidden pb-2 text-center text-[11px] font-mono text-[#D4AF37] flex items-center justify-center gap-1.5">
          <span>⇄ Swipe horizontally or pinch to inspect genealogy</span>
        </div>

        <div className="overflow-x-auto min-h-[460px] flex items-center justify-start sm:justify-center no-scrollbar">
          <div
            className="transition-transform duration-300 origin-top-center py-4"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              width="900"
              height="580"
              viewBox="0 0 900 580"
              className="select-none"
            >
              <defs>
                <linearGradient id="lineGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#243048" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <text x="25" y="55" fill="#9CA3AF" fontSize="11" fontFamily="sans-serif" letterSpacing="0.1em">
                TIER I: PROGENITORS
              </text>
              <line x1="20" y1="65" x2="880" y2="65" stroke="#243048" strokeDasharray="3 3" strokeWidth="0.8" />

              <text x="25" y="175" fill="#9CA3AF" fontSize="11" fontFamily="sans-serif" letterSpacing="0.1em">
                TIER II: ELDER SOVEREIGNS
              </text>
              <line x1="20" y1="185" x2="880" y2="185" stroke="#243048" strokeDasharray="3 3" strokeWidth="0.8" />

              <text x="25" y="315" fill="#9CA3AF" fontSize="11" fontFamily="sans-serif" letterSpacing="0.1em">
                TIER III: YOUNGER DEITIES
              </text>
              <line x1="20" y1="325" x2="880" y2="325" stroke="#243048" strokeWidth="0.8" strokeDasharray="3 3" />

              {activePantheon.nodes.map((node) => {
                if (!node.parents) return null;
                const parentNodes = activePantheon.nodes.filter((p) =>
                  node.parents?.includes(p.id)
                );
                return parentNodes.map((parent) => {
                  if (parent.x === undefined || parent.y === undefined || node.x === undefined || node.y === undefined)
                    return null;
                  return (
                    <path
                      key={`${parent.id}-${node.id}`}
                      d={`M ${parent.x} ${parent.y + 25} C ${parent.x} ${parent.y + 60}, ${node.x} ${node.y - 40}, ${node.x} ${node.y - 25}`}
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                  );
                });
              })}

              {activePantheon.nodes.map((node) => {
                const isHovered = hoveredNode?.id === node.id;
                const isSelected = selectedNode?.id === node.id;
                const hasLegend = !!node.legendId;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x || 0}, ${node.y || 0})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleNodeClick(node)}
                  >

                    <rect
                      x="-65"
                      y="-22"
                      width="130"
                      height="44"
                      rx="8"
                      fill={isSelected ? '#1E293B' : isHovered ? '#161F30' : '#111827'}
                      stroke={isSelected ? '#F4D58D' : isHovered ? '#D4AF37' : '#243048'}
                      strokeWidth={isSelected || isHovered ? 2 : 1}
                      filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
                    />

                    <circle cx="-50" cy="0" r="4" fill="#D4AF37" />

                    <text
                      x="-38"
                      y="-2"
                      fill={isHovered || isSelected ? '#F4D58D' : '#F5F5F0'}
                      fontSize="12"
                      fontWeight="600"
                      fontFamily="var(--font-cinzel), serif"
                    >
                      {node.name}
                    </text>

                    <text
                      x="-38"
                      y="11"
                      fill="#9CA3AF"
                      fontSize="9"
                      fontFamily="sans-serif"
                    >
                      {node.domain.split(',')[0]}
                    </text>

                    {hasLegend && (
                      <circle cx="52" cy="0" r="3" fill="#10B981" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#243048] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9CA3AF] gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              {hoveredNode
                ? `Viewing ${hoveredNode.name}: ${hoveredNode.title} (${hoveredNode.domain})`
                : 'Hover nodes to see domain · Click green-tagged nodes to launch comprehensive lore dossier'}
            </span>
          </div>

          {hoveredNode?.legendId && (
            <button
              onClick={() => {
                const match = ALL_LEGENDS.find((l) => l.id === hoveredNode.legendId);
                if (match) onSelectLegend(match);
              }}
              className="text-[#D4AF37] hover:underline flex items-center gap-1 font-mono uppercase text-[11px] cursor-pointer"
            >
              <span>Explore {hoveredNode.name} Lore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

