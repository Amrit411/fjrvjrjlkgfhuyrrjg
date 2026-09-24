import React from 'react';
import { ArrowRight, BookOpen, Layers, Users, Sparkles } from 'lucide-react';
import { MYTHOLOGY_CULTURES, ALL_LEGENDS } from '../data/mythologyData';
import { MythologySystem } from '../types/mythology';

interface FeaturedMythologiesProps {
  onSelectCulture: (culture: MythologySystem) => void;
}

export const FeaturedMythologies: React.FC<FeaturedMythologiesProps> = ({
  onSelectCulture,
}) => {

  const getFeaturedFigures = (cultureName: string) => {
    return ALL_LEGENDS.filter((l) => l.mythology === cultureName).slice(0, 3);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37] mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>CIVILIZATIONAL ARCHIVES</span>
        </div>
        <h2 className="font-serif-ancient text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
          FEATURED MYTHOLOGIES
        </h2>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4 mb-4" />
        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Foundational civilizational pantheons whose epics, cosmologies, and sacred figures shaped the human imagination across millenia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {MYTHOLOGY_CULTURES.slice(0, 6).map((culture, index) => {

          const isMajor = index === 0 || index === 3;
          const colSpan = isMajor ? 'md:col-span-7' : 'md:col-span-5';
          const figures = getFeaturedFigures(culture.name);

          return (
            <div
              key={culture.id}
              className={`${colSpan} group relative bg-[#111827] rounded-2xl border border-[#243048] hover:border-[#D4AF37]/80 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]`}
            >

              <div className={`relative w-full overflow-hidden ${isMajor ? 'h-64 sm:h-72' : 'h-52 sm:h-60'}`}>
                <img
                  src={culture.image}
                  alt={culture.imageAlt || culture.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded-full text-[11px] font-mono font-semibold text-[#D4AF37]">
                    {culture.region}
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded-full text-[11px] font-mono text-[#F4D58D] flex items-center gap-1.5">
                  <Layers className="w-3 h-3" />
                  <span>{culture.entryCount} Entries</span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-serif-ancient text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {culture.name.toUpperCase()} MYTHOLOGY
                  </h3>
                  <p className="text-xs font-serif-ancient italic text-[#F4D58D]/90 mt-1 line-clamp-1">
                    {culture.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-xs sm:text-sm text-[#9CA3AF] line-clamp-3 leading-relaxed">
                  {culture.description}
                </p>

                <div className="pt-4 border-t border-[#243048]/80">
                  <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-mono mb-2 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#D4AF37]" />
                    <span>Featured Deities & Beings</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {figures.map((fig) => (
                      <span
                        key={fig.id}
                        className="text-xs font-serif-ancient bg-[#161F30] hover:bg-[#1E293B] text-[#F5F5F0] px-2.5 py-1 rounded border border-[#243048] transition-colors"
                      >
                        {fig.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectCulture(culture.name as MythologySystem)}
                    className="w-full py-2.5 px-4 bg-[#161F30] group-hover:bg-[#D4AF37] text-[#F5F5F0] group-hover:text-[#080B12] border border-[#243048] group-hover:border-[#D4AF37] font-serif-ancient text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>EXPLORE {culture.name.toUpperCase()} PANTHEON</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

