import React, { useState } from 'react';
import { Calendar, ChevronRight, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/timelineData';
import { ALL_LEGENDS } from '../data/mythologyData';
import { TimelineEvent, LegendEntry } from '../types/mythology';
import { VisualArtifact } from './VisualArtifact';

interface TimelineViewProps {
  onSelectLegend: (legend: LegendEntry) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectLegend }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(TIMELINE_EVENTS[0]);

  const relatedEntries = ALL_LEGENDS.filter((l) =>
    selectedEvent.relatedEntryIds.includes(l.id)
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2 block">
          Chronological Tapestry
        </span>
        <h1 className="font-serif-ancient text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
          TIMELINE OF LEGENDS
        </h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
          Traverse human civilizational epochs and explore how oral traditions, temple liturgies, and literary codices documented the mysteries of the cosmos across millennia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-[#9CA3AF] tracking-wider mb-2 flex items-center justify-between">
            <span>Historical Epochs ({TIMELINE_EVENTS.length})</span>
            <span className="text-[#D4AF37]">Click to Inspect</span>
          </div>

          <div className="space-y-2.5">
            {TIMELINE_EVENTS.map((event) => {
              const isSelected = selectedEvent.id === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 relative flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#161F30] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] translate-x-1'
                      : 'bg-[#111827] border-[#243048] hover:border-[#D4AF37]/50 hover:bg-[#141C2B]'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                        {event.timeRange}
                      </span>
                      <span className="text-[10px] text-[#9CA3AF] uppercase bg-[#080B12] px-2 py-0.5 rounded border border-[#243048]">
                        {event.culture}
                      </span>
                    </div>
                    <div className="font-serif-ancient text-sm font-bold text-[#F5F5F0] truncate">
                      {event.era}
                    </div>
                    <div className="text-xs text-[#9CA3AF] truncate mt-0.5">
                      {event.title}
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-[#9CA3AF]'
                    }`}
                  />

                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#111827] rounded-2xl border border-[#243048] p-6 sm:p-8 space-y-6 shadow-xl">

          <div className="pb-6 border-b border-[#243048]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-2">
              <Calendar className="w-4 h-4" />
              <span>{selectedEvent.timeRange}</span>
              <span>·</span>
              <span className="text-[#F5F5F0]">{selectedEvent.culture} Tradition</span>
            </div>
            <h2 className="font-serif-ancient text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] mb-2">
              {selectedEvent.title}
            </h2>
            <p className="text-sm font-serif-ancient italic text-[#F4D58D]">
              {selectedEvent.era}
            </p>
          </div>

          <div>
            <h3 className="font-serif-ancient text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>HISTORICAL CONTEXT & SCHOLARSHIP</span>
            </h3>
            <p className="text-sm sm:text-base text-[#F5F5F0]/90 leading-relaxed font-light">
              {selectedEvent.historicalContext}
            </p>
          </div>

          <div className="p-5 bg-[#161F30] rounded-xl border border-[#243048]">
            <h3 className="font-serif-ancient text-xs font-bold text-[#F4D58D] uppercase tracking-wider mb-3">
              NOTABLE RELIGIOUS & CULTURAL TRADITIONS
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#9CA3AF]">
              {selectedEvent.traditions.map((tradition, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                  <span>{tradition}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif-ancient text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>REPRESENTATIVE FIGURES & SAGES</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedEvent.keyFigures.map((fig, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#080B12] border border-[#243048] rounded-full text-xs font-serif-ancient text-[#F5F5F0]"
                >
                  {fig}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#080B12] border-l-4 border-[#D4AF37] flex items-start gap-3">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                Civilizational Impact
              </span>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                {selectedEvent.culturalSignificance}
              </p>
            </div>
          </div>

          {relatedEntries.length > 0 && (
            <div className="pt-4 border-t border-[#243048]">
              <h3 className="font-serif-ancient text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                ASSOCIATED ARCHIVE ENTRIES ({relatedEntries.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedEntries.map((legend) => (
                  <button
                    key={legend.id}
                    onClick={() => onSelectLegend(legend)}
                    className="p-3 bg-[#080B12] hover:bg-[#161F30] border border-[#243048] hover:border-[#D4AF37] rounded-lg transition-all text-left flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 shrink-0">
                        <VisualArtifact
                          iconType={legend.iconType}
                          element={legend.element}
                          name={legend.name}
                          size="sm"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif-ancient text-xs font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                          {legend.name}
                        </div>
                        <div className="text-[10px] text-[#9CA3AF] font-mono truncate">
                          {legend.class} · {legend.element}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

