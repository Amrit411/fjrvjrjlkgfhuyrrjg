import React, { useState } from 'react';
import { X, Swords, Zap, Shield, Sparkles, ChevronRight, Trophy } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry } from '../types/mythology';
import { LegendArtwork } from './LegendArtwork';
import { ambientSound } from '../utils/ambientAudio';

interface MythicArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLegend: (legend: LegendEntry) => void;
}

export const MythicArenaModal: React.FC<MythicArenaModalProps> = ({
  isOpen,
  onClose,
  onSelectLegend,
}) => {
  const [fighterAId, setFighterAId] = useState<string>('deity-shiva');
  const [fighterBId, setFighterBId] = useState<string>('deity-zeus');
  const [clashResult, setClashResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const fighterA = ALL_LEGENDS.find((l) => l.id === fighterAId) || ALL_LEGENDS[0];
  const fighterB = ALL_LEGENDS.find((l) => l.id === fighterBId) || ALL_LEGENDS[1];

  const handleSimulateClash = () => {
    setIsSimulating(true);
    setClashResult(null);
    ambientSound.playCardRevealChime();

    setTimeout(() => {
      const scoreA =
        fighterA.power * 0.4 +
        fighterA.stats.mystery * 0.25 +
        fighterA.stats.influence * 0.2 +
        fighterA.stats.agility * 0.15;
      const scoreB =
        fighterB.power * 0.4 +
        fighterB.stats.mystery * 0.25 +
        fighterB.stats.influence * 0.2 +
        fighterB.stats.agility * 0.15;

      let verdict = '';
      if (Math.abs(scoreA - scoreB) < 3) {
        verdict = `COSMIC STALEMATE: An apocalyptic harmony of ${fighterA.element} and ${fighterB.element} reshapes the mortal plane. Neither sovereign yields!`;
      } else if (scoreA > scoreB) {
        verdict = `VICTORY FOR ${fighterA.name.toUpperCase()}: The transcendent cosmic authority of ${fighterA.mythology} lore overwhelms ${fighterB.name} through superior mythic influence!`;
      } else {
        verdict = `VICTORY FOR ${fighterB.name.toUpperCase()}: The primordial tempest of ${fighterB.name} asserts supremacy over ${fighterA.name} in an earth-shattering mythic verdict!`;
      }

      setClashResult(verdict);
      setIsSimulating(false);
    }, 900);
  };

  const statKeys = [
    { label: 'Combat Power', keyA: fighterA.stats.power, keyB: fighterB.stats.power },
    { label: 'Agility & Speed', keyA: fighterA.stats.agility, keyB: fighterB.stats.agility },
    { label: 'Cosmic Mystery', keyA: fighterA.stats.mystery, keyB: fighterB.stats.mystery },
    { label: 'Mythic Influence', keyA: fighterA.stats.influence, keyB: fighterB.stats.influence },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arena-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#080B12] border border-[#D4AF37]/60 rounded-2xl p-5 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.2)] flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#243048] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
              <Swords className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="arena-title"
                className="font-serif-ancient text-xl sm:text-2xl font-bold tracking-wider text-[#F5F5F0]"
              >
                CLASH OF LEGENDS
              </h2>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                Cross-Pantheon Mythic Showdown & Power Matrix
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#161F30] rounded-lg transition-colors cursor-pointer"
            aria-label="Close Arena"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Combatants Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center mb-6">
          {/* Fighter A */}
          <div className="md:col-span-5 bg-[#111827] border border-[#243048] rounded-xl p-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase">CHAMPION A</span>
              <select
                value={fighterAId}
                onChange={(e) => {
                  setFighterAId(e.target.value);
                  setClashResult(null);
                }}
                className="bg-[#080B12] border border-[#243048] text-xs text-[#F5F5F0] rounded px-2 py-1 font-serif-ancient cursor-pointer focus:border-[#D4AF37]"
              >
                {ALL_LEGENDS.map((leg) => (
                  <option key={leg.id} value={leg.id}>
                    {leg.name} ({leg.mythology})
                  </option>
                ))}
              </select>
            </div>

            <div className="w-36 h-48 rounded-lg overflow-hidden border border-[#D4AF37]/60 shadow-lg mb-3">
              <LegendArtwork legend={fighterA} size="md" className="w-full h-full" />
            </div>

            <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0] text-center">
              {fighterA.name}
            </h3>
            <span className="text-xs text-[#F4D58D] font-mono mb-1">{fighterA.title}</span>
            <span className="text-[10px] text-[#9CA3AF] font-mono uppercase bg-[#161F30] px-2 py-0.5 rounded border border-[#243048]">
              {fighterA.element} · {fighterA.mythology}
            </span>
          </div>

          {/* VS Divider */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center font-serif-ancient font-extrabold text-[#D4AF37] text-sm shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              VS
            </div>
          </div>

          {/* Fighter B */}
          <div className="md:col-span-5 bg-[#111827] border border-[#243048] rounded-xl p-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase">CHAMPION B</span>
              <select
                value={fighterBId}
                onChange={(e) => {
                  setFighterBId(e.target.value);
                  setClashResult(null);
                }}
                className="bg-[#080B12] border border-[#243048] text-xs text-[#F5F5F0] rounded px-2 py-1 font-serif-ancient cursor-pointer focus:border-[#D4AF37]"
              >
                {ALL_LEGENDS.map((leg) => (
                  <option key={leg.id} value={leg.id}>
                    {leg.name} ({leg.mythology})
                  </option>
                ))}
              </select>
            </div>

            <div className="w-36 h-48 rounded-lg overflow-hidden border border-[#D4AF37]/60 shadow-lg mb-3">
              <LegendArtwork legend={fighterB} size="md" className="w-full h-full" />
            </div>

            <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0] text-center">
              {fighterB.name}
            </h3>
            <span className="text-xs text-[#F4D58D] font-mono mb-1">{fighterB.title}</span>
            <span className="text-[10px] text-[#9CA3AF] font-mono uppercase bg-[#161F30] px-2 py-0.5 rounded border border-[#243048]">
              {fighterB.element} · {fighterB.mythology}
            </span>
          </div>
        </div>

        {/* Comparative Stat Gauges */}
        <div className="bg-[#111827] rounded-xl border border-[#243048] p-4 sm:p-5 mb-6 space-y-3">
          <div className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase mb-2 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Comparative Attributes & Resonance</span>
          </div>

          {statKeys.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
                <span className="text-[#FDE047] font-bold">{item.keyA}</span>
                <span className="text-xs font-serif-ancient text-[#F5F5F0]">{item.label}</span>
                <span className="text-[#38BDF8] font-bold">{item.keyB}</span>
              </div>
              <div className="flex gap-2 h-2 w-full bg-[#161F30] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] rounded-full transition-all duration-700"
                  style={{ width: `${(item.keyA / (item.keyA + item.keyB)) * 100}%` }}
                />
                <div
                  className="h-full bg-gradient-to-l from-[#38BDF8] to-[#60A5FA] rounded-full transition-all duration-700"
                  style={{ width: `${(item.keyB / (item.keyA + item.keyB)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Clash Result or Simulation Trigger */}
        <div className="flex flex-col items-center">
          {clashResult ? (
            <div className="w-full p-4 rounded-xl bg-gradient-to-r from-[#161F30] via-[#1E293B] to-[#161F30] border border-[#D4AF37] mb-4 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-1">
                <Trophy className="w-4 h-4 text-[#D4AF37]" />
                <span>Mythological Decree</span>
              </div>
              <p className="text-sm font-serif-ancient text-[#F5F5F0] italic max-w-xl mx-auto leading-relaxed">
                {clashResult}
              </p>
            </div>
          ) : null}

          <button
            onClick={handleSimulateClash}
            disabled={isSimulating}
            className="px-8 py-3 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient font-bold text-xs tracking-widest uppercase rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Swords className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Cosmic Clash...' : 'Simulate Cosmic Clash'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
