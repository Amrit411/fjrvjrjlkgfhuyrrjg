import { TimelineEvent } from '../types/mythology';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'timeline-egypt',
    culture: 'Egyptian',
    era: 'The Old Kingdom & Pyramid Age',
    timeRange: 'c. 2686 – 2181 BCE',
    title: 'The Inscription of Pyramid Texts & Solar Heliopolis',
    historicalContext: 'During Dynasties V and VI, the earliest surviving religious corpus in human history was chiseled onto the limestone walls of Saqqara royal pyramids, codifying the pharaoh’s ascension into the celestial circuit of Ra.',
    traditions: [
      'Inscribing protective mortuary spells inside burial vaults',
      'The morning elevation of the Benben stone at Heliopolis',
      'Cyclical mummification preserving the Ka and Ba soul components'
    ],
    keyFigures: ['Ra-Horakhty', 'Osiris', 'Anubis', 'Imhotep'],
    culturalSignificance: 'Established the theological bedrock of divine kingship, solar rebirth, and the cosmic order of Ma’at that sustained Egyptian civilization for over three millennia.',
    relatedEntryIds: ['deity-ra', 'deity-osiris', 'deity-anubis', 'creature-phoenix']
  },
  {
    id: 'timeline-india',
    culture: 'Indian',
    era: 'Vedic Antiquity & Upanishadic Philosophy',
    timeRange: 'c. 1700 – 600 BCE',
    title: 'The Chanting of the Rigvedic Hymns & Cosmic Sacrifice',
    historicalContext: 'Composed by sage-poets (Rishis) along the banks of the sacred Saraswati and Indus rivers, the four Vedas articulated cosmic rhythms (Rta), fire sacrifices to Agni, and the cosmic battles of thunder-wielding Indra.',
    traditions: [
      'Strict oral memorization preserving metric Sanskrit phonetics',
      'Soma libations and Yajna fire altars aligned with celestial solstices',
      'Inquiry into the unified ultimate reality of Brahman and Atman'
    ],
    keyFigures: ['Indra', 'Agni', 'Varuna', 'Garuda'],
    culturalSignificance: 'Laid the foundational ontology for Indian spiritual traditions, transitioning from external rituals to internal meditative contemplation.',
    relatedEntryIds: ['deity-indra', 'creature-garuda', 'deity-vishnu', 'deity-shiva']
  },
  {
    id: 'timeline-greece',
    culture: 'Greek',
    era: 'Archaic to Classical Greece',
    timeRange: 'c. 800 – 323 BCE',
    title: 'Hesiod’s Theogony, Homeric Epics & Civic Sanctuaries',
    historicalContext: 'As Greek city-states (poleis) formed, epic bards institutionalized the genealogies of the Olympian gods. Sanctuaries like Delphi, Olympia, and Eleusis became pan-Hellenic centers of pilgrimage and athletic games.',
    traditions: [
      'Pan-Hellenic competitions honoring Zeus at Olympia and Apollo at Delphi',
      'Dramatic tragic festivals (Dionysia) interrogating hubris and destiny',
      'Animal sacrifice and libations at precinct altars outside open-air temples'
    ],
    keyFigures: ['Zeus', 'Athena', 'Poseidon', 'Apollo', 'Heracles'],
    culturalSignificance: 'Explored human vulnerability within a cosmos governed by capricious divine forces, establishing enduring archetypes for Western literature, philosophy, and art.',
    relatedEntryIds: ['deity-zeus', 'deity-athena', 'deity-poseidon', 'creature-phoenix', 'creature-griffin']
  },
  {
    id: 'timeline-mesoamerica',
    culture: 'Mesoamerican',
    era: 'Classic to Post-Classic Mesoamerica',
    timeRange: 'c. 250 – 1521 CE',
    title: 'Astronomical Calendars, Popol Vuh & Teotihuacan',
    historicalContext: 'Across the Maya lowlands and central Mexican plateau, monumental pyramids were constructed as architectural cosmic mirrors tracking the cycles of Venus and the Pleiades.',
    traditions: [
      'The 260-day sacred count (Tonalpohualli / Tzolk’in) for divination',
      'Ritual ballgame (Ōllamaliztli) reenacting celestial warfare between life and death',
      'Offerings of copal resin, rubber, jade, and blood to sustain solar movement'
    ],
    keyFigures: ['Quetzalcoatl', 'Kukulkan', 'Tezcatlipoca', 'Hero Twins Hunahpu and Xbalanque'],
    culturalSignificance: 'Integrated advanced mathematical astronomy with cyclic creation mythologies, viewing humanity as conscious caretakers obligated to sustain cosmic continuity.',
    relatedEntryIds: ['deity-quetzalcoatl', 'creature-wendigo']
  },
  {
    id: 'timeline-celtic',
    culture: 'Celtic',
    era: 'Iron Age & Insular Monastic Codices',
    timeRange: 'c. 500 BCE – 1200 CE',
    title: 'Druidic Oral Law & The Scribing of the Irish Myth Cycles',
    historicalContext: 'Originally forbidden from committing sacred lore to writing by druids, Gaelic myth was later faithfully recorded by 8th-to-12th-century Christian monks in manuscripts like the Book of Leinster and Lebor Gabála Érenn.',
    traditions: [
      'Quarterly pastoral fire festivals: Samhain, Imbolc, Beltane, and Lughnasadh',
      'The sacred authority of bards and filí whose satire was said to raise physical blisters',
      'Reverence for sacred boundary groves (Nemetons) and healing springs'
    ],
    keyFigures: ['The Morrígan', 'Lugh Lámhfhada', 'The Dagda', 'Cú Chulainn'],
    culturalSignificance: 'Preserved Europe’s most intricate non-Greco-Roman mythological corpus, centering the fluid boundary between mortal lands and the fairy Otherworld (Tír na nÓg).',
    relatedEntryIds: ['deity-morrigan', 'deity-lugh', 'creature-banshee']
  },
  {
    id: 'timeline-norse',
    culture: 'Norse',
    era: 'The Viking Age & Skaldic Sagas',
    timeRange: 'c. 793 – 1241 CE',
    title: 'The Skaldic Recitations & The Icelandic Eddas',
    historicalContext: 'Scandinavian seafarers carried the oral tales of the Aesir across Iceland, Britain, and Greenland. Following Christianization, Icelandic scholar Snorri Sturluson transcribed the myths into the Prose Edda to preserve skaldic poetic meter.',
    traditions: [
      'Skaldic recitation composed in complex alliterative drottkvætt verse',
      'Blót seasonal sacrifices offering mead and livestock for fertile harvests',
      'Runestone carvings commemorating fallen warriors dispatched to Odin’s halls'
    ],
    keyFigures: ['Odin', 'Thor', 'Loki', 'Freya', 'Fenrir'],
    culturalSignificance: 'Reflected a heroic stoicism in the face of inevitable cosmic entropy, demonstrating that valor lies in choosing honor even when defeat at Ragnarök is foreknown.',
    relatedEntryIds: ['deity-odin', 'deity-thor', 'deity-loki', 'creature-dragon', 'creature-kraken']
  },
  {
    id: 'timeline-japan',
    culture: 'Japanese',
    era: 'Nara, Heian & Edo Folklore Traditions',
    timeRange: 'c. 710 – 1868 CE',
    title: 'The Kojiki Imperial Record & The Golden Age of Yokai',
    historicalContext: 'Commissioned by Empress Genmei in 712 CE to legitimize imperial lineage, the Kojiki organized ancestral kami traditions. By the 18th century Edo period, artists like Toriyama Sekien cataloged hundreds of popular street yokai in woodblock prints.',
    traditions: [
      'Misogi cold-water ablution purifying spiritual defilement (Kegare)',
      'Hyakumonogatari Kaidankai: gathering to tell 100 ghost stories by candle flame',
      'Shrine festivals (Matsuri) carrying mikoshi shrines through neighborhoods'
    ],
    keyFigures: ['Amaterasu', 'Susanoo', 'Izanagi', 'Kitsune', 'Kappa'],
    culturalSignificance: 'Celebrated animistic intimacy with the natural environment, where every rock, ancient tree, kitchen tool, and river holds conscious spiritual presence (Kami/Tsukumogami).',
    relatedEntryIds: ['deity-amaterasu', 'deity-susanoo', 'creature-kitsune', 'creature-kappa']
  },
  {
    id: 'timeline-modern',
    culture: 'Greek',
    era: 'Comparative Mythology & Modern Reinterpretations',
    timeRange: '1850 CE – Present',
    title: 'The Monomyth, Archetypes & Global Media Guides',
    historicalContext: 'In the 19th and 20th centuries, scholars such as James Frazer (The Golden Bough), Carl Jung (Archetypes of the Collective Unconscious), and Joseph Campbell (The Hero with a Thousand Faces) explored shared human motifs.',
    traditions: [
      'Cross-cultural comparative analysis of flood myths and solar heroes',
      'Literary worldbuilding in epic fantasy (Tolkien, Ursula K. Le Guin)',
      'Digital archives and public humanities digital humanities encyclopedias'
    ],
    keyFigures: ['Joseph Campbell', 'Carl Jung', 'Mircea Eliade', 'Georges Dumézil'],
    culturalSignificance: 'Recognized mythology not as primitive superstition, but as psychological, artistic, and philosophical mirrors through which human cultures make meaning of the cosmos.',
    relatedEntryIds: ['creature-phoenix', 'creature-dragon', 'deity-zeus', 'deity-odin']
  }
];

