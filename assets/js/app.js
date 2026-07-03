const JPZCH_App = (() => {
  const TOOLS = [
    {
      id: 'pace-calculator',
      name: 'Calculadora de Ritmo',
      description: 'Convierte ritmo a tiempo y viceversa para 5K, 10K, media maratón y maratón con tabla interactiva de ritmos.',
      category: 'calculadoras',
      icon: 'timer',
      status: 'available',
      accent: '#CCFF00',
      url: '/tools/pace-calculator/',
      features: ['Ritmo→Tiempo', 'Tiempo→Ritmo', '5K·10K·Media·Maratón', 'WR récords']
    },
    {
      id: 'race-predictor',
      name: 'Predictor de Carreras',
      description: 'Predice tu tiempo en cualquier distancia basado en tu mejor marca reciente. Usa la fórmula de Riegel para proyecciones precisas.',
      category: 'calculadoras',
      icon: 'trending-up',
      status: 'available',
      accent: '#FF5722',
      url: '/tools/race-predictor/',
      features: ['5K', '10K', 'Media', 'Maratón']
    },
    {
      id: 'vo2max-calculator',
      name: 'Calculadora VO₂Max',
      description: 'Estima tu consumo máximo de oxígeno usando test de Cooper, Rockport o tiempo de carrera.',
      category: 'calculadoras',
      icon: 'heart',
      status: 'coming-soon',
      accent: '#CCFF00',
      url: '/tools/vo2max-calculator/',
      features: ['Test Cooper', 'Rockport', 'Carrera', 'Percentiles']
    },
    {
      id: 'training-zones',
      name: 'Zonas de Entrenamiento',
      description: 'Calcula tus zonas de frecuencia cardíaca y ritmo objetivo según tu perfil fisiológico y umbrales.',
      category: 'planificadores',
      icon: 'activity',
      status: 'available',
      accent: '#FF5722',
      url: '/tools/training-zones/',
      features: ['FC Zones', 'Ritmo objetivo', 'Umbral', 'Recuperación']
    },
    {
      id: 'gpx-dashboard',
      name: 'Analizador GPX',
      description: 'Sube archivos GPX y visualiza tus rutas en mapa interactivo con perfil de elevación y métricas.',
      category: 'analizadores',
      icon: 'map',
      status: 'coming-soon',
      accent: '#CCFF00',
      url: '/tools/gpx-dashboard/',
      features: ['Mapa 3D', 'Elevación', 'Ritmo GPS', 'Segmentos']
    },
    {
      id: 'hydration-calculator',
      name: 'Calculadora de Hidratación',
      description: 'Calcula tus necesidades de hidratación según clima, distancia, peso y tasa de sudoración.',
      category: 'calculadoras',
      icon: 'droplet',
      status: 'coming-soon',
      accent: '#3B82F6',
      url: '/tools/hydration-calculator/',
      features: ['Pérdida agua', 'Electrolitos', 'Clima cálido', 'Plan']
    },
    {
      id: 'running-cost',
      name: 'Running Cost Calculator',
      description: 'Calcula el costo real por kilómetro de tus zapatillas y equipo. Toma decisiones inteligentes.',
      category: 'calculadoras',
      icon: 'dollar-sign',
      status: 'coming-soon',
      accent: '#CCFF00',
      url: '/tools/running-cost/',
      features: ['$/km', 'Vida útil', 'Comparativa', 'Ahorro anual']
    },
    {
      id: 'cadence-analyzer',
      name: 'Analizador de Cadencia',
      description: 'Calcula tu cadencia óptima usando el test de 30 segundos y descubre tu eficiencia de zancada.',
      category: 'calculadoras',
      icon: 'rotate-cw',
      status: 'available',
      accent: '#FF5722',
      url: '/tools/cadence-analyzer/',
      features: ['Test 30s', 'Zancada', 'Eficiencia', 'Objetivo']
    },
    {
      id: 'progression-calculator',
      name: 'Calculadora de Progresión',
      description: 'Proyecta tu mejora en distancias basada en tu volumen semanal y experiencia de entrenamiento.',
      category: 'planificadores',
      icon: 'trending-up',
      status: 'coming-soon',
      accent: '#CCFF00',
      url: '/tools/progression-calculator/',
      features: ['Proyección', 'Volumen', 'Carga', 'Periodización']
    },
    {
      id: 'training-planner',
      name: 'Planificador de Entrenos',
      description: 'Genera planes de entrenamiento personalizados para 5K, 10K, Media Maratón y Maratón.',
      category: 'planificadores',
      icon: 'calendar',
      status: 'coming-soon',
      accent: '#FF5722',
      url: '/tools/training-planner/',
      features: ['5K', '10K', 'Media', 'Maratón']
    },
    {
      id: 'shoe-compare',
      name: 'Comparador de Zapatillas',
      description: 'Compara drop, peso, amortiguación y precio de tus zapatillas. Encuentra tu par ideal.',
      category: 'analizadores',
      icon: 'shoe',
      status: 'coming-soon',
      accent: '#CCFF00',
      url: '/tools/shoe-compare/',
      features: ['Drop', 'Peso', 'Amortiguación', 'Precio']
    },
    {
      id: 'sleep-analyzer',
      name: 'Analizador de Sueño',
      description: 'Registra y analiza la calidad de tu sueño para optimizar la recuperación y el rendimiento.',
      category: 'analizadores',
      icon: 'moon',
      status: 'coming-soon',
      accent: '#8B5CF6',
      url: '/tools/sleep-analyzer/',
      features: ['Calidad', 'Horas', 'Recuperación', 'Tendencias']
    }
  ];

  const TOOL_ICONS = {
    'timer': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'trending-up': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
    'heart': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
    'activity': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    'map': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>',
    'droplet': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
    'dollar-sign': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'rotate-cw': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    'calendar': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
    'shoe': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 3 7.5 12m9 0H7.5m9 0h1.5a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5v-3A1.5 1.5 0 016.75 12H7.5"/></svg>',
    'moon': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
  };

  const CATEGORIES = {
    all: { label: 'Todas', icon: 'grid' },
    calculadoras: { label: 'Calculadoras', icon: 'calculator' },
    planificadores: { label: 'Planificadores', icon: 'calendar' },
    analizadores: { label: 'Analizadores GPX', icon: 'map' }
  };

  let currentFilter = 'all';
  let searchQuery = '';

  function toolUrl(tool) {
    return JPZCH_Config.url(tool.url);
  }

  function init() {
    renderHeroParticles();
    renderStats();
    renderFilters();
    renderTools(TOOLS);
    setupFilterEvents();
    setupSearchEvents();
    setupGsapAnimations();
    loadUserGreeting();
  }

  /* ── Hero Particles ── */
  function renderHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.className = 'hero-particle';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 20}s`;
      dot.style.animationDuration = `${15 + Math.random() * 20}s`;
      dot.style.width = `${2 + Math.random() * 3}px`;
      dot.style.height = dot.style.width;
      container.appendChild(dot);
    }
  }

  /* ── Stats Counter ── */
  function renderStats() {
    const stats = [
      { value: '12', label: 'Herramientas', suffix: '' },
      { value: '4', label: 'Disponible', suffix: '' },
      { value: '6', label: 'Categorías', suffix: '' },
      { value: '100', label: 'Gratuito', suffix: '%' }
    ];
    const container = document.getElementById('heroStats');
    if (!container) return;
    container.innerHTML = stats.map(s => `
      <div class="text-center">
        <div class="stat-value">${s.value}${s.suffix}</div>
        <div class="text-[#64748B] text-xs font-medium mt-1">${s.label}</div>
      </div>
    `).join('');
  }

  /* ── Filters ── */
  function renderFilters() {
    const container = document.getElementById('filterTabs');
    if (!container) return;
    container.innerHTML = Object.entries(CATEGORIES).map(([key, cat]) => {
      const count = key === 'all' ? TOOLS.length : TOOLS.filter(t => t.category === key).length;
      const isActive = currentFilter === key;
      const icons = {
        grid: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
        calculator: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
        map: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>'
      };
      return `
        <button class="filter-tab ${isActive ? 'active' : ''}" data-filter="${key}">
          ${icons[cat.icon] || icons.grid}
          <span>${cat.label}</span>
          <span class="cat-count">${count}</span>
        </button>
      `;
    }).join('');
  }

  /* ── Tool Cards ── */
  function renderTools(tools) {
    const container = document.getElementById('toolsGrid');
    if (!container) return;

    const filtered = filterTools(tools);
    const sorted = sortTools(filtered);

    if (sorted.length === 0) {
      container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <h3 class="text-white font-semibold text-lg mb-1">Sin resultados</h3>
          <p class="text-[#64748B] text-sm">No encontramos herramientas con "${searchQuery}"</p>
          <button onclick="JPZCH_App.resetFilters()" class="btn-secondary mt-4 text-sm">Limpiar filtros</button>
        </div>
      `;
      return;
    }

    container.innerHTML = sorted.map((tool, i) => renderCard(tool, i)).join('');

    sorted.forEach((tool, i) => {
      const card = document.getElementById(`card-${tool.id}`);
      if (!card) return;
      if (tool.status === 'available') {
        card.addEventListener('click', () => {
          window.location.href = toolUrl(tool);
        });
      }
    });
  }

  function renderCard(tool, index) {
    const isAvailable = tool.status === 'available';
    const statusClass = isAvailable ? 'available' : 'coming-soon';
    return `
      <div id="card-${tool.id}" class="tool-card ${!isAvailable ? 'coming-soon' : ''} group animate-fade-in-up" style="animation-delay: ${index * 60}ms">
        <div class="flex items-start gap-4 mb-4">
          <div class="tool-card-icon" style="background: ${isAvailable ? `${tool.accent}15` : 'rgba(255,255,255,0.03)'}; color: ${isAvailable ? tool.accent : '#475569'}; border: 1px solid ${isAvailable ? `${tool.accent}20` : 'rgba(255,255,255,0.04)'}">
            ${TOOL_ICONS[tool.icon] || TOOL_ICONS.timer}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-white font-semibold text-base truncate group-hover:text-[${tool.accent}] transition-colors">${tool.name}</h3>
            </div>
            <p class="text-[#64748B] text-sm leading-relaxed line-clamp-2">${tool.description}</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            ${tool.features.map(f => `<span class="text-[11px] font-medium px-2 py-0.5 rounded-md" style="background: ${isAvailable ? `${tool.accent}10` : 'rgba(255,255,255,0.03)'}; color: ${isAvailable ? tool.accent : '#475569'}">${f}</span>`).join('')}
          </div>
          <span class="status-badge ${statusClass} flex-shrink-0 ml-2">
            <span class="pulse-dot"></span>
            ${isAvailable ? 'Disponible' : 'Próximamente'}
          </span>
        </div>
        ${isAvailable ? `
          <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span class="text-xs text-[#475569]">Incluye ${tool.features.length} módulos</span>
            <span class="text-xs font-medium text-[${tool.accent}] flex items-center gap-1">
              Abrir
              <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </span>
          </div>
        ` : `
          <div class="mt-4 pt-3 border-t border-white/5">
            <span class="text-xs text-[#475569]">En desarrollo · Próxima actualización</span>
          </div>
        `}
      </div>
    `;
  }

  function filterTools(tools) {
    return tools.filter(tool => {
      const matchesCategory = currentFilter === 'all' || tool.category === currentFilter;
      if (!searchQuery) return matchesCategory;
      const q = searchQuery.toLowerCase();
      return matchesCategory && (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.features.some(f => f.toLowerCase().includes(q)) ||
        tool.category.includes(q)
      );
    });
  }

  function sortTools(tools) {
    return [...tools].sort((a, b) => {
      if (a.status === 'available' && b.status !== 'available') return -1;
      if (a.status !== 'available' && b.status === 'available') return 1;
      return a.name.localeCompare(b.name);
    });
  }

  /* ── Filter Events ── */
  function setupFilterEvents() {
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;
      const filter = tab.dataset.filter;
      if (!filter) return;
      setFilter(filter);
    });
  }

  function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.filter === filter);
    });
    renderTools(TOOLS);
  }

  /* ── Search ── */
  function setupSearchEvents() {
    const input = document.getElementById('searchTools');
    if (!input) return;
    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = input.value.trim();
        renderTools(TOOLS);
      }, 200);
    });
  }

  function resetFilters() {
    searchQuery = '';
    currentFilter = 'all';
    const input = document.getElementById('searchTools');
    if (input) input.value = '';
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.filter === 'all');
    });
    renderTools(TOOLS);
  }

  /* ── GSAP Animations ── */
  function setupGsapAnimations() {
    if (typeof gsap === 'undefined') return;
    document.body.classList.add('gsap-ready');

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.hero-subtitle', { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-cta', { y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
      gsap.from('#heroStats > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.6, ease: 'back.out(1.7)' });
      gsap.from('.section-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.section-header', start: 'top 85%' } });
      gsap.from('.tool-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: '#toolsGrid', start: 'top 80%' }
      });
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' });
      gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power2.out' });
      gsap.from('.hero-cta', { y: 15, opacity: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' });
    });
  }

  /* ── User Greeting ── */
  function loadUserGreeting() {
    const profile = JPZCH_Store.getProfile();
    const el = document.getElementById('userGreeting');
    if (!el) return;
    if (profile.name) {
      el.textContent = profile.name;
    }
  }

  return { init, resetFilters, renderTools };
})();

document.addEventListener('DOMContentLoaded', () => {
  JPZCH_App.init();
});
