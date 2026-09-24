import React from 'react';
import { BookOpen, Sparkles, Compass, Shield } from 'lucide-react';
import { NavView } from './Navbar';

interface IntroductionSectionProps {
  onNavigate: (view: NavView) => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">

      <div className="flex items-center justify-center gap-4 mb-16 opacity-40">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <div className="w-2 h-2 rotate-45 border border-[#D4AF37]" />
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ARCHIVAL PROLOGUE</span>
          </div>

          <h2 className="font-serif-ancient text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] leading-[1.15] tracking-tight">
            EVERY CULTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D58D] to-[#D4AF37]">
              HAS A STORY.
            </span>
          </h2>

          <div className="space-y-4 text-[#9CA3AF] text-base sm:text-lg leading-relaxed font-normal">
            <p>
              Long before ink dried on parchment or stone was chiseled in royal courts, human societies preserved their most profound questions in oral mythology: <span className="text-[#F5F5F0]">Why does the sun rise? What lies beyond the horizon of death? Where does courage end and destiny begin?</span>
            </p>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              Across misty Scandinavian fjords, sun-drenched Aegean sanctuaries, the towering granite mandapas of the Kaveri, and the high volcanic plateaus of Anahuac, civilizations forged gods, mythical beasts, heroes, and sacred symbols to explain the cosmos and safeguard memory.
            </p>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              The <strong className="text-[#F4D58D] font-medium">Mythos Atlas</strong> gathers these enduring traditions into an interconnected, scholarly media guide. Step through the threshold to explore individual lore or uncover the shared archetypes that unite world storytelling.
            </p>
          </div>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#243048]">
            <div className="p-3 bg-[#111827]/70 rounded-lg border border-[#243048]">
              <span className="text-xl sm:text-2xl font-serif-ancient font-bold text-[#F4D58D] block">7+</span>
              <span className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider">Cultures</span>
            </div>
            <div className="p-3 bg-[#111827]/70 rounded-lg border border-[#243048]">
              <span className="text-xl sm:text-2xl font-serif-ancient font-bold text-[#F4D58D] block">35+</span>
              <span className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider">Legends</span>
            </div>
            <div className="p-3 bg-[#111827]/70 rounded-lg border border-[#243048]">
              <span className="text-xl sm:text-2xl font-serif-ancient font-bold text-[#F4D58D] block">15+</span>
              <span className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider">Creatures</span>
            </div>
            <div className="p-3 bg-[#111827]/70 rounded-lg border border-[#243048]">
              <span className="text-xl sm:text-2xl font-serif-ancient font-bold text-[#F4D58D] block">7+</span>
              <span className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider">Categories</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">

            <div className="relative rounded-2xl overflow-hidden border border-[#243048] shadow-2xl bg-[#111827] group">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop"
                alt="Ancient carved stone temple pillars in golden dawn sunlight"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block mb-1">
                  SACRED ARCHITECTURE & ICONOGRAPHY
                </span>
                <p className="text-sm font-serif-ancient text-[#F5F5F0]">
                  Granite temple mandapas preserve timeless mythological genealogies across millenia.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-6 sm:-left-8 w-48 sm:w-56 p-4 rounded-xl bg-[#161F30]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl hidden sm:block">
              <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider">LIVING MEMORY</span>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Oral traditions evolved over 4,000 years into modern cultural epics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

