import React, { useState } from 'react';
import { X, Sparkles, RotateCcw, ArrowRight, Eye, Shield, Compass } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry } from '../types/mythology';
import { LegendArtwork } from './LegendArtwork';
import { ambientSound } from '../utils/ambientAudio';

interface OracleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLegend: (legend: LegendEntry) => void;
}

const ORACLE_PROPHECIES: Record<string, string> = {
  'deity-shiva': '“Transformation demands the destruction of the obsolete. Clear the embers of yesterday to forge cosmic renewal.”',
  'deity-zeus': '“True sovereignty is temperance amidst the storm. Channel your lightning with righteous deliberation.”',
  'deity-odin': '“Wisdom requires sacred sacrifice. The eye cast into the well sees further than a thousand unbroken glances.”',
  'deity-ra': '“Each dawn is a triumphant rebirth over nocturnal shadows. Radiate unwavering truth through every sphere.”',
  'deity-amaterasu': '“The mirror reveals the inner divinity. Step forward from the cave of solitude and illuminate the path.”',
  'creature-medusa': '“The serpent’s gaze turns fleeting distractions into immovable resolve. Guard your inner sanctuary fiercely.”',
  'creature-fenrir': '“Chains forged by fear cannot bind primal destiny forever. Break free with honor and unshakable purpose.”',
  'deity-anubis': '“When weighed upon the golden scales of Ma’at, let your heart be as unburdened and light as a feather.”',
  'creature-garuda': '“Soar above the serpent of worldly doubt. Wings of celestial devotion carry you beyond ordinary horizons.”',
  'deity-thor': '“Courage is not the absence of thunder, but wielding the storm in defense of those you hold dear.”',
  'creature-kitsune': '“Walk with nine paths of perception. Wisdom whispers between the realms of shadow and spirit fire.”',
  'deity-vishnu': '“Cosmic order is preserved through gentle vigilance. Align your steps with the eternal rhythm of Dharma.”',
};

export const OracleModal: React.FC<OracleModalProps> = ({
  isOpen,
  onClose,
  onSelectLegend,
}) => {
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const [drawnLegend, setDrawnLegend] = useState<LegendEntry | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  if (!isOpen) return null;

  const handlePickCard = (cardIdx: number) => {
    if (selectedCardIdx !== null || isFlipping) return;

    setSelectedCardIdx(cardIdx);
    setIsFlipping(true);

    // Play sacred temple reveal chime
    ambientSound.playCardRevealChime();

    // Pick a legend with high thematic depth
    const pool = ALL_LEGENDS;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
      setDrawnLegend(randomPick);
      setIsFlipping(false);
    }, 700);
  };

  const handleReset = () => {
    setSelectedCardIdx(null);
    setDrawnLegend(null);
    setIsFlipping(false);
  };

  const prophecy = drawnLegend
    ? ORACLE_PROPHECIES[drawnLegend.id] ||
      `“The ancient mantle of ${drawnLegend.name} descends upon your journey. Walk with ${drawnLegend.element.toLowerCase()} power and righteous resolve.”`
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="oracle-title"
    >
      <div className="relative w-full max-w-2xl bg-[#080B12] border border-[#D4AF37]/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col justify-between overflow-hidden">
        {/* Background Astrolabe rings */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-[#D4AF37]/10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-[#D4AF37]/10 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#243048] pb-4 mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="oracle-title"
                className="font-serif-ancient text-xl sm:text-2xl font-bold tracking-wider text-[#F5F5F0]"
              >
                FATE’S ORACLE
              </h2>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                Ancient Mythic Tarot Divination
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#161F30] rounded-lg transition-colors cursor-pointer"
            aria-label="Close Oracle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="relative z-10 py-2">
          {!drawnLegend ? (
            <div className="flex flex-col items-center text-center">
              <p className="text-sm sm:text-base text-[#9CA3AF] max-w-md mb-8 leading-relaxed">
                Clear your thoughts. Choose one of the three celestial facedown cards to reveal your guiding mythic patron and divine prophecy.
              </p>

              {/* Three Facedown Tarot Cards */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md mb-8">
                {[0, 1, 2].map((idx) => {
                  const isSelected = selectedCardIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePickCard(idx)}
                      disabled={isFlipping}
                      className={`group relative aspect-[3/4] rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden p-3 flex flex-col items-center justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] scale-105 shadow-[0_0_25px_rgba(212,175,55,0.4)] animate-pulse'
                          : 'border-[#D4AF37]/50 bg-gradient-to-b from-[#161F30] via-[#0F172A] to-[#080B12] hover:border-[#D4AF37] hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#D4AF37]">❖ ❖</span>
                      {/* Mystical Astrolabe Sigil Card Back */}
                      <div className="w-12 h-12 rounded-full border border-[#D4AF37]/60 flex items-center justify-center relative">
                        <div className="w-8 h-8 rounded-full border border-dashed border-[#D4AF37]/40 animate-spin [animation-duration:15s]" />
                        <span className="absolute text-[#D4AF37] font-serif-ancient text-sm">
                          {idx === 0 ? 'ᛟ' : idx === 1 ? 'ॐ' : '𓋹'}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-[#F4D58D] uppercase group-hover:text-white">
                        SELECT
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] font-mono text-[#9CA3AF] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Draws are determined by universal cosmic synchronization</span>
              </div>
            </div>
          ) : (
            /* Revealed Tarot Card with Divine Prophecy */
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 animate-fadeIn">
              <div className="w-48 sm:w-56 aspect-[3/4] shrink-0 rounded-xl overflow-hidden border border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <LegendArtwork legend={drawnLegend} size="lg" className="w-full h-full" />
              </div>

              <div className="flex-1 flex flex-col justify-between text-left space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#D4AF37]">
                    <span>PATRON DEITY REVEALED</span>
                    <span>·</span>
                    <span>{drawnLegend.mythology}</span>
                  </div>

                  <h3 className="font-serif-ancient text-2xl sm:text-3xl font-extrabold text-[#F5F5F0]">
                    {drawnLegend.name}
                  </h3>
                  <p className="text-xs text-[#F4D58D] italic font-serif-ancient mb-3">
                    {drawnLegend.title}
                  </p>

                  <div className="p-4 rounded-xl bg-[#111827] border border-[#243048] relative">
                    <span className="absolute top-2 left-2 text-[#D4AF37]/40 text-xl font-serif">“</span>
                    <p className="text-xs sm:text-sm text-[#F5F5F0] italic leading-relaxed pl-3 font-serif-ancient">
                      {prophecy}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectLegend(drawnLegend);
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] rounded-lg font-serif-ancient font-bold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer"
                  >
                    <span>Read Full Lore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#161F30] hover:bg-[#1E293B] text-[#9CA3AF] hover:text-white border border-[#243048] rounded-lg text-xs font-mono transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Draw Again</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
