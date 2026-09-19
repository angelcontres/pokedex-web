import type {
  PokemonDetail,
  SpeciesDetail,
  PokemonListResult,
} from '../types/pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

const pokemonCache = new Map<number | string, PokemonDetail>();
const speciesCache = new Map<number | string, SpeciesDetail>();
let masterListCache: { id: number; name: string }[] | null = null;

export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Carga la lista inicial de nombres e IDs
export async function getMasterList(): Promise<{ id: number; name: string }[]> {
  if (masterListCache) return masterListCache;
  try {
    const res = await fetch(`${API_BASE}/pokemon?limit=1025&offset=0`);
    if (!res.ok) throw new Error('Error al cargar la lista');
    const data = await res.json();
    masterListCache = (data.results as PokemonListResult[]).map((item) => ({
      name: item.name,
      id: extractIdFromUrl(item.url),
    }));
    return masterListCache;
  } catch (err) {
    console.error('Error al obtener la lista:', err);
    return [];
  }
}

// Consulta de detalle de un Pokémon
export async function getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
  const key = typeof idOrName === 'string' ? idOrName.toLowerCase() : idOrName;
  if (pokemonCache.has(key)) {
    return pokemonCache.get(key)!;
  }

  const res = await fetch(`${API_BASE}/pokemon/${key}`);
  if (!res.ok) {
    throw new Error(`No se encontró el Pokémon: ${key}`);
  }
  const data: PokemonDetail = await res.json();

  pokemonCache.set(data.id, data);
  pokemonCache.set(data.name.toLowerCase(), data);
  return data;
}

// Carga varios detalles en paralelo
export async function getPokemonDetailsBatch(
  idsOrNames: (string | number)[],
  concurrency = 12
): Promise<PokemonDetail[]> {
  const results: PokemonDetail[] = new Array(idsOrNames.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < idsOrNames.length) {
      const idx = currentIndex++;
      const idOrName = idsOrNames[idx];
      try {
        results[idx] = await getPokemonDetail(idOrName);
      } catch {
        results[idx] = {
          id: typeof idOrName === 'number' ? idOrName : 0,
          name: String(idOrName),
          height: 0,
          weight: 0,
          base_experience: 0,
          types: [{ slot: 1, type: { name: 'normal', url: '' } }],
          stats: [],
          abilities: [],
          sprites: {
            front_default: getArtworkUrl(Number(idOrName) || 1),
            front_shiny: null,
            back_default: null,
            back_shiny: null,
          },
        };
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, idsOrNames.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// Obtiene la descripción de la especie
export async function getPokemonSpecies(idOrName: string | number): Promise<SpeciesDetail> {
  const key = typeof idOrName === 'string' ? idOrName.toLowerCase() : idOrName;
  if (speciesCache.has(key)) {
    return speciesCache.get(key)!;
  }

  const res = await fetch(`${API_BASE}/pokemon-species/${key}`);
  if (!res.ok) {
    throw new Error(`No se encontró la especie de: ${key}`);
  }
  const data: SpeciesDetail = await res.json();

  speciesCache.set(data.id, data);
  speciesCache.set(data.name.toLowerCase(), data);
  return data;
}
