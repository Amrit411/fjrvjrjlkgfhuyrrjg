import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowLeft, Shield, Zap, Sparkles, AlertTriangle, MapPin, Award, Check, Bookmark, BookmarkCheck, Quote, Camera, Upload } from 'lucide-react';
import { LegendEntry } from '../types/mythology';
import { ALL_LEGENDS, getRelatedLegends } from '../data/mythologyData';
import { VisualArtifact } from './VisualArtifact';
import { LegendArtwork } from './LegendArtwork';
import { useFavorites } from '../hooks/useFavorites';
import { generateCitation, copyToClipboard, formatPowerTier } from '../utils/formatters';
import { getCharacterSprite } from '../utils/artworkStore';
import { saveCustomArtwork, getCustomArtwork } from '../hooks/useArtwork';

interface DetailModalProps {
  legend: LegendEntry | null;
  onClose: () => void;
  onSelectRelated: (legend: LegendEntry) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  legend,
  onClose,
  onSelectRelated,
}) => {
  const [animatedStats, setAnimatedStats] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [viewMode, setViewMode] = useState<'foil' | 'portrait'>('foil');
  const { isFavorite, toggleFavorite } = useFavorites();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const hasCustom = legend ? !!getCustomArtwork(legend.id) : false;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !legend) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      saveCustomArtwork(legend.id, dataUrl);

      const spriteDef = getCharacterSprite(legend.id);
      const filename = spriteDef ? spriteDef.filename : `${legend.id}.png`;

      try {
        await fetch('./api/upload-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, dataUrl }),
        });
      } catch (err) {
        console.warn('Server upload error:', err);
      }

      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (legend) {
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => setAnimatedStats(true), 150);
      return () => {
        clearTimeout(timer);
        setAnimatedStats(false);
        document.body.style.overflow = 'auto';
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [legend]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!legend) return null;

  const related = getRelatedLegends(legend.relatedEntries);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCitation = async () => {
    const citation = generateCitation(legend);
    const success = await copyToClipboard(citation);
    if (success) {
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2500);
    }
  };

  const favorited = isFavorite(legend.id);
  const powerTier = formatPowerTier(legend.stats.power);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#080B12] border border-[#243048] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legend-detail-title"
      >

        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111827] border-b border-[#243048] shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-serif-ancient uppercase tracking-wider text-[#9CA3AF] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => toggleFavorite(legend.id)}
              className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 cursor-pointer ${
                favorited
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F4D58D]'
                  : 'bg-[#161F30] border-[#243048] text-[#9CA3AF] hover:text-[#D4AF37]'
              }`}
              title={favorited ? 'Remove from Saved Legends' : 'Save to Personal Pantheon'}
            >
              {favorited ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{favorited ? 'Saved' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleCopyCitation}
              className="text-xs font-mono text-[#9CA3AF] hover:text-[#D4AF37] px-2.5 py-1 rounded bg-[#161F30] border border-[#243048] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy academic bibliographic citation"
            >
              {copiedCitation ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
              )}
              <span className="hidden sm:inline">{copiedCitation ? 'Citation Copied' : 'Cite'}</span>
            </button>

            <button
              onClick={handleShare}
              className="text-xs font-mono text-[#9CA3AF] hover:text-[#D4AF37] px-2.5 py-1 rounded bg-[#161F30] border border-[#243048] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#161F30] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#243048]/80 pb-8">
            <div className="md:col-span-5 flex flex-col items-center">
              {hasCustom && (
                <div className="flex items-center gap-1.5 p-1 bg-[#0D131F] border border-[#243048] rounded-lg mb-3 text-xs font-mono">
                  <button
                    onClick={() => setViewMode('foil')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      viewMode === 'foil'
                        ? 'bg-[#D4AF37] text-black font-bold shadow'
                        : 'text-[#9CA3AF] hover:text-[#F5F5F0]'
                    }`}
                  >
                    🎴 Mythic Codex Foil
                  </button>
                  <button
                    onClick={() => setViewMode('portrait')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      viewMode === 'portrait'
                        ? 'bg-[#D4AF37] text-black font-bold shadow'
                        : 'text-[#9CA3AF] hover:text-[#F5F5F0]'
                    }`}
                  >
                    🖼️ Custom Portrait
                  </button>
                </div>
              )}

              <div className="w-full max-w-sm aspect-square relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl group bg-[#111827]">
                <LegendArtwork
                  legend={legend}
                  size="lg"
                  className="w-full h-full"
                  forceFoilCard={viewMode === 'foil'}
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#080B12]/85 hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/70 backdrop-blur-md text-xs font-mono flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                  title="Upload or replace custom character portrait"
                >
                  {uploadSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved!</span>
                    </>
                  ) : uploading ? (
                    <>
                      <Upload className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-black" />
                      <span>Upload / Replace</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D4AF37] mt-3">
                <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                <span>Interactive 3D Foil • Hover cursor to tilt</span>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-serif-ancient tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  {legend.mythology} Tradition
                </span>
                <span className="text-xs text-[#9CA3AF]">·</span>
                <span className="text-xs text-[#9CA3AF] font-mono">{legend.region}</span>
              </div>

              <h2
                id="legend-detail-title"
                className="font-serif-ancient text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] tracking-wide mb-1"
              >
                {legend.name}
              </h2>

              {legend.nativeName && (
                <div className="text-xs font-mono text-[#D4AF37] tracking-wider mb-2">
                  {legend.nativeName}
                </div>
              )}

              <p className="text-sm font-serif-ancient italic text-[#F4D58D] mb-6">
                {legend.title}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#111827] rounded-xl border border-[#243048] text-xs">
                <div>
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-mono">Class</span>
                  <span className="text-[#F5F5F0] font-semibold capitalize">{legend.class}</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-mono">Element</span>
                  <span className="text-[#F5F5F0] font-semibold">{legend.element}</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-mono">Alignment</span>
                  <span className="text-[#F5F5F0] font-semibold">{legend.alignment}</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-mono">Power Score</span>
                  <span className="text-[#D4AF37] font-bold font-mono text-sm">{legend.power} / 100</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-mono">Historical Era</span>
                  <span className="text-[#F5F5F0] truncate block">{legend.historicalEra}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif-ancient text-lg font-bold text-[#F4D58D] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>ABOUT & MYTHOLOGICAL ORIGINS</span>
            </h3>
            <p className="text-sm sm:text-base text-[#F5F5F0]/90 leading-relaxed font-light mb-4">
              {legend.lore}
            </p>
          </div>

          <div className="p-6 bg-[#111827] rounded-xl border border-[#243048]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-ancient text-sm font-bold text-[#D4AF37] uppercase tracking-widest">
                ARCHIVAL METRICS & ATTRIBUTES
              </h3>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded bg-[#080B12] border border-[#243048] ${powerTier.tone}`}>
                Tier: {powerTier.label}
              </span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Power', value: legend.stats.power, color: 'from-amber-600 to-amber-400' },
                { label: 'Agility', value: legend.stats.agility, color: 'from-cyan-600 to-cyan-400' },
                { label: 'Mystery', value: legend.stats.mystery, color: 'from-purple-600 to-purple-400' },
                { label: 'Influence', value: legend.stats.influence, color: 'from-emerald-600 to-emerald-400' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-1">
                    <span className="uppercase tracking-wider">{stat.label}</span>
                    <span className="text-[#F5F5F0] font-bold tabular-nums">
                      {stat.value} <span className="text-[#9CA3AF] font-normal">/ 100</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#080B12] rounded-full overflow-hidden border border-[#243048]">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: animatedStats ? `${stat.value}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-5 bg-[#111827] rounded-xl border border-[#243048] flex flex-col justify-between">
              <div>
                <h4 className="font-serif-ancient text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#D4AF37]" />
                  <span>KEY ABILITIES</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#F5F5F0]/80">
                  {legend.abilities.map((ability, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
                      <span>{ability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 bg-[#111827] rounded-xl border border-[#243048] flex flex-col justify-between">
              <div>
                <h4 className="font-serif-ancient text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>FOLKLORE WEAKNESS</span>
                </h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {legend.weaknesses}
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#111827] rounded-xl border border-[#243048] flex flex-col justify-between">
              <div>
                <h4 className="font-serif-ancient text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>HABITAT & REALM</span>
                </h4>
                <p className="text-xs text-[#F5F5F0]/90 mb-4">
                  {legend.habitat}
                </p>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#9CA3AF] block mb-1.5">
                    Sacred Symbols
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {legend.symbols.map((sym, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#161F30] border border-[#243048] text-[#D4AF37] px-2 py-0.5 rounded"
                      >
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-[#161F30] to-[#111827] border-l-4 border-[#D4AF37] flex items-start gap-3">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-serif-ancient uppercase tracking-wider text-[#D4AF37] font-bold block mb-1">
                Fascinating Archival Fact
              </span>
              <p className="text-xs sm:text-sm text-[#F5F5F0] italic">
                "{legend.fascinatingFact}"
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="pt-4 border-t border-[#243048]">
              <h3 className="font-serif-ancient text-sm font-bold text-[#F4D58D] uppercase tracking-wider mb-4">
                RELATED LEGENDS & CROSS-TRADITIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="p-3 bg-[#111827] hover:bg-[#161F30] border border-[#243048] hover:border-[#D4AF37] rounded-lg transition-all text-left flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-10 h-10 shrink-0">
                      <VisualArtifact
                        iconType={item.iconType}
                        element={item.element}
                        name={item.name}
                        size="sm"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif-ancient text-sm font-semibold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF] font-mono truncate">
                        {item.mythology} · {item.class}
                      </div>
                    </div>
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

