const JPZCH_Config = {
  BASE_URL: '/',
  APP_NAME: 'JPZCH Running Labs',
  VERSION: '1.0.0',
  REPO_URL: 'https://github.com/JuanPabloZCH/JPZCH-Running-Labs',

  init() {
    // Detección automática de base path (GitHub Pages project site)
    const path = window.location.pathname;
    if (path.startsWith('/JPZCH-Running-Labs/')) {
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
