import React from 'react';
import { ArrowRight, Flame, Droplets, Mountain, Wind, Zap, Moon, Sun, Shield } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry, Element } from '../types/mythology';
import { VisualArtifact } from './VisualArtifact';
import { LegendArtwork } from './LegendArtwork';

interface FeaturedCreaturesProps {
  onSelectCreature: (creature: LegendEntry) => void;
  onViewAllCreatures: () => void;
}

export const FeaturedCreatures: React.FC<FeaturedCreaturesProps> = ({
  onSelectCreature,
  onViewAllCreatures,
}) => {

  const targetIds = [
    'creature-dragon',
    'creature-phoenix',
    'creature-garuda',
    'creature-kitsune',
    'creature-kraken',
    'creature-griffin',
  ];
  const featured = targetIds
    .map((id) => ALL_LEGENDS.find((l) => l.id === id))
    .filter(Boolean) as LegendEntry[];

  const getElementIcon = (elem: Element) => {
    switch (elem) {
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-blue-300" />;
      case 'Lightning': return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
      case 'Shadow': return <Moon className="w-3.5 h-3.5 text-purple-400" />;
      case 'Light': return <Sun className="w-3.5 h-3.5 text-amber-300" />;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#243048]/60 w-full max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>GLOBAL BESTIARY ARCHIVE</span>
          </div>
          <h2 className="font-serif-ancient text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F5F0]">
            CREATURE COLLECTION
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-3" />
        </div>

        <button
          onClick={onViewAllCreatures}
          className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#161F30] hover:bg-[#D4AF37] text-[#F5F5F0] hover:text-[#080B12] border border-[#243048] hover:border-[#D4AF37] rounded-lg text-xs font-serif-ancient tracking-wider uppercase font-bold transition-all cursor-pointer group shadow"
        >
          <span>VIEW ALL CREATURES</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((creature) => (
          <div
            key={creature.id}
            onClick={() => onSelectCreature(creature)}
            className="group relative bg-[#111827] rounded-2xl border border-[#243048] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]"
          >

            <div className="relative h-52 sm:h-56 overflow-hidden bg-[#161F30]">
              <LegendArtwork legend={creature} size="md" className="w-full h-full" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded text-xs text-[#F5F5F0] flex items-center gap-1.5 shadow">
                {getElementIcon(creature.element)}
                <span className="font-mono text-[11px] text-[#F4D58D]">{creature.element}</span>
              </div>

              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded text-[11px] font-mono text-[#D4AF37] shadow">
                {creature.mythology} Tradition
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-serif-ancient text-xl font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                    {creature.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#9CA3AF] uppercase px-2 py-0.5 rounded bg-[#161F30] border border-[#243048]">
                    {creature.class}
                  </span>
                </div>

                <p className="text-xs font-serif-ancient italic text-[#F4D58D]/90 mb-3 line-clamp-1">
                  {creature.title}
                </p>

                <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed mb-4">
                  {creature.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#243048]/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] mb-1.5">
                  <span className="uppercase tracking-wider">Mythic Power</span>
                  <span className="text-[#D4AF37] font-bold">{creature.power}/100</span>
                </div>
                <div className="w-full h-1 bg-[#161F30] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B8860B] to-[#F4D58D]"
                    style={{ width: `${creature.power}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[#D4AF37] group-hover:text-[#F4D58D] font-serif-ancient font-semibold">
                  <span>INSPECT BESTIARY FOLIO</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

