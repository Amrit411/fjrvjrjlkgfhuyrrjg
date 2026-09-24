import React, { useState, useRef } from 'react';
import { X, Upload, Check, Sparkles, Copy, ImageIcon, Eye } from 'lucide-react';
import { CHARACTER_ARTWORKS } from '../utils/artworkStore';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendArtwork } from './LegendArtwork';
import { saveCustomArtwork, getCustomArtwork } from '../hooks/useArtwork';

interface PortraitsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLegend: (legendId: string) => void;
}

export const CHARACTER_PROMPTS: Record<string, string> = {
  'deity-shiva': 'Square 1:1 close-up mythological character portrait of Lord Shiva, supreme Hindu deity. Deep blue throat (Neelkanth), third eye glowing on forehead, crescent moon and celestial river flowing from matted ash-adorned locks. Coiled serpent Vasuki around neck, holding divine golden trident (Trishul) with damru. Mount Kailash and golden embers in background, dark fantasy digital oil painting style, highly detailed, dramatic chiaroscuro lighting, centered composition, 8k resolution.',
  'deity-zeus': 'Square 1:1 close-up mythological portrait of Zeus, supreme Greek Olympian sovereign of sky and thunder. Majestic white beard and hair, intense electric blue eyes glowing with lightning energy, holding a crackling golden celestial lightning bolt. Stormy Mount Olympus peak background, dark fantasy classical oil painting style, highly detailed, dramatic chiaroscuro lighting, centered composition, 8k resolution.',
  'deity-odin': 'Square 1:1 close-up mythological character portrait of Odin the Allfather, Norse god of wisdom, war, and runes. One piercing eye, other eye covered by shadowy eye patch, flowing silver-grey beard, hooded traveler cloak and raven feathers, perched ravens Huginn and Muninn on shoulders, holding spear Gungnir. Nine Realms cosmic starry mist background, dark fantasy digital oil painting style, highly detailed, dramatic chiaroscuro lighting, 8k resolution.',
  'deity-ra': 'Square 1:1 close-up mythological character portrait of Ra, supreme Egyptian Sun God. Regal falcon head with piercing golden avian eyes, crowned by blazing golden solar disc serpent (Uraeus), holding divine golden Was scepter and Ankh. Gleaming Egyptian gold jewelry, Nile sunrise and hieroglyphic temple background, dark fantasy digital oil painting style, highly detailed, dramatic lighting, 8k resolution.',
  'deity-amaterasu': 'Square 1:1 close-up mythological character portrait of Amaterasu Omikami, Japanese Shinto goddess of the Sun and universe. Ethereal radiant divine woman clad in flowing white and crimson silk kimono, holding the sacred bronze mirror Yata no Kagami, halo of golden sunbeams and swirling cherry blossom embers around her. Dark fantasy celestial Japanese ink and oil style, highly detailed, 8k resolution.',
  'creature-medusa': 'Square 1:1 close-up mythological character portrait of Medusa, ancient Gorgon priestess. Hauntingly striking and dangerous countenance, glowing emerald venomous eyes, living writhing venomous serpents intertwined in her dark hair, stone scales emerging on cheekbones. Ruined ancient marble temple with petrified statues background, dark fantasy digital oil painting style, dramatic chiaroscuro lighting, 8k resolution.',
  'creature-fenrir': 'Square 1:1 close-up mythological portrait of Fenrir, the monstrous colossal Norse wolf of Ragnarök. Massive feral wolf head with glowing amber-crimson eyes, razor fangs bared in a terrifying snarl, magical dwarven ribbon Gleipnir snapping, frosty breath and northern lights aurora in background. Dark fantasy digital oil painting style, highly detailed, 8k resolution.',
  'deity-anubis': 'Square 1:1 close-up mythological character portrait of Anubis, Egyptian god of mummification and the afterlife. Sleek black jackal head with piercing golden eyes, adorned in gold collar (wesekh) with lapis lazuli inlays, holding the golden scales of Maat and ankh. Underworld Duat tomb background with torchlight and hieroglyphs, dark fantasy digital oil painting style, 8k resolution.',
  'creature-garuda': 'Square 1:1 close-up mythological character portrait of Garuda, celestial divine avian king in Hindu lore. Majestic golden eagle-man with powerful beak, blazing fiery wings, crowned with bejeweled Vedic diadem, adorned in snake ornaments, radiant sun aura background. Dark fantasy digital oil painting style, highly detailed, dramatic lighting, 8k resolution.',
  'deity-quetzalcoatl': 'Square 1:1 close-up mythological portrait of Quetzalcoatl, Feathered Serpent deity of Aztec and Mesoamerican lore. Magnificently iridescent emerald and turquoise quetzal feathers framing a noble Mesoamerican deity face with jade ear spools and obsidian ornaments. Stepped pyramid temple background, dark fantasy digital oil painting style, highly detailed, 8k resolution.',
  'deity-thor': 'Square 1:1 close-up mythological character portrait of Thor, Norse god of storms and strength. Fierce red beard and long hair, crackling sparks dancing on knuckles as he grips the mighty hammer Mjölnir, wearing iron gauntlets and belt of strength Megingjörð. Dark thunderstorm clouds and jagged blue lightning background, dark fantasy digital oil painting style, 8k resolution.',
  'creature-kitsune': 'Square 1:1 close-up mythological character portrait of Kitsune, mystical nine-tailed celestial fox of Japanese folklore. Elegant white fox face with red sacred shrine markings (kumadori), glowing amber eyes, surrounded by ghostly blue kitsunebi fox-fire orbs, lush torii gate shrine background. Dark fantasy Japanese art style, highly detailed, 8k resolution.',
  'deity-vishnu': 'Square 1:1 close-up mythological character portrait of Lord Vishnu, supreme preserver of cosmic dharma. Radiant blue skin, compassionate serene expression, crowned with ornate golden Kirita crown, holding the spinning Sudarshana Chakra and sacred Panchajanya conch shell, multi-headed serpent Sheshanaga hovering above. Cosmic ocean background, dark fantasy digital oil painting style, 8k resolution.',
  'deity-poseidon': 'Square 1:1 close-up mythological character portrait of Poseidon, Greek god of the seas and earthquakes. Weathered ocean monarch with seafoam-grey beard, tempestuous sea-green eyes, holding a trident encrusted with coral and pearls, churning oceanic whirlpool and tidal waves background. Dark fantasy classical oil painting style, dramatic lighting, 8k resolution.',
  'deity-hades': 'Square 1:1 close-up mythological character portrait of Hades, Greek sovereign of the Underworld. Pale aristocratic visage with dark obsidian crown of the underworld (Helm of Darkness), shadowy dark robes with screaming souls woven into fabric, bident in hand, glowing River Styx in background. Dark fantasy classical oil painting style, 8k resolution.',
  'deity-athena': 'Square 1:1 close-up mythological character portrait of Athena, Greek goddess of wisdom and strategic war. Noble fierce warrior woman with owl-grey piercing eyes, wearing gleaming Corinthian golden helmet with horsehair crest, carrying the Aegis shield with Medusa sigil, sacred olive leaves and Parthenon background. Dark fantasy classical oil painting style, 8k resolution.',
  'deity-loki': 'Square 1:1 close-up mythological character portrait of Loki, Norse trickster god. Cunning sly visage with piercing emerald eyes, scarred lips, wild dark hair woven with mistletoe and horned diadem, dancing green magical flames in palms. Asgardian hall shadows background, dark fantasy digital oil painting style, 8k resolution.',
  'deity-osiris': 'Square 1:1 close-up mythological character portrait of Osiris, Egyptian sovereign of resurrection and the Duat. Green-skinned divine monarch with regal braided beard, wearing white Atef crown with ostrich plumes, holding ceremonial crook and flail crossed over chest. Underworld lotus and gold stars background, dark fantasy digital oil painting style, 8k resolution.',
  'creature-dragon': 'Square 1:1 close-up mythological portrait of a colossal Ancient Dragon (Fafnir / Níðhöggr). Smoldering golden reptilian slitted eyes, impenetrable obsidian scales, molten fire and embers glowing in throat, curled around ancient cursed gold hoard in subterranean cavern. Dark fantasy digital oil painting style, 8k resolution.',
  'creature-phoenix': 'Square 1:1 close-up mythological character portrait of the sacred Phoenix rising. Regal avian visage with ruby and golden feathers, eyes of liquid amber sunfire, crest of pure white flame, emerging reborn from fragrant cinnamon and myrrh embers. Dark fantasy digital oil painting style, glowing fire aura, 8k resolution.',
  'creature-kraken': 'Square 1:1 close-up mythological character portrait of the Kraken, abyssal leviathan of Norse legend. Monstrous bioluminescent deep sea titan, terrifying alien eye glowing in black ocean abyss, colossal tentacles wrapped around ancient sunken ship timbers. Dark fantasy digital oil painting style, 8k resolution.',
  'creature-cerberus': 'Square 1:1 close-up mythological portrait of Cerberus, the three-headed hound guarding the Underworld gates. Three ferocious black mastiff heads with snarling fangs, glowing hellfire red eyes, mane of hissing vipers, spiked bronze collar, fiery gates of Tartarus background. Dark fantasy digital oil painting style, 8k resolution.',
  'deity-susanoo': 'Square 1:1 close-up mythological character portrait of Susanoo-no-Mikoto, Japanese god of sea and storms. Wild untamed samurai warrior with windblown black hair, fierce battle-hardened expression, wielding the legendary sword Kusanagi-no-Tsurugi, sea tempests and purple thunderclouds in background. Dark fantasy Japanese art style, 8k resolution.',
  'deity-morrigan': 'Square 1:1 close-up mythological character portrait of The Morrígan, Celtic goddess of war, fate, and sovereignty. Striking gothic queen with raven-black hair, blood-red warrior paint on cheekbones, cloak of iridescent black raven feathers, perched crow with glowing eye on shoulder, misty ancient battlefield background. Dark fantasy Celtic art style, 8k resolution.',
};

