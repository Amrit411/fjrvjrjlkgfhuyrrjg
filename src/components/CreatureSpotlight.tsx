import React, { useState } from 'react';
import { Sparkles, Flame, Shield, Compass, ArrowRight, Eye, Feather } from 'lucide-react';
import { LegendEntry } from '../types/mythology';
import { ALL_LEGENDS } from '../data/mythologyData';
import { CreatureArtworkSVG } from './CreatureArtworks';

interface CreatureSpotlightProps {
  onSelectLegend: (legend: LegendEntry) => void;
}

export const CreatureSpotlight: React.FC<CreatureSpotlightProps> = ({ onSelectLegend }) => {

  const phoenix = ALL_LEGENDS.find((l) => l.id === 'creature-phoenix') || ALL_LEGENDS[1];
  const [activeCreature, setActiveCreature] = useState<LegendEntry>(phoenix);

  const spotlightOptions = ALL_LEGENDS.filter((l) =>
    ['creature-phoenix', 'creature-dragon', 'creature-kitsune', 'creature-garuda'].includes(l.id)
  );

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#D4AF37]">
            CREATURE SPOTLIGHT
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-lg border border-[#243048]">
          {spotlightOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCreature(c)}
              className={`px-3 py-1 text-xs font-serif-ancient rounded transition-all cursor-pointer ${
                activeCreature.id === c.id
                  ? 'bg-[#D4AF37] text-[#080B12] font-bold shadow'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-[#111827] via-[#0D131F] to-[#080B12] rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-12">

        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl aspect-square sm:aspect-[4/3] group bg-[#080B12]">
              <CreatureArtworkSVG
                id={activeCreature.id}
                className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B12]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 px-3 py-1 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded-full text-xs font-mono text-[#F4D58D] shadow">
                {activeCreature.mythology} Tradition
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#080B12]/85 backdrop-blur-md border border-[#D4AF37]/50 rounded-full text-xs font-mono text-[#D4AF37] shadow">
                Vector SVG Codex
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#9CA3AF] bg-[#080B12]/85 backdrop-blur-sm p-2 rounded border border-[#243048] flex items-center justify-between">
                <span>Habitat: {activeCreature.habitat}</span>
                <span className="text-[#D4AF37] font-bold">Element: {activeCreature.element}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-serif-ancient uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
                {activeCreature.class} · {activeCreature.region}
              </span>
              <h3 className="font-serif-ancient text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
                {activeCreature.name}
              </h3>
              {activeCreature.nativeName && (
                <div className="text-xs font-mono text-[#D4AF37]/80 mt-1">
                  {activeCreature.nativeName}
                </div>
              )}
              <p className="text-sm font-serif-ancient italic text-[#F4D58D] mt-2">
                “{activeCreature.title}”
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              {activeCreature.description}
            </p>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF] block mb-2">
                Ancient Symbolism & Icons
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCreature.symbols.map((sym, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-serif-ancient text-[#F5F5F0]"
                  >
                    ✦ {sym}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#080B12]/60 rounded-xl border border-[#243048] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#9CA3AF] uppercase">Power Score</span>
                <span className="text-[#D4AF37] font-bold">{activeCreature.stats.power}/100</span>
              </div>
              <div className="w-full h-1.5 bg-[#161F30] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B8860B] to-[#F4D58D] transition-all duration-1000"
                  style={{ width: `${activeCreature.stats.power}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-mono border-t border-[#243048]/60">
                <div>
                  <span className="text-[10px] text-[#9CA3AF] block uppercase">Agility</span>
                  <span className="text-[#F5F5F0] font-bold">{activeCreature.stats.agility}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] block uppercase">Mystery</span>
                  <span className="text-[#F5F5F0] font-bold">{activeCreature.stats.mystery}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] block uppercase">Influence</span>
                  <span className="text-[#F5F5F0] font-bold">{activeCreature.stats.influence}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectLegend(activeCreature)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>READ THE COMPLETE LEGEND</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

