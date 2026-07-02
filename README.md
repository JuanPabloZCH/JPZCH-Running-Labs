# 🏃 JPZCH Running Labs

**Ecosistema digital gratuito para corredores.** Suite de herramientas web progresivas (PWA-ready) para calcular, predecir y analizar rendimiento running.

## 🚀 Stack Técnico

| Recurso | CDN |
|---------|-----|
| **Estilos** | Tailwind CSS |
| **Animaciones** | GSAP + ScrollTrigger |
| **Gráficos** | Chart.js / ApexCharts (próximamente) |
| **Mapas** | Leaflet.js (próximamente) |
| **Fechas** | Day.js / Luxon (próximamente) |
| **Persistencia** | LocalStorage API |

## 📂 Estructura del Proyecto

```
/
├── index.html              ← Hub / Dashboard principal
├── assets/
│   ├── css/styles.css      ← Estilos globales (Dark Mode)
│   └── js/
│       ├── config.js       ← Configuración de URLs / entorno
│       ├── store.js        ← LocalStorage manager (perfil runner)
│       ├── components.js   ← Inyector de Navbar + Footer
│       ├── profile-modal.js← Modal de perfil de usuario
│       └── app.js          ← Lógica del Hub (filtros, búsqueda, GSAP)
├── components/
│   ├── navbar.js           ← Navbar template unificado
│   └── footer.js           ← Footer template unificado
└── tools/                  ← Herramientas independientes
    ├── pace-calculator/    ← Calculadora de Ritmo
    ├── race-predictor/     ← Predictor de Carreras
    ├── vo2max-calculator/  ← VO₂Max
    ├── training-zones/     ← Zonas de Entrenamiento
    ├── gpx-dashboard/      ← Analizador GPX (próximamente)
    ├── hydration-calculator/
    ├── running-cost/
    ├── cadence-analyzer/
    ├── progression-calculator/
    ├── training-planner/   ← (próximamente)
    ├── shoe-compare/       ← (próximamente)
    └── sleep-analyzer/     ← (próximamente)
```

## 🎨 Principios de Diseño

- **Dark Mode premium** por defecto (`#0B0F19`)
- **Mobile-First** — los runners usan el móvil en pista/gimnasio
- **Acentos neón**: Verde Lima `#CCFF00` · Naranja Racing `#FF5722`
- **Componentes reutilizables** con inyección vía JavaScript
- **Persistencia entre herramientas** con `LocalStorage`
- **Animaciones progresivas** con GSAP + `prefers-reduced-motion`

## 🔧 Desarrollo Local

```bash
# Servir con cualquier servidor estático
npx serve .
# o
python -m http.server 8000
```

## 🌐 Despliegue (GitHub Pages)

1. Subir el repositorio a GitHub
2. Activar GitHub Pages desde `Settings > Pages > Source: main branch / (root)`
3. Si el proyecto se sirve desde un subdirectorio, actualizar `BASE_URL` en `assets/js/config.js`

## 📐 Arquitectura

Cada herramienta en `tools/` es una página HTML independiente que:
1. Incluye los scripts compartidos (config → store → components → navbar/footer)
2. Puede acceder al perfil del runner desde `JPZCH_Store.getProfile()`
3. Dispone de navbar y footer unificados con navegación entre herramientas

## 📄 Licencia

Código abierto. Sin fines de lucro.
