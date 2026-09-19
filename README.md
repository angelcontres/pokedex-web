# Pokédex Web - Aplicación con React y TypeScript

Proyecto desarrollado con **React**, **TypeScript**, **Tailwind CSS** y **Vite**, consumiendo datos directamente de la **PokéAPI oficial**.

---

## Descripción del Proyecto

Esta aplicación web permite consultar y explorar el catálogo de Pokémon de forma rápida, limpia y organizada. Implementa un diseño semántico de dos columnas con un panel lateral derecho para la búsqueda y filtrado en tiempo real, junto con una vista detallada para cada Pokémon.

---

## Funcionalidades Principales

1. **Catálogo de Pokémon**:
   - Visualización de tarjetas en cuadrícula responsiva con la ilustración oficial, número de Pokédex, nombre y tipos elementales.
   - Paginación y carga progresiva por lotes para optimizar el consumo de la API.

2. **Panel de Búsqueda y Filtros (Sidebar)**:
   - Barra de búsqueda dinámica por nombre o número de Pokédex.
   - Filtro desplegable por región o generación (Kanto, Johto, Hoenn, etc.).
   - Filtro desplegable por tipo elemental (Fuego, Agua, Planta, Eléctrico, etc.).
   - Ordenamiento por número de Pokédex (ascendente y descendente) y por nombre alfabético (A-Z y Z-A).
   - Botón para restablecer todos los filtros aplicados.

3. **Vista de Detalles (Modal)**:
   - Ilustración en alta definición del Pokémon seleccionado.
   - Descripción oficial de la especie en español.
   - Medidas físicas (altura en metros y peso en kilogramos).
   - Barras visuales con las estadísticas base (Puntos de Salud, Ataque, Defensa, Ataque Especial, Defensa Especial y Velocidad).
   - Lista de habilidades principales y ocultas.
   - Navegación rápida mediante botones o flechas del teclado (`←` y `→`) y tecla `Esc` para cerrar.

4. **Selección Aleatoria**:
   - Botón en la barra de navegación para abrir directamente la ficha de un Pokémon al azar.

---

## Tecnologías Utilizadas

- **React 19**: Construcción de la interfaz de usuario mediante componentes funcionales y Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
- **TypeScript**: Tipado estático para garantizar la consistencia en el manejo de las respuestas de la API.
- **Vite**: Empaquetador y servidor de desarrollo ágil.
- **Tailwind CSS v4**: Estilizado moderno y responsivo mediante clases de utilidad.
- **Lucide React**: Iconos vectoriales ligeros.
- **PokéAPI REST v2**: Fuente de datos pública para la información de los Pokémon y sus especies.

---

## Estructura del Proyecto

```text
src/
├── components/
│   ├── Controls.tsx         # Panel lateral de búsqueda, filtros y ordenamiento
│   ├── PokedexHeader.tsx    # Barra superior de navegación y título
│   ├── PokemonCard.tsx      # Tarjeta para mostrar cada Pokémon en el catálogo
│   ├── PokemonModal.tsx     # Ventana modal con estadísticas y detalles
│   └── TypeBadge.tsx        # Etiqueta visual para representar los tipos elementales
├── services/
│   └── pokeapi.ts           # Funciones de consulta fetch a los endpoints de PokéAPI
├── types/
│   └── pokemon.ts           # Definición de interfaces TypeScript para los datos
├── utils/
│   ├── constants.ts         # Lista de generaciones y configuración de estadísticas
│   └── typeColors.ts        # Mapeo de nombres en español y colores de tipos
├── App.tsx                  # Componente principal con maquetación semántica (main y aside)
├── index.css                # Estilos base y directivas de Tailwind
└── main.tsx                 # Entrada principal de la aplicación React
```

---

## Instalación y Ejecución

1. Clonar el repositorio o descargar el código fuente.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Construir para producción:
   ```bash
   npm run build
   ```
