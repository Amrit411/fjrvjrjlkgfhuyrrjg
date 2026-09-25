import React from 'react';
import { BookOpen, Compass, Shield, Award, Terminal, Heart, Sparkles, Code } from 'lucide-react';
import { NavView } from './Navbar';

interface AboutViewProps {
  onNavigate: (view: NavView) => void;
  onOpenRandom: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenRandom }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full max-w-full overflow-hidden">

      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2 block">
          Curatorial Manifesto
        </span>
        <h1 className="font-serif-ancient text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
          ABOUT MYTHOS ATLAS
        </h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
          An interactive digital archive and comparative media guide celebrating the mythologies, sacred cosmologies, and legendary beings of human history.
        </p>
      </div>

      <div className="space-y-12">

        <section className="bg-[#111827] rounded-2xl border border-[#243048] p-6 sm:p-10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-serif-ancient tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>OUR ARCHIVAL MISSION</span>
          </div>
          <h2 className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
            Bridging Ancient Lore with Modern Interactive Design
          </h2>
          <p className="text-sm sm:text-base text-[#F5F5F0]/85 leading-relaxed font-light">
            Mythology is not simply a catalog of extinct beliefs; it is the symbolic poetry through which ancient civilizations understood the cycles of life, the origins of lightning and stars, and the terrifying beauty of the wilderness.
          </p>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            <strong className="text-[#F4D58D]">Mythos Atlas</strong> was built to transform dry academic encyclopedias into an immersive, museum-grade digital experience. By weaving together genealogical pantheon trees, chronological timelines, cross-cultural comparative graphs, and responsive bestiaries, the platform enables students, writers, gamers, and scholars to explore humanity's shared archetypes.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111827] rounded-xl border border-[#243048] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase font-semibold">
              <Shield className="w-4 h-4" />
              <span>Cultural Equity & Respect</span>
            </div>
            <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0]">
              Non-Hierarchical Comparative Framework
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              Every cultural tradition in Mythos Atlas—from the Vedic hymns of India and the skaldic sagas of Scandinavia to the Pyramid Texts of Egypt and the Shinto animism of Japan—is presented with equal reverence and scholarly nuance. No mythology is depicted as superior or more authentic than another.
            </p>
          </div>

          <div className="bg-[#111827] rounded-xl border border-[#243048] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase font-semibold">
              <Compass className="w-4 h-4" />
              <span>Linguistic & Historical Integrity</span>
            </div>
            <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0]">
              Careful Philological Grounding
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              Names and titles preserve their sacred transliterations (such as <em>Amaterasu-Ōmikami</em> in Japanese or <em>Zeus Olympios</em> in Greek). Folklore weaknesses, elemental alignments, and cosmological habitats are drawn directly from primary texts, including the <em>Eddas</em>, the <em>Popol Vuh</em>, and the <em>Rigveda</em>.
            </p>
          </div>
        </section>

        <section className="bg-[#080B12] rounded-2xl border border-[#243048] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase font-bold">
            <Terminal className="w-4 h-4" />
            <span>HANDCRAFTED ARCHITECTURE & DESIGN STANDARDS</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif-ancient text-2xl font-bold text-[#F5F5F0]">
              Architecture, Craftsmanship & Interactivity
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              Engineered from scratch with deep respect for world folklore, frontend performance, responsive accessibility, custom SVG vector art, and pure modular TypeScript:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#111827] rounded-lg border border-[#243048]">
                <span className="font-mono text-xs text-[#D4AF37] block font-bold mb-1">
                  Custom Vector Engine
                </span>
                <p className="text-xs text-[#9CA3AF]">
                  Interactive SVG rendering for astrolabes, genealogical pantheon nodes, and cultural artifacts with crisp multi-DPR scaling.
                </p>
              </div>

              <div className="p-4 bg-[#111827] rounded-lg border border-[#243048]">
                <span className="font-mono text-xs text-[#D4AF37] block font-bold mb-1">
                  Faceted Real-Time Filtering
                </span>
                <p className="text-xs text-[#9CA3AF]">
                  Instantaneous multi-axis filtering across 7 regions, 5 classes, 7 elements, and power range sliders without layout shift.
                </p>
              </div>

              <div className="p-4 bg-[#111827] rounded-lg border border-[#243048]">
                <span className="font-mono text-xs text-[#D4AF37] block font-bold mb-1">
                  Bespoke Editorial Aesthetics
                </span>
                <p className="text-xs text-[#9CA3AF]">
                  Rooted in classic museum layout principles: high-contrast dark obsidian palette, classic Cinzel typography, and gold foil accents.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#0E1524] rounded-xl border border-[#243048] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-serif-ancient text-base font-bold text-[#F5F5F0]">
                    Clean Modular Architecture
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Built with modern React 19, TypeScript, Vite, and Tailwind CSS. Employs 100% vector SVG mathematical emblems and dynamic 3D holographic tarot physics for instantaneous zero-latency rendering across all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#161F30] via-[#1E293B] to-[#161F30] rounded-2xl border border-[#D4AF37]/50 p-8 text-center space-y-4">
          <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif-ancient text-2xl font-bold text-[#F5F5F0]">
            Ready to Begin Your Exploration?
          </h3>
          <p className="text-sm text-[#9CA3AF] max-w-lg mx-auto">
            Step into the ancient bestiary, trace the Olympian family tree, or let fate choose your next legend.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs font-bold uppercase rounded cursor-pointer transition-all"
            >
              Explore the Atlas
            </button>
            <button
              onClick={onOpenRandom}
              className="px-6 py-2.5 bg-[#111827] hover:bg-[#161F30] text-[#F5F5F0] border border-[#243048] font-serif-ancient text-xs uppercase rounded cursor-pointer transition-all"
            >
              Roll Random Legend
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