export const PortraitsManagerModal: React.FC<PortraitsManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectLegend,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'custom' | 'needed'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUploadTargetRef = useRef<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerUpload = (characterId: string) => {
    currentUploadTargetRef.current = characterId;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const charId = currentUploadTargetRef.current;
    if (!file || !charId) return;

    setUploadingId(charId);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      saveCustomArtwork(charId, dataUrl);

      const spriteDef = CHARACTER_ARTWORKS.find((c) => c.id === charId);
      const filename = spriteDef ? spriteDef.filename : `${charId}.png`;

      try {
        await fetch('./api/upload-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, dataUrl }),
        });
      } catch (err) {
        console.warn('Upload API notice:', err);
      }

      setUploadingId(null);
      setSavedId(charId);
      setTimeout(() => setSavedId(null), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const charactersWithStatus = CHARACTER_ARTWORKS.map((char) => {
    const legend = ALL_LEGENDS.find((l) => l.id === char.id);
    const hasCustom = !!getCustomArtwork(char.id);
    const prompt = CHARACTER_PROMPTS[char.id] || '';
    return {
      ...char,
      legend,
      hasCustom,
      prompt,
    };
  });

  const filteredCharacters = charactersWithStatus.filter((c) => {
    if (activeTab === 'custom') return c.hasCustom;
    if (activeTab === 'needed') return !c.hasCustom;
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
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-ancient text-xl font-bold text-[#F5F5F0] tracking-wide">
                MYTHOS CODEX VAULT
              </h2>
              <p className="text-xs text-[#9CA3AF] font-mono">
                Classical Iconography, Lore Descriptions & Custom Relic Portraits (24 Legends)
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

        <div className="flex items-center justify-between px-6 py-3 bg-[#0D131F] border-b border-[#243048] text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]'
              }`}
            >
              All (24)
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'custom'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]'
              }`}
            >
              Custom Added ({charactersWithStatus.filter((c) => c.hasCustom).length})
            </button>
            <button
              onClick={() => setActiveTab('needed')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'needed'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]'
              }`}
            >
              Pending ({charactersWithStatus.filter((c) => !c.hasCustom).length})
            </button>
          </div>

          <div className="text-[11px] text-[#D4AF37] hidden sm:block">
            Tip: Click “Copy Prompt” → paste in Gemini → click “Upload” to apply
          </div>
        </div>

        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((char, index) => {
            const isTarget = uploadingId === char.id;
            const isSaved = savedId === char.id;
            const isCopied = copiedId === char.id;

            return (
              <div
                key={char.id}
                className="bg-[#111827] border border-[#243048] hover:border-[#D4AF37]/60 rounded-xl p-3.5 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#243048] relative shrink-0 bg-[#080B12]">
                    {char.legend && (
                      <LegendArtwork legend={char.legend} size="sm" className="w-full h-full" showOverlay={false} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase">
                        #{index + 1} · {char.filename}
                      </span>
                      {char.hasCustom ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#9CA3AF] bg-[#161F30] px-1.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif-ancient text-sm font-bold text-[#F5F5F0] truncate">
                      {char.name}
                    </h3>
                    <p className="text-[11px] text-[#9CA3AF] truncate">
                      {char.legend?.mythology} Tradition
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#243048]/80 text-xs font-mono">
                  <button
                    onClick={() => handleCopyPrompt(char.id, char.prompt)}
                    className="px-2.5 py-1.5 rounded bg-[#161F30] hover:bg-[#1E293B] text-[#D4AF37] border border-[#243048] flex items-center justify-center gap-1 transition-colors cursor-pointer text-[11px]"
                    title="Copy classical masterwork visual lore prompt"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Lore Prompt'}</span>
                  </button>

                  <button
                    onClick={() => triggerUpload(char.id)}
                    disabled={isTarget}
                    className="px-2.5 py-1.5 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#F4D58D] hover:text-black border border-[#D4AF37]/60 flex items-center justify-center gap-1 transition-colors cursor-pointer text-[11px] font-bold"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Saved!</span>
                      </>
                    ) : isTarget ? (
                      <>
                        <Upload className="w-3 h-3 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 bg-[#111827] border-t border-[#243048] flex items-center justify-between text-xs text-[#9CA3AF] font-mono">
          <span>Uploaded images automatically save to <code className="text-[#D4AF37]">public/assets/portraits/</code></span>
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
