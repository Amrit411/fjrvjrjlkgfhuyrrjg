export type LegendType =
  | 'god'
  | 'goddess'
  | 'hero'
  | 'creature'
  | 'spirit'
  | 'monster'
  | 'object'
  | 'artifact';

export type MythologyRegion =
  | 'India'
  | 'Greece'
  | 'Scandinavia'
  | 'Egypt'
  | 'Japan'
  | 'Celtic'
  | 'Mesoamerica';

export type MythologySystem =
  | 'Indian'
  | 'Greek'
  | 'Norse'
  | 'Egyptian'
  | 'Japanese'
  | 'Celtic'
  | 'Mesoamerican';

export type Element =
  | 'Fire'
  | 'Water'
  | 'Earth'
  | 'Air'
  | 'Lightning'
  | 'Shadow'
  | 'Light';

export interface LegendStats {
  power: number;
  agility: number;
  mystery: number;
  influence: number;
}

export interface LegendEntry {
  id: string;
  name: string;
  nativeName?: string;
  title: string;
  type: LegendType;
  region: MythologyRegion;
  mythology: MythologySystem;
  class: string;
  element: Element;
  power: number;
  alignment: 'Righteous' | 'Chaotic' | 'Neutral' | 'Destructive' | 'Protective' | 'Transcendent' | 'Primordial';
  habitat: string;
  description: string;
  lore: string;
  abilities: string[];
  weaknesses: string;
  symbols: string[];
  stats: LegendStats;
  relatedEntries: string[];
  fascinatingFact: string;
  historicalEra: string;
  iconType: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  isFeaturedCreature?: boolean;
}

export interface MythologyCulture {
  id: string;
  name: MythologySystem;
  region: string;
  tagline: string;
  description: string;
  sacredTexts: string[];
  dominantThemes: string[];
  entryCount: number;
  icon: string;
  accentColor: string;
  image?: string;
  imageAlt?: string;
}

export interface TimelineEvent {
  id: string;
  culture: MythologySystem;
  era: string;
  timeRange: string;
  title: string;
  historicalContext: string;
  traditions: string[];
  keyFigures: string[];
  culturalSignificance: string;
  relatedEntryIds: string[];
  image?: string;
  imageAlt?: string;
}

export interface PantheonDeityNode {
  id: string;
  name: string;
  title: string;
  generation: number;
  parents?: string[];
  spouses?: string[];
  element: Element;
  domain: string;
  legendId?: string;
  x?: number;
  y?: number;
}

export interface PantheonData {
  culture: MythologySystem;
  name: string;
  cosmology: string;
  sacredRealm: string;
  supremeRuler: string;
  nodes: PantheonDeityNode[];
}

export interface ConnectionLink {
  source: MythologySystem;
  target: MythologySystem;
  theme: string;
  archetype: string;
  description: string;
  sharedSymbols: string[];
  parallelEntities: {
    from: string;
    to: string;
  }[];
}

declare global {
  interface Window {
    __INITIAL_PAGE__?: string;
  }
}

