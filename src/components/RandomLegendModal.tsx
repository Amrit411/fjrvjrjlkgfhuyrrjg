import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, ArrowRight, Compass } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry } from '../types/mythology';
import { VisualArtifact } from './VisualArtifact';
import { LegendArtwork } from './LegendArtwork';

interface RandomLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLegend: (legend: LegendEntry) => void;
}

export const RandomLegendModal: React.FC<RandomLegendModalProps> = ({
  isOpen,
  onClose,
  onSelectLegend,
}) => {
  const [selectedLegend, setSelectedLegend] = useState<LegendEntry>(ALL_LEGENDS[0]);
  const [isShuffling, setIsShuffling] = useState(false);

  const rollRandom = () => {
    setIsShuffling(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ALL_LEGENDS.length);
      setSelectedLegend(ALL_LEGENDS[randomIndex]);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 60);
  };

  useEffect(() => {
    if (isOpen) {
      rollRandom();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#080B12] border-2 border-[#D4AF37] rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.25)] p-6 sm:p-8 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Random Legend Discovery"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#F5F5F0] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
            ORACLE OF CHANCE
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>

        <h3 className="font-serif-ancient text-2xl font-bold text-[#F5F5F0] mb-6">
          DISCOVER A RANDOM LEGEND
        </h3>

        <div
          className={`relative rounded-xl bg-[#111827] border border-[#243048] p-6 mb-6 transition-all duration-300 ${
            isShuffling ? 'scale-95 opacity-70 blur-[1px]' : 'scale-100 opacity-100'
          }`}
        >
          <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto mb-4 relative rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-md bg-[#161F30]">
            <LegendArtwork legend={selectedLegend} size="md" className="w-full h-full" />
          </div>

          <h4 className="font-serif-ancient text-2xl font-bold text-[#F4D58D] mb-1">
            {selectedLegend.name}
          </h4>
          <p className="text-xs text-[#9CA3AF] italic mb-3">
            {selectedLegend.title}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#9CA3AF] mb-4">
            <span className="text-[#D4AF37] font-semibold">{selectedLegend.mythology}</span>
            <span>·</span>
            <span className="capitalize">{selectedLegend.class}</span>
            <span>·</span>
            <span>{selectedLegend.element}</span>
            <span>·</span>
            <span className="text-[#F4D58D]">Power {selectedLegend.power}</span>
          </div>

          <div className="p-3 bg-[#080B12] rounded-lg border-l-2 border-[#D4AF37] text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block font-semibold mb-1">
              Fascinating Folklore Fact:
            </span>
            <p className="text-xs text-[#F5F5F0]/80 italic leading-relaxed">
              "{selectedLegend.fascinatingFact}"
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => {
              onSelectLegend(selectedLegend);
              onClose();
            }}
            disabled={isShuffling}
            className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs font-bold tracking-wider uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <span>EXPLORE THIS LEGEND</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={rollRandom}
            disabled={isShuffling}
            className="w-full sm:w-auto px-4 py-3 bg-[#161F30] hover:bg-[#1E293B] text-[#F5F5F0] border border-[#243048] hover:border-[#D4AF37] font-serif-ancient text-xs font-semibold tracking-wider uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${isShuffling ? 'animate-spin' : ''}`} />
            <span>Roll Another</span>
          </button>
        </div>
      </div>
    </div>
  );
};

