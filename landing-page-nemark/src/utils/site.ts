// src/lib/initSite.ts

let initialized = false;

declare global {
  interface Window {
    initSwiperWithCustomPagination?: (swiperElement: HTMLElement, config: Record<string, unknown>) => void;
    Swiper?: unknown;
  }
}

/**
 * Khởi tạo các behavior client-side cho template Regna.
 * Gọi trong useEffect của 1 client component.
 */
export function initSite() {
  // Chạy trên server thì bỏ qua
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (initialized) return; // tránh add event listener nhiều lần (StrictMode dev)
  initialized = true;

  // --- Helper: header scrolled ---
  function toggleScrolled() {
    const body = document.body;
    const header = document.querySelector<HTMLElement>('#header');
    if (!header) return;

    const isSticky =
      header.classList.contains('scroll-up-sticky') ||
      header.classList.contains('sticky-top') ||
      header.classList.contains('fixed-top');

    if (!isSticky) return;

    if (window.scrollY > 100) body.classList.add('scrolled');
    else body.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // --- Mobile nav toggle ---
  const mobileNavToggleBtn = document.querySelector<HTMLElement>('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn?.classList.toggle('bi-list');
    mobileNavToggleBtn?.classList.toggle('bi-x');
  }

  mobileNavToggleBtn?.addEventListener('click', mobileNavToggle);

  // Đóng menu khi click link trong #navmenu
  document.querySelectorAll<HTMLAnchorElement>('#navmenu a').forEach((navLink) => {
    navLink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  // --- Toggle dropdown trong mobile nav ---
  document
    .querySelectorAll<HTMLElement>('.navmenu .toggle-dropdown')
    .forEach((toggleBtn) => {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggleBtn.parentElement;
        if (!parent) return;

        parent.classList.toggle('active');
        (parent.nextElementSibling as HTMLElement | null)?.classList.toggle(
          'dropdown-active',
        );
        e.stopImmediatePropagation();
      });
    });

  // --- Preloader ---
  const preloader = document.querySelector<HTMLElement>('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // --- Scroll-top button ---
  const scrollTop = document.querySelector<HTMLElement>('.scroll-top');

  function toggleScrollTop() {
    if (!scrollTop) return;
    if (window.scrollY > 100) scrollTop.classList.add('active');
    else scrollTop.classList.remove('active');
  }

  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // --- AOS init (global) ---
  function aosInit() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error AOS được load global từ script ngoài
    if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
      // @ts-expect-error global-AOS-init
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
  }
  window.addEventListener('load', aosInit);

  // --- GLightbox init ---
  try {
    // @ts-expect-error global-GLightbox
    if (typeof GLightbox !== 'undefined') {
      // @ts-expect-error global-GLightbox-call
      GLightbox({ selector: '.glightbox' });
    }
  } catch {
    // ignore
  }

  // --- PureCounter init ---
  try {
    // @ts-expect-error global-PureCounter
    if (typeof PureCounter !== 'undefined') {
      // @ts-expect-error global-PureCounter-new
      new PureCounter();
    }
  } catch {
    // ignore
  }

  // --- Isotope + filters ---
  document.querySelectorAll<HTMLElement>('.isotope-layout').forEach((isotopeItem) => {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    type IsotopeInstance = { arrange: (opts: { filter?: string | null }) => void };
    let initIsotope: IsotopeInstance | null = null;

    try {
      // @ts-expect-error global-imagesLoaded-Isotope
      if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
        // @ts-expect-error global-imagesLoaded-call
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
          // @ts-expect-error global-Isotope-new
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter,
            sortBy: sort,
          });
        });
      }
    } catch {
      // ignore
    }

    isotopeItem
      .querySelectorAll<HTMLLIElement>('.isotope-filters li')
      .forEach((filterEl) => {
        filterEl.addEventListener(
          'click',
          function () {
            const active = isotopeItem.querySelector('.isotope-filters .filter-active');
            active?.classList.remove('filter-active');
            this.classList.add('filter-active');

            try {
              initIsotope?.arrange({ filter: this.getAttribute('data-filter') });
            } catch {
              // ignore
            }
            aosInit();
          },
          false,
        );
      });
  });

  // --- Swiper init ---
  function initSwiper() {
    document.querySelectorAll<HTMLElement>('.swiper').forEach((swiperElement) => {
      try {
        // try to read JSON config from data attribute if provided
        const configAttr = swiperElement.getAttribute('data-swiper-config');
        let config: Record<string, unknown> = {};
        if (configAttr) {
          try {
            const parsed = JSON.parse(configAttr);
            // only accept plain objects as config; ignore other JSON types
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              config = parsed as Record<string, unknown>;
            } else {
              config = {};
            }
          } catch {
            config = {};
          }
        }

        // default config with sensible fallbacks (can be overridden by data-swiper-config)
        config = {
          loop: swiperElement.classList.contains('swiper-loop') ? true : false,
          pagination: {
            el: swiperElement.querySelector('.swiper-pagination') ?? undefined,
            clickable: true,
          },
          navigation: {
            nextEl: swiperElement.querySelector('.swiper-button-next') ?? undefined,
            prevEl: swiperElement.querySelector('.swiper-button-prev') ?? undefined,
          },
          ...config,
        };

        if (
          swiperElement.classList.contains('swiper-tab') &&
          'initSwiperWithCustomPagination' in window &&
          typeof window.initSwiperWithCustomPagination === 'function'
        ) {
        } else {
          // use window to access Swiper global without referencing an undeclared identifier
          const globalSwiper = window.Swiper;
          if (typeof globalSwiper !== 'undefined') {
            type SwiperConstructor = new (el: Element | HTMLElement, cfg?: Record<string, unknown>) => unknown;
            const SwiperCtor = globalSwiper as unknown as SwiperConstructor;
            // instantiate without using `any`
            new SwiperCtor(swiperElement, config);
          }
        }
      } catch (err) {
        // ignore
      }
    });
  }

  window.addEventListener('load', initSwiper);

  // --- Fix scroll khi load với hash ---
  window.addEventListener('load', () => {
    if (!window.location.hash) return;
    const section = document.querySelector<HTMLElement>(window.location.hash);
    if (!section) return;

    setTimeout(() => {
      const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
      window.scrollTo({
        top: section.offsetTop - parseInt(scrollMarginTop, 10),
        behavior: 'smooth',
      });
    }, 100);
  });

  // --- Navmenu scrollspy ---
  const navmenulinks = document.querySelectorAll<HTMLAnchorElement>('.navmenu a');

  function navmenuScrollspy() {
    const position = window.scrollY + 200;

    navmenulinks.forEach((navLink) => {
      if (!navLink.hash) return;
      const section = document.querySelector<HTMLElement>(navLink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document
          .querySelectorAll<HTMLAnchorElement>('.navmenu a.active')
          .forEach((link) => link.classList.remove('active'));
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
}
