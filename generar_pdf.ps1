$ErrorActionPreference = "Stop"

$mainB64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("screenshot_main.png"))
$modalB64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("screenshot_modal.png"))
$searchB64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("screenshot_search.png"))

$html = @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Tarea: Consumo de APIs REST - Pokédex Web</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.45;
      margin: 0;
      padding: 0;
      font-size: 10pt;
      background: #ffffff;
    }
    .header {
      text-align: center;
      border-bottom: 2.5px solid #dc2626;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .header h1 {
      font-size: 13pt;
      margin: 0 0 2px 0;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .header h2 {
      font-size: 10pt;
      font-weight: 600;
      margin: 0 0 2px 0;
      color: #475569;
    }
    .header h3 {
      font-size: 9pt;
      font-weight: 500;
      margin: 0;
      color: #64748b;
    }
    .info-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-size: 9.5pt;
    }
    .info-card p {
      margin: 0;
    }
    .info-card strong {
      color: #0f172a;
    }
    .repo-banner {
      grid-column: span 2;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 8px 12px;
      border-radius: 6px;
      margin-top: 4px;
      font-size: 10pt;
    }
    .repo-banner strong {
      color: #1e40af;
    }
    .repo-banner a {
      color: #2563eb;
      font-weight: bold;
      text-decoration: none;
      word-break: break-all;
    }
    .desc-box {
      margin-bottom: 14px;
    }
    .desc-box h2 {
      font-size: 10.5pt;
      color: #0f172a;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .desc-box p {
      margin: 0;
      text-align: justify;
      color: #334155;
      font-size: 9.5pt;
    }
    .section-title {
      font-size: 10.5pt;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin: 0 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .figure {
      margin: 0 0 12px 0;
      text-align: center;
      page-break-inside: avoid;
    }
    .figure img {
      width: 100%;
      max-height: 290px;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .figure-caption {
      font-size: 9pt;
      color: #475569;
      margin-top: 5px;
    }
    .figure-caption strong {
      color: #0f172a;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- PÁGINA 1 -->
  <div class="header">
    <h1>Universidad Estatal Península de Santa Elena</h1>
    <h2>Facultad de Sistemas y Telecomunicaciones</h2>
    <h3>Carrera de Tecnologías de la Información</h3>
  </div>

  <div class="info-card">
    <p><strong>Estudiante:</strong> Ángel Alejandro Villón Panimboza</p>
    <p><strong>Fecha:</strong> Septiembre 2026</p>
    <p><strong>Asignatura:</strong> Desarrollo de Aplicaciones Web</p>
    <p><strong>Tema:</strong> Tarea - Consumo de APIs (PokéAPI)</p>
    <div class="repo-banner">
      <strong>Enlace al Repositorio de GitHub:</strong><br>
      <a href="https://github.com/angelcontres/pokedex-web" target="_blank">
        https://github.com/angelcontres/pokedex-web
      </a>
    </div>
  </div>

  <div class="desc-box">
    <h2>Descripción del Proyecto</h2>
    <p>
      Para esta práctica se desarrolló una aplicación web con <strong>React</strong>, <strong>TypeScript</strong> y <strong>Tailwind CSS</strong> que consume los servicios REST de la API pública <strong>PokéAPI</strong>. La interfaz cuenta con una maquetación semántica de dos columnas compuesta por un catálogo principal de tarjetas (<code>&lt;main&gt;</code>) y un panel lateral derecho (<code>&lt;aside&gt;</code>) para búsquedas en tiempo real y filtrado por tipo o región. Al hacer clic sobre cualquier Pokémon, se abre una ventana modal con sus detalles, medidas y estadísticas base.
    </p>
  </div>

  <h2 class="section-title">Capturas de Pantalla del Funcionamiento</h2>

  <div class="figure">
    <img src="data:image/png;base64,$mainB64" alt="Vista Principal de la Pokédex">
    <div class="figure-caption"><strong>Captura 1:</strong> Vista general del catálogo principal con paginación y panel lateral derecho de filtros.</div>
  </div>

  <!-- PÁGINA 2 -->
  <div class="page-break"></div>

  <h2 class="section-title">Capturas de Pantalla del Funcionamiento (Continuación)</h2>

  <div class="figure" style="margin-bottom: 16px;">
    <img src="data:image/png;base64,$searchB64" alt="Búsqueda y Filtrado">
    <div class="figure-caption"><strong>Captura 2:</strong> Búsqueda en tiempo real por nombre de Pokémon y filtrado dinámico.</div>
  </div>

  <div class="figure">
    <img src="data:image/png;base64,$modalB64" alt="Modal de Detalles del Pokémon">
    <div class="figure-caption"><strong>Captura 3:</strong> Ventana modal con estadísticas base, descripción en español, medidas físicas y habilidades.</div>
  </div>

</body>
</html>
"@

[System.IO.File]::WriteAllText("informe.html", $html, [System.Text.Encoding]::UTF8)

# Convertir a PDF mediante Microsoft Edge Headless
$pdfOut = "Informe_Consumo_APIs_Pokedex.pdf"
if (Test-Path $pdfOut) { Remove-Item -Force $pdfOut }
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --print-to-pdf="$PWD\$pdfOut" --no-pdf-header-footer "$PWD\informe.html"
Start-Sleep -Seconds 3

if (Test-Path $pdfOut) {
    Write-Host "PDF generado exitosamente: $pdfOut"
    Get-Item $pdfOut | Select-Object Name, Length, LastWriteTime
} else {
    Write-Error "No se pudo generar el PDF."
}
