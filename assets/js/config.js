const JPZCH_Config = {
  BASE_URL: '/',
  APP_NAME: 'JPZCH Running Labs',
  VERSION: '1.0.0',
  REPO_URL: 'https://github.com/jpzch/jpzch-running-labs',

  // ── GitHub Pages: si el proyecto se sirve desde un subdirectorio,
  //    cambia BASE_URL para que coincida (ej: '/jpzch-running-labs/').
  //    En desarrollo local con Live Server, dejar '/' funciona bien.
  //    En GitHub Pages project site, ajustar manualmente.
  init() {
    // Detección automática: si ve que no está en la raíz, ajusta BASE_URL
    const path = window.location.pathname;
    if (path.startsWith('/jpzch-running-labs/') || path.startsWith('/running-labs/')) {
      const match = path.match(/^(\/[^\/]+\/[^\/]+)\//);
      if (match) {
        this.BASE_URL = match[1] + '/';
      }
    }
    return this;
  },

  url(path) {
    const base = this.BASE_URL.endsWith('/') ? this.BASE_URL : this.BASE_URL + '/';
    const clean = path.startsWith('/') ? path.slice(1) : path;
    return base + clean;
  }
};

JPZCH_Config.init();
