import React, { useState } from 'react';
import { History, Calendar, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { NavView } from './Navbar';

interface TimelineMilestone {
  culture: string;
  epoch: string;
  timeframe: string;
  context: string;
  traditions: string;
  distinction: 'Ancient Primary Source' | 'Classical Synthesis' | 'Medieval Codex' | 'Modern Retelling';
}

const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    culture: 'Ancient Egypt',
    epoch: 'Old Kingdom Pyramid Texts',
    timeframe: 'c. 2686 – 2181 BCE',
    context: 'Funerary spells inscribed directly on tomb chamber walls ensuring pharaohs ascend to the solar barque of Ra.',
    traditions: 'Solar cyclical theology, Ma’at truth weighing, Osiris resurrection',
    distinction: 'Ancient Primary Source',
  },
  {
    culture: 'Ancient India',
    epoch: 'Vedic Composition & Epics',
    timeframe: 'c. 1500 – 500 BCE',
    context: 'Sanskrit hymns chanted in oral mnemonic lineage, codifying cosmic Dharma, Yugas, and the divine avatars of Vishnu.',
    traditions: 'Rigveda hymns, Mahabharata war, Ramayana ethics',
    distinction: 'Ancient Primary Source',
  },
  {
    culture: 'Ancient Greece',
    epoch: 'Hesiodic & Homeric Age',
    timeframe: 'c. 800 – 400 BCE',
    context: 'Codification of Olympian geneaologies in Hesiod’s Theogony and Homer’s Iliad and Odyssey, performed at pan-Hellenic games.',
    traditions: 'Titanomachy, Olympian pantheon, heroic katabasis',
    distinction: 'Classical Synthesis',
  },
  {
    culture: 'Norse Traditions',
    epoch: 'Viking Age Oral Lore',
    timeframe: 'c. 793 – 1066 CE',
    context: 'Oral skaldic poetry celebrating Odin, Thor, and Yggdrasil, preserved prior to Christian conversion in Iceland.',
    traditions: 'Allfather runes, Ragnarök doom, Valhalla oath',
    distinction: 'Ancient Primary Source',
  },
  {
    culture: 'Japanese Traditions',
    epoch: 'Kojiki & Heian Folklore',
    timeframe: 'c. 712 – 1185 CE',
    context: 'Imperial commissioning of the Kojiki (Records of Ancient Matters) linking the solar Kami Amaterasu to the imperial throne.',
    traditions: 'Shinto Kami animism, Izanagi creation, Yokai bestiaries',
    distinction: 'Classical Synthesis',
  },
  {
    culture: 'Medieval Europe',
    epoch: 'Prose Edda & Arthurian Romances',
    timeframe: 'c. 1200 – 1400 CE',
    context: 'Snorri Sturluson compiling pagan lore in Christian Iceland; French and Welsh bards romanticizing Celtic Holy Grail myths.',
    traditions: 'Christianized bestiaries, chivalric dragon quests',
    distinction: 'Medieval Codex',
  },
  {
    culture: 'Global Reinterpretations',
    epoch: 'Comparative Myth & Modern Fantasy',
    timeframe: '19th Century – Present',
    context: 'Joseph Campbell, J.R.R. Tolkien, and modern literature revitalizing classical archetypes into world cultural heritage.',
    traditions: 'The Hero with a Thousand Faces, cinematic epics',
    distinction: 'Modern Retelling',
  },
];

interface HomeTimelinePreviewProps {
  onNavigate: (view: NavView) => void;
}

export const HomeTimelinePreview: React.FC<HomeTimelinePreviewProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeMilestone = TIMELINE_MILESTONES[selectedIndex];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">

      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37] mb-3">
          <History className="w-3.5 h-3.5" />
          <span>CHRONOLOGICAL TAPESTRY</span>
        </div>
        <h2 className="font-serif-ancient text-3xl sm:text-4xl font-extrabold text-[#F5F5F0] tracking-tight mb-3">
          TIMELINE OF LEGENDS
        </h2>
        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          Trace how sacred beliefs developed from ancient oral records to medieval manuscript codices and modern reinterpretations.
        </p>
      </div>

      <div className="relative bg-[#111827] border border-[#243048] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">

        <div className="relative mb-8 pb-4 border-b border-[#243048] overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[700px] relative px-4">

            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#243048]" />

            {TIMELINE_MILESTONES.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#080B12] scale-125 ring-4 ring-[#D4AF37]/20 font-bold'
                        : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#F5F5F0] border border-[#243048]'
                    }`}
                  >
                    <span className="text-[10px] font-mono">{idx + 1}</span>
                  </div>
                  <span
                    className={`text-[11px] font-serif-ancient mt-3 font-semibold transition-colors whitespace-nowrap ${
                      isSelected ? 'text-[#D4AF37]' : 'text-[#9CA3AF] group-hover:text-[#F5F5F0]'
                    }`}
                  >
                    {item.culture}
                  </span>
                  <span className="text-[9px] font-mono text-[#64748B] whitespace-nowrap">
                    {item.timeframe.split('–')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-[#080B12] rounded-2xl border border-[#243048] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
                {activeMilestone.culture} · {activeMilestone.epoch}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161F30] text-[#F4D58D] border border-[#243048]">
                {activeMilestone.distinction}
              </span>
            </div>

            <h3 className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
              {activeMilestone.timeframe}
            </h3>

            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              {activeMilestone.context}
            </p>

            <div className="text-xs text-[#9CA3AF] bg-[#111827] p-3 rounded-lg border border-[#243048]">
              <strong className="text-[#F4D58D] font-serif-ancient">Notable Traditions: </strong>
              {activeMilestone.traditions}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between h-full bg-[#111827] p-5 rounded-xl border border-[#243048]">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                CURATORIAL CRITIQUE
              </span>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Notice how religious traditions originated as living devotional practices before evolving into literary folklore and modern mythologies.
              </p>
            </div>

            <button
              onClick={() => onNavigate('timeline')}
              className="mt-6 w-full py-2.5 px-4 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] text-xs font-serif-ancient font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>EXPLORE FULL TIMELINE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

