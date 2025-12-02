import { useEffect } from 'react';

export default function useTemplateScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadScripts = async () => {
      // Import Bootstrap JS
      require('bootstrap/dist/js/bootstrap.bundle.min.js');

      // Dynamic imports for client-side libraries
      const AOS = (await import('aos')).default;
      const GLightbox = (await import('glightbox')).default;
      const Swiper = (await import('swiper/bundle')).default;
      const Isotope = (await import('isotope-layout')).default;
      const imagesLoaded = (await import('imagesloaded')).default;
      const PureCounter = (await import('@srexi/purecounterjs')).default;

      /**
       * Apply .scrolled class to the body as the page is scrolled down
       */
      function toggleScrolled() {
        const selectBody = document.querySelector('body');
        const selectHeader = document.querySelector('#header');
        if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
        window.scrollY > 100 ? selectBody?.classList.add('scrolled') : selectBody?.classList.remove('scrolled');
      }

      document.addEventListener('scroll', toggleScrolled);
      toggleScrolled(); // Run immediately

      /**
       * Mobile nav toggle
       */
      const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

      function mobileNavToogle() {
        document.querySelector('body')?.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn?.classList.toggle('bi-list');
        mobileNavToggleBtn?.classList.toggle('bi-x');
      }
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
      }

      /**
       * Hide mobile nav on same-page/hash links
       */
      document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        });
      });

      /**
       * Toggle mobile nav dropdowns
       */
      document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
          e.preventDefault();
          // @ts-ignore
          this.parentNode.classList.toggle('active');
          // @ts-ignore
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
          e.stopImmediatePropagation();
        });
      });

      /**
       * Preloader
       */
      const preloader = document.querySelector('#preloader');
      if (preloader) {
        preloader.remove();
      }

      /**
       * Scroll top button
       */
      let scrollTop = document.querySelector('.scroll-top');

      function toggleScrollTop() {
        if (scrollTop) {
          window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
      }
      if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }

      document.addEventListener('scroll', toggleScrollTop);
      toggleScrollTop();

      /**
       * Animation on scroll function and init
       */
      function aosInit() {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
      // Try initializing AOS immediately and also after a short delay to ensure scripts are loaded
      aosInit();
      setTimeout(aosInit, 1000);

      /**
       * Initiate glightbox
       */
      GLightbox({
        selector: '.glightbox'
      });

      /**
       * Initiate Pure Counter
       */
      new PureCounter();

      /**
       * Init isotope layout and filters
       */
      document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
        let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope: any;
        const container = isotopeItem.querySelector('.isotope-container');
        if (container) {
          imagesLoaded(container, function() {
            initIsotope = new Isotope(container, {
              itemSelector: '.isotope-item',
              layoutMode: layout,
              filter: filter,
              sortBy: sort
            });
          });
        }

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
            // @ts-ignore
            this.classList.add('filter-active');
            if (initIsotope) {
              initIsotope.arrange({
                // @ts-ignore
                filter: this.getAttribute('data-filter')
              });
            }
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, false);
        });
      });

      /**
       * Init swiper sliders
       */
      function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
          let config = JSON.parse(
            swiperElement.querySelector(".swiper-config")?.innerHTML.trim() || '{}'
          );

          // @ts-ignore
          new Swiper(swiperElement, config);
        });
      }
      initSwiper();

      /**
       * Correct scrolling position upon page load for URLs containing hash links.
       */
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash) as HTMLElement;
            if (section) {
              let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
              window.scrollTo({
                top: section.offsetTop - parseInt(scrollMarginTop),
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      }

      /**
       * Navmenu Scrollspy
       */
      let navmenulinks = document.querySelectorAll('.navmenu a');

      function navmenuScrollspy() {
        navmenulinks.forEach(navmenulink => {
          // @ts-ignore
          if (!navmenulink.hash) return;
          // @ts-ignore
          let section = document.querySelector(navmenulink.hash) as HTMLElement;
          if (!section) return;
          let position = window.scrollY + 200;
          if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
            navmenulink.classList.add('active');
          } else {
            navmenulink.classList.remove('active');
          }
        })
      }
      document.addEventListener('scroll', navmenuScrollspy);
      navmenuScrollspy();
    };

    loadScripts();

    // Cleanup function
    return () => {
      // Note: We can't easily remove event listeners defined inside the async function
      // unless we hoist the function definitions or store references.
      // For now, we'll leave the cleanup as best effort or rely on page navigation.
      // Ideally, we should refactor to hoist the event handlers.
    };
  }, []);
}
