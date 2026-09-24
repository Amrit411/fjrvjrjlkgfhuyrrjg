import { PantheonData } from '../types/mythology';

export const PANTHEONS_DATA: PantheonData[] = [
  {
    culture: 'Greek',
    name: 'The Twelve Olympians & Titans',
    cosmology: 'Mount Olympus, The Underworld (Hades & Tartarus), Oceanus & Earth',
    sacredRealm: 'Mount Olympus (Mytikas peak)',
    supremeRuler: 'Zeus, Sovereign of Lightning and Hospitality',
    nodes: [

      { id: 'cronus', name: 'Cronus', title: 'Titan King of Time & Harvest', generation: 1, element: 'Earth', domain: 'Titan Sovereignty', x: 260, y: 50 },
      { id: 'rhea', name: 'Rhea', title: 'Titaness Mother of the Gods', generation: 1, element: 'Earth', domain: 'Fertility & Motherhood', x: 440, y: 50 },

      { id: 'zeus', name: 'Zeus', title: 'King of Olympus & Sky', generation: 2, parents: ['cronus', 'rhea'], spouses: ['hera'], element: 'Lightning', domain: 'Sky, Weather, Justice', legendId: 'deity-zeus', x: 120, y: 170 },
      { id: 'hera', name: 'Hera', title: 'Queen of Olympus', generation: 2, parents: ['cronus', 'rhea'], spouses: ['zeus'], element: 'Air', domain: 'Marriage, Women, Family', x: 250, y: 170 },
      { id: 'poseidon', name: 'Poseidon', title: 'Lord of the Seas & Earthquakes', generation: 2, parents: ['cronus', 'rhea'], element: 'Water', domain: 'Oceans, Horses, Earthquakes', legendId: 'deity-poseidon', x: 380, y: 170 },
      { id: 'hades', name: 'Hades', title: 'Lord of the Underworld', generation: 2, parents: ['cronus', 'rhea'], element: 'Shadow', domain: 'The Dead, Mineral Wealth', legendId: 'deity-hades', x: 510, y: 170 },
      { id: 'demeter', name: 'Demeter', title: 'Goddess of Agriculture', generation: 2, parents: ['cronus', 'rhea'], element: 'Earth', domain: 'Harvest, Seasons, Sacred Law', x: 640, y: 170 },
      { id: 'hestia', name: 'Hestia', title: 'Goddess of the Hearth', generation: 2, parents: ['cronus', 'rhea'], element: 'Fire', domain: 'Hearth, Home, Domestic Peace', x: 770, y: 170 },

      { id: 'athena', name: 'Athena', title: 'Goddess of Strategic Wisdom', generation: 3, parents: ['zeus'], element: 'Light', domain: 'Tactics, Weaving, Statecraft', legendId: 'deity-athena', x: 80, y: 310 },
      { id: 'ares', name: 'Ares', title: 'God of Brutal Warfare', generation: 3, parents: ['zeus', 'hera'], element: 'Fire', domain: 'Violence, Martial Fury', x: 200, y: 310 },
      { id: 'apollo', name: 'Apollo', title: 'God of Sun, Music & Prophecy', generation: 3, parents: ['zeus'], element: 'Light', domain: 'Sun, Archery, Healing, Truth', x: 320, y: 310 },
      { id: 'artemis', name: 'Artemis', title: 'Goddess of the Hunt & Moon', generation: 3, parents: ['zeus'], element: 'Earth', domain: 'Wilderness, Moon, Childbirth', x: 440, y: 310 },
      { id: 'hermes', name: 'Hermes', title: 'Herald & Guide of Souls', generation: 3, parents: ['zeus'], element: 'Air', domain: 'Travelers, Thieves, Messages', x: 560, y: 310 },
      { id: 'hephaestus', name: 'Hephaestus', title: 'Master of Divine Metallurgy', generation: 3, parents: ['hera'], element: 'Fire', domain: 'Forges, Volcanoes, Craftsmen', x: 680, y: 310 },
      { id: 'dionysus', name: 'Dionysus', title: 'God of Wine & Ecstasy', generation: 3, parents: ['zeus'], element: 'Water', domain: 'Viticulture, Theatre, Rebirth', x: 800, y: 310 },
    ]
  },
  {
    culture: 'Norse',
    name: 'The Aesir & Vanir of Yggdrasil',
    cosmology: 'The Nine Worlds connected by the World Ash Tree Yggdrasil',
    sacredRealm: 'Asgard (Realm of the Gods)',
    supremeRuler: 'Odin the Allfather, Sovereign of Runes and War',
    nodes: [
      { id: 'borr', name: 'Borr', title: 'Progenitor of the Aesir', generation: 1, element: 'Earth', domain: 'Primordial Ancestor', x: 350, y: 50 },
      { id: 'bestla', name: 'Bestla', title: 'Frost Giant Mother', generation: 1, element: 'Water', domain: 'Ancient Giant Kinship', x: 490, y: 50 },

      { id: 'odin', name: 'Odin', title: 'Allfather of Wisdom & Runes', generation: 2, parents: ['borr', 'bestla'], spouses: ['frigg'], element: 'Air', domain: 'Wisdom, War, Poetry, Death', legendId: 'deity-odin', x: 240, y: 170 },
      { id: 'frigg', name: 'Frigg', title: 'Queen of Asgard & Seeress', generation: 2, spouses: ['odin'], element: 'Light', domain: 'Foresight, Motherhood, Sky', x: 380, y: 170 },
      { id: 'loki', name: 'Loki', title: 'The Catalyst of Chaos', generation: 2, element: 'Fire', domain: 'Trickery, Fire, Inventions', legendId: 'deity-loki', x: 520, y: 170 },
      { id: 'freya', name: 'Freya', title: 'Vanir Lady of Love & War', generation: 2, element: 'Earth', domain: 'Seidr Magic, Beauty, Fólkvangr', x: 660, y: 170 },

      { id: 'thor', name: 'Thor', title: 'Champion of Midgard', generation: 3, parents: ['odin'], element: 'Lightning', domain: 'Thunder, Strength, Protection', legendId: 'deity-thor', x: 180, y: 310 },
      { id: 'baldr', name: 'Baldr', title: 'The Shining Beloved', generation: 3, parents: ['odin', 'frigg'], element: 'Light', domain: 'Purity, Joy, Rebirth', x: 320, y: 310 },
      { id: 'tyr', name: 'Týr', title: 'God of Law & Single Combat', generation: 3, parents: ['odin'], element: 'Earth', domain: 'Honor, Oaths, Sacrifice', x: 460, y: 310 },
      { id: 'heimdall', name: 'Heimdall', title: 'Sentinel of the Bifröst', generation: 3, element: 'Light', domain: 'Gjallarhorn, Vigilance, Sight', x: 600, y: 310 },
    ]
  },
  {
    culture: 'Egyptian',
    name: 'The Great Ennead of Heliopolis',
    cosmology: 'The Nun (Primordial Waters), Benben Mound, Earth (Geb), Sky (Nut), & The Duat',
    sacredRealm: 'Heliopolis & The Celestial Heavens',
    supremeRuler: 'Ra / Atum-Ra, The Great Solar Architect',
    nodes: [
      { id: 'atum', name: 'Atum-Ra', title: 'Primordial Creator & Sun Lord', generation: 1, element: 'Fire', domain: 'Light, Creation, Existence', legendId: 'deity-ra', x: 420, y: 50 },

      { id: 'shu', name: 'Shu', title: 'God of Air & Atmosphere', generation: 2, parents: ['atum'], spouses: ['tefnut'], element: 'Air', domain: 'Wind, Dry Air, Space', x: 310, y: 170 },
      { id: 'tefnut', name: 'Tefnut', title: 'Goddess of Moisture & Rain', generation: 2, parents: ['atum'], spouses: ['shu'], element: 'Water', domain: 'Moisture, Dew, Solar Eye', x: 530, y: 170 },

      { id: 'geb', name: 'Geb', title: 'God of the Earth', generation: 3, parents: ['shu', 'tefnut'], spouses: ['nut'], element: 'Earth', domain: 'Soil, Minerals, Tombs', x: 310, y: 290 },
      { id: 'nut', name: 'Nut', title: 'Goddess of the Starry Sky', generation: 3, parents: ['shu', 'tefnut'], spouses: ['geb'], element: 'Light', domain: 'Night Sky, Stars, Cosmos', x: 530, y: 290 },

      { id: 'osiris', name: 'Osiris', title: 'Lord of the Afterlife & Rebirth', generation: 4, parents: ['geb', 'nut'], spouses: ['isis'], element: 'Earth', domain: 'Resurrection, Agriculture', legendId: 'deity-osiris', x: 180, y: 410 },
      { id: 'isis', name: 'Isis', title: 'Mother of Magic & Healing', generation: 4, parents: ['geb', 'nut'], spouses: ['osiris'], element: 'Light', domain: 'Sorcery, Maternity, Protection', x: 320, y: 410 },
      { id: 'set', name: 'Set', title: 'Lord of Chaos, Storms & Deserts', generation: 4, parents: ['geb', 'nut'], spouses: ['nephthys'], element: 'Fire', domain: 'Foreign Lands, Storms, Red Land', x: 520, y: 410 },
      { id: 'nephthys', name: 'Nephthys', title: 'Goddess of Funerary Lament', generation: 4, parents: ['geb', 'nut'], spouses: ['set'], element: 'Shadow', domain: 'Shroud, Night, Mourning', x: 660, y: 410 },

      { id: 'anubis', name: 'Anubis', title: 'Guardian of the Scales', generation: 5, parents: ['osiris', 'nephthys'], element: 'Shadow', domain: 'Embalming, Weigher of Hearts', legendId: 'deity-anubis', x: 250, y: 520 },
      { id: 'horus', name: 'Horus', title: 'Avenger of Osiris & Pharaoh', generation: 5, parents: ['osiris', 'isis'], element: 'Light', domain: 'Kingship, Sky, Retribution', x: 390, y: 520 },
    ]
  },
  {
    culture: 'Indian',
    name: 'The Trimurti & Celestial Devas',
    cosmology: 'Cyclic Cosmic Eras (Satya, Treta, Dvapara, Kali Yugas) & Mount Meru',
    sacredRealm: 'Svarga (Heaven of Indra) & Vaikuntha / Kailash',
    supremeRuler: 'The Trimurti (Brahma, Vishnu, Shiva)',
    nodes: [
      { id: 'brahma', name: 'Brahma', title: 'The Creator of Cosmos', generation: 1, element: 'Air', domain: 'Cosmic Creation, Vedas, Knowledge', x: 220, y: 80 },
      { id: 'vishnu', name: 'Vishnu', title: 'The Preserver of Dharma', generation: 1, element: 'Light', domain: 'Cosmic Balance, Avatars', legendId: 'deity-vishnu', x: 420, y: 80 },
      { id: 'shiva', name: 'Shiva', title: 'The Auspicious Destroyer', generation: 1, element: 'Fire', domain: 'Dissolution, Asceticism, Dance', legendId: 'deity-shiva', x: 620, y: 80 },

      { id: 'lakshmi', name: 'Lakshmi', title: 'Goddess of Prosperity', generation: 2, spouses: ['vishnu'], element: 'Light', domain: 'Wealth, Fortune, Grace', x: 340, y: 220 },
      { id: 'parvati', name: 'Parvati', title: 'Goddess of Divine Power (Shakti)', generation: 2, spouses: ['shiva'], element: 'Earth', domain: 'Devotion, Strength, Mountains', x: 540, y: 220 },

      { id: 'indra', name: 'Indra', title: 'King of the Devas', generation: 3, element: 'Lightning', domain: 'Thunder, Rain, Warfare', legendId: 'deity-indra', x: 180, y: 360 },
      { id: 'ganesha', name: 'Ganesha', title: 'Remover of Obstacles', generation: 3, parents: ['shiva', 'parvati'], element: 'Earth', domain: 'Beginnings, Wisdom, Letters', x: 440, y: 360 },
      { id: 'kartikeya', name: 'Kartikeya', title: 'Commander of Divine Armies', generation: 3, parents: ['shiva', 'parvati'], element: 'Fire', domain: 'Warfare, Valor, Spear Vel', x: 640, y: 360 },
    ]
  },
  {
    culture: 'Japanese',
    name: 'The Heavenly & Earthly Kami of Shinto',
    cosmology: 'Takamagahara (Plain of High Heaven), Ashihara no Nakatsukuni (Earth), & Yomi (Underworld)',
    sacredRealm: 'Takamagahara (The High Celestial Plains)',
    supremeRuler: 'Amaterasu-Ōmikami, Imperial Sun Ancestor',
    nodes: [
      { id: 'izanagi', name: 'Izanagi', title: 'The Male Creator Who Invites', generation: 1, spouses: ['izanami'], element: 'Light', domain: 'Creation of the Japanese Archipelago', x: 320, y: 60 },
      { id: 'izanami', name: 'Izanami', title: 'The Female Creator Who Invites', generation: 1, spouses: ['izanagi'], element: 'Shadow', domain: 'Creation & Sovereign of Yomi', x: 520, y: 60 },

      { id: 'amaterasu', name: 'Amaterasu', title: 'Sun Goddess & Imperial Forebear', generation: 2, parents: ['izanagi'], element: 'Light', domain: 'Solar Radiance, Sovereignty', legendId: 'deity-amaterasu', x: 240, y: 200 },
      { id: 'tsukuyomi', name: 'Tsukuyomi', title: 'God of the Pale Moon & Night', generation: 2, parents: ['izanagi'], element: 'Shadow', domain: 'Lunar Cycles, Nocturnal Order', x: 420, y: 200 },
      { id: 'susanoo', name: 'Susanoo', title: 'God of Storms, Seas & Serpents', generation: 2, parents: ['izanagi'], element: 'Water', domain: 'Tempests, Bravery, Kusanagi', legendId: 'deity-susanoo', x: 600, y: 200 },

      { id: 'ninigi', name: 'Ninigi-no-Mikoto', title: 'Heavenly Grandson Descended to Earth', generation: 3, parents: ['amaterasu'], element: 'Earth', domain: 'Rice Agriculture, Divine Mandate', x: 330, y: 340 },
      { id: 'okuninushi', name: 'Ōkuninushi', title: 'Lord of the Earth & Medicine', generation: 3, parents: ['susanoo'], element: 'Earth', domain: 'Izumo Sovereignty, Healing, Marriage', x: 530, y: 340 },
    ]
  }
];

