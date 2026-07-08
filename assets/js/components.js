const JPZCH_Components = (() => {
  function resolveURLs(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    temp.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('/')) {
        a.setAttribute('href', JPZCH_Config.url(href));
      }
    });
    return temp.innerHTML;
  }

  function injectNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = resolveURLs(JPZCH_NAVBAR);
    setupNavbarEvents();
  }

  function injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = resolveURLs(JPZCH_FOOTER);
  }

  function setupMobileDropdowns() {
    document.querySelectorAll('.mobile-dd-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dd = btn.closest('.mobile-dd');
        const content = dd?.querySelector('.mobile-dd-content');
        const chevron = btn.querySelector('.mobile-dd-chevron');
        const isOpen = content && !content.classList.contains('hidden');
        if (content) content.classList.toggle('hidden');
        if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
        document.querySelectorAll('.mobile-dd').forEach(other => {
          if (other !== dd) {
            other.querySelector('.mobile-dd-content')?.classList.add('hidden');
            other.querySelector('.mobile-dd-chevron')?.style.removeProperty('transform');
          }
        });
      });
    });
  }

  function setupNavbarEvents() {
    setupMobileDropdowns();
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');

    if (!menuBtn || !mobileMenu) return;

    let menuOpen = false;
    mobileMenu.style.display = 'none';
    if (mobileOverlay) mobileOverlay.style.display = 'none';

    function showMenu() {
      menuOpen = true;
      mobileMenu.style.display = 'block';
      if (mobileOverlay) mobileOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      menuBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    }

    function hideMenu() {
      menuOpen = false;
      mobileMenu.style.display = 'none';
      if (mobileOverlay) mobileOverlay.style.display = 'none';
      document.body.style.overflow = '';
      menuBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    }

    function toggleMenu() {
      if (menuOpen) hideMenu(); else showMenu();
    }

    menuBtn.addEventListener('click', toggleMenu);
    menuBtn.addEventListener('touchstart', function(e) { e.preventDefault(); toggleMenu(); }, { passive: false });
    if (mobileOverlay) mobileOverlay.addEventListener('click', hideMenu);

    const profileBtns = document.querySelectorAll('#profileBtn, #profileBtnMobile');
    profileBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => JPZCH_ProfileModal?.open());
    });

    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/' && (currentPath === '/' || currentPath === '')) {
        link.classList.add('active');
      } else if (href !== '/' && currentPath.startsWith(href)) {
        link.classList.add('active');
      }
    });

    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('jpzch-navbar');
      if (!navbar) return;
      if (window.scrollY > 20 || window.innerWidth < 768) {
        navbar.classList.add('glass-strong');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('glass-strong');
        navbar.classList.add('bg-transparent');
      }
    });
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      const swUrl = JPZCH_Config.url('sw.js');
      navigator.serviceWorker.register(swUrl).catch(() => {});
    }
  }

  function init() {
    registerSW();
    injectNavbar();
    injectFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init, injectNavbar, injectFooter };
})();
