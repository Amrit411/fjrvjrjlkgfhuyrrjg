import React, { useState, useRef, useId } from 'react';
import { LegendEntry, Element } from '../types/mythology';

interface MythicTarotCardProps {
  legend: LegendEntry;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showOverlay?: boolean;
  interactive?: boolean;
}

interface TarotConfig {
  arcana: string;
  ancientScript: string;
  scriptFontClass?: string;
  runicRing: string[];
  relicName: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  gemColor: string;
}

export const TAROT_METADATA: Record<string, TarotConfig> = {
  'deity-shiva': {
    arcana: 'ARCANA • I',
    ancientScript: 'ॐ नमः शिवाय',
    runicRing: ['ॐ', 'शं', 'शं', 'त्रिशूल', 'डमरू', 'कैलास', 'शिव'],
    relicName: 'DIVINE TRISHULA & CRESCENT',
    primaryColor: '#D4AF37',
    secondaryColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    gemColor: '#0284C7',
  },
  'deity-zeus': {
    arcana: 'ARCANA • II',
    ancientScript: 'ΖΕΥΣ • ΟΛΥΜΠΙΟΣ',
    runicRing: ['ΖΕΥΣ', 'ΚΕΡΑΥΝΟΣ', 'ΟΛΥΜΠΟΣ', 'ΑΕΤΟΣ', 'ΝΙΚΗ', 'ΔΙΟΣ'],
    relicName: 'MASTER LIGHTNING BOLT',
    primaryColor: '#FDE047',
    secondaryColor: '#60A5FA',
    glowColor: 'rgba(253, 224, 71, 0.45)',
    gemColor: '#EAB308',
  },
  'deity-odin': {
    arcana: 'ARCANA • III',
    ancientScript: 'ᛟᛞᛁᚾ • ᚨᛚᚠᚨᛞᛁᚱ',
    runicRing: ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛇ', 'ᛉ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'],
    relicName: 'GUNGNIR & VALKNUT',
    primaryColor: '#38BDF8',
    secondaryColor: '#818CF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    gemColor: '#0EA5E9',
  },
  'deity-ra': {
    arcana: 'ARCANA • IV',
    ancientScript: '𓊹 𓂋 𓂝 • 𓋹 𓈖 𓐍',
    runicRing: ['𓋹', '𓊹', '𓂋', '𓂝', '𓁢', '𓆓', '𓏏', '𓈖', '𓊪'],
    relicName: 'SOLAR URAEUS & EYE OF HORUS',
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    gemColor: '#F97316',
  },
  'deity-amaterasu': {
    arcana: 'ARCANA • V',
    ancientScript: '天照大御神 • 鏡',
    runicRing: ['天', '照', '大', '御', '神', '鏡', '光', '陽', '神'],
    relicName: 'YATA NO KAGAMI MIRROR',
    primaryColor: '#F43F5E',
    secondaryColor: '#FBBF24',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    gemColor: '#E11D48',
  },
  'creature-medusa': {
    arcana: 'ARCANA • VI',
    ancientScript: 'ΜΕΔΟΥΣΑ • ΓΟΡΓΩ',
    runicRing: ['ΜΕΔΟΥΣΑ', 'ΓΟΡΓΩ', 'ΠΕΤΡΑ', 'ΟΦΙΣ', 'ΣΘΕΝΩ', 'ΕΥΡΥΑΛΗ'],
    relicName: 'SERPENT CROWN & STONE GAZE',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    gemColor: '#059669',
  },
  'creature-fenrir': {
    arcana: 'ARCANA • VII',
    ancientScript: 'ᚠᛖᚾᚱᛁᚱ • ᚢᛚᚠᚱ',
    runicRing: ['ᚠ', 'ᛖ', 'ᚾ', 'ᚱ', 'ᛁ', 'ᚱ', 'ᚢ', 'ᛚ', 'ᚠ', 'ᚱ', 'ᛏ', 'ᛃ', 'ᚱ'],
    relicName: 'SHATTERED GLEIPNIR CHAINS',
    primaryColor: '#F87171',
    secondaryColor: '#93C5FD',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    gemColor: '#DC2626',
  },
  'deity-anubis': {
    arcana: 'ARCANA • VIII',
    ancientScript: '𓇋 𓈖 𓊪 𓅱 • 𓁢',
    runicRing: ['𓇋', '𓈖', '𓊪', '𓅱', '𓋹', '𓊹', '𓆓', '𓏏', '𓐍'],
    relicName: 'SCALES OF MAAT & ANKH',
    primaryColor: '#D4AF37',
    secondaryColor: '#818CF8',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    gemColor: '#CA8A04',
  },
  'creature-garuda': {
    arcana: 'ARCANA • IX',
    ancientScript: 'ॐ गरुडाय नमः',
    runicRing: ['ॐ', 'गं', 'गरुड', 'विष्णु', 'पक्षी', 'स्वर्ण', 'अग्नि'],
    relicName: 'GOLDEN CELESTIAL WINGS',
    primaryColor: '#FBBF24',
    secondaryColor: '#F97316',
    glowColor: 'rgba(251, 191, 36, 0.45)',
    gemColor: '#D97706',
  },
  'deity-quetzalcoatl': {
    arcana: 'ARCANA • X',
    ancientScript: 'QUETZALCŌĀTL',
    runicRing: ['ĒHECATL', 'KUKULKAN', 'XÓLOTL', 'TONATIUH', 'OLLIN', 'CIPACTLI'],
    relicName: 'FEATHERED SERPENT SUN SIGIL',
    primaryColor: '#34D399',
    secondaryColor: '#38BDF8',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    gemColor: '#059669',
  },
  'deity-thor': {
    arcana: 'ARCANA • XI',
    ancientScript: 'ᚦᛟᚱ • ᛗᛃᛟᛚᚾᛁᚱ',
    runicRing: ['ᚦ', 'ᛟ', 'ᚱ', 'ᛗ', 'ᛃ', 'ᛟ', 'ᛚ', 'ᚾ', 'ᛁ', 'ᚱ', 'ᛏ', 'ᛋ', 'ᚨ'],
    relicName: 'THUNDER HAMMER MJÖLNIR',
    primaryColor: '#38BDF8',
    secondaryColor: '#FCD34D',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    gemColor: '#0284C7',
  },
  'creature-kitsune': {
    arcana: 'ARCANA • XII',
    ancientScript: '九尾の狐 • 狐火',
    runicRing: ['九', '尾', '狐', '火', '霊', '鳥', '居', '玉', '神'],
    relicName: 'NINE-TAILED CELESTIAL SPIRIT',
    primaryColor: '#818CF8',
    secondaryColor: '#F472B6',
    glowColor: 'rgba(129, 140, 248, 0.45)',
    gemColor: '#6366F1',
  },
  'deity-vishnu': {
    arcana: 'ARCANA • XIII',
    ancientScript: 'ॐ नमो नारायणाय',
    runicRing: ['ॐ', 'विष्णु', 'सुदर्शन', 'शंख', 'पद्म', 'गदा', 'नारायण'],
    relicName: 'SUDARSHANA CHAKRA & LOTUS',
    primaryColor: '#38BDF8',
    secondaryColor: '#FBBF24',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    gemColor: '#2563EB',
  },
  'deity-poseidon': {
    arcana: 'ARCANA • XIV',
    ancientScript: 'ΠΟΣΕΙΔΩΝ • ΕΝΟΣΙΧΘΩΝ',
    runicRing: ['ΠΟΣΕΙΔΩΝ', 'ΤΡΙΑΙΝΑ', 'ΩΚΕΑΝΟΣ', 'ΙΠΠΟΣ', 'ΘΑΛΑΣΣΑ'],
    relicName: 'ABYSSAL OCEAN TRIDENT',
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    gemColor: '#0891B2',
  },
  'deity-hades': {
    arcana: 'ARCANA • XV',
    ancientScript: 'ΑΙΔΗΣ • ΠΛΟΥΤΩΝ',
    runicRing: ['ΑΙΔΗΣ', 'ΣΤΥΞ', 'ΤΑΡΤΑΡΟΣ', 'ΠΛΟΥΤΩΝ', 'ΚΕΡΒΕΡΟΣ'],
    relicName: 'BIDENT OF THE UNDERWORLD',
    primaryColor: '#C084FC',
    secondaryColor: '#6B7280',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    gemColor: '#9333EA',
  },
  'deity-athena': {
    arcana: 'ARCANA • XVI',
    ancientScript: 'ΠΑΛΛΑΣ • ΑΘΗΝΑ',
    runicRing: ['ΑΘΗΝΑ', 'ΑΙΓΙΣ', 'ΣΟΦΙΑ', 'ΓΛΑΥΞ', 'ΔΟΡΥ', 'ΝΙΚΗ'],
    relicName: 'GOLDEN AEGIS & WAR SPEAR',
    primaryColor: '#FDE047',
    secondaryColor: '#94A3B8',
    glowColor: 'rgba(253, 224, 71, 0.4)',
    gemColor: '#EAB308',
  },
  'deity-loki': {
    arcana: 'ARCANA • XVII',
    ancientScript: 'ᛚᛟᚲᛁ • ᛚᚨᚢᚠᛖᛁ',
    runicRing: ['ᛚ', 'ᛟ', 'ᚲ', 'ᛁ', 'ᛖ', 'ᛚ', 'ᛞ', 'ᚱ', 'ᚺ', 'ᚹ', 'ᛏ'],
    relicName: 'TRICKSTER EMERALD DAGGERS',
    primaryColor: '#34D399',
    secondaryColor: '#F59E0B',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    gemColor: '#059669',
  },
  'deity-osiris': {
    arcana: 'ARCANA • XVIII',
    ancientScript: '𓁹 𓊨 𓀭 • 𓂓 𓏏',
    runicRing: ['𓁹', '𓊨', '𓀭', '𓋹', '𓊹', '𓆓', '𓏏', '𓈖', '𓂋'],
    relicName: 'ATEF CROWN & CROOK-FLAIL',
    primaryColor: '#10B981',
    secondaryColor: '#FBBF24',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    gemColor: '#047857',
  },
  'creature-dragon': {
    arcana: 'ARCANA • XIX',
    ancientScript: 'ᛞᚱᚨᚲᛁ • ᚠᚨᚠᚾᛁᚱ',
    runicRing: ['ᚠ', 'ᚨ', 'ᚠ', 'ᚾ', 'ᛁ', 'ᚱ', 'ᛞ', 'ᚱ', 'ᚨ', 'ᚲ', 'ᛁ', 'ᛖ', 'ᛚ', 'ᛞ'],
    relicName: 'PRIMORDIAL WYRM & HOARD',
    primaryColor: '#F97316',
    secondaryColor: '#EF4444',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    gemColor: '#EA580C',
  },
  'creature-phoenix': {
    arcana: 'ARCANA • XX',
    ancientScript: 'ΦΟΙΝΙΞ • ΒΗΝΟΥ',
    runicRing: ['ΦΟΙΝΙΞ', 'ΠΥΡ', 'ΗΛΙΟΣ', 'ΑΝΑΓΕΝΝΗΣΙΣ', 'ΒΗΝΟΥ'],
    relicName: 'SOLAR REBIRTH FIREBIRD',
    primaryColor: '#FBBF24',
    secondaryColor: '#EF4444',
    glowColor: 'rgba(251, 191, 36, 0.45)',
    gemColor: '#DC2626',
  },
  'creature-kraken': {
    arcana: 'ARCANA • XXI',
    ancientScript: 'ᚲᚱᚨᚲᛖᚾ • ᚺᚨᚠᚷᚢᚠᚨ',
    runicRing: ['ᚲ', 'ᚱ', 'ᚨ', 'ᚲ', 'ᛖ', 'ᚾ', 'ᚺ', 'ᚨ', 'ᚠ', 'ᚷ', 'ᚢ', 'ᚠ', 'ᚨ'],
    relicName: 'ABYSSAL LEVIATHAN TENTACLES',
    primaryColor: '#06B6D4',
    secondaryColor: '#6366F1',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    gemColor: '#0284C7',
  },
  'creature-cerberus': {
    arcana: 'ARCANA • XXII',
    ancientScript: 'ΚΕΡΒΕΡΟΣ • ΤΑΡΤΑΡΟΣ',
    runicRing: ['ΚΕΡΒΕΡΟΣ', 'ΑΙΔΗΣ', 'ΠΥΛΗ', 'ΤΑΡΤΑΡΟΣ', 'ΧΑΟΣ'],
    relicName: 'TRIPLE HOUND OF TARTARUS',
    primaryColor: '#EF4444',
    secondaryColor: '#78350F',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    gemColor: '#B91C1C',
  },
  'deity-susanoo': {
    arcana: 'ARCANA • XXIII',
    ancientScript: '建速須佐之男命',
    runicRing: ['建', '速', '須', '佐', '之', '男', '草', '薙', '剣', '嵐'],
    relicName: 'STORM BLADE KUSANAGI',
    primaryColor: '#A855F7',
    secondaryColor: '#38BDF8',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    gemColor: '#7E22CE',
  },
  'deity-morrigan': {
    arcana: 'ARCANA • XXIV',
    ancientScript: '᚛ᚋᚑᚏᚏᚔ⠛ᚐᚾ᚜',
    runicRing: ['ᚁ', 'ᚂ', 'ᚃ', 'ᚄ', 'ᚅ', 'ᚆ', 'ᚇ', 'ᚈ', 'ᚉ', 'ᚊ', 'ᚋ', 'ᚌ', 'ᚍ', 'ᚎ', 'ᚏ'],
    relicName: 'PHANTOM RAVEN & SPEAR',
    primaryColor: '#C084FC',
    secondaryColor: '#EF4444',
    glowColor: 'rgba(192, 132, 252, 0.45)',
    gemColor: '#701A75',
  },
};

