$ErrorActionPreference = "Stop"

$mainB64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("screenshot_main.png"))
$modalB64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("screenshot_modal.png"))
$searchB64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("screenshot_search.png"))

$html = @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe de Práctica: Consumo de APIs REST - Pokédex Web</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 15mm 18mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      background: #ffffff;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #dc2626;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 14pt;
      margin: 0 0 4px 0;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .header h2 {
      font-size: 11pt;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #475569;
    }
    .header h3 {
      font-size: 10pt;
      font-weight: 500;
      margin: 0;
      color: #64748b;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 10pt;
    }
    .meta-box p {
      margin: 0;
    }
    .meta-box strong {
      color: #0f172a;
    }
    .repo-link {
      grid-column: span 2;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 8px 12px;
      border-radius: 6px;
      margin-top: 4px;
    }
    .repo-link a {
      color: #1d4ed8;
      font-weight: bold;
      text-decoration: none;
      word-break: break-all;
    }
    h2.section-title {
      font-size: 12pt;
      color: #0f172a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    p {
      margin: 0 0 10px 0;
      text-align: justify;
    }
    ul, ol {
      margin: 0 0 12px 0;
      padding-left: 22px;
    }
    li {
      margin-bottom: 4px;
    }
    .figure {
      margin: 16px 0 20px 0;
      text-align: center;
      page-break-inside: avoid;
    }
    .figure img {
      width: 100%;
      max-height: 380px;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }
    .figure-caption {
      font-size: 9pt;
      color: #475569;
      margin-top: 6px;
      font-style: italic;
    }
    .table-tech {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 9.5pt;
    }
    .table-tech th, .table-tech td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    .table-tech th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 600;
    }
    .code-block {
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 14px;
      border-radius: 6px;
      font-family: 'Consolas', monospace;
      font-size: 8.5pt;
      line-height: 1.4;
      overflow-x: auto;
      margin: 10px 0;
      page-break-inside: avoid;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <div class="header">
    <h1>Universidad Estatal Península de Santa Elena</h1>
    <h2>Facultad de Sistemas y Telecomunicaciones</h2>
    <h3>Carrera de Tecnologías de la Información</h3>
  </div>

  <div class="meta-box">
    <p><strong>Asignatura:</strong> Desarrollo de Aplicaciones Web</p>
    <p><strong>Fecha:</strong> Septiembre 2026</p>
    <p><strong>Estudiante:</strong> Ángel Alejandro Villón Panimboza</p>
    <p><strong>Tema:</strong> Consumo de APIs REST (PokéAPI Web App)</p>
    <div class="repo-link">
      <strong>Enlace al Repositorio de GitHub:</strong><br>
      <a href="https://github.com/angelcontres/pokedex-web">https://github.com/angelcontres/pokedex-web</a>
    </div>
  </div>

  <h2 class="section-title">1. Introducción y Objetivos</h2>
  <p>
    El presente informe documenta el desarrollo de una aplicación web interactiva desarrollada con <strong>React</strong>, <strong>TypeScript</strong> y <strong>Tailwind CSS</strong>, cuyo objetivo principal es consumir y presentar datos en tiempo real provenientes de la API REST pública <strong>PokéAPI</strong> (v2).
  </p>
  <p><strong>Objetivos de la práctica:</strong></p>
  <ul>
    <li>Implementar peticiones asíncronas HTTP (GET) a los endpoints de la PokéAPI mediante la función nativa <code>fetch</code> de JavaScript.</li>
    <li>Optimizar el rendimiento de la aplicación mediante almacenamiento en caché en memoria (<code>Map</code>) y carga por lotes para evitar bloqueos por límite de peticiones.</li>
    <li>Estructurar una interfaz web responsiva y semántica utilizando etiquetas HTML5 (<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>).</li>
    <li>Ofrecer funcionalidades de búsqueda dinámica por nombre o ID, filtrado por región/generación y tipo elemental, ordenamiento y visualización de detalles completos.</li>
  </ul>

  <h2 class="section-title">2. Tecnologías Empleadas</h2>
  <table class="table-tech">
    <thead>
      <tr>
        <th>Tecnología / Herramienta</th>
        <th>Propósito en el Proyecto</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>React 19</strong></td>
        <td>Biblioteca base para la construcción de interfaces mediante componentes funcionales y Hooks (<code>useState</code>, <code>useEffect</code>, <code>useMemo</code>, <code>useCallback</code>).</td>
      </tr>
      <tr>
        <td><strong>TypeScript</strong></td>
        <td>Tipado estático riguroso para modelar las respuestas JSON de la PokéAPI (interfaces de Pokémon, tipos y especies).</td>
      </tr>
      <tr>
        <td><strong>Tailwind CSS v4</strong></td>
        <td>Framework de diseño de utilidades para crear una interfaz sobria, moderna y adaptable a cualquier resolución.</td>
      </tr>
      <tr>
        <td><strong>Vite</strong></td>
        <td>Entorno de desarrollo ágil y empaquetador optimizado para la compilación del proyecto.</td>
      </tr>
      <tr>
        <td><strong>PokéAPI REST v2</strong></td>
        <td>Servicio web público proveedor de la base de datos nacional Pokémon (información general, estadísticas y descripciones).</td>
      </tr>
    </tbody>
  </table>

  <h2 class="section-title">3. Arquitectura del Consumo de la API</h2>
  <p>
    Para garantizar una navegación fluida, la aplicación se diseñó en dos etapas de consulta:
  </p>
  <ol>
    <li>
      <strong>Carga de Lista Maestra:</strong> Al iniciar, se realiza una petición única al endpoint <code>/pokemon?limit=1025</code> para extraer los nombres y los IDs. Esto permite realizar búsquedas y filtrados instantáneos en el cliente sin requerir peticiones constantes al servidor.
    </li>
    <li>
      <strong>Carga por Lotes con Caché:</strong> Los detalles completos de cada Pokémon (tipos, estadísticas, imágenes) se consultan de forma paralela en bloques de 15 elementos y se almacenan en un objeto <code>Map&lt;number, PokemonDetail&gt;</code> en memoria. Si el usuario vuelve a consultar un Pokémon previamente visto, los datos se obtienen de la caché sin consumo de red.
    </li>
  </ol>

  <div class="code-block">
// Fragmento de pokeapi.ts: Consulta individual con memoria caché
export async function getPokemonDetail(idOrName: string | number): Promise&lt;PokemonDetail&gt; {
  const key = typeof idOrName === 'string' ? idOrName.toLowerCase() : idOrName;
  if (pokemonCache.has(key)) {
    return pokemonCache.get(key)!;
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
  if (!res.ok) throw new Error('No se encontró el Pokémon');
  const data = await res.json();

  pokemonCache.set(data.id, data);
  return data;
}
  </div>

  <div class="page-break"></div>

  <h2 class="section-title">4. Capturas de Pantalla de la Plataforma</h2>
  <p>
    A continuación se presentan las evidencias del funcionamiento de la plataforma web implementada:
  </p>

  <div class="figure">
    <img src="data:image/png;base64,$mainB64" alt="Vista Principal de la Pokédex">
    <div class="figure-caption"><strong>Figura 1:</strong> Vista general del catálogo con distribución semántica de dos columnas: contenido principal (&lt;main&gt;) a la izquierda y panel de filtros (&lt;aside&gt;) a la derecha.</div>
  </div>

  <div class="figure">
    <img src="data:image/png;base64,$searchB64" alt="Búsqueda y Filtrado">
    <div class="figure-caption"><strong>Figura 2:</strong> Búsqueda dinámica en tiempo real y filtrado instantáneo por nombre de Pokémon.</div>
  </div>

  <div class="page-break"></div>

  <div class="figure">
    <img src="data:image/png;base64,$modalB64" alt="Ficha Técnica Detallada">
    <div class="figure-caption"><strong>Figura 3:</strong> Ventana modal de inspección técnica: visualización de ilustración oficial, descripción en español obtenida de <code>pokemon-species</code>, medidas físicas, estadísticas base y habilidades.</div>
  </div>

  <h2 class="section-title">5. Conclusiones</h2>
  <ul>
    <li>El consumo de servicios REST públicos como <strong>PokéAPI</strong> mediante JavaScript moderno y TypeScript permite desarrollar aplicaciones ricas en datos sin requerir una base de datos propia.</li>
    <li>La implementación de una memoria caché local en el cliente (mediante estructuras <code>Map</code>) reduce drásticamente los tiempos de carga y minimiza la tasa de solicitudes al servidor.</li>
    <li>La maquetación semántica mediante <code>&lt;main&gt;</code> y <code>&lt;aside&gt;</code> no solo mejora la accesibilidad y el SEO de la plataforma, sino que optimiza el espacio en pantalla facilitando la interacción del usuario.</li>
  </ul>

  <h2 class="section-title">6. Repositorio del Proyecto</h2>
  <p>
    El código fuente completo de la aplicación, su configuración de Vite, componentes y servicios se encuentran disponibles en el repositorio público de GitHub:
  </p>
  <div class="repo-link" style="text-align: center; font-size: 11pt;">
    <a href="https://github.com/angelcontres/pokedex-web" target="_blank">
      👉 https://github.com/angelcontres/pokedex-web
    </a>
  </div>

</body>
</html>
"@

[System.IO.File]::WriteAllText("informe.html", $html, [System.Text.Encoding]::UTF8)

# Convertir a PDF mediante Microsoft Edge Headless
$pdfOut = "Informe_Consumo_APIs_Pokedex.pdf"
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --print-to-pdf="$PWD\$pdfOut" --no-pdf-header-footer "$PWD\informe.html"
Start-Sleep -Seconds 3

if (Test-Path $pdfOut) {
    Write-Host "PDF generado exitosamente: $pdfOut"
    Get-Item $pdfOut | Select-Object Name, Length, LastWriteTime
} else {
    Write-Error "No se pudo generar el PDF."
}
