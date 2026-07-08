const CACHE = 'jpzch-v6';

// URLs relativas al SW (se resuelven automáticamente para local y GitHub Pages)
const PRECACHE_URLS = [
  'assets/css/styles.css',
  'assets/js/config.js',
  'assets/js/store.js',
  'assets/js/components.js',
  'assets/js/profile-modal.js',
  'components/navbar.js',
  'components/footer.js',
  'manifest.json',
  'assets/icons/icon.svg',
  'assets/icons/maskable-icon.svg',
  '404.html'
];

const CDN_PATTERNS = [
  'cdn.tailwindcss.com',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'unpkg.com',
  'cdn.jsdelivr.net'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(PRECACHE_URLS).catch(() => {})
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function isCDN(url) { return CDN_PATTERNS.some(p => url.includes(p)); }

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'GET' || !url.protocol.startsWith('http')) return;

  // CDN: stale-while-revalidate
  if (isCDN(url.href)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Static assets locales: cache-first
  if (url.href.match(/\.(js|css|json|svg|png|ico|woff2?)$/) && !isCDN(url.href)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Navegación HTML: network-first con fallback a cache
  if (req.mode === 'navigate' || (req.destination === 'document' && !url.href.match(/\.\w+$/))) {
    event.respondWith(networkFirst(req));
    return;
  }
});

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const clone = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, clone));
    }
    return res;
  } catch {
    return new Response('Sin conexión', { status: 503 });
  }
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) {
      const clone = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, clone));
    }
    return res;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    if (req.mode === 'navigate') {
      const fallback = await caches.match('404.html');
      if (fallback) return fallback;
    }
    return new Response('Sin conexión', { status: 503 });
  }
}

async function staleWhileRevalidate(req) {
  const cached = await caches.match(req);
  const fetchP = fetch(req).then(res => {
    if (res.ok) {
      const clone = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, clone));
    }
    return res;
  }).catch(() => cached);
  return cached || fetchP;
}
