import React, { useState } from 'react';
import { Sparkles, Dices, ArrowRight, Shield, Zap } from 'lucide-react';
import { LegendEntry } from '../types/mythology';
import { ALL_LEGENDS } from '../data/mythologyData';
import { CreatureArtworkSVG } from './CreatureArtworks';
import { LegendArtwork } from './LegendArtwork';

interface RandomLegendSectionProps {
  onSelectLegend: (legend: LegendEntry) => void;
}

export const RandomLegendSection: React.FC<RandomLegendSectionProps> = ({ onSelectLegend }) => {
  const [selectedLegend, setSelectedLegend] = useState<LegendEntry>(ALL_LEGENDS[0]);
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    setIsRolling(true);
    let rolls = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ALL_LEGENDS.length);
      setSelectedLegend(ALL_LEGENDS[randomIndex]);
      rolls++;
      if (rolls > 6) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 70);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-[#111827] border border-[#243048] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37] mb-3">
            <Dices className="w-3.5 h-3.5" />
            <span>SERENDIPITOUS DISCOVERY</span>
          </div>
          <h2 className="font-serif-ancient text-3xl sm:text-4xl font-extrabold text-[#F5F5F0] tracking-tight mb-3">
            WHAT WILL YOU DISCOVER?
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Let chance guide your exploration through forgotten pantheons, mythical beasts, and ancient heroes.
          </p>
          <div className="mt-6">
            <button
              onClick={handleRoll}
              disabled={isRolling}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
            >
              <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'DIVINING THE ARCHIVES...' : 'REVEAL A RANDOM LEGEND'}</span>
            </button>
          </div>
        </div>

        <div
          className={`bg-[#080B12] border border-[#243048] rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
            isRolling ? 'opacity-40 scale-98' : 'opacity-100 scale-100 border-[#D4AF37]/40 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            <div className="md:col-span-4 aspect-video md:aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/40 relative bg-[#080B12]">
              {['creature-dragon', 'creature-phoenix', 'creature-kitsune', 'creature-garuda'].includes(selectedLegend.id) ? (
                <CreatureArtworkSVG id={selectedLegend.id} className="w-full h-full object-contain p-2" />
              ) : (
                <LegendArtwork legend={selectedLegend} size="md" className="w-full h-full" />
              )}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#080B12]/80 text-[10px] font-mono text-[#D4AF37] border border-[#243048]">
                {selectedLegend.mythology}
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF]">
                    {selectedLegend.class} · {selectedLegend.region}
                  </span>
                  <h3 className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
                    {selectedLegend.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-[#161F30] border border-[#243048] text-[#F4D58D]">
                    {selectedLegend.element}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#161F30] border border-[#243048] text-[#D4AF37] font-bold">
                    Power: {selectedLegend.power}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9CA3AF] line-clamp-2 leading-relaxed">
                {selectedLegend.description}
              </p>

              <div className="p-3 bg-[#111827] rounded-lg border border-[#243048]/80 text-xs text-[#9CA3AF]">
                <strong className="text-[#F4D58D] font-serif-ancient">Archival Fact: </strong>
                {selectedLegend.fascinatingFact}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onSelectLegend(selectedLegend)}
                  className="px-5 py-2.5 bg-[#161F30] hover:bg-[#1E293B] text-[#F5F5F0] hover:text-[#D4AF37] border border-[#243048] hover:border-[#D4AF37] font-serif-ancient text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>EXPLORE THIS LEGEND</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

