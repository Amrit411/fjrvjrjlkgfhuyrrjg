import React from 'react';
import { NavView } from './Navbar';
import { Sparkles, Compass, Shield, BookOpen, Layers } from 'lucide-react';
import { MythologyRegion } from '../types/mythology';

interface FooterProps {
  onNavigate: (view: NavView) => void;
  onSelectRegion: (region: MythologyRegion) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectRegion }) => {
  const regions: MythologyRegion[] = ['India', 'Greece', 'Egypt', 'Scandinavia', 'Japan', 'Celtic', 'Mesoamerica'];

  return (
    <footer className="w-full max-w-full bg-[#080B12] border-t border-[#243048] pt-16 pb-12 mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#243048]/80">

          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-ancient text-2xl font-bold tracking-[0.2em] text-[#F5F5F0]">
                MYTHOS ATLAS
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] font-semibold mt-0.5">
                DIGITAL ENCYCLOPEDIA OF WORLD LORE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-sm leading-relaxed font-light">
              An interactive museum and comparative media guide archiving ancient mythologies, legendary creatures, divine pantheons, and shared cross-cultural archetypes.
            </p>
          </div>

          <div>
            <h4 className="font-serif-ancient text-xs font-bold text-[#F4D58D] uppercase tracking-widest mb-4">
              Atlas Sections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9CA3AF]">
              {[
                { id: 'home' as NavView, label: 'Home Archive' },
                { id: 'explore' as NavView, label: 'Explore the Atlas' },
                { id: 'creatures' as NavView, label: 'Creature Encyclopedia' },
                { id: 'pantheons' as NavView, label: 'Pantheons & Family Tree' },
                { id: 'timeline' as NavView, label: 'Timeline of Legends' },
                { id: 'connections' as NavView, label: 'The Connection Atlas' },
                { id: 'about' as NavView, label: 'About & Methodology' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif-ancient text-xs font-bold text-[#F4D58D] uppercase tracking-widest mb-4">
              World Traditions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9CA3AF]">
              {regions.map((region) => (
                <li key={region}>
                  <button
                    onClick={() => {
                      onSelectRegion(region);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                  >
                    {region} Lore
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif-ancient text-xs font-bold text-[#F4D58D] uppercase tracking-widest mb-4">
              Archival Standards
            </h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-3">
              All mythological texts, genealogical linkages, and elemental correspondences are synthesized from historical sources and comparative literature.
            </p>
            <div className="p-3 bg-[#111827] rounded-lg border border-[#243048] text-[11px] font-mono text-[#9CA3AF]">
              <span className="text-[#D4AF37] block font-semibold mb-0.5">Citation System:</span>
              Comparative Monomyth & Historical Epics
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center text-xs text-[#9CA3AF] gap-4 font-mono">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>Cultural Folklore Archive</span>
            <span>·</span>
            <span>Open Source</span>
            <span>·</span>
            <span>Built with React & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

