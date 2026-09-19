import type { GenerationFilter } from '../types/pokemon';

export const GENERATIONS: GenerationFilter[] = [
  { id: 1, name: 'Gen I', region: 'Kanto', offset: 0, limit: 151 },
  { id: 2, name: 'Gen II', region: 'Johto', offset: 151, limit: 100 },
  { id: 3, name: 'Gen III', region: 'Hoenn', offset: 251, limit: 135 },
  { id: 4, name: 'Gen IV', region: 'Sinnoh', offset: 386, limit: 107 },
  { id: 5, name: 'Gen V', region: 'Teselia', offset: 493, limit: 156 },
  { id: 6, name: 'Gen VI', region: 'Kalos', offset: 649, limit: 72 },
  { id: 7, name: 'Gen VII', region: 'Alola', offset: 721, limit: 88 },
  { id: 8, name: 'Gen VIII', region: 'Galar', offset: 809, limit: 96 },
  { id: 9, name: 'Gen IX', region: 'Paldea', offset: 905, limit: 120 },
];

export const STAT_CONFIG: Record<string, { labelEs: string; short: string; color: string }> = {
  hp: { labelEs: 'Puntos de Salud', short: 'PS', color: '#FF5959' },
  attack: { labelEs: 'Ataque', short: 'ATQ', color: '#F5AC78' },
  defense: { labelEs: 'Defensa', short: 'DEF', color: '#FAE078' },
  'special-attack': { labelEs: 'Ataque Especial', short: 'AT. ESP', color: '#9DB7F5' },
  'special-defense': { labelEs: 'Defensa Especial', short: 'DEF. ESP', color: '#A7DB8D' },
  speed: { labelEs: 'Velocidad', short: 'VEL', color: '#FA92B2' },
};

export const MAX_STAT_VALUE = 255;
