import React, { useState } from 'react';
import { Globe, ArrowRight, Compass, MapPin } from 'lucide-react';
import { MythologyRegion } from '../types/mythology';

interface MapRegionData {
  id: MythologyRegion;
  name: string;
  mythology: string;
  coords: { x: number; y: number };
  description: string;
  entriesCount: number;
  highlightColor: string;
  accent: string;
}

const REGIONS_DATA: MapRegionData[] = [
  {
    id: 'India',
    name: 'South Asia / India',
    mythology: 'Indian Traditions',
    coords: { x: 68.5, y: 47 },
    description: 'Vedic hymns, cosmic cycles of Yugas, and transcendent avatars of Vishnu & Shiva.',
    entriesCount: 7,
    highlightColor: '#F59E0B',
    accent: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  {
    id: 'Greece',
    name: 'Aegean / Greece',
    mythology: 'Greek Mythology',
    coords: { x: 53.5, y: 36 },
    description: 'Mount Olympus sovereigns, heroic labors of Heracles, and the inescapable Fates.',
    entriesCount: 8,
    highlightColor: '#3B82F6',
    accent: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  },
  {
    id: 'Egypt',
    name: 'Nile Valley / Egypt',
    mythology: 'Egyptian Pantheon',
    coords: { x: 55, y: 43 },
    description: 'The solar barque of Ra, funerary scales of Anubis, and cosmic Ma’at balance.',
    entriesCount: 6,
    highlightColor: '#D97706',
    accent: 'bg-amber-600/20 text-amber-300 border-amber-600/40',
  },
  {
    id: 'Scandinavia',
    name: 'Northern Fjords / Scandinavia',
    mythology: 'Norse Lore',
    coords: { x: 52, y: 22 },
    description: 'The Nine Realms of Yggdrasil, runic wisdom of Odin, and prophesied Ragnarök.',
    entriesCount: 7,
    highlightColor: '#06B6D4',
    accent: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  },
  {
    id: 'Japan',
    name: 'Archipelago / Japan',
    mythology: 'Japanese Shinto & Yokai',
    coords: { x: 86, y: 39 },
    description: 'Solar majesty of Amaterasu, sword of Susanoo, and supernatural Kitsune & Kappa.',
    entriesCount: 7,
    highlightColor: '#EC4899',
    accent: 'bg-pink-500/20 text-pink-400 border-pink-500/40',
  },
  {
    id: 'Celtic',
    name: 'British Isles & Ireland / Celtic',
    mythology: 'Celtic Lore & Otherworld',
    coords: { x: 46.5, y: 27 },
    description: 'The Tuatha Dé Danann, fairy mounds, raven prophecies of The Morrígan, and Banshees.',
    entriesCount: 6,
    highlightColor: '#10B981',
    accent: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
  {
    id: 'Mesoamerica',
    name: 'Anahuac & Maya / Mesoamerica',
    mythology: 'Mesoamerican Cosmology',
    coords: { x: 23, y: 48 },
    description: 'Feathered serpent Quetzalcoatl, the Five Suns, and the underworld trials of Mictlan.',
    entriesCount: 5,
    highlightColor: '#14B8A6',
    accent: 'bg-teal-500/20 text-teal-400 border-teal-500/40',
  },
];

interface InteractiveWorldMapProps {
  onSelectRegion: (region: MythologyRegion) => void;
}

export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ onSelectRegion }) => {
  const [activeRegion, setActiveRegion] = useState<MapRegionData | null>(REGIONS_DATA[0]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">

      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37] mb-4">
          <Globe className="w-3.5 h-3.5" />
          <span>GEOGRAPHICAL CARTOGRAPHY</span>
        </div>
        <h2 className="font-serif-ancient text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] tracking-tight mb-4">
          EXPLORE THE WORLD
        </h2>
        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          Hover over sacred epicenters across continents to preview ancient cultural traditions, or click any region to launch the filtered encyclopedia.
        </p>
      </div>

      <div className="hidden md:block relative bg-[#0c121e] border border-[#243048] rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">

        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #243048 1px, transparent 1px), linear-gradient(to bottom, #243048 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative w-full aspect-[2/1] max-h-[520px]">

          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full opacity-40"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="0.75"
          >

            <path d="M120,80 Q200,60 260,110 Q290,160 240,210 Q210,250 180,290 L160,280 Q130,220 90,190 Q70,120 120,80 Z" />

            <path d="M180,280 Q210,310 240,320 L220,335 Q190,310 180,280 Z" />

            <path d="M230,320 Q310,320 340,370 Q370,440 280,480 Q220,440 210,380 Z" />

            <path d="M460,100 Q540,80 570,140 Q550,180 500,190 Q470,160 450,130 Z" />

            <path d="M490,70 Q540,50 560,90 Q540,130 500,120 Z" />

            <path d="M440,110 Q470,100 460,140 Q430,150 440,110 Z" />

            <path d="M460,200 Q560,190 570,260 Q550,370 480,420 Q440,340 430,260 Z" />

            <path d="M570,90 Q740,70 870,110 Q910,210 820,290 Q720,270 650,210 Q580,180 570,90 Z" />

            <path d="M650,220 Q700,220 710,290 Q670,330 640,280 Z" />

            <path d="M840,170 Q880,160 870,220 Q840,220 840,170 Z" />

            <path d="M780,350 Q880,340 890,410 Q830,460 770,420 Z" />
          </svg>

          {REGIONS_DATA.map((region) => {
            const isSelected = activeRegion?.id === region.id;
            return (
              <div
                key={region.id}
                style={{ left: `${region.coords.x}%`, top: `${region.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onMouseEnter={() => setActiveRegion(region)}
                onClick={() => onSelectRegion(region.id)}
              >

                <div
                  className={`w-9 h-9 rounded-full absolute -inset-2.5 transition-all duration-300 ${
                    isSelected ? 'opacity-100 scale-125' : 'opacity-40 group-hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: `${region.highlightColor}20`,
                    border: `1px solid ${region.highlightColor}`,
                    animation: isSelected ? 'pulse 2s infinite' : 'none'
                  }}
                />

                <div
                  className={`w-4 h-4 rounded-full transition-transform duration-300 flex items-center justify-center shadow-lg ${
                    isSelected ? 'scale-125' : 'group-hover:scale-110'
                  }`}
                  style={{ backgroundColor: region.highlightColor }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#080B12]" />
                </div>

                <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-[#080B12]/90 border border-[#243048] text-[10px] font-mono text-[#F4D58D] pointer-events-none shadow">
                  {region.id}
                </div>
              </div>
            );
          })}

          {activeRegion && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-5 bg-[#080B12]/95 backdrop-blur-md rounded-xl border border-[#D4AF37]/50 shadow-2xl z-30 animate-fadeIn">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block font-semibold">
                    {activeRegion.mythology}
                  </span>
                  <h3 className="font-serif-ancient text-xl font-bold text-[#F5F5F0]">
                    {activeRegion.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#161F30] border border-[#243048] text-xs font-mono text-[#F4D58D] shrink-0">
                  {activeRegion.entriesCount} Archived Entries
                </span>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                {activeRegion.description}
              </p>

              <button
                onClick={() => onSelectRegion(activeRegion.id)}
                className="w-full py-2 px-4 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] text-xs font-serif-ancient font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>EXPLORE {activeRegion.id.toUpperCase()} LEGENDS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden space-y-4 w-full max-w-full overflow-hidden">
        <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory no-scrollbar touch-pan-x w-full max-w-full">
          {REGIONS_DATA.map((region) => (
            <div
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className="snap-center shrink-0 w-[85%] max-w-xs p-5 bg-[#111827] border border-[#243048] active:border-[#D4AF37] rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    {region.mythology}
                  </span>
                  <span className="text-[11px] font-mono text-[#9CA3AF]">
                    {region.entriesCount} entries
                  </span>
                </div>
                <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0] mb-2">
                  {region.name}
                </h3>
                <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed mb-4">
                  {region.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#243048] flex items-center justify-between text-xs text-[#D4AF37] font-serif-ancient font-semibold">
                <span>OPEN REGION ATLAS</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#9CA3AF] font-mono">
          Swipe horizontally to explore all 7 mythological regions →
        </p>
      </div>
    </section>
  );
};

