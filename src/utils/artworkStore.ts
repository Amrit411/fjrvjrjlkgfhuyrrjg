export interface CharacterSpriteDef {
  id: string;
  name: string;
  sheet: 1 | 2;
  col: number;
  row: number;
  filename: string;
}

export const CHARACTER_ARTWORKS: CharacterSpriteDef[] = [
  // Sheet 1 (Deities 1–12)
  { id: 'deity-shiva', name: 'Lord Shiva', sheet: 1, col: 0, row: 0, filename: 'shiva.png' },
  { id: 'deity-zeus', name: 'Zeus', sheet: 1, col: 1, row: 0, filename: 'zeus.png' },
  { id: 'deity-odin', name: 'Odin', sheet: 1, col: 2, row: 0, filename: 'odin.png' },
  { id: 'deity-ra', name: 'Ra', sheet: 1, col: 3, row: 0, filename: 'ra.png' },
  { id: 'deity-amaterasu', name: 'Amaterasu', sheet: 1, col: 0, row: 1, filename: 'amaterasu.png' },
  { id: 'creature-medusa', name: 'Medusa', sheet: 1, col: 1, row: 1, filename: 'medusa.png' },
  { id: 'creature-fenrir', name: 'Fenrir', sheet: 1, col: 2, row: 1, filename: 'fenrir.png' },
  { id: 'deity-anubis', name: 'Anubis', sheet: 1, col: 3, row: 1, filename: 'anubis.png' },
  { id: 'creature-garuda', name: 'Garuda', sheet: 1, col: 0, row: 2, filename: 'garuda.png' },
  { id: 'deity-quetzalcoatl', name: 'Quetzalcoatl', sheet: 1, col: 1, row: 2, filename: 'quetzalcoatl.png' },
  { id: 'deity-thor', name: 'Thor', sheet: 1, col: 2, row: 2, filename: 'thor.png' },
  { id: 'creature-kitsune', name: 'Kitsune', sheet: 1, col: 3, row: 2, filename: 'kitsune.png' },

  // Sheet 2 (Legends 13–24)
  { id: 'deity-vishnu', name: 'Lord Vishnu', sheet: 2, col: 0, row: 0, filename: 'vishnu.png' },
  { id: 'deity-poseidon', name: 'Poseidon', sheet: 2, col: 1, row: 0, filename: 'poseidon.png' },
  { id: 'deity-hades', name: 'Hades', sheet: 2, col: 2, row: 0, filename: 'hades.png' },
  { id: 'deity-athena', name: 'Athena', sheet: 2, col: 3, row: 0, filename: 'athena.png' },
  { id: 'deity-loki', name: 'Loki', sheet: 2, col: 0, row: 1, filename: 'loki.png' },
  { id: 'deity-osiris', name: 'Osiris', sheet: 2, col: 1, row: 1, filename: 'osiris.png' },
  { id: 'creature-dragon', name: 'Dragon', sheet: 2, col: 2, row: 1, filename: 'dragon.png' },
  { id: 'creature-phoenix', name: 'Phoenix', sheet: 2, col: 3, row: 1, filename: 'phoenix.png' },
  { id: 'creature-kraken', name: 'Kraken', sheet: 2, col: 0, row: 2, filename: 'kraken.png' },
  { id: 'creature-cerberus', name: 'Cerberus', sheet: 2, col: 1, row: 2, filename: 'cerberus.png' },
  { id: 'deity-susanoo', name: 'Susanoo', sheet: 2, col: 2, row: 2, filename: 'susanoo.png' },
  { id: 'deity-morrigan', name: 'The Morrígan', sheet: 2, col: 3, row: 2, filename: 'morrigan.png' },
];

export function getCharacterSprite(id: string): CharacterSpriteDef | undefined {
  return CHARACTER_ARTWORKS.find((c) => c.id === id);
}

export function getCharacterPortraitUrl(id: string): string | undefined {
  const char = getCharacterSprite(id);
  if (!char) return undefined;
  return `${import.meta.env.BASE_URL}assets/portraits/${char.filename}`;
}