const ELEMENT_GEMS: Record<Element, { label: string; color: string; border: string; glow: string; rune: string }> = {
  Fire: { label: 'IGNIS', color: '#EF4444', border: '#F87171', glow: 'rgba(239, 68, 68, 0.5)', rune: '▲' },
  Water: { label: 'AQUA', color: '#06B6D4', border: '#67E8F9', glow: 'rgba(6, 182, 212, 0.5)', rune: '▼' },
  Lightning: { label: 'FULGUR', color: '#EAB308', border: '#FDE047', glow: 'rgba(234, 179, 8, 0.5)', rune: '⚡' },
  Light: { label: 'LUX', color: '#F59E0B', border: '#FCD34D', glow: 'rgba(245, 158, 11, 0.5)', rune: '☼' },
  Shadow: { label: 'UMBRA', color: '#8B5CF6', border: '#C4B5FD', glow: 'rgba(139, 92, 246, 0.5)', rune: '☽' },
  Earth: { label: 'TERRA', color: '#10B981', border: '#6EE7B7', glow: 'rgba(16, 185, 129, 0.5)', rune: '◆' },
  Air: { label: 'VENTUS', color: '#38BDF8', border: '#BAE6FD', glow: 'rgba(56, 189, 248, 0.5)', rune: '◇' },
};

