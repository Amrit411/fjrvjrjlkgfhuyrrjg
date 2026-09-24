import React, { useState } from 'react';
import { Share2, Sparkles, ArrowRight, Layers, Link as LinkIcon, Compass } from 'lucide-react';
import { CULTURE_NODES, CROSS_CULTURAL_CONNECTIONS, CultureNodeInfo } from '../data/connectionsData';
import { ALL_LEGENDS } from '../data/mythologyData';
import { MythologySystem, LegendEntry, ConnectionLink } from '../types/mythology';

interface ConnectionsViewProps {
  onSelectLegend: (legend: LegendEntry) => void;
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({ onSelectLegend }) => {
  const [selectedNode, setSelectedNode] = useState<CultureNodeInfo>(CULTURE_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<CultureNodeInfo | null>(null);
  const [selectedLink, setSelectedLink] = useState<ConnectionLink | null>(null);

  const activeConnections = CROSS_CULTURAL_CONNECTIONS.filter(
    (conn) => conn.source === selectedNode.id || conn.target === selectedNode.id
  );

  const cultureLegends = ALL_LEGENDS.filter((l) => l.mythology === selectedNode.id);

  const handleNodeClick = (node: CultureNodeInfo) => {
    setSelectedNode(node);
    const firstConn = CROSS_CULTURAL_CONNECTIONS.find(
      (c) => c.source === node.id || c.target === node.id
    );
    setSelectedLink(firstConn || null);
  };

  const handleLinkClick = (link: ConnectionLink) => {
    setSelectedLink(link);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2 block">
          Comparative Mythology & Archetypes
        </span>
        <h1 className="font-serif-ancient text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
          THE CONNECTION ATLAS
        </h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
          Interactive knowledge network mapping cross-cultural archetypes, shared cosmological symbols, and parallel legendary beings across human civilizations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-7 bg-[#0A0E17] rounded-2xl border border-[#243048] p-4 sm:p-6 overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[580px]">

          <div className="absolute inset-0 bg-celestial-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#9CA3AF] pb-3 border-b border-[#243048]/60">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tap nodes to map cultural crossroads</span>
            </span>
            <span className="text-[#D4AF37]">
              {CROSS_CULTURAL_CONNECTIONS.length} Comparative Pathways
            </span>
          </div>

          <div className="relative z-10 my-auto py-2 overflow-x-auto flex justify-center">
            <svg
              width="800"
              height="520"
              viewBox="0 0 800 520"
              className="select-none max-w-full h-auto"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {CROSS_CULTURAL_CONNECTIONS.map((link, idx) => {
                const sourceNode = CULTURE_NODES.find((n) => n.id === link.source);
                const targetNode = CULTURE_NODES.find((n) => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isConnectedToSelected =
                  link.source === selectedNode.id || link.target === selectedNode.id;
                const isSelectedLink = selectedLink === link;

                return (
                  <g
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className="cursor-pointer"
                  >
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isSelectedLink ? '#F4D58D' : isConnectedToSelected ? '#D4AF37' : '#243048'}
                      strokeWidth={isSelectedLink ? 3.5 : isConnectedToSelected ? 2 : 1}
                      strokeDasharray={isConnectedToSelected ? 'none' : '4 4'}
                      strokeOpacity={isSelectedLink ? 1 : isConnectedToSelected ? 0.8 : 0.3}
                      className="transition-all duration-300"
                    />

                    {isConnectedToSelected && (
                      <circle
                        cx={(sourceNode.x + targetNode.x) / 2}
                        cy={(sourceNode.y + targetNode.y) / 2}
                        r="3.5"
                        fill="#D4AF37"
                        filter="url(#glow)"
                      />
                    )}
                  </g>
                );
              })}

              {CULTURE_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isHovered = hoveredNode?.id === node.id;
                const isLinked = activeConnections.some(
                  (c) => c.source === node.id || c.target === node.id
                );

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer transition-transform duration-200"
                  >

                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 36 : 28}
                      fill={isSelected ? '#161F30' : '#111827'}
                      stroke={isSelected ? '#D4AF37' : isLinked ? '#F4D58D' : '#243048'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter={isSelected ? 'url(#glow)' : undefined}
                      className="transition-all duration-300"
                    />

                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 42 : 33}
                      stroke={isSelected ? '#D4AF37' : 'transparent'}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      fill="none"
                    />

                    <text
                      textAnchor="middle"
                      y={-2}
                      fill={isSelected ? '#F4D58D' : '#F5F5F0'}
                      fontSize={isSelected ? '11' : '10'}
                      fontWeight="bold"
                      fontFamily="var(--font-cinzel), serif"
                      letterSpacing="0.08em"
                    >
                      {node.label}
                    </text>

                    <text
                      textAnchor="middle"
                      y={10}
                      fill="#9CA3AF"
                      fontSize="7.5"
                      fontFamily="sans-serif"
                    >
                      {node.sublabel.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative z-10 pt-4 border-t border-[#243048]/60 flex flex-wrap items-center justify-center gap-1.5">
            {CULTURE_NODES.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNodeClick(n)}
                className={`px-2.5 py-1 rounded text-[11px] font-serif-ancient tracking-wider uppercase transition-colors ${
                  selectedNode.id === n.id
                    ? 'bg-[#D4AF37] text-[#080B12] font-bold'
                    : 'bg-[#111827] text-[#9CA3AF] hover:text-[#F5F5F0]'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#111827] rounded-2xl border border-[#243048] p-6 sm:p-8 space-y-6 shadow-xl">

          <div className="pb-5 border-b border-[#243048]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif-ancient tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                SYSTEM ARCHETYPE PROFILE
              </span>
              <span className="text-xs font-mono text-[#9CA3AF]">{selectedNode.sublabel}</span>
            </div>
            <h2 className="font-serif-ancient text-3xl font-extrabold text-[#F5F5F0]">
              {selectedNode.label} MYTHOLOGY
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2 leading-relaxed">
              {selectedNode.synopsis}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-[#161F30] p-4 rounded-xl border border-[#243048]">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase block mb-1">
                Sovereign Deity:
              </span>
              <span className="text-[#F5F5F0] font-semibold">{selectedNode.coreDeity}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase block mb-1">
                Iconic Creature:
              </span>
              <span className="text-[#F5F5F0] font-semibold">{selectedNode.legendaryCreature}</span>
            </div>
          </div>

          <div>
            <h3 className="font-serif-ancient text-xs font-bold text-[#F4D58D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CROSS-CULTURAL PARALLELS WITH {selectedNode.label}</span>
            </h3>

            <div className="space-y-3">
              {activeConnections.map((conn, idx) => {
                const otherCulture = conn.source === selectedNode.id ? conn.target : conn.source;
                const isSelected = selectedLink === conn;

                return (
                  <div
                    key={idx}
                    onClick={() => handleLinkClick(conn)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#161F30] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-[#080B12] border-[#243048] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-serif-ancient font-bold text-[#F4D58D]">
                        {selectedNode.label} ↔ {otherCulture.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase bg-[#111827] px-2 py-0.5 rounded border border-[#243048]">
                        {conn.archetype}
                      </span>
                    </div>

                    <p className="text-xs text-[#9CA3AF] leading-relaxed mb-3">
                      {conn.description}
                    </p>

                    <div className="bg-[#111827] rounded-lg p-2.5 border border-[#243048]/80 text-[11px] space-y-1">
                      <span className="text-[9px] font-mono uppercase text-[#D4AF37] block font-semibold mb-1">
                        Direct Mythological Parallels:
                      </span>
                      {conn.parallelEntities.map((p, i) => (
                        <div key={i} className="flex items-center justify-between text-[#F5F5F0]/80">
                          <span className="truncate">{p.from}</span>
                          <span className="text-[#D4AF37] mx-1">≡</span>
                          <span className="truncate text-right">{p.to}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {cultureLegends.length > 0 && (
            <div className="pt-4 border-t border-[#243048]">
              <h3 className="font-serif-ancient text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">
                EXPLORE {selectedNode.label} ENTRIES IN ARCHIVE
              </h3>
              <div className="flex flex-wrap gap-2">
                {cultureLegends.slice(0, 4).map((leg) => (
                  <button
                    key={leg.id}
                    onClick={() => onSelectLegend(leg)}
                    className="px-3 py-1.5 bg-[#080B12] hover:bg-[#161F30] border border-[#243048] hover:border-[#D4AF37] rounded-lg text-xs font-serif-ancient text-[#F5F5F0] hover:text-[#D4AF37] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{leg.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

