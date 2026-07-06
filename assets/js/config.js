const JPZCH_Config = {
  BASE_URL: '/',
  APP_NAME: 'JPZCH Running Labs',
  VERSION: '1.0.0',
  REPO_URL: 'https://github.com/JuanPabloZCH/JPZCH-Running-Labs',

  init() {
    const path = window.location.pathname;
    if (path.startsWith('/JPZCH-Running-Labs/')) {
      this.BASE_URL = '/JPZCH-Running-Labs/';
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
