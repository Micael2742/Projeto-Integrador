/* ==========================================================================
   BEESIDE — HOME
   JS puro: menu mobile, busca, favoritos, carrinho (contador) e reveal on scroll
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- Header: sticky shadow on scroll ---------------- */
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------- Menu hambúrguer (mobile) ---------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  function closeMenu() {
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
    header.classList.remove('is-menu-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    header.classList.toggle('is-menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMenu);
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------------- Busca (toggle no mobile) ---------------- */
  const searchToggle = document.getElementById('searchToggle');
  const mobileSearch = document.getElementById('mobileSearch');

  if (searchToggle && mobileSearch) {
    searchToggle.addEventListener('click', () => {
      mobileSearch.classList.toggle('is-open');
      if (mobileSearch.classList.contains('is-open')) {
        const input = mobileSearch.querySelector('input');
        if (input) input.focus();
      }
    });
  }

  /* Preserva o comportamento de busca já existente no projeto:
     este handler apenas evita reload e delega para a função global
     de busca do site, caso ela já exista (ex.: window.BeeSideSearch). */
  document.querySelectorAll('.search-form, .mobile-search').forEach((form) => {
    if (form.tagName !== 'FORM') return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const query = input ? input.value.trim() : '';
      if (!query) return;
      if (typeof window.BeeSideSearch === 'function') {
        window.BeeSideSearch(query);
      } else {
        console.info('Busca acionada para:', query);
      }
    });
  });

  /* ---------------- Favoritar produto ---------------- */
  document.querySelectorAll('.fav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const active = btn.classList.toggle('is-active');
      btn.setAttribute('aria-pressed', String(active));
    });
  });

  /* ---------------- Adicionar ao carrinho (contador) ---------------- */
  const cartCount = document.getElementById('cartCount');

  function bumpCartCount() {
    if (!cartCount) return;
    const current = parseInt(cartCount.textContent, 10) || 0;
    cartCount.textContent = String(current + 1);
    cartCount.classList.remove('is-bump');
    void cartCount.offsetWidth; // reinicia a animação
    cartCount.classList.add('is-bump');
  }

  document.querySelectorAll('.product-card .btn-add').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const productId = card ? card.dataset.productId : null;

      if (typeof window.BeeSideAddToCart === 'function') {
        window.BeeSideAddToCart(productId);
      }
      bumpCartCount();

      const original = btn.textContent;
      btn.textContent = 'Adicionado ✓';
      setTimeout(() => { btn.textContent = original; }, 1400);
    });
  });

  /* ---------------- Categorias: navegação, se a rota já existir ---------------- */
  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const category = card.dataset.category;
      if (typeof window.BeeSideGoToCategory === 'function') {
        e.preventDefault();
        window.BeeSideGoToCategory(category);
      }
      // Caso a função de rota ainda não exista no projeto,
      // o link segue seu href normalmente (comportamento padrão).
    });
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
