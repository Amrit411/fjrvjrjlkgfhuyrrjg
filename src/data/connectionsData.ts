import { ConnectionLink, MythologySystem } from '../types/mythology';

export interface CultureNodeInfo {
  id: MythologySystem;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  archetypeDominance: string[];
  coreDeity: string;
  legendaryCreature: string;
  color: string;
  synopsis: string;
}

export const CULTURE_NODES: CultureNodeInfo[] = [
  {
    id: 'Greek',
    label: 'GREEK',
    sublabel: 'Mediterranean Realm',
    x: 450,
    y: 120,
    archetypeDominance: ['Thunder Sovereign', 'Tragic Quest', 'Titanomachy', 'Chimeric Beasts'],
    coreDeity: 'Zeus (King of Olympus)',
    legendaryCreature: 'Phoenix / Griffin / Cerberus',
    color: '#3B82F6',
    synopsis: 'Explores anthropomorphic divinity, the struggle against inexorable fate (Moira), and civil order carved from chthonic chaos.'
  },
  {
    id: 'Indian',
    label: 'INDIAN',
    sublabel: 'Indus & Vedic Plains',
    x: 650,
    y: 270,
    archetypeDominance: ['Cosmic Cycles (Yugas)', 'Thunder Warrior vs Serpent', 'Divine Avatars', 'Transcendent Non-Duality'],
    coreDeity: 'Shiva / Vishnu / Indra',
    legendaryCreature: 'Garuda / Yali / Shesha',
    color: '#F59E0B',
    synopsis: 'Depicts vast recurring cosmic kalpas, balance preserved through righteous avatars, and the triumph of spiritual awareness over adharma.'
  },
  {
    id: 'Norse',
    label: 'NORSE',
    sublabel: 'Scandinavian Fjords',
    x: 250,
    y: 140,
    archetypeDominance: ['World Tree (Axis Mundi)', 'Doomed Eschatology (Ragnarök)', 'Runic Wisdom & Sacrifice', 'Thunder vs World Serpent'],
    coreDeity: 'Odin (Allfather) / Thor',
    legendaryCreature: 'Fafnir / Kraken / Jörmungandr',
    color: '#06B6D4',
    synopsis: 'A stoic universe centered on the ash tree Yggdrasil, embracing heroic resistance against chaotic forces even in the face of prophesied doom.'
  },
  {
    id: 'Egyptian',
    label: 'EGYPTIAN',
    sublabel: 'Nile Valley & Sahara',
    x: 450,
    y: 400,
    archetypeDominance: ['Solar Barque Journey', 'Weighing of the Soul', 'Death & Resurrection', 'Cosmic Ma’at vs Apep'],
    coreDeity: 'Ra / Osiris / Anubis',
    legendaryCreature: 'Bennu Bird / Sphinx / Ammit',
    color: '#D97706',
    synopsis: 'Focused on eternal cyclical rejuvenation, the divine balance of truth (Ma’at), and overcoming the devouring serpent of void.'
  },
  {
    id: 'Japanese',
    label: 'JAPANESE',
    sublabel: 'East Asian Archipelago',
    x: 680,
    y: 430,
    archetypeDominance: ['Nature Animism (Kami)', 'Sun Goddess Concealment & Dawn', 'Storm God vs Multi-headed Serpent', 'Spiritual Purity (Misogi)'],
    coreDeity: 'Amaterasu / Susanoo',
    legendaryCreature: 'Kitsune / Kappa / Ryu Dragon',
    color: '#EC4899',
    synopsis: 'Reveres the living spirit within all natural phenomenon, celebrating seasonal renewal and the balance between celestial Kami and nocturnal Yokai.'
  },
  {
    id: 'Celtic',
    label: 'CELTIC',
    sublabel: 'Atlantic Isles & Gaul',
    x: 180,
    y: 330,
    archetypeDominance: ['The Otherworld Veil', 'Sovereignty & Sacred Land', 'Shape-shifting Triple Goddess', 'Master of All Arts'],
    coreDeity: 'The Morrígan / Lugh Lámhfhada',
    legendaryCreature: 'Banshee / Cù-Sìth / Salmon of Wisdom',
    color: '#10B981',
    synopsis: 'Celebrates thin places between worlds where time stands still, sacred seasonal fire transitions, and the mystical wisdom of bards.'
  },
  {
    id: 'Mesoamerican',
    label: 'MESOAMERICAN',
    sublabel: 'Highlands & Maya Lowlands',
    x: 230,
    y: 480,
    archetypeDominance: ['Feathered Serpent', 'Cyclic Five Suns', 'Underworld Descent (Mictlan / Xibalba)', 'Sacred Calendars'],
    coreDeity: 'Quetzalcoatl / Kukulkan',
    legendaryCreature: 'Cipactli / Feathered Serpent / Nagual',
    color: '#8B5CF6',
    synopsis: 'Harmonizes celestial mechanics with cyclic creation and destruction, viewing humanity as conscious stewards maintaining solar motion.'
  }
];

