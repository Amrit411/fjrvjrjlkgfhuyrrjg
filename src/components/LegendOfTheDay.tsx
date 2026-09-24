import React, { useMemo } from 'react';
import { Sparkles, ArrowRight, Award, Compass } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry } from '../types/mythology';
import { LegendArtwork } from './LegendArtwork';

interface LegendOfTheDayProps {
  onSelectLegend: (legend: LegendEntry) => void;
  onExploreAtlas: () => void;
}

export const LegendOfTheDay: React.FC<LegendOfTheDayProps> = ({
  onSelectLegend,
  onExploreAtlas,
}) => {

  const dailyLegend = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    return ALL_LEGENDS[dayOfYear % ALL_LEGENDS.length];
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-r from-[#111827] via-[#161F30] to-[#111827] border border-[#D4AF37]/40 p-6 sm:p-10 md:p-12 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-[#D4AF37]/10 pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border border-[#D4AF37]/10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
              <LegendArtwork
                legend={dailyLegend}
                size="lg"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/60 rounded-full text-xs font-serif-ancient tracking-widest text-[#F4D58D] uppercase font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>LEGEND OF THE DAY</span>
                </span>
                <span className="text-xs text-[#9CA3AF] font-mono">
                  {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <h3 className="font-serif-ancient text-3xl sm:text-4xl font-extrabold text-[#F5F5F0] mb-1">
                {dailyLegend.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-4 font-mono">
                <span className="text-[#D4AF37] font-semibold">{dailyLegend.mythology} Tradition</span>
                <span>·</span>
                <span className="capitalize">{dailyLegend.class}</span>
                <span>·</span>
                <span>Element: {dailyLegend.element}</span>
                <span>·</span>
                <span className="text-[#F4D58D]">Power {dailyLegend.power}/100</span>
              </div>

              <p className="text-sm sm:text-base text-[#F5F5F0]/90 leading-relaxed mb-4 max-w-2xl font-light">
                {dailyLegend.description}
              </p>

              <div className="p-4 rounded-lg bg-[#080B12]/80 border-l-2 border-[#D4AF37] mb-6 max-w-2xl">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] mb-1 flex items-center gap-1.5 font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Curator’s Fascinating Note</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9CA3AF] italic">
                  "{dailyLegend.fascinatingFact}"
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectLegend(dailyLegend)}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs font-bold tracking-wider uppercase rounded transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                <span>EXPLORE FULL ENTRY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAtlas}
                className="px-5 py-3 bg-[#111827] hover:bg-[#1E293B] text-[#F5F5F0] border border-[#243048] hover:border-[#D4AF37]/50 font-serif-ancient text-xs tracking-wider uppercase rounded transition-all cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Browse All Legends</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

