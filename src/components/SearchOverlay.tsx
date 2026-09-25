import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry } from '../types/mythology';
import { VisualArtifact } from './VisualArtifact';
import { CreatureArtworkSVG } from './CreatureArtworks';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLegend: (legend: LegendEntry) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectLegend,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredResults = normalizedQuery
    ? ALL_LEGENDS.filter((item) => {
        const matchName = item.name.toLowerCase().includes(normalizedQuery);
        const matchTitle = item.title.toLowerCase().includes(normalizedQuery);
        const matchMythology = item.mythology.toLowerCase().includes(normalizedQuery);
        const matchRegion = item.region.toLowerCase().includes(normalizedQuery);
        const matchElement = item.element.toLowerCase().includes(normalizedQuery);
        const matchClass = item.class.toLowerCase().includes(normalizedQuery);
        const matchType = item.type.toLowerCase().includes(normalizedQuery);
        const matchLore = item.lore.toLowerCase().includes(normalizedQuery);
        const matchSymbols = item.symbols.some((s) => s.toLowerCase().includes(normalizedQuery));
        return (
          matchName ||
          matchTitle ||
          matchMythology ||
          matchRegion ||
          matchElement ||
          matchClass ||
          matchType ||
          matchLore ||
          matchSymbols
        );
      })
    : ALL_LEGENDS.slice(0, 6);

  const highlightMatch = (text: string) => {
    if (!normalizedQuery) return text;
    const regex = new RegExp(`(${normalizedQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === normalizedQuery.toLowerCase() ? (
        <mark key={index} className="bg-[#D4AF37]/30 text-[#F4D58D] px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const quickSearches = ['Fire', 'Greek', 'Thunder', 'Rebirth', 'Trickster', 'Underworld', 'Norse', 'Kitsune'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#080B12] border border-[#243048] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search the Mythos Atlas"
      >

        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-[#243048] bg-[#111827]/80">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gods, creatures, heroes, elements, or myths..."
            className="w-full bg-transparent text-[#F5F5F0] placeholder-[#9CA3AF] text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#9CA3AF] hover:text-[#F5F5F0] mr-2"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs uppercase tracking-wider text-[#9CA3AF] hover:text-[#D4AF37] border border-[#243048] rounded"
          >
            Esc
          </button>
        </div>

        <div className="px-6 py-2.5 bg-[#0D131F] border-b border-[#243048]/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#9CA3AF] shrink-0 font-mono text-[11px] uppercase">Filter by:</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                query.toLowerCase() === term.toLowerCase()
                  ? 'bg-[#D4AF37] text-[#080B12] font-semibold'
                  : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#1E293B]'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 divide-y divide-[#243048]/60">
          {filteredResults.length > 0 ? (
            <div>
              <div className="flex items-center justify-between text-xs text-[#9CA3AF] uppercase tracking-wider pb-3 font-mono">
                <span>
                  {query
                    ? `${filteredResults.length} matching legend${filteredResults.length > 1 ? 's' : ''}`
                    : 'Curated Atlas Suggestions'}
                </span>
                <span>Press Enter to View</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {filteredResults.map((legend) => (
                  <button
                    key={legend.id}
                    onClick={() => {
                      onSelectLegend(legend);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-[#111827]/60 hover:bg-[#161F30] border border-transparent hover:border-[#D4AF37]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-[#243048] bg-[#080B12] flex items-center justify-center">
                        {['creature-dragon', 'creature-phoenix', 'creature-kitsune', 'creature-garuda'].includes(legend.id) ? (
                          <CreatureArtworkSVG id={legend.id} className="w-full h-full object-contain p-0.5" />
                        ) : legend.image ? (
                          <img
                            src={legend.image}
                            alt={legend.imageAlt || legend.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <VisualArtifact
                            iconType={legend.iconType}
                            element={legend.element}
                            name={legend.name}
                            size="sm"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-serif-ancient text-base font-semibold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors truncate">
                            {highlightMatch(legend.name)}
                          </span>
                          <span className="text-xs text-[#9CA3AF]">·</span>
                          <span className="text-xs text-[#D4AF37] font-medium shrink-0">
                            {legend.mythology}
                          </span>
                        </div>
                        <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
                          {highlightMatch(legend.title)}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF] mt-1">
                          <span className="capitalize">{legend.class}</span>
                          <span>·</span>
                          <span>Element: {legend.element}</span>
                          <span>·</span>
                          <span className="font-mono text-[#D4AF37]">Power {legend.power}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </button>
                ))}
              </div>
            </div>
          ) : (

            <div className="py-12 px-4 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#161F30] border border-[#243048] flex items-center justify-center text-[#D4AF37] mb-4">
                <Sparkles className="w-6 h-6 opacity-60" />
              </div>
              <h4 className="font-serif-ancient text-lg text-[#F5F5F0] mb-1">
                No legend found.
              </h4>
              <p className="text-sm text-[#9CA3AF] max-w-sm">
                Try another search term or explore by element like “Fire”, “Water”, or culture like “Greek” or “Norse”.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

