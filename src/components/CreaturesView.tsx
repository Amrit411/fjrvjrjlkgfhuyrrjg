import React, { useState, useMemo } from 'react';
import { Search, Flame, Droplets, Mountain, Wind, Zap, Moon, Sun, Shield, Sparkles } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry, Element } from '../types/mythology';
import { VisualArtifact } from './VisualArtifact';
import { LegendArtwork } from './LegendArtwork';

interface CreaturesViewProps {
  onSelectCreature: (creature: LegendEntry) => void;
}

export const CreaturesView: React.FC<CreaturesViewProps> = ({ onSelectCreature }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allCreatures = useMemo(() => {
    return ALL_LEGENDS.filter((item) => item.type === 'creature' || item.type === 'monster' || item.type === 'spirit');
  }, []);

  const categories = ['all', 'Mythical Beast', 'Celestial Beast', 'Monster', 'Spirit'];
  const elements = ['all', 'Fire', 'Water', 'Earth', 'Air', 'Shadow', 'Light'];

  const filteredCreatures = useMemo(() => {
    return allCreatures.filter((creature) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          creature.name.toLowerCase().includes(q) ||
          creature.title.toLowerCase().includes(q) ||
          creature.mythology.toLowerCase().includes(q) ||
          creature.habitat.toLowerCase().includes(q) ||
          creature.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedElement !== 'all' && creature.element !== selectedElement) {
        return false;
      }

      if (selectedCategory !== 'all' && creature.class !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [allCreatures, searchQuery, selectedElement, selectedCategory]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2 block">
          Bestiary & Cryptozoology Archive
        </span>
        <h1 className="font-serif-ancient text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
          CREATURE ENCYCLOPEDIA
        </h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
          From primordial dragons and solar firebirds to subterranean leviathans and forest spirits, explore the mythological beasts recorded by ancient civilizations.
        </p>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#243048] p-4 sm:p-6 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creature bestiary..."
            className="w-full pl-9 pr-3 py-2 bg-[#161F30] border border-[#243048] rounded text-xs text-[#F5F5F0] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded transition-colors uppercase font-mono tracking-wider cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#080B12] font-bold'
                  : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#F5F5F0]'
              }`}
            >
              {cat === 'all' ? 'All Classes' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {elements.map((elem) => (
            <button
              key={elem}
              onClick={() => setSelectedElement(elem)}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                selectedElement === elem
                  ? 'bg-[#F4D58D] text-[#080B12] font-semibold'
                  : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#F5F5F0] border border-[#243048]'
              }`}
            >
              {elem === 'all' ? 'All Elements' : elem}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 text-xs text-[#9CA3AF] font-mono">
        <span>Displaying {filteredCreatures.length} of {allCreatures.length} cataloged beasts</span>
        <span>Click any card for full abilities, lore & stats</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCreatures.map((creature) => (
          <div
            key={creature.id}
            onClick={() => onSelectCreature(creature)}
            className="group bg-[#111827] rounded-xl border border-[#243048] hover:border-[#D4AF37] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
          >

            <div className="relative bg-[#161F30] overflow-hidden h-48 sm:h-52">
              <LegendArtwork legend={creature} size="md" />

              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded text-[10px] font-mono text-[#F4D58D] shadow">
                {creature.element}
              </div>

              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#080B12]/85 backdrop-blur-md border border-[#243048] rounded text-[10px] font-mono text-[#D4AF37] shadow">
                {creature.mythology}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors truncate">
                    {creature.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#9CA3AF] uppercase shrink-0">
                    {creature.class}
                  </span>
                </div>

                <p className="text-xs text-[#F4D58D] italic mb-2 line-clamp-1">
                  {creature.title}
                </p>

                <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed mb-4">
                  {creature.description}
                </p>

                <div className="text-[11px] text-[#9CA3AF] mb-3 flex items-center gap-1 truncate">
                  <span className="font-mono text-[10px] uppercase text-[#D4AF37]">Habitat:</span>
                  <span className="truncate">{creature.habitat}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] mb-1">
                  <span>POWER</span>
                  <span className="text-[#D4AF37] font-bold tabular-nums">
                    {creature.power} / 100
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#161F30] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B8860B] to-[#F4D58D] rounded-full"
                    style={{ width: `${creature.power}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

