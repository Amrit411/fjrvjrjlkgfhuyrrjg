import React, { useState } from 'react';
import { HelpCircle, ChevronLeft, ChevronRight, Sparkles, BookMarked } from 'lucide-react';

interface MythFact {
  tag: string;
  fact: string;
  detail: string;
  source: string;
}

const MYTH_FACTS: MythFact[] = [
  {
    tag: 'UNIVERSAL THEMES',
    fact: 'Nearly every major world mythology contains an epic flood narrative or cosmic deluge.',
    detail: 'From the Mesopotamian Epic of Gilgamesh (Utnapishtim) and Genesis, to the Hindu Matsya Purana, Greek Deucalion, and Aztec Coxcox, cultures across disconnected continents encoded major prehistoric climatic shifts into deluge mythologies.',
    source: 'Comparative Mythology Archives',
  },
  {
    tag: 'LINGUISTIC ROOTS',
    fact: 'The names Zeus, Jupiter, and Vedic Dyaus Pita share an identical Proto-Indo-European ancestor.',
    detail: 'Linguists discovered that *Dyeus-pəter, meaning "Sky Father", was worshiped on the Eurasian steppes over 6,000 years ago, splitting across millennia into the Greek Zeus, Roman Jupiter, and Vedic Dyauspita.',
    source: 'Historical Indo-European Linguistics',
  },
  {
    tag: 'TRANSFORMATION MOTIFS',
    fact: 'Shape-shifting served as the ancient world’s primary metaphor for psychological fluidity.',
    detail: 'From Zeus becoming an eagle to Japanese Kitsune growing nine tails, shapeshifting explored human boundaries with the animal kingdom, spiritual tests of identity, and the fluid nature of fate.',
    source: 'Ovid’s Metamorphoses & Heian Lore',
  },
  {
    tag: 'ETERNAL HOUNDS',
    fact: 'Subterranean underworld dogs guard the threshold of death across three distinct civilizations.',
    detail: 'Cerberus guarded the Greek River Styx, the four-eyed hounds of Yama guarded Hindu Naraka, and Garmr guarded the gates of Norse Hel—showing a universal pastoral archetype of the protective boundary hound.',
    source: 'Funerary Anthropology',
  },
];

export const DidYouKnowSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevFact = () => {
    setCurrentIndex((prev) => (prev === 0 ? MYTH_FACTS.length - 1 : prev - 1));
  };

  const nextFact = () => {
    setCurrentIndex((prev) => (prev === MYTH_FACTS.length - 1 ? 0 : prev + 1));
  };

  const current = MYTH_FACTS[currentIndex];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-[#111827] via-[#161F30] to-[#111827] rounded-3xl border border-[#243048] p-6 sm:p-10 shadow-xl relative overflow-hidden">

        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#D4AF37]">
              DID YOU KNOW?
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevFact}
              className="p-1.5 rounded-lg bg-[#080B12] border border-[#243048] text-[#9CA3AF] hover:text-[#F5F5F0] hover:border-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Previous fact"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#9CA3AF] px-1">
              {currentIndex + 1} / {MYTH_FACTS.length}
            </span>
            <button
              onClick={nextFact}
              className="p-1.5 rounded-lg bg-[#080B12] border border-[#243048] text-[#9CA3AF] hover:text-[#F5F5F0] hover:border-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Next fact"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 animate-fadeIn">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#080B12] text-[#F4D58D] border border-[#243048]">
            {current.tag}
          </span>

          <h3 className="font-serif-ancient text-xl sm:text-2xl font-bold text-[#F5F5F0] leading-snug">
            “{current.fact}”
          </h3>

          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            {current.detail}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#64748B] border-t border-[#243048]/60">
            <span>Reference: {current.source}</span>
            <span className="text-[#D4AF37]">✦ Archival Note</span>
          </div>
        </div>
      </div>
    </section>
  );
};