export const MythicTarotCard: React.FC<MythicTarotCardProps> = ({
  legend,
  size = 'md',
  className = '',
  interactive = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const uid = useId().replace(/:/g, '');

  const meta = TAROT_METADATA[legend.id] || {
    arcana: 'CODEX RELIC',
    ancientScript: legend.nativeName || legend.name.toUpperCase(),
    runicRing: ['ᛟ', 'ᚦ', 'ᚱ', 'ᚢ', 'ᚾ', 'ᛖ', 'ᛋ', '★'],
    relicName: `${legend.name.toUpperCase()} SACRED SIGIL`,
    primaryColor: '#D4AF37',
    secondaryColor: '#F4D58D',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    gemColor: '#D4AF37',
  };

  const elementGem = ELEMENT_GEMS[legend.element] || ELEMENT_GEMS.Light;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 18;
    setTilt({ x: rotateX, y: rotateY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  // Specific procedural vector holy emblem renderer
  const renderHolyEmblem = () => {
    const p = meta.primaryColor;
    const s = meta.secondaryColor;

    switch (legend.id) {
      case 'deity-shiva':
        return (
          <g>
            {/* Third Eye Glow */}
            <circle cx="100" cy="40" r="10" fill="url(#shivaGlow)" opacity="0.8" />
            <path d="M92 40 Q100 32 108 40 Q100 48 92 40 Z" fill="#FDE047" stroke="#D4AF37" strokeWidth="1.2" />
            <circle cx="100" cy="40" r="2.5" fill="#EF4444" />

            {/* Crescent Moon */}
            <path d="M124 50 A 14 14 0 1 0 134 72 A 11 11 0 1 1 124 50 Z" fill="#E0F2FE" opacity="0.9" />

            {/* Trishul Central Staff & Blade */}
            <line x1="100" y1="52" x2="100" y2="168" stroke="url(#goldGrad)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M100 28 L94 56 L100 52 L106 56 Z" fill="#FDE047" stroke="#B45309" strokeWidth="1" />

            {/* Trishul Left & Right Prongs */}
            <path d="M100 75 C 80 75 72 45 74 36 C 76 46 86 64 96 66" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M100 75 C 120 75 128 45 126 36 C 124 46 114 64 104 66" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />

            {/* Damru (Hourglass drum) */}
            <polygon points="90,82 110,82 90,102 110,102" fill="url(#goldGrad)" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="100" cy="92" r="3" fill="#EF4444" />
            <line x1="94" y1="92" x2="84" y2="98" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="106" y1="92" x2="116" y2="86" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />

            {/* Coiled Serpent Vasuki */}
            <path d="M96 112 Q106 116 100 124 Q94 132 104 138" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          </g>
        );

      case 'deity-zeus':
        return (
          <g>
            {/* Crackling Thunderbolts Arc */}
            <circle cx="100" cy="100" r="58" stroke="url(#zeusArc)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.6" />
            {/* Master Lightning Bolt */}
            <polygon
              points="106,22 84,86 102,86 90,174 122,96 102,96"
              fill="url(#lightningGrad)"
              stroke="#FFF"
              strokeWidth="1.8"
              filter="url(#glowFilter)"
            />
            {/* Secondary sparks */}
            <path d="M72 65 L60 90 L70 90 L62 115" stroke="#FDE047" strokeWidth="2" fill="none" />
            <path d="M128 65 L140 90 L130 90 L138 115" stroke="#FDE047" strokeWidth="2" fill="none" />
            <polygon points="100,50 96,62 104,62" fill="#FFF" />
          </g>
        );

      case 'deity-odin':
        return (
          <g>
            {/* Valknut (Three Interlocking Triangles) */}
            <polygon points="100,56 82,90 118,90" fill="none" stroke="#38BDF8" strokeWidth="3" opacity="0.9" />
            <polygon points="86,72 104,106 68,106" fill="none" stroke="#FDE047" strokeWidth="3" opacity="0.9" />
            <polygon points="114,72 132,106 96,106" fill="none" stroke="#D4AF37" strokeWidth="3" opacity="0.9" />

            {/* Spear Gungnir */}
            <line x1="62" y1="160" x2="138" y2="35" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
            <polygon points="138,35 126,45 132,53" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />

            {/* Ravens Huginn & Muninn silhouettes */}
            <path d="M64 45 Q74 52 82 48 Q76 40 64 45 Z" fill="#94A3B8" />
            <path d="M136 45 Q126 52 118 48 Q124 40 136 45 Z" fill="#94A3B8" />

            {/* Eye of Wisdom in Valknut core */}
            <circle cx="100" cy="86" r="4.5" fill="#38BDF8" />
          </g>
        );

      case 'deity-ra':
        return (
          <g>
            {/* Radiant Sun Disc */}
            <circle cx="100" cy="74" r="32" fill="url(#sunGrad)" stroke="#D4AF37" strokeWidth="2.5" filter="url(#glowFilter)" />

            {/* Coiled Uraeus Cobra atop disc */}
            <path d="M100 42 Q94 30 100 24 Q106 20 104 15" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="104" cy="14" r="2.5" fill="#EF4444" />

            {/* Eye of Horus / Eye of Ra below disc */}
            <g transform="translate(100, 134) scale(0.65)">
              <path d="M-40 0 Q0 -25 40 0 Q0 25 -40 0 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" />
              <circle cx="0" cy="0" r="11" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              <circle cx="2" cy="-2" r="4" fill="#FFF" />
              <path d="M15 10 L25 35 L12 35" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
              <path d="M-12 12 Q-20 30 -35 25" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
            </g>
          </g>
        );

      case 'deity-amaterasu':
        return (
          <g>
            {/* 16-ray Sun Halo */}
            {[...Array(16)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos((i * Math.PI) / 8) * 64}
                y2={100 + Math.sin((i * Math.PI) / 8) * 64}
                stroke="#FDE047"
                strokeWidth={i % 2 === 0 ? '2' : '1'}
                opacity={i % 2 === 0 ? 0.75 : 0.4}
              />
            ))}

            {/* Sacred Bronze Octagonal Mirror Yata no Kagami */}
            <polygon
              points="100,62 126,72 138,98 126,124 100,134 74,124 62,98 74,72"
              fill="url(#bronzeGrad)"
              stroke="#FDE047"
              strokeWidth="3"
            />
            <circle cx="100" cy="98" r="20" fill="#1E293B" stroke="#F43F5E" strokeWidth="2" />

            {/* Magatama (curved jewel) inside mirror */}
            <path d="M100 86 A 12 12 0 0 1 100 110 A 6 6 0 0 1 100 98 A 6 6 0 0 0 100 86 Z" fill="#F43F5E" />
            <circle cx="100" cy="92" r="2.5" fill="#FFF" />
          </g>
        );

      case 'creature-medusa':
        return (
          <g>
            {/* Entwined Serpents Hair Coils */}
            <path d="M70 70 Q50 40 70 30 Q85 24 95 38" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M130 70 Q150 40 130 30 Q115 24 105 38" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M60 90 Q40 85 45 110 Q50 125 70 120" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
            <path d="M140 90 Q160 85 155 110 Q150 125 130 120" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />

            {/* Gorgon Face Silhouette / Mask */}
            <path d="M78 65 Q100 55 122 65 Q130 100 120 125 Q100 145 80 125 Q70 100 78 65 Z" fill="#064E3B" stroke="#10B981" strokeWidth="2" />

            {/* Glowing Emerald Stone Eyes */}
            <ellipse cx="88" cy="88" rx="7" ry="4" fill="#34D399" filter="url(#glowFilter)" />
            <ellipse cx="112" cy="88" rx="7" ry="4" fill="#34D399" filter="url(#glowFilter)" />
            <circle cx="88" cy="88" r="2.5" fill="#ECFDF5" />
            <circle cx="112" cy="88" r="2.5" fill="#ECFDF5" />

            {/* Petrified stone tears */}
            <line x1="88" y1="94" x2="88" y2="108" stroke="#6EE7B7" strokeWidth="1.5" opacity="0.6" />
            <line x1="112" y1="94" x2="112" y2="108" stroke="#6EE7B7" strokeWidth="1.5" opacity="0.6" />
          </g>
        );

      case 'creature-fenrir':
        return (
          <g>
            {/* Shattered Gleipnir Golden Chain links */}
            <line x1="50" y1="70" x2="80" y2="90" stroke="#FDE047" strokeWidth="3.5" strokeDasharray="7 5" />
            <line x1="150" y1="70" x2="120" y2="90" stroke="#FDE047" strokeWidth="3.5" strokeDasharray="7 5" />

            {/* Great Wolf Head Profile */}
            <path
              d="M70 125 L85 95 L95 80 L90 55 L108 80 L130 85 L145 95 L140 105 L115 110 L125 125 L105 120 L95 135 Z"
              fill="#1E293B"
              stroke="#EF4444"
              strokeWidth="2.5"
            />
            {/* Glowing Feral Red Eye */}
            <polygon points="106,88 114,84 116,90" fill="#EF4444" filter="url(#glowFilter)" />

            {/* Bared Fangs */}
            <polygon points="122,108 126,118 129,108" fill="#F8FAFC" />
            <polygon points="132,106 136,116 138,106" fill="#F8FAFC" />
          </g>
        );

      case 'deity-anubis':
        return (
          <g>
            {/* Jackal Head Profile */}
            <path
              d="M80 125 L85 90 L75 50 L88 60 L98 85 L120 90 L130 96 L118 102 L105 102 L100 125 Z"
              fill="#0F172A"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            {/* Piercing Gold Eye */}
            <polygon points="94,86 102,84 100,90" fill="#FDE047" />

            {/* Golden Scales of Maat */}
            <line x1="70" y1="135" x2="130" y2="135" stroke="#D4AF37" strokeWidth="2.5" />
            <line x1="100" y1="130" x2="100" y2="160" stroke="#D4AF37" strokeWidth="2.5" />
            <line x1="75" y1="135" x2="70" y2="152" stroke="#D4AF37" strokeWidth="1.5" />
            <line x1="85" y1="135" x2="90" y2="152" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M68 152 Q80 160 92 152 Z" fill="#D4AF37" opacity="0.8" />

            <line x1="115" y1="135" x2="110" y2="152" stroke="#D4AF37" strokeWidth="1.5" />
            <line x1="125" y1="135" x2="130" y2="152" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M108 152 Q120 160 132 152 Z" fill="#D4AF37" opacity="0.8" />
          </g>
        );

      case 'creature-garuda':
        return (
          <g>
            {/* Spread Golden Wings */}
            <path d="M100 110 Q60 50 35 70 Q55 105 85 118 Z" fill="url(#goldGrad)" opacity="0.85" />
            <path d="M100 110 Q140 50 165 70 Q145 105 115 118 Z" fill="url(#goldGrad)" opacity="0.85" />

            {/* Celestial Beak & Face */}
            <polygon points="100,55 92,75 100,95 108,75" fill="#F59E0B" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M96 85 Q100 102 104 85" fill="#B45309" />

            {/* Vedic Crown (Kirita Mukuta) */}
            <polygon points="90,55 100,32 110,55 104,50 100,42 96,50" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
            <circle cx="100" cy="48" r="2.5" fill="#EF4444" />
          </g>
        );

      case 'deity-thor':
        return (
          <g>
            {/* Crackling Blue Lightning Sparks */}
            <path d="M60 60 L75 80 L65 85 L85 110" stroke="#38BDF8" strokeWidth="2.5" fill="none" opacity="0.8" />
            <path d="M140 60 L125 80 L135 85 L115 110" stroke="#38BDF8" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Mjölnir Hammer Head */}
            <rect x="70" y="58" width="60" height="34" rx="4" fill="url(#hammerGrad)" stroke="#38BDF8" strokeWidth="2" />
            <polygon points="62,64 70,58 70,92 62,86" fill="#475569" />
            <polygon points="138,64 130,58 130,92 138,86" fill="#475569" />

            {/* Runic knot carving on hammer */}
            <circle cx="100" cy="75" r="8" stroke="#FDE047" strokeWidth="1.5" fill="none" />
            <line x1="95" y1="75" x2="105" y2="75" stroke="#FDE047" strokeWidth="1.5" />

            {/* Hammer Handle */}
            <rect x="94" y="92" width="12" height="52" rx="2" fill="#78350F" stroke="#D4AF37" strokeWidth="1.5" />
            <circle cx="100" cy="148" r="5" fill="#D4AF37" />
          </g>
        );

      case 'deity-vishnu':
        return (
          <g>
            {/* Sudarshana Chakra Spinning Wheel */}
            <circle cx="100" cy="85" r="38" stroke="url(#goldGrad)" strokeWidth="3" fill="none" />
            {[...Array(12)].map((_, i) => (
              <polygon
                key={i}
                points={`${100 + Math.cos((i * Math.PI) / 6) * 38},${85 + Math.sin((i * Math.PI) / 6) * 38} ${100 + Math.cos((i * Math.PI) / 6 + 0.15) * 48},${85 + Math.sin((i * Math.PI) / 6 + 0.15) * 48} ${100 + Math.cos((i * Math.PI) / 6 + 0.3) * 38},${85 + Math.sin((i * Math.PI) / 6 + 0.3) * 38}`}
                fill="#FDE047"
              />
            ))}
            <circle cx="100" cy="85" r="14" fill="#1E3A8A" stroke="#FDE047" strokeWidth="2" />

            {/* Sacred Conch (Panchajanya) & Lotus */}
            <path d="M85 135 Q100 120 115 135 Q100 155 85 135 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="100" cy="85" r="4" fill="#38BDF8" />
          </g>
        );

      case 'deity-poseidon':
        return (
          <g>
            {/* Churning Ocean Waves */}
            <path d="M50 145 Q75 130 100 145 Q125 160 150 145" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 155 Q85 140 110 155 Q135 170 160 155" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Oceanic Barbed Trident */}
            <line x1="100" y1="36" x2="100" y2="155" stroke="url(#goldGrad)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Center Spear */}
            <polygon points="100,24 94,48 106,48" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
            {/* Barbed Outer Prongs */}
            <path d="M100 68 C 76 68 68 40 70 32 L76 42 C 78 55 90 62 100 62" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="1" />
            <path d="M100 68 C 124 68 132 40 130 32 L124 42 C 122 55 110 62 100 62" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="1" />
          </g>
        );

      case 'deity-hades':
        return (
          <g>
            {/* Underworld Bident (Two-pronged spear) */}
            <line x1="100" y1="50" x2="100" y2="165" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 70 C 80 70 76 38 78 28 L84 40 C 86 56 94 62 100 64" fill="url(#goldGrad)" stroke="#4A044E" strokeWidth="1.2" />
            <path d="M100 70 C 120 70 124 38 122 28 L116 40 C 114 56 106 62 100 64" fill="url(#goldGrad)" stroke="#4A044E" strokeWidth="1.2" />

            {/* Helm of Darkness Skull Sigil */}
            <circle cx="100" cy="85" r="14" fill="#3B0764" stroke="#C084FC" strokeWidth="2" />
            <circle cx="95" cy="83" r="3" fill="#A855F7" />
            <circle cx="105" cy="83" r="3" fill="#A855F7" />
            <polygon points="98,90 102,90 100,94" fill="#C084FC" />
          </g>
        );

      case 'creature-dragon':
        return (
          <g>
            {/* Coiled Dragon Silhouette */}
            <path
              d="M75 145 Q55 110 70 80 Q85 55 110 50 Q135 48 145 65 Q140 85 120 90 Q135 105 130 135 Q115 155 90 150 Z"
              fill="none"
              stroke="#EA580C"
              strokeWidth="3.5"
            />
            {/* Horned Dragon Head */}
            <polygon points="145,65 160,55 148,72 135,70" fill="#F97316" stroke="#7C2D12" strokeWidth="1.5" />
            {/* Spreading Fire Embers */}
            <polygon points="152,70 168,76 156,80" fill="#FDE047" />
            <polygon points="160,78 175,82 165,86" fill="#EF4444" />
          </g>
        );

      case 'creature-phoenix':
        return (
          <g>
            {/* Ascending Firebird Wings */}
            <path d="M100 115 Q65 60 40 45 Q70 70 85 95" fill="none" stroke="#FDE047" strokeWidth="3" />
            <path d="M100 115 Q135 60 160 45 Q130 70 115 95" fill="none" stroke="#FDE047" strokeWidth="3" />
            {/* Rebirth Solar Body */}
            <polygon points="100,45 92,85 100,125 108,85" fill="url(#fireGrad)" stroke="#FDE047" strokeWidth="1.5" />
            {/* Crown of Flames */}
            <polygon points="95,45 100,28 105,45" fill="#EF4444" />
          </g>
        );

      case 'creature-kitsune':
        return (
          <g>
            {/* 9 Fox Tails Fan */}
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((idx) => {
              const angle = (idx * 16 * Math.PI) / 180;
              const x2 = 100 + Math.sin(angle) * 60;
              const y2 = 115 - Math.cos(angle) * 55;
              return (
                <path
                  key={idx}
                  d={`M100 120 Q${100 + idx * 8} 80 ${x2} ${y2}`}
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity={0.8}
                />
              );
            })}
            {/* Sacred Shrine Fox Mask */}
            <polygon points="100,75 84,98 92,122 100,132 108,122 116,98" fill="#F8FAFC" stroke="#818CF8" strokeWidth="2" />
            <path d="M88 95 Q94 105 100 102" stroke="#EF4444" strokeWidth="2" fill="none" />
            <path d="M112 95 Q106 105 100 102" stroke="#EF4444" strokeWidth="2" fill="none" />
            {/* Blue Foxfire will-o-wisp */}
            <circle cx="100" cy="55" r="6" fill="#38BDF8" filter="url(#glowFilter)" />
          </g>
        );

      default:
        // Generic Cosmic Sacred Sigil
        return (
          <g>
            <circle cx="100" cy="100" r="48" stroke={p} strokeWidth="2" strokeDasharray="6 4" fill="none" />
            <polygon points="100,56 138,122 62,122" fill="none" stroke={s} strokeWidth="2.5" />
            <polygon points="100,144 138,78 62,78" fill="none" stroke={p} strokeWidth="2.5" />
            <circle cx="100" cy="100" r="16" fill="url(#goldGrad)" stroke="#FFF" strokeWidth="1" />
            <circle cx="100" cy="100" r="6" fill={elementGem.color} />
          </g>
        );
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-16',
    md: 'w-full h-48 sm:h-52',
    lg: 'w-full h-full min-h-[300px]',
    hero: 'w-full h-96',
  }[size];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none overflow-hidden rounded-xl border border-[#D4AF37]/50 shadow-2xl transition-transform duration-200 ease-out bg-[#060911] ${sizeClasses} ${className}`}
      style={{
        perspective: '1000px',
        transform: tilt.active
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      }}
    >
      {/* Dynamic Holographic Foil Glint Overlay */}
      {tilt.active && (
        <div
          className="absolute inset-0 z-30 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.45) 0%, rgba(212,175,55,0.3) 25%, rgba(147,51,234,0.2) 50%, rgba(6,182,212,0.15) 75%, transparent 100%), linear-gradient(115deg, transparent 20%, rgba(255,215,0,0.25) 40%, rgba(255,255,255,0.6) 50%, rgba(168,85,247,0.3) 60%, transparent 80%)`,
          }}
        />
      )}

      {/* Outer Etched Gold Border & Filigree Corners */}
      <div className="absolute inset-1.5 rounded-lg border border-[#D4AF37]/40 pointer-events-none z-20 flex flex-col justify-between p-2">
        {/* Top Header: Arcana Number + Element Insignia */}
        <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#D4AF37]">
          <span className="bg-[#080B12]/90 px-1.5 py-0.5 rounded border border-[#D4AF37]/40">
            {meta.arcana}
          </span>
          <div className="flex items-center gap-1 bg-[#080B12]/90 px-1.5 py-0.5 rounded border border-[#D4AF37]/40">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: elementGem.color, boxShadow: `0 0 6px ${elementGem.glow}` }}
            />
            <span className="font-bold text-[#F5F5F0]">{legend.element.toUpperCase()}</span>
          </div>
        </div>

        {/* Bottom Bar: Native Script / Runic Seal */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37] pt-1">
          <span className="truncate max-w-[65%] font-serif-ancient text-xs text-[#F4D58D] drop-shadow">
            {meta.ancientScript}
          </span>
          <span className="text-[8px] tracking-wider text-[#9CA3AF] bg-[#080B12]/80 px-1 rounded border border-[#243048]">
            {legend.mythology.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Corner Filigree Crosses */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none text-[#D4AF37] text-[10px] leading-none opacity-80">
        ❖
      </div>
      <div className="absolute top-2 right-2 z-20 pointer-events-none text-[#D4AF37] text-[10px] leading-none opacity-80">
        ❖
      </div>
      <div className="absolute bottom-2 left-2 z-20 pointer-events-none text-[#D4AF37] text-[10px] leading-none opacity-80">
        ❖
      </div>
      <div className="absolute bottom-2 right-2 z-20 pointer-events-none text-[#D4AF37] text-[10px] leading-none opacity-80">
        ❖
      </div>

      {/* SVG Tarot Codex Canvas */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        aria-label={legend.name}
      >
        <defs>
          {/* Reusable Gradients & Glow Filters */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          <linearGradient id="hammerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <radialGradient id="shivaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <radialGradient id={`cosmicGlow-${uid}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={meta.primaryColor} stopOpacity="0.25" />
            <stop offset="50%" stopColor={meta.secondaryColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor="#060911" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dark parchment texture & cosmic celestial aura */}
        <rect x="0" y="0" width="200" height="200" fill={`url(#cosmicGlow-${uid})`} />

        {/* Sacred Geometry Astrolabe concentric rings */}
        <circle cx="100" cy="100" r="78" stroke="#D4AF37" strokeWidth="0.7" opacity="0.3" fill="none" />
        <circle cx="100" cy="100" r="72" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" fill="none" />
        <circle cx="100" cy="100" r="58" stroke={meta.secondaryColor} strokeWidth="0.8" opacity="0.35" fill="none" />
        <circle cx="100" cy="100" r="32" stroke="#D4AF37" strokeWidth="0.5" opacity="0.25" fill="none" />

        {/* Astrological Quad Coordinates */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />

        {/* Runic / Sacred Glyphs around ring perimeter */}
        {meta.runicRing.slice(0, 12).map((rune, idx) => {
          const angle = (idx * 30 * Math.PI) / 180;
          const rx = 100 + Math.cos(angle) * 75;
          const ry = 100 + Math.sin(angle) * 75;
          return (
            <text
              key={idx}
              x={rx}
              y={ry + 3}
              textAnchor="middle"
              fontSize="7"
              fill="#D4AF37"
              opacity="0.65"
              className="font-serif-ancient select-none"
            >
              {rune}
            </text>
          );
        })}

        {/* Primary Holy Emblem in center */}
        {renderHolyEmblem()}
      </svg>
    </div>
  );
};
