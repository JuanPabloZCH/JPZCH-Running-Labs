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
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#CCFF00]/20 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#CCFF00] transition-all duration-300" aria-label="Instagram"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#CCFF00]/20 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#CCFF00] transition-all duration-300" aria-label="Strava"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.526l-4.12 8.356H18.4l-4.12-8.356z"/></svg></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#CCFF00]/20 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#CCFF00] transition-all duration-300" aria-label="YouTube"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Herramientas</h4>
        <ul class="space-y-3">
          <li><a href="/tools/cadence-analyzer/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Analizador de Cadencia</a></li>
          <li><a href="/tools/pace-calculator/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Calculadora de Ritmo</a></li>
          <li><a href="/tools/training-zones/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Zonas Cardíacas</a></li>
          <li><span class="text-[#475569] text-sm cursor-default">Predictor de Carreras</span></li>
          <li><span class="text-[#475569] text-sm cursor-default">VO₂Max Calculator</span></li>
          <li><span class="text-[#475569] text-sm cursor-default">Y más (próximamente)</span></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Recursos</h4>
        <ul class="space-y-3">
          <li><a href="#" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Guía de Entrenamientos</a></li>
          <li><a href="#" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Glosario Runner</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Proyecto</h4>
        <ul class="space-y-3">
          <li><a href="/acerca/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Acerca de</a></li>
          <li><a href="/reportar-error/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Reportar Error</a></li>
          <li><a href="/sugerir-herramienta/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Sugerir Herramienta</a></li>
          <li><a href="/privacidad/" class="text-[#64748B] hover:text-[#CCFF00] text-sm transition-colors duration-300">Privacidad</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-[#475569] text-xs">&copy; 2026 JPZCH Running Labs. Hecho por un corredor, para corredores.</p>
      <p class="text-[#475569] text-xs">v1.0.0 — Sin fines de lucro · Código abierto</p>
    </div>
  </div>
</footer>
`;
