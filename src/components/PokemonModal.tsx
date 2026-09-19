import React, { useEffect, useState } from 'react';
import type { PokemonDetail, SpeciesDetail } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';
import { STAT_CONFIG, MAX_STAT_VALUE } from '../utils/constants';
import { getArtworkUrl, getPokemonSpecies } from '../services/pokeapi';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  onClose: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  onClose,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const [species, setSpecies] = useState<SpeciesDetail | null>(null);

  useEffect(() => {
    if (!pokemon) return;
    let isCancelled = false;

    getPokemonSpecies(pokemon.id)
      .then((spec) => {
        if (!isCancelled) setSpecies(spec);
      })
      .catch((err) => {
        console.error('Error al cargar datos de especie:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [pokemon]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigatePrev) {
        onNavigatePrev();
      } else if (e.key === 'ArrowRight' && onNavigateNext) {
        onNavigateNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateNext, onNavigatePrev]);

  if (!pokemon) return null;

  const esFlavor = species?.flavor_text_entries.find(
    (f) => f.language.name === 'es'
  )?.flavor_text;
  const enFlavor = species?.flavor_text_entries.find(
    (f) => f.language.name === 'en'
  )?.flavor_text;
  const flavorText = (esFlavor || enFlavor || 'Sin descripción disponible.')
    .replace(/(\r\n|\n|\r|\f)/gm, ' ');

  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-slate-400">
              #{String(pokemon.id).padStart(4, '0')}
            </span>
            <h2 className="text-lg font-bold capitalize text-white">
              {pokemon.name.replace(/-/g, ' ')}
            </h2>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={onClose}
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] p-5 gap-5">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative w-full h-48 rounded-xl bg-slate-950 flex items-center justify-center p-4">
              {onNavigatePrev && (
                <button
                  type="button"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  onClick={onNavigatePrev}
                  title="Anterior"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              {onNavigateNext && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  onClick={onNavigateNext}
                  title="Siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              )}

              <img
                src={getArtworkUrl(pokemon.id)}
                alt={pokemon.name}
                className="max-w-[150px] max-h-[150px] object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 w-full text-center text-xs">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2">
                <span className="text-slate-400 block text-[11px]">Altura</span>
                <span className="font-semibold text-white">{heightM} m</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2">
                <span className="text-slate-400 block text-[11px]">Peso</span>
                <span className="font-semibold text-white">{weightKg} kg</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1.5">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} size="md" />
              ))}
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Descripción
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{flavorText}"
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-white">
                Estadísticas Base
              </span>
              <div className="flex flex-col gap-1.5">
                {pokemon.stats.map((st) => {
                  const config = STAT_CONFIG[st.stat.name] || {
                    labelEs: st.stat.name,
                    short: st.stat.name.substring(0, 3).toUpperCase(),
                    color: '#888',
                  };
                  const percentage = Math.min(
                    100,
                    Math.round((st.base_stat / MAX_STAT_VALUE) * 100)
                  );

                  return (
                    <div key={st.stat.name} className="grid grid-cols-[90px_35px_1fr] items-center gap-2 text-xs">
                      <span className="text-slate-400 truncate">{config.labelEs}</span>
                      <span className="font-mono text-right font-medium text-white">{st.base_stat}</span>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: config.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-white">Habilidades</span>
              <div className="flex flex-wrap gap-1.5">
                {pokemon.abilities.map((ab) => (
                  <span
                    key={ab.ability.name}
                    className="text-xs bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-300 capitalize"
                  >
                    {ab.ability.name.replace(/-/g, ' ')}
                    {ab.is_hidden && <span className="text-slate-500 text-[10px] ml-1">(Oculta)</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
