import React, { useState, useRef } from 'react';
import { X, Upload, Check, Copy, BookOpen, Trash2, Shield } from 'lucide-react';
import { CHARACTER_ARTWORKS } from '../utils/artworkStore';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendArtwork } from './LegendArtwork';
import { saveCustomArtwork, getCustomArtwork } from '../hooks/useArtwork';

interface PortraitsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLegend: (legendId: string) => void;
}

export const CANONICAL_LORE_ARCHIVES: Record<string, string> = {
  'deity-shiva': 'Lord Shiva (Mahadeva), supreme ascetic and cosmic dancer (Nataraja) of the Hindu Trimurti. Identified by the Neelkantha (blue throat from holding the Halahala poison), the third eye of transcendent wisdom, the crescent moon (Chandrama) in matted locks, the sacred river Ganga descending from the heavens, and the serpent Vasuki coiled around His throat. Wielder of the divine Trishula (trident) and Damaru drum.',
  'deity-zeus': 'Zeus the Olympian Sovereign, supreme ruler of the skies, thunder, and divine justice on Mount Olympus. Depicted with the crackling master lightning bolt forged by the Telchines and Elder Cyclopes, the royal golden scepter, and the sacred golden eagle (Aetos Dios) enforcing cosmic order and hospitality (Xenia).',
  'deity-odin': 'Odin the Allfather (Valföðr), ruler of Asgard and seeker of ultimate cosmological wisdom. Recognized by his single piercing eye—having sacrificed the other at Mímir’s well—flanked by the twin memory and thought ravens Huginn and Muninn, wielder of the dwarven-forged spear Gungnir, and master of the primordial runic alphabet.',
  'deity-ra': 'Ra, the supreme solar monarch of ancient Egypt who journeys daily across the sky in the solar barques Mandjet and Mesektet. Adorned with the blazing solar disc encircled by the sacred cobra Uraeus, wielding the divine golden Was scepter and Ankh, defending cosmic order (Ma’at) against the serpent Apep.',
  'deity-amaterasu': 'Amaterasu-ōmikami, the radiant celestial Sun Goddess of the Shinto pantheon and divine ancestor of the Imperial House of Japan. Venerated with the sacred bronze mirror Yata no Kagami, illuminating heaven and earth from the High Plain of Heaven (Takamagahara) and bringing warmth and order to the universe.',
  'creature-medusa': 'Medusa, the legendary Gorgon priestess whose piercing gaze petrified mortals into solid stone. Crowned with living serpents and venomous coils, immortalized across classical antiquity as an enduring emblem of apotropaic protection, sovereign defense, and tragic mythic metamorphosis.',
  'creature-fenrir': 'Fenrir, the colossal cosmic wolf of Norse eschatology, born of Loki and the giantess Angrboða. Prophesied to shatter the magical dwarven silk fetter Gleipnir during Ragnarök, embodying unstoppable natural fury and the cyclical culmination of cosmic fate.',
  'deity-anubis': 'Anubis (Anpu), the ancient jackal-headed guardian of the necropolis and patron deity of mummification. Overseer of the sacred Psychostasia—the Weighing of the Heart against the Feather of Ma’at upon the golden scales in the Hall of Two Truths.',
  'creature-garuda': 'Garuda, the golden-winged celestial king of birds and divine mount (vahana) of Lord Vishnu in Vedic tradition. Renowned for boundless speed, heroic stature, and eternal guardianship against venomous serpents across Indian, Indonesian, and Southeast Asian literature.',
  'deity-quetzalcoatl': 'Quetzalcoatl, the Feathered Serpent sovereign of wind, dawn, wisdom, and craftsmanship in Mesoamerican tradition. Revered by the Toltecs and Mexica as the celestial bringer of books, calendar systems, and agriculture to humanity.',
  'deity-thor': 'Thor (Þórr), the red-bearded Norse god of thunder, storms, agriculture, and defender of Midgard. Wielder of the mountain-crushing hammer Mjölnir, iron gauntlets Járngreipr, and the enchanted belt Megingjörð which doubles his divine strength.',
  'creature-kitsune': 'Kitsune, the shape-shifting celestial fox of Japanese folklore, sacred messenger of the harvest deity Inari Ōkami. Grows up to nine tails as its wisdom, spiritual longevity, and mastery of spectral kitsunebi foxfire expand over millennia.',
  'deity-vishnu': 'Lord Vishnu (Narayana), supreme preserver of cosmic Dharma who rests upon the thousand-headed serpent Sheshanaga amidst the celestial Ocean of Milk (Kshira Sagara). Wields the spinning solar disc Sudarshana Chakra, the Kaumodaki mace, and the sacred Panchajanya conch shell.',
  'deity-poseidon': 'Poseidon, the tempestuous Earth-Shaker and Olympian monarch of the oceans, marine tempests, and horses. Wields the three-pronged trident capable of fracturing islands, summoning ocean tidal waves, and commanding sea-steeds (Hippocamps).',
  'deity-hades': 'Hades (Plouton), ruler of the underworld realm and keeper of subterranean mineral wealth. Crowned with the Helm of Darkness (Cap of Invisibility), guardian of the River Styx, and protector of ancestral souls.',
  'deity-athena': 'Athena Promachos, virgin goddess of strategic warfare, wisdom, civilization, and heroic endeavor. Clad in Corinthian golden armor and bearing the Gorgoneion-crested Aegis shield, accompanied by the nocturnal owl of intellect.',
  'deity-loki': 'Loki Laufeyjarson, the enigmatic shapeshifter and catalyst of fate in Norse mythology. Master of cunning wit, magical metamorphoses, and complex allegiances that guide the Aesir toward their final twilight.',
  'deity-osiris': 'Osiris (Wesir), the green-skinned sovereign of resurrection, agriculture, and supreme judge in the Egyptian Duat. Clad in sacred linen and crowned with the tall white Atef crown, holding the royal crook and flail crossed over his chest.',
  'creature-dragon': 'The Great Dragon (Fáfnir / Ryūjin / Azure Dragon), universal archetypal titan of primeval elemental power, guardian of gold hoards, and keeper of celestial pearl mysteries across Western and Eastern lore.',
  'creature-phoenix': 'The Phoenix (Bennu), legendary immortal bird of solar flame and perpetual resurrection. Fabled to construct a nest of cinnamon and myrrh at the end of its centuries-long cycle, consumed by sacred fire only to arise newborn from its own ashes.',
  'creature-kraken': 'The Kraken, colossal sea leviathan of Scandinavian sailor lore, feared for generating colossal whirlpool maelstroms and dragging ships into the fathomless abyssal depths of the North Sea.',
  'creature-cerberus': 'Cerberus (Kerberos), the three-headed hound of Tartarus with a mane of hissing serpents. Faithful watchdog of Hades who cordially greets incoming souls while barring any return to the mortal world of sunlight.',
  'deity-susanoo': 'Susanoo-no-Mikoto, Shinto storm deity of tempestuous seas and sibling to Amaterasu. Heroic vanquisher of the eight-headed serpent Yamata no Orochi, from whose tail he retrieved the sacred imperial sword Ame-no-Murakumo.',
  'deity-morrigan': 'The Morrígan (Phantom Queen), triple goddess of battle, prophecy, sovereignty, and fate in ancient Celtic Ireland. Manifests as a carrion crow soaring above warriors, foreshadowing destiny and inspiring heroic courage in the Ulster Cycle.',
};

