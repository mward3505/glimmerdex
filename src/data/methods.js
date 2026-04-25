export const METHODS = {
  DMAX:    { id: 'dynamax',           name: 'Dynamax Adventures',        game: 'Sword/Shield',        odds: '1/100',  denominator: 100,  notes: 'Fixed rate. Best method for Gen 1-7 legendaries. No Shiny Charm boost.' },
  PLA:     { id: 'mass-outbreak-pla', name: 'Mass Outbreak + Research Lv10', game: 'Legends: Arceus',  odds: '1/128',  denominator: 128,  notes: 'Sparkle + sound cue when shiny appears. Shiny Charm stacks.' },
  RADAR:   { id: 'poke-radar',        name: 'PokeRadar Chain 40',         game: 'BDSP',                odds: '1/200',  denominator: 200,  notes: 'Sinnoh natives only. Never flee, never wrong patch, never leave grass.' },
  COMBO:   { id: 'catch-combo',       name: 'Catch Combo 31+',            game: "Let's Go Pikachu",    odds: '1/315',  denominator: 315,  notes: 'Kanto 151 only. Add Lure + Shiny Charm for best odds.' },
  LZA:     { id: 'fast-travel-lza',   name: 'Fast Travel Reset',          game: 'Legends: Z-A',        odds: '1/455',  denominator: 455,  notes: 'Fast travel to same Wild Zone repeatedly. Shinies persist until 11th appears. Shiny Charm triples odds.' },
  SV:      { id: 'mass-outbreak-sv',  name: 'Mass Outbreak + Sandwich',   game: 'Scarlet/Violet',      odds: '1/512',  denominator: 512,  notes: 'Clear 60+ Pokémon, save, make Sparkling Power Lv3 sandwich, save scum Herba Mystica. No audio/sparkle cue.' },
  MASUDA:  { id: 'masuda',            name: 'Masuda Method',              game: 'SS / BDSP / SV',      odds: '1/512',  denominator: 512,  notes: 'Breed with a foreign language Pokémon. Shiny Charm stacks.' },
  SR:      { id: 'soft-reset',        name: 'Soft Reset',                 game: 'BDSP / SS',           odds: '1/1365', denominator: 1365, notes: 'With Shiny Charm. For static legendaries.' },
  SR_SS:   { id: 'soft-reset-ss',     name: 'Soft Reset',                 game: 'Sword/Shield',        odds: '1/1365', denominator: 1365, notes: 'With Shiny Charm.' },
  SR_BDSP: { id: 'soft-reset-bdsp',   name: 'Soft Reset',                 game: 'BDSP',                odds: '1/1365', denominator: 1365, notes: 'With Shiny Charm.' },
}

// Which game filter key(s) each method belongs to
export const METHOD_GAME_MAP = {
  'dynamax':           ['ss'],
  'mass-outbreak-pla': ['pla'],
  'poke-radar':        ['bdsp'],
  'catch-combo':       ['lgp'],
  'fast-travel-lza':   ['lza'],
  'mass-outbreak-sv':  ['sv'],
  'masuda':            ['ss', 'bdsp', 'sv'],
  'soft-reset':        ['bdsp', 'ss'],
  'soft-reset-ss':     ['ss'],
  'soft-reset-bdsp':   ['bdsp'],
}

export const GAMES = {
  pla:  "Legends: Arceus",
  lgp:  "Let's Go Pikachu",
  lza:  "Legends: Z-A",
  bdsp: "BDSP",
  ss:   "Sword/Shield",
  sv:   "Scarlet/Violet",
}
