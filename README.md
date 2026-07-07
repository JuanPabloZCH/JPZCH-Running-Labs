# JPZCH Running Labs

Ecosistema digital gratuito para corredores. Suite de 13 herramientas web progresivas (PWA) para calcular, predecir y analizar rendimiento running.

## Stack Tecnico

| Recurso | CDN / Servicio |
|---------|----------------|
| Estilos | Tailwind CSS |
| Animaciones | GSAP + ScrollTrigger |
| Graficos | Chart.js |
| Mapas | Leaflet.js |
| IA | Groq (Llama 3.3 70B via Cloudflare Worker proxy) |
| Persistencia | LocalStorage API |
| Service Worker | Cache-first + Stale-while-revalidate |

## Estructura del Proyecto

```
/
├── index.html                  Hub / Dashboard principal
├── manifest.json               Web App Manifest (PWA)
├── sw.js                       Service Worker
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/styles.css          Estilos globales (Dark Mode)
│   ├── icons/                  Iconos PWA y OG Image
│   └── js/
│       ├── config.js           Configuracion de URLs / entorno
│       ├── store.js            LocalStorage manager (perfil runner)
│       ├── components.js       Inyector de Navbar + Footer + SW
│       ├── profile-modal.js    Modal de perfil de usuario
│       └── app.js              Logica del Hub (filtros, busqueda, GSAP)
├── components/
│   ├── navbar.js               Navbar template unificado
│   └── footer.js               Footer template unificado
├── recursos/                   Paginas de informacion y referencia
│   ├── glosario/
│   ├── laboratorio-de-elite/
│   ├── playlists-bpm/
│   ├── tabla-de-ritmos/
│   └── zonas-cardiacas/
    └── tools/                      13 herramientas independientes
    ├── ai-coach/               AI Coach (analisis con IA via Groq)
    ├── cadence-analyzer/       Analizador de Cadencia
    ├── gpx-dashboard/          Analizador GPX (mapa + elevacion)
    ├── hydration-calculator/   Calculadora de Hidratacion
    ├── pace-calculator/        Calculadora de Ritmo
    ├── progression-calculator/ Calculadora de Progresion
    ├── race-predictor/         Predictor de Carreras
    ├── running-cost/           Calculadora de Costos
    ├── shoe-compare/           Comparador de Zapatillas
    ├── sleep-analyzer/         Analizador de Sueno
    ├── training-planner/       Planificador de Entrenos
    ├── training-zones/         Zonas Cardiacas
    └── vo2max-calculator/      Calculadora VO2Max
```

## Principios de Diseño

- Dark Mode premium por defecto (`#0B0F19`)
- Mobile-First: los runners usan el movil en pista/gimnasio
- Acentos neon: Verde Lima `#CCFF00` / Naranja Racing `#FF5722` / Cyan `#22D3EE` / Purpura `#8B5CF6`
- Componentes reutilizables con inyeccion via JavaScript
- Persistencia entre herramientas con LocalStorage
- Animaciones progresivas con GSAP + prefers-reduced-motion
- PWA: instalable, offline parcial, Service Worker

## URL del Proyecto

```
https://juanpablozch.github.io/JPZCH-Running-Labs/
```

## Desarrollo Local

```bash
# Servir con cualquier servidor estatico
npx serve .
# o
python -m http.server 8000
# o
npx live-server .
```

## Despliegue (GitHub Pages)

1. Subir el repositorio a GitHub
2. Activar GitHub Pages desde Settings > Pages > Source: main branch / (root)
3. El proyecto usa deteccion automatica de base path en config.js

## Arquitectura

Cada herramienta en `tools/` es una pagina HTML independiente que:
1. Incluye los scripts compartidos (config, store, components, navbar, footer)
2. Puede acceder al perfil del runner desde `JPZCH_Store.getProfile()`
3. Dispone de navbar y footer unificados con navegacion entre herramientas

## Licencia

Version 1. Codigo abierto.
