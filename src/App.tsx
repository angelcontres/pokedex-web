import { useState, useEffect, useMemo, useCallback } from 'react';
import type { PokemonDetail } from './types/pokemon';
import type { SortOption } from './components/Controls';
import { PokedexHeader } from './components/PokedexHeader';
import { Controls } from './components/Controls';
import { PokemonCard } from './components/PokemonCard';
import { PokemonModal } from './components/PokemonModal';
import { GENERATIONS } from './utils/constants';
import {
  getMasterList,
  getPokemonDetailsBatch,
  getPokemonDetail,
} from './services/pokeapi';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const PAGE_SIZE = 36;

export default function App() {
  const [pokemonMap, setPokemonMap] = useState<Map<number, PokemonDetail>>(new Map());
  const [displayedIds, setDisplayedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return new URLSearchParams(window.location.search).get('search') || '';
  });
  const [selectedGen, setSelectedGen] = useState<number | null>(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('id-asc');

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);

  // Abrir modal si viene especificado en la URL (?id=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      getPokemonDetail(Number(idParam) || 6).then((p) => {
        setSelectedPokemon(p);
      });
    }
  }, []);

  // Carga inicial y cambio de generación
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const master = await getMasterList();
        if (cancelled) return;

        let targetIds: number[] = [];
        if (selectedGen !== null) {
          const gen = GENERATIONS.find((g) => g.id === selectedGen);
          if (gen) {
            const slice = master.slice(gen.offset, gen.offset + gen.limit);
            targetIds = slice.map((item) => item.id);
          }
        } else {
          targetIds = master.slice(0, PAGE_SIZE).map((item) => item.id);
        }

        setDisplayedIds(targetIds);

        const missingIds = targetIds.filter((id) => !pokemonMap.has(id));
        if (missingIds.length > 0) {
          const fetched = await getPokemonDetailsBatch(missingIds, 15);
          if (!cancelled) {
            setPokemonMap((prev) => {
              const next = new Map(prev);
              fetched.forEach((p) => next.set(p.id, p));
              return next;
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError('No se pudieron cargar los datos de la PokéAPI. Verifica tu conexión.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [selectedGen, pokemonMap]);

  const handleSelectGen = (gen: number | null) => {
    setIsLoading(true);
    setSelectedGen(gen);
  };

  // Búsqueda en el listado
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (selectedGen !== null) {
        const gen = GENERATIONS.find((g) => g.id === selectedGen);
        if (gen) {
          getMasterList().then((master) => {
            const slice = master.slice(gen.offset, gen.offset + gen.limit);
            setDisplayedIds(slice.map((item) => item.id));
          });
        }
      } else {
        getMasterList().then((master) => {
          setDisplayedIds(master.slice(0, PAGE_SIZE).map((item) => item.id));
        });
      }
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    let isCancelled = false;

    getMasterList().then(async (master) => {
      if (isCancelled) return;
      const isNumeric = /^\d+$/.test(query);
      const matched = master.filter((item) => {
        if (isNumeric) {
          return item.id.toString() === query || item.id.toString().startsWith(query);
        }
        return item.name.toLowerCase().includes(query);
      });

      const matchedIds = matched.slice(0, 48).map((m) => m.id);
      setDisplayedIds(matchedIds);

      const missing = matchedIds.filter((id) => !pokemonMap.has(id));
      if (missing.length > 0) {
        const fetched = await getPokemonDetailsBatch(missing, 12);
        if (!isCancelled) {
          setPokemonMap((prev) => {
            const next = new Map(prev);
            fetched.forEach((p) => next.set(p.id, p));
            return next;
          });
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [searchQuery, selectedGen, pokemonMap]);

  const handleLoadMore = async () => {
    if (isLoadingMore || selectedGen !== null) return;
    setIsLoadingMore(true);

    try {
      const master = await getMasterList();
      const currentLength = displayedIds.length;
      const nextBatch = master.slice(currentLength, currentLength + PAGE_SIZE);
      const nextIds = nextBatch.map((item) => item.id);

      const missing = nextIds.filter((id) => !pokemonMap.has(id));
      if (missing.length > 0) {
        const fetched = await getPokemonDetailsBatch(missing, 15);
        setPokemonMap((prev) => {
          const next = new Map(prev);
          fetched.forEach((p) => next.set(p.id, p));
          return next;
        });
      }

      setDisplayedIds((prev) => [...prev, ...nextIds]);
    } catch (err) {
      console.error('Error al cargar más elementos:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedType(null);
    setSelectedGen(1);
  }, []);

  // Filtrado y ordenamiento
  const filteredAndSortedPokemon = useMemo(() => {
    const list: PokemonDetail[] = [];

    for (const id of displayedIds) {
      const p = pokemonMap.get(id);
      if (!p) continue;

      if (selectedType && !p.types.some((t) => t.type.name.toLowerCase() === selectedType.toLowerCase())) {
        continue;
      }

      list.push(p);
    }

    return list.sort((a, b) => {
      switch (sortBy) {
        case 'id-asc':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return a.id - b.id;
      }
    });
  }, [displayedIds, pokemonMap, selectedType, sortBy]);

  const handleRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    try {
      let p = pokemonMap.get(randomId);
      if (!p) {
        p = await getPokemonDetail(randomId);
        setPokemonMap((prev) => new Map(prev).set(p!.id, p!));
      }
      setSelectedPokemon(p);
    } catch (err) {
      console.error('Error al obtener Pokémon aleatorio:', err);
    }
  };

  const currentIndexInFiltered = useMemo(() => {
    if (!selectedPokemon) return -1;
    return filteredAndSortedPokemon.findIndex((p) => p.id === selectedPokemon.id);
  }, [selectedPokemon, filteredAndSortedPokemon]);

  const handleNavigateNext = useCallback(() => {
    if (currentIndexInFiltered === -1 || filteredAndSortedPokemon.length === 0) return;
    const nextIndex = (currentIndexInFiltered + 1) % filteredAndSortedPokemon.length;
    setSelectedPokemon(filteredAndSortedPokemon[nextIndex]);
  }, [currentIndexInFiltered, filteredAndSortedPokemon]);

  const handleNavigatePrev = useCallback(() => {
    if (currentIndexInFiltered === -1 || filteredAndSortedPokemon.length === 0) return;
    const prevIndex =
      (currentIndexInFiltered - 1 + filteredAndSortedPokemon.length) %
      filteredAndSortedPokemon.length;
    setSelectedPokemon(filteredAndSortedPokemon[prevIndex]);
  }, [currentIndexInFiltered, filteredAndSortedPokemon]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <PokedexHeader
        onRandomPokemon={handleRandomPokemon}
        totalLoaded={pokemonMap.size}
      />

      <div className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        {/* Contenido Principal (Catálogo de tarjetas) */}
        <main className="flex-1 w-full order-2 lg:order-1 flex flex-col gap-4">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white font-medium text-xs transition-colors"
                onClick={() => handleSelectGen(selectedGen)}
              >
                <RefreshCw size={12} /> Reintentar
              </button>
            </div>
          )}

          <div className="flex items-center justify-between px-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span>Mostrando:</span>
              <strong className="text-white font-semibold">{filteredAndSortedPokemon.length}</strong>
              <span>Pokémon</span>
              {selectedType && (
                <span className="text-slate-300">({selectedType.toUpperCase()})</span>
              )}
            </div>
          </div>

          {isLoading && filteredAndSortedPokemon.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <Loader2 size={32} className="animate-spin text-slate-500" />
              <p className="text-xs">Cargando datos de la PokéAPI...</p>
            </div>
          ) : filteredAndSortedPokemon.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-center text-slate-400">
              <p className="text-sm font-semibold text-white">No se encontraron Pokémon</p>
              <p className="text-xs">Prueba cambiando los filtros de búsqueda o tipo.</p>
              <button
                type="button"
                className="mt-2 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors"
                onClick={handleResetFilters}
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredAndSortedPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={(p) => setSelectedPokemon(p)}
                />
              ))}
            </div>
          )}

          {selectedGen === null && !searchQuery && (
            <div className="flex justify-center my-6">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-sm px-6 py-2 rounded-lg transition-colors"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Cargando más...</span>
                  </>
                ) : (
                  <span>Cargar más Pokémon</span>
                )}
              </button>
            </div>
          )}
        </main>

        {/* Panel Lateral Semántico Derecho (Filtros y Búsqueda) */}
        <aside className="w-full lg:w-72 shrink-0 order-1 lg:order-2 lg:sticky lg:top-20">
          <Controls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGen={selectedGen}
            onSelectGen={handleSelectGen}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
          />
        </aside>
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onNavigateNext={handleNavigateNext}
          onNavigatePrev={handleNavigatePrev}
        />
      )}
    </div>
  );
}
