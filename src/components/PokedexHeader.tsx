import React from 'react';
import { Dices } from 'lucide-react';

interface PokedexHeaderProps {
  onRandomPokemon: () => void;
  totalLoaded: number;
}

export const PokedexHeader: React.FC<PokedexHeaderProps> = ({
  onRandomPokemon,
  totalLoaded,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-900" />
          </div>

          <div>
            <h1 className="text-base font-bold text-white tracking-wide">
              Pokédex Web
            </h1>
            <p className="text-[11px] text-slate-400">
              {totalLoaded > 0 ? `${totalLoaded} Pokémon cargados` : 'Conectando con PokéAPI...'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onClick={onRandomPokemon}
          title="Seleccionar un Pokémon aleatorio"
        >
          <Dices size={14} />
          <span>Aleatorio</span>
        </button>
      </div>
    </header>
  );
};
