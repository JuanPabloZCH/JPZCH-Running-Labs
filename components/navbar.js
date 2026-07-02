const JPZCH_NAVBAR = `
<nav id="jpzch-navbar" class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500" style="will-change:transform">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <a href="/" class="flex items-center gap-2 group">
        <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#CCFF00] to-[#99CC00] flex items-center justify-center font-black text-[#0B0F19] text-lg md:text-xl transition-transform duration-300 group-hover:scale-110">JP</div>
        <div class="hidden sm:block">
          <span class="text-white font-bold text-base md:text-lg tracking-tight">JPZCH</span>
          <span class="text-[#94A3B8] text-xs md:text-sm ml-1.5 font-medium">Running Labs</span>
        </div>
      </a>

      <div class="hidden md:flex items-center gap-1">
        <a href="/" class="nav-link" data-nav="inicio">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span>Inicio</span>
        </a>

        <div class="relative group">
          <button class="nav-link cursor-pointer" data-nav="herramientas">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Herramientas</span>
            <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="nav-dropdown absolute top-full left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <div class="bg-[#131A2B]/95 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl shadow-black/50">
              <a href="/tools/cadence-analyzer/" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                <span class="w-2 h-2 rounded-full bg-[#CCFF00] shrink-0"></span>
                <span class="font-medium">Analizador de Cadencia</span>
                <span class="ml-auto text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">Disponible</span>
              </a>
              <div class="border-t border-white/5 my-1.5 mx-2"></div>
              <div class="px-3 py-2 text-[11px] font-medium text-[#475569] uppercase tracking-wider">Próximas herramientas</div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#475569]">
                <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
                <span>Calculadora de Ritmo</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#475569]">
                <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
                <span>Predictor de Carreras</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#475569]">
                <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
                <span>VO₂Max + Zonas de Entreno</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#475569]">
                <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
                <span>Y más...</span>
              </div>
            </div>
          </div>
        </div>

        <div class="relative group">
          <button class="nav-link cursor-pointer" data-nav="recursos">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            <span>Recursos</span>
            <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="nav-dropdown absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <div class="bg-[#131A2B]/95 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl shadow-black/50">
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#CCFF00] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Tabla de Ritmos
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#FF5722] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                Zonas Cardíacas
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#CCFF00] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                Guía de Entrenamientos
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#FF5722] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Glosario Runner
              </a>
            </div>
          </div>
        </div>

        <div class="relative group">
          <button class="nav-link cursor-pointer" data-nav="proyecto">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            <span>Proyecto</span>
            <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="nav-dropdown absolute top-full left-0 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <div class="bg-[#131A2B]/95 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl shadow-black/50">
              <a href="/acerca/" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#CCFF00] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Acerca de
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#FF5722] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
                Reportar Bug
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#CCFF00] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                Sugerir Herramienta
              </a>
              <div class="border-t border-white/5 my-1.5 mx-2"></div>
              <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-[#475569] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Privacidad
              </a>
            </div>
          </div>
        </div>
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

  <div id="mobileMenu" class="md:hidden hidden px-4 pb-4 pt-2 relative z-[101]">
    <div class="bg-[#131A2B]/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <a href="/" class="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition-colors">
        <svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span class="font-medium">Inicio</span>
      </a>

      <div class="mobile-dd">
        <button class="mobile-dd-btn flex items-center gap-3 w-full px-4 py-3 text-white hover:bg-white/5 transition-colors">
          <svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span class="font-medium flex-1 text-left">Herramientas</span>
          <svg class="mobile-dd-chevron w-4 h-4 text-[#475569] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="mobile-dd-content hidden bg-white/5">
          <a href="/tools/cadence-analyzer/" class="flex items-center gap-3 px-8 py-3 text-white hover:bg-white/5 transition-colors">
            <span class="w-2 h-2 rounded-full bg-[#CCFF00] shrink-0"></span>
            <span class="text-sm">Analizador de Cadencia</span>
            <span class="ml-auto text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">Disponible</span>
          </a>
          <div class="px-8 py-2 text-[10px] font-medium text-[#475569] uppercase tracking-wider">Próximas herramientas</div>
          <div class="flex items-center gap-3 px-8 py-2 text-sm text-[#475569]">
            <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
            Calculadora de Ritmo
          </div>
          <div class="flex items-center gap-3 px-8 py-2 text-sm text-[#475569]">
            <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
            Predictor de Carreras
          </div>
          <div class="flex items-center gap-3 px-8 py-2 text-sm text-[#475569]">
            <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
            VO₂Max + Zonas
          </div>
          <div class="flex items-center gap-3 px-8 py-2 text-sm text-[#475569]">
            <span class="w-2 h-2 rounded-full bg-[#475569] shrink-0"></span>
            Y más...
          </div>
        </div>
      </div>

      <div class="mobile-dd">
        <button class="mobile-dd-btn flex items-center gap-3 w-full px-4 py-3 text-white hover:bg-white/5 transition-colors">
          <svg class="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span class="font-medium flex-1 text-left">Recursos</span>
          <svg class="mobile-dd-chevron w-4 h-4 text-[#475569] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="mobile-dd-content hidden bg-white/5">
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Tabla de Ritmos</a>
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Zonas Cardíacas</a>
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Guía de Entrenamientos</a>
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Glosario Runner</a>
        </div>
      </div>

      <div class="mobile-dd">
        <button class="mobile-dd-btn flex items-center gap-3 w-full px-4 py-3 text-white hover:bg-white/5 transition-colors">
          <svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          <span class="font-medium flex-1 text-left">Proyecto</span>
          <svg class="mobile-dd-chevron w-4 h-4 text-[#475569] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="mobile-dd-content hidden bg-white/5">
          <a href="/acerca/" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Acerca de</a>
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Reportar Bug</a>
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Sugerir Herramienta</a>
          <div class="border-t border-white/5 mx-4 my-1"></div>
          <a href="#" class="flex items-center gap-3 px-8 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">Privacidad</a>
        </div>
      </div>

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
