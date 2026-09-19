export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonTypeEntry {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStatEntry {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilityEntry {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonTypeEntry[];
  stats: PokemonStatEntry[];
  abilities: PokemonAbilityEntry[];
  sprites: PokemonSprites;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface GenusEntry {
  genus: string;
  language: {
    name: string;
  };
}

export interface SpeciesDetail {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  genera: GenusEntry[];
}

export interface GenerationFilter {
  id: number;
  name: string;
  region: string;
  offset: number;
  limit: number;
}
