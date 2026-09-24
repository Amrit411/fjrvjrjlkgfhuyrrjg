import React from 'react';
import { Compass, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { NavView } from './Navbar';

interface CallToExploreSectionProps {
  onNavigate: (view: NavView) => void;
}

export const CallToExploreSection: React.FC<CallToExploreSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
      <div className="relative bg-gradient-to-b from-[#111827] via-[#0E1524] to-[#080B12] rounded-3xl border border-[#D4AF37]/40 p-8 sm:p-16 shadow-2xl overflow-hidden">

        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)'
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#243048] text-xs font-mono text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE GATES ARE UNLOCKED</span>
          </div>

          <h2 className="font-serif-ancient text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F0] tracking-tight leading-tight">
            THE ATLAS IS OPEN.
          </h2>

          <p className="text-base sm:text-xl text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            “Choose a culture. Follow a legend. Discover where the stories connect.”
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('explore')}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-xs sm:text-sm font-bold tracking-widest uppercase rounded shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE MYTHOLOGIES</span>
            </button>

            <button
              onClick={() => onNavigate('creatures')}
              className="w-full sm:w-auto px-8 py-4 bg-[#161F30] hover:bg-[#1E293B] text-[#F5F5F0] hover:text-[#D4AF37] border border-[#243048] hover:border-[#D4AF37]/60 font-serif-ancient text-xs sm:text-sm font-semibold tracking-widest uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>EXPLORE CREATURES</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

