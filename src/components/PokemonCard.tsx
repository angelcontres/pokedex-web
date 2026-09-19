import React from 'react';
import type { PokemonDetail } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';
import { getArtworkUrl } from '../services/pokeapi';

interface PokemonCardProps {
  pokemon: PokemonDetail;
  onClick: (pokemon: PokemonDetail) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
}) => {
  const formattedId = `#${String(pokemon.id).padStart(4, '0')}`;

  return (
    <div
      onClick={() => onClick(pokemon)}
      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold text-slate-500">
          {formattedId}
        </span>
      </div>

      <div className="h-32 flex items-center justify-center my-2 p-2">
        <img
          src={getArtworkUrl(pokemon.id)}
          alt={pokemon.name}
          className="max-w-[110px] max-h-[110px] object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold capitalize text-white truncate">
          {pokemon.name.replace(/-/g, ' ')}
        </h3>

        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};