export const CROSS_CULTURAL_CONNECTIONS: ConnectionLink[] = [
  {
    source: 'Greek',
    target: 'Indian',
    theme: 'Proto-Indo-European Celestial & Thunder Gods',
    archetype: 'The Sky Father & Thunder Scepter',
    description: 'Linguists and comparative mythologists trace Greek Zeus Pater and Vedic Dyaus Pita to a shared Proto-Indo-European root. Additionally, Indra’s diamond Vajra thunderbolt and defeat of the drought-dragon Vritra directly mirrors Zeus’s lightning bolts defeating Typhon.',
    sharedSymbols: ['Thunderbolt / Vajra', 'Solar Chariot', 'Golden Nectar of Immortality (Ambrosia / Amrita)'],
    parallelEntities: [
      { from: 'Zeus (Thunder King)', to: 'Indra (Thunder Lord of Devas)' },
      { from: 'Phoenix (Solar Bird)', to: 'Garuda (Solar Bird of Vishnu)' },
      { from: 'Heracles (Labors & Strength)', to: 'Bheema / Krishna' }
    ]
  },
  {
    source: 'Greek',
    target: 'Norse',
    theme: 'Cosmic Upheaval & Slayer of the Primordial Serpent',
    archetype: 'The Storm Champion vs Chaos Serpent',
    description: 'Thor’s duel against the world serpent Jörmungandr closely mirrors Zeus’s cataclysmic battle against the serpentine Typhon. Furthermore, the division of realms between brothers (Zeus, Poseidon, Hades) parallels Odin, Vili, and Ve carving the cosmos.',
    sharedSymbols: ['Storm Weapon', 'Enchanted Girdle of Might', 'Apocalyptic Cosmic Struggle'],
    parallelEntities: [
      { from: 'Zeus / Ares', to: 'Thor / Odin' },
      { from: 'Typhon (Dragon of Chaos)', to: 'Jörmungandr (Midgard Serpent)' },
      { from: 'Hades (Underworld Lord)', to: 'Hel (Ruler of Niflheim)' }
    ]
  },
  {
    source: 'Norse',
    target: 'Indian',
    theme: 'The Cosmic Axis Tree & The World-Ending Renewal',
    archetype: 'The Axis Mundi & Cyclic Dissolution',
    description: 'Norse Yggdrasil (the cosmic ash tree linking nine realms) shares deep architectural symbolism with the Indian cosmic Ashvattha (world-tree with roots in heaven and branches on earth). Both cultures emphasize that the physical cosmos undergoes total periodic dissolution (Ragnarök and Pralaya) followed by green rebirth.',
    sharedSymbols: ['Cosmic Tree (Yggdrasil / Ashvattha)', 'Cyclic Apocalypse & Regeneration', 'Sacrificial Knowledge'],
    parallelEntities: [
      { from: 'Yggdrasil (Nine Worlds)', to: 'Ashvattha (Cosmic Banyan)' },
      { from: 'Ragnarök (Destruction & Renewal)', to: 'Pralaya (Cosmic Dissolution by Shiva)' },
      { from: 'Odin hanging for Runes', to: 'Shiva’s intense Tapas asceticism' }
    ]
  },
  {
    source: 'Egyptian',
    target: 'Greek',
    theme: 'Solar Rebirth, Funerary Judgment & Mystery Cults',
    archetype: 'The Weigher of Souls & The Rising Sunbird',
    description: 'Herodotus and later Neoplatonists observed that Egyptian Osiris, Anubis, and the Bennu bird profoundly influenced Greek Dionysian mystery rites, the Underworld judgment courts of Minos, and the legendary lore of the Phoenix.',
    sharedSymbols: ['Weighing Scales of Judgment', 'Solar Disc & Golden Ash', 'Caduceus / Flail of Authority'],
    parallelEntities: [
      { from: 'Osiris (Slain & Reborn Sovereign)', to: 'Dionysus Zagreus' },
      { from: 'Anubis (Soul Weigher)', to: 'Hermes Psychopompos' },
      { from: 'Bennu (Solar Rebirth Heron)', to: 'Phoenix (Radiant Firebird)' }
    ]
  },
  {
    source: 'Japanese',
    target: 'Indian',
    theme: 'Buddhist Transmission, Celestial Guardians & Serpentine Dragons',
    archetype: 'The Celestial Mount & The Coiled Naga',
    description: 'Through the Silk Road and Buddhist transmission, Indian Vedic concepts entered Japan, transforming Garuda into Karura and the serpentine Nagas into Japanese Ryu dragons and Mizuchi water guardians.',
    sharedSymbols: ['Sacred Pearl (Cintamani / Hoshi no Tama)', 'Flames of Purification', 'Eight-headed Serpent Defeat'],
    parallelEntities: [
      { from: 'Garuda (Eagle of Vaikuntha)', to: 'Karura (Fire-breathing Bird Kami)' },
      { from: 'Nagas (Water Serpents)', to: 'Ryu / Mizuchi (Dragon Kings)' },
      { from: 'Indra (Sovereign of Gods)', to: 'Taishakuten (Protector of Heaven)' }
    ]
  },
  {
    source: 'Japanese',
    target: 'Greek',
    theme: 'Underworld Descent & The Taboo of Looking Back',
    archetype: 'The Orphic Descent & The Slain Multi-Headed Serpent',
    description: 'Izanagi’s descent into the underworld (Yomi) to retrieve his deceased wife Izanami mirrors Orpheus’s descent into Hades to rescue Eurydice, complete with the tragic taboo of looking upon the departed spouse in forbidden shadows. Additionally, Susanoo slaying the eight-headed Yamata no Orochi matches Heracles slaying the Lernaean Hydra.',
    sharedSymbols: ['Torch / Comb in Darkness', 'Multi-Headed Dragon / Serpent', 'Solar Deity Concealed in Cave'],
    parallelEntities: [
      { from: 'Izanagi in Yomi', to: 'Orpheus in the Underworld' },
      { from: 'Susanoo vs Yamata no Orochi', to: 'Heracles vs The Hydra' },
      { from: 'Amaterasu in Cave', to: 'Demeter withdrawing sunlight' }
    ]
  },
  {
    source: 'Celtic',
    target: 'Norse',
    theme: 'North Atlantic Shamanism, Battle Crows & The Otherworld',
    archetype: 'The Raven of Prophecy & The Fairy Mound',
    description: 'Geographically intertwined across the British Isles and Ireland, Celtic and Norse traditions both revere sacred ravens as omens of destiny (Odin’s ravens Huginn/Muninn and The Morrígan’s battlefield raven guise), and both view enchanted women weaving the threads of mortality (the Norns and the Banshee/Sídhe).',
    sharedSymbols: ['War Raven', 'Sacred Ogham / Runes', 'Cauldron of Rejuvenation / Mímir’s Well'],
    parallelEntities: [
      { from: 'The Morrígan (Battle Fate)', to: 'The Valkyries & Norns' },
      { from: 'Lugh (Radiant Master of Arts)', to: 'Odin (Master of Poetry & Runes)' },
      { from: 'Tír na nÓg (Otherworld)', to: 'Álfheimr (Elven Realm)' }
    ]
  },
  {
    source: 'Mesoamerican',
    target: 'Egyptian',
    theme: 'Monumental Pyramidal Mirrors of the Stars',
    archetype: 'The Stairway to the Cosmos & Rejuvenation',
    description: 'Though developing independently with no physical contact, both Egyptian and Mesoamerican architects built colossal stone pyramids precisely aligned with solar solstices, viewing them as cosmic stairways bridging the underworld, mortal soil, and the heavens.',
    sharedSymbols: ['Monumental Step Pyramid', 'The Plumed / Uraeus Serpent', 'Solar Celestial Journey'],
    parallelEntities: [
      { from: 'Quetzalcoatl (Feathered Serpent of Dawn)', to: 'Horus / Ra (Solar Sky Falcon)' },
      { from: 'Mictlan (Nine Underworld Levels)', to: 'Duat (Twelve Hour Gates of Night)' },
      { from: 'Teotihuacan Pyramid of the Sun', to: 'Giza Great Pyramid' }
    ]
  }
];

