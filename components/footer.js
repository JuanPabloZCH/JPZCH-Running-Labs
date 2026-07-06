const JPZCH_FOOTER = `
<footer id="jpzch-footer" class="relative mt-24 border-t border-white/5">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F19]/50 pointer-events-none"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
      <div class="md:col-span-1">
        <div class="flex items-center gap-2.5 mb-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#CCFF00] to-[#99CC00] flex items-center justify-center font-black text-[#0B0F19] text-lg">JP</div>
          <div>
            <span class="text-white font-bold text-base">JPZCH</span>
            <span class="text-[#94A3B8] text-xs ml-1">Running Labs</span>
          </div>
        </div>
        <p class="text-[#64748B] text-sm leading-relaxed">Ecosistema digital para corredores que buscan mejorar su rendimiento con datos y tecnología.</p>
        <div class="flex gap-3 mt-5">
          <a href="https://github.com/JuanPabloZCH" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#CCFF00]/20 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#CCFF00] transition-all duration-300" aria-label="GitHub"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
          <a href="https://www.instagram.com/zejuanpa/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#CCFF00]/20 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#CCFF00] transition-all duration-300" aria-label="Instagram"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="https://www.linkedin.com/in/juan-pablo-zegarra-chavez/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#CCFF00]/20 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#CCFF00] transition-all duration-300" aria-label="LinkedIn"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Herramientas</h4>
        <ul class="space-y-3">
          <li><a href="/JPZCH-Running-Labs/tools/ai-coach/" class="text-[#8B5CF6] hover:text-[#CCFF00] text-sm transition-colors duration-300 font-semibold">AI Coach</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/cadence-analyzer/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Analizador de Cadencia</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/pace-calculator/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Calculadora de Ritmo</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/training-zones/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Zonas Cardíacas</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/race-predictor/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Predictor de Carreras</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/vo2max-calculator/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Calculadora VO₂Max</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/hydration-calculator/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Calculadora de Hidratación</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/running-cost/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Calculadora de Costos</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/gpx-dashboard/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Analizador GPX</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/progression-calculator/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Calculadora de Progresión</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/training-planner/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Planificador de Entrenos</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/sleep-analyzer/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Analizador de Sueño</a></li>
          <li><a href="/JPZCH-Running-Labs/tools/shoe-compare/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Comparador de Zapatillas</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Recursos</h4>
        <ul class="space-y-3">
          <li class="text-[#475569] text-xs font-medium uppercase tracking-wider mt-1 mb-1.5">Información</li>
          <li><a href="/JPZCH-Running-Labs/recursos/tabla-de-ritmos/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Tabla de Ritmos</a></li>
          <li><a href="/JPZCH-Running-Labs/recursos/zonas-cardiacas/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Zonas Cardíacas</a></li>
          <li><a href="/JPZCH-Running-Labs/recursos/glosario/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Glosario Runner</a></li>
          <li class="text-[#475569] text-xs font-medium uppercase tracking-wider mt-4 mb-1.5">Cultura &amp; Análisis</li>
          <li><a href="/JPZCH-Running-Labs/recursos/laboratorio-de-elite/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">El Mural</a></li>
          <li><a href="/JPZCH-Running-Labs/recursos/playlists-bpm/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Playlists BPM</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Proyecto</h4>
        <ul class="space-y-3">
          <li><a href="/JPZCH-Running-Labs/acerca/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Acerca de</a></li>
          <li><a href="/JPZCH-Running-Labs/reportar-error/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Reportar Error</a></li>
          <li><a href="/JPZCH-Running-Labs/sugerir-herramienta/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Sugerir Herramienta</a></li>
          <li><a href="/JPZCH-Running-Labs/privacidad/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Privacidad</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-[#475569] text-xs">&copy; 2026 JPZCH Running Labs. Hecho por un corredor, para corredores.</p>
      <p class="text-[#475569] text-xs">Versión 1</p>
    </div>
  </div>
</footer>
`;
