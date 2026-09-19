import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { GENERATIONS } from '../utils/constants';
import { TYPE_MAP } from '../utils/typeColors';

export type SortOption = 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc';

interface ControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedGen: number | null;
  onSelectGen: (genId: number | null) => void;
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedGen,
  onSelectGen,
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
  onResetFilters,
}) => {
  const typeKeys = Object.keys(TYPE_MAP);
  const hasActiveFilters = searchQuery !== '' || selectedGen !== 1 || selectedType !== null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-slate-400" />
          Filtros y Búsqueda
        </h2>

        {hasActiveFilters && (
          <button
            type="button"
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            onClick={onResetFilters}
            title="Restablecer filtros"
          >
            <RotateCcw size={11} />
            Limpiar
          </button>
        )}
      </div>

      {/* Buscador */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-300">
          Buscar
        </label>
        <div className="relative flex items-center bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus-within:border-slate-500 transition-colors">
          <Search className="text-slate-400 mr-2 shrink-0" size={15} />
          <input
            type="text"
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 outline-none"
            placeholder="Nombre o número..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="p-0.5 text-slate-400 hover:text-white"
              onClick={() => onSearchChange('')}
              title="Borrar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Filtro por Región / Generación */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-300">
          Región / Generación
        </label>
        <select
          className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs outline-none cursor-pointer"
          value={selectedGen !== null ? selectedGen : ''}
          onChange={(e) => onSelectGen(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Todas las regiones</option>
          {GENERATIONS.map((gen) => (
            <option key={gen.id} value={gen.id}>
              {gen.name} ({gen.region})
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Tipo */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-300">
          Tipo Elemental
        </label>
        <select
          className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs outline-none cursor-pointer capitalize"
          value={selectedType || ''}
          onChange={(e) => onSelectType(e.target.value || null)}
        >
          <option value="">Todos los tipos</option>
          {typeKeys.map((type) => (
            <option key={type} value={type}>
              {TYPE_MAP[type]?.nameEs || type}
            </option>
          ))}
        </select>
      </div>

      {/* Ordenamiento */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-300">
          Ordenar por
        </label>
        <select
          className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="id-asc">Número: Menor a Mayor</option>
          <option value="id-desc">Número: Mayor a Menor</option>
          <option value="name-asc">Nombre: A - Z</option>
          <option value="name-desc">Nombre: Z - A</option>
        </select>
      </div>
    </div>
  );
};
