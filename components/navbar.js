const JPZCH_NAVBAR = `
<nav id="jpzch-navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <a href="/" class="flex items-center gap-2 group">
        <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#CCFF00] to-[#99CC00] flex items-center justify-center font-black text-[#0B0F19] text-lg md:text-xl transition-transform duration-300 group-hover:scale-110">J</div>
        <div class="hidden sm:block">
          <span class="text-white font-bold text-base md:text-lg tracking-tight">JPZCH</span>
          <span class="text-[#94A3B8] text-xs md:text-sm ml-1.5 font-medium">Running Labs</span>
        </div>
      </a>
      <div class="hidden md:flex items-center gap-1">
        <a href="/" class="nav-link active" data-tooltip="Dashboard principal">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span>Inicio</span>
        </a>
        <a href="/tools/pace-calculator/" class="nav-link" data-tooltip="Calcula tu ritmo">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Ritmo</span>
        </a>
        <a href="/tools/race-predictor/" class="nav-link" data-tooltip="Predice tu marca">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          <span>Predicción</span>
        </a>
        <a href="/tools/training-zones/" class="nav-link" data-tooltip="Zonas de entrenamiento">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          <span>Zonas</span>
        </a>
        <a href="/tools/gpx-dashboard/" class="nav-link" data-tooltip="Analiza tus rutas GPX">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          <span>GPX</span>
        </a>
      </div>
      <div class="flex items-center gap-2">
        <button id="profileBtn" class="relative w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-all duration-300 group" data-tooltip="Mi Perfil">
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-[#CCFF00] rounded-full animate-pulse"></span>
        </button>
        <button id="mobileMenuBtn" class="md:hidden relative w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div id="mobileMenu" class="md:hidden hidden px-4 pb-4 pt-2">
    <div class="bg-[#131A2B]/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <a href="/" class="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition-colors"><svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> Inicio</a>
      <a href="/tools/pace-calculator/" class="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"><svg class="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Calculadora de Ritmo</a>
      <a href="/tools/race-predictor/" class="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"><svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> Predictor de Carreras</a>
      <a href="/tools/training-zones/" class="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"><svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Zonas de Entreno</a>
      <a href="/tools/gpx-dashboard/" class="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"><svg class="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg> Analizador GPX</a>
      <div class="border-t border-white/5 mt-2 pt-2 px-4 pb-3">
        <button id="profileBtnMobile" class="flex items-center gap-3 w-full py-2 text-[#94A3B8] hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span>Mi Perfil</span>
        </button>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</nav>
`;