export const PortraitsManagerModal: React.FC<PortraitsManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectLegend,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'custom' | 'svg'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUploadTargetRef = useRef<string | null>(null);

  if (!isOpen) return null;

  const handleCopyLore = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerUpload = (characterId: string) => {
    currentUploadTargetRef.current = characterId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const charId = currentUploadTargetRef.current;
    if (!file || !charId) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      saveCustomArtwork(charId, dataUrl);
      setSavedId(charId);
      setTimeout(() => setSavedId(null), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleClearCustom = (charId: string) => {
    try {
      localStorage.removeItem(`mythos_artwork_${charId}`);
      window.dispatchEvent(new CustomEvent('mythos-artwork-updated', { detail: { id: charId } }));
      setSavedId(charId);
      setTimeout(() => setSavedId(null), 1500);
    } catch (err) {
      console.warn('Failed to clear artwork', err);
    }
  };

  const charactersWithStatus = CHARACTER_ARTWORKS.map((char) => {
    const legend = ALL_LEGENDS.find((l) => l.id === char.id);
    const hasCustom = !!getCustomArtwork(char.id);
    const lore = CANONICAL_LORE_ARCHIVES[char.id] || '';
    return {
      ...char,
      legend,
      hasCustom,
      lore,
    };
  });

  const filteredCharacters = charactersWithStatus.filter((c) => {
    if (activeTab === 'custom') return c.hasCustom;
    if (activeTab === 'svg') return !c.hasCustom;
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="relative w-full max-w-5xl bg-[#080B12] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#111827] border-b border-[#243048]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-ancient text-xl font-bold text-[#F5F5F0] tracking-wide">
                MYTHOS CODEX & SACRED ICONOGRAPHY VAULT
              </h2>
              <p className="text-xs text-[#9CA3AF] font-mono">
                Classical Epigraphy, Canonical Lore Archives & Vector Relics (24 Core Legends)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#161F30] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-[#0D131F] border-b border-[#243048] text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]'
              }`}
            >
              All Traditions (24)
            </button>
            <button
              onClick={() => setActiveTab('svg')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'svg'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]'
              }`}
            >
              Pure Vector SVG ({charactersWithStatus.filter((c) => !c.hasCustom).length})
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'custom'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]'
              }`}
            >
              Custom Overrides ({charactersWithStatus.filter((c) => c.hasCustom).length})
            </button>
          </div>

          <div className="text-[11px] text-[#D4AF37] font-mono hidden sm:block">
            Rendered with 100% Mathematical SVG Sacred Epigraphy
          </div>
        </div>

        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((char, index) => {
            const isSaved = savedId === char.id;
            const isCopied = copiedId === char.id;

            return (
              <div
                key={char.id}
                className="bg-[#111827] border border-[#243048] hover:border-[#D4AF37]/60 rounded-xl p-4 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => onSelectLegend(char.id)}
                    className="w-16 h-16 rounded-lg overflow-hidden border border-[#243048] relative shrink-0 bg-[#080B12] cursor-pointer hover:border-[#D4AF37] transition-colors"
                    title="Click to view full detail card"
                  >
                    {char.legend && (
                      <LegendArtwork legend={char.legend} size="sm" className="w-full h-full" showOverlay={false} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase">
                        #{index + 1} · {char.legend?.mythology}
                      </span>
                      {char.hasCustom ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                          Custom
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#9CA3AF] bg-[#161F30] px-1.5 py-0.5 rounded">
                          Vector
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => onSelectLegend(char.id)}
                      className="font-serif-ancient text-sm font-bold text-[#F5F5F0] truncate hover:text-[#D4AF37] cursor-pointer transition-colors"
                    >
                      {char.name}
                    </h3>
                    <p className="text-[11px] text-[#9CA3AF] truncate">
                      {char.legend?.title || 'Legendary Being'}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-[#9CA3AF] leading-relaxed line-clamp-3 bg-[#080B12] p-2.5 rounded-lg border border-[#243048]/60 font-sans">
                  {char.lore}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#243048]/80 text-xs font-mono">
                  <button
                    onClick={() => handleCopyLore(char.id, char.lore)}
                    className="px-2.5 py-1.5 rounded bg-[#161F30] hover:bg-[#1E293B] text-[#D4AF37] border border-[#243048] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                    title="Copy canonical mythological lore excerpt"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Lore'}</span>
                  </button>

                  {char.hasCustom ? (
                    <button
                      onClick={() => handleClearCustom(char.id)}
                      className="px-2.5 py-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                      title="Reset to pure mathematical SVG relic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Reset SVG</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => triggerUpload(char.id)}
                      className="px-2.5 py-1.5 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#F4D58D] hover:text-black border border-[#D4AF37]/60 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[11px] font-semibold"
                      title="Upload custom icon to your local browser storage"
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Custom Art</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 bg-[#111827] border-t border-[#243048] flex items-center justify-between text-xs text-[#9CA3AF] font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Pure client-side rendering with zero external API dependencies</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#161F30] hover:bg-[#1E293B] text-[#F5F5F0] border border-[#243048] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
