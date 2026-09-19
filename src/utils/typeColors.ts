export interface TypeInfo {
  name: string;
  nameEs: string;
  color: string;
}

export const TYPE_MAP: Record<string, TypeInfo> = {
  normal: { name: 'Normal', nameEs: 'Normal', color: '#9fa19f' },
  fire: { name: 'Fire', nameEs: 'Fuego', color: '#e62829' },
  water: { name: 'Water', nameEs: 'Agua', color: '#2980ef' },
  electric: { name: 'Electric', nameEs: 'Eléctrico', color: '#fac000' },
  grass: { name: 'Grass', nameEs: 'Planta', color: '#3fa129' },
  ice: { name: 'Ice', nameEs: 'Hielo', color: '#3dcef3' },
  fighting: { name: 'Fighting', nameEs: 'Lucha', color: '#ff8000' },
  poison: { name: 'Poison', nameEs: 'Veneno', color: '#9141cb' },
  ground: { name: 'Ground', nameEs: 'Tierra', color: '#915121' },
  flying: { name: 'Flying', nameEs: 'Volador', color: '#81b9ef' },
  psychic: { name: 'Psychic', nameEs: 'Psíquico', color: '#ef4179' },
  bug: { name: 'Bug', nameEs: 'Bicho', color: '#91a119' },
  rock: { name: 'Rock', nameEs: 'Roca', color: '#afa981' },
  ghost: { name: 'Ghost', nameEs: 'Fantasma', color: '#704170' },
  dragon: { name: 'Dragon', nameEs: 'Dragón', color: '#5060e1' },
  dark: { name: 'Dark', nameEs: 'Siniestro', color: '#50413f' },
  steel: { name: 'Steel', nameEs: 'Acero', color: '#60a1b8' },
  fairy: { name: 'Fairy', nameEs: 'Hada', color: '#ef70ef' },
};

export function getTypeColor(typeName: string): string {
  return TYPE_MAP[typeName.toLowerCase()]?.color || '#64748b';
}

export function getTypeSpanish(typeName: string): string {
  return TYPE_MAP[typeName.toLowerCase()]?.nameEs || typeName;
}
