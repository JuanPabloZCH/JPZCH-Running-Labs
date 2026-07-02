const JPZCH_Components = (() => {
  function resolveURLs(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    temp.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
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

  function setupNavbarEvents() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuBtn.innerHTML = isOpen
          ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>'
          : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
      });
    }

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
      if (window.scrollY > 20) {
        navbar.classList.add('glass-strong');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('glass-strong');
        navbar.classList.add('bg-transparent');
      }
    });
  }

  function init() {
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
