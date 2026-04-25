export const METHODS = {
  PLA: {
    id: 'mass-outbreak-pla',
    name: 'Mass Outbreak + Research Lv10',
    game: 'Legends: Arceus',
    odds: '1/128',
    notes: 'Sparkle + sound cue when shiny appears. Shiny Charm stacks.',
  },
  SV: {
    id: 'mass-outbreak-sv',
    name: 'Mass Outbreak + Sandwich',
    game: 'Scarlet/Violet',
    odds: '1/512',
    notes: 'Clear 60+ Pokémon, save, make Sparkling Power Lv3 sandwich, save scum Herba Mystica. No audio/sparkle cue.',
  },
  LZA: {
    id: 'fast-travel-lza',
    name: 'Fast Travel Reset',
    game: 'Legends: Z-A',
    odds: '1/455',
    notes: 'Fast travel to same Wild Zone repeatedly. Shinies persist until 11th appears. Shiny Charm triples odds.',
  },
  RADAR: {
    id: 'poke-radar',
    name: 'PokeRadar Chain 40',
    game: 'BDSP',
    odds: '1/200',
    notes: 'Sinnoh natives only. Never flee, never wrong patch, never leave grass.',
  },
  COMBO: {
    id: 'catch-combo',
    name: 'Catch Combo 31+',
    game: "Let's Go Pikachu",
    odds: '1/315',
    notes: 'Kanto 151 only. Add Lure + Shiny Charm for best odds.',
  },
  MASUDA: {
    id: 'masuda',
    name: 'Masuda Method',
    game: 'SS / BDSP / SV',
    odds: '1/512',
    notes: 'Foreign language breeding. Shiny Charm stacks.',
  },
  DMAX: {
    id: 'dynamax',
    name: 'Dynamax Adventures',
    game: 'Sword/Shield',
    odds: '1/100',
    notes: 'Fixed rate. Best method for Gen 1-7 legendaries. No Shiny Charm boost.',
  },
  SR: {
    id: 'soft-reset',
    name: 'Soft Reset',
    game: 'BDSP / SS',
    odds: '1/1365',
    notes: 'With Shiny Charm. For static legendaries.',
  },
  SR_SS: {
    id: 'soft-reset-ss',
    name: 'Soft Reset',
    game: 'Sword/Shield (Crown Tundra)',
    odds: '1/1365',
    notes: 'With Shiny Charm.',
  },
  SR_BDSP: {
    id: 'soft-reset-bdsp',
    name: 'Soft Reset',
    game: 'BDSP',
    odds: '1/1365',
    notes: 'With Shiny Charm.',
  },
}

export const METHOD_LIST = Object.values(METHODS)
