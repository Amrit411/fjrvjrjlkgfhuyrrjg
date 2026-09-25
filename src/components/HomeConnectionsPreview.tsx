import React, { useState } from 'react';
import { Network, Share2, ArrowRight, Sparkles } from 'lucide-react';
import { NavView } from './Navbar';

interface HomeConnectionsPreviewProps {
  onNavigate: (view: NavView) => void;
}

export const HomeConnectionsPreview: React.FC<HomeConnectionsPreviewProps> = ({ onNavigate }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: 'indian', label: 'INDIAN', x: 200, y: 110, color: '#F59E0B', archetype: 'Cosmic Churning & Avatars' },
    { id: 'greek', label: 'GREEK', x: 500, y: 80, color: '#3B82F6', archetype: 'Titanomachy & Divine Justice' },
    { id: 'norse', label: 'NORSE', x: 750, y: 150, color: '#06B6D4', archetype: 'World Tree & Prophesied Doom' },
    { id: 'egyptian', label: 'EGYPTIAN', x: 300, y: 320, color: '#D97706', archetype: 'Solar Rebirth & Heart Weighing' },
    { id: 'japanese', label: 'JAPANESE', x: 650, y: 330, color: '#EC4899', archetype: 'Sacred Mirrors & Storm Cleansing' },
  ];

  const links = [
    { from: 'indian', to: 'greek', label: 'Indo-European Thunder Deities (Indra & Zeus)' },
    { from: 'greek', to: 'egyptian', label: 'Underworld Judges (Hades & Osiris)' },
    { from: 'norse', to: 'greek', label: 'World-Devouring Serpents (Jörmungandr & Typhon)' },
    { from: 'indian', to: 'norse', label: 'Cosmic Cycles of Dissolution & Rebirth' },
    { from: 'egyptian', to: 'japanese', label: 'Solar Sovereignty (Ra & Amaterasu)' },
    { from: 'norse', to: 'japanese', label: 'Volatile Storm Brothers (Thor & Susanoo)' },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">
      <div className="bg-[#0b101b] border border-[#243048] rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">

        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37] mb-3">
            <Network className="w-3.5 h-3.5" />
            <span>COMPARATIVE MYTHOLOGY</span>
          </div>
          <h2 className="font-serif-ancient text-3xl sm:text-4xl font-extrabold text-[#F5F5F0] tracking-tight mb-3">
            MYTHOLOGY CONNECTIONS
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            “Stories travel across cultures, evolve through retellings, and inspire new interpretations.”
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] sm:aspect-[16/9] bg-[#080B12]/80 rounded-2xl border border-[#243048] p-2 sm:p-4 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 950 420" className="w-full h-full select-none">

            {links.map((link, i) => {
              const fromNode = nodes.find((n) => n.id === link.from)!;
              const toNode = nodes.find((n) => n.id === link.to)!;
              const isHighlighted = hoveredNode === link.from || hoveredNode === link.to;

              return (
                <g key={i}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? '#D4AF37' : '#243048'}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    strokeDasharray={isHighlighted ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />

                  <circle
                    r={isHighlighted ? 3 : 2}
                    fill={isHighlighted ? '#F4D58D' : '#64748B'}
                    cx={(fromNode.x + toNode.x) / 2}
                    cy={(fromNode.y + toNode.y) / 2}
                  />
                </g>
              );
            })}

            {nodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onNavigate('connections')}
                >

                  <circle
                    r={isHovered ? 48 : 36}
                    fill={node.color}
                    opacity={isHovered ? 0.25 : 0.12}
                    className="transition-all duration-300"
                  />
                  <circle
                    r={isHovered ? 34 : 28}
                    fill="#111827"
                    stroke={isHovered ? '#D4AF37' : node.color}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="transition-all duration-300 shadow-lg"
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill="#F5F5F0"
                    fontSize={isHovered ? "11" : "10"}
                    fontWeight="bold"
                    fontFamily="Cinzel, serif"
                    letterSpacing="0.1em"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-4 right-4 text-center">
            {hoveredNode ? (
              <span className="text-xs font-mono text-[#F4D58D] bg-[#111827]/90 px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow">
                ✦ {nodes.find((n) => n.id === hoveredNode)?.label} Archetype: {nodes.find((n) => n.id === hoveredNode)?.archetype}
              </span>
            ) : (
              <span className="text-[11px] font-mono text-[#9CA3AF]">
                Hover nodes to reveal parallel mythological archetypes
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('connections')}
            className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>EXPLORE FULL CONNECTION ATLAS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

