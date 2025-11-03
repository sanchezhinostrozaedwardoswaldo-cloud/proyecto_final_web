/**
* Template Name: FlexBiz
* Template URL: https://bootstrapmade.com/flexbiz-bootstrap-business-template/
* Updated: Aug 04 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
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
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
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
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

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
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
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
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
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
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();




// Obtener referencias
const carousel = document.querySelector('#heroCarousel');
const indicators = document.querySelectorAll('.carousel-indicators-custom button');
const infoItems = document.querySelectorAll("#section-info-bar .info-item");

let currentIndex = 0; // Índice compartido para ambos carruseles
let syncInterval;
let bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel, {
  interval: 5000,
  ride: 'carousel'
});

// Función para actualizar la barra informativa según el índice actual
function updateInfoBar() {
  if (window.innerWidth <= 995) {
    infoItems.forEach((item, i) => {
      item.classList.toggle("active", i === currentIndex);
    });
  } else {
    infoItems.forEach((item) => item.classList.add("active"));
  }
}

// Función para sincronizar cuando el carrusel cambia (automático o manual)
carousel.addEventListener('slid.bs.carousel', function (e) {
  currentIndex = e.to; // Actualizar índice compartido
  updateInfoBar(); // Sincronizar barra informativa
});

// Función para manejar el responsive
function handleResize() {
  updateInfoBar(); // Actualizar visualización según tamaño de pantalla
}

// Sincronizar indicadores personalizados del hero
carousel.addEventListener('slide.bs.carousel', function (e) {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === e.to);
  });
});

// Controles personalizados del carrusel
document.querySelector('.carousel-control-prev-custom').addEventListener('click', function () {
  bsCarousel.prev();
});

document.querySelector('.carousel-control-next-custom').addEventListener('click', function () {
  bsCarousel.next();
});

// Hacer que los indicadores sean clicables
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', function () {
    bsCarousel.to(index);
  });
});

// Inicializar
updateInfoBar();
window.addEventListener("resize", handleResize);



document.addEventListener('DOMContentLoaded', function () {
  const carouselEl = document.getElementById('heroCarousel');

  if (!carouselEl) return;

  // Si usas Bootstrap 5, escuchamos el evento 'slid.bs.carousel' para saber el slide activo
  carouselEl.addEventListener('slid.bs.carousel', function (e) {
    // e.to es el índice del slide que quedó activo (0-based)
    toggleZonesVisibility(e.to);
  });

  // Inicial: comprobar el slide activo al cargar
  // Bootstrap 5 agrega .active al .carousel-item activo, podemos comprobar
  const activeIndex = Array.from(carouselEl.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
  toggleZonesVisibility(activeIndex);

  function toggleZonesVisibility(activeIdx) {
    // Solo mostrar zonas cuando activeIdx === 0 (primer slide)
    const firstSlide = carouselEl.querySelector('.carousel-item.first-slide');
    if (!firstSlide) return;

    const zones = firstSlide.querySelector('.hero-zones');
    if (!zones) return;

    if (activeIdx === 0) {
      zones.style.display = 'grid';
    } else {
      zones.style.display = 'none';
    }
  }
});

// Seleccionamos los elementos
const accountMenu = document.getElementById('accountMenu');
const accountButton = document.querySelector('.btn-account');

// Función para alternar el menú
function toggleAccountMenu() {
  accountMenu.classList.toggle('active');
}

// Cerrar el menú si se hace clic fuera
window.addEventListener('click', (e) => {
  if (!e.target.closest('.account-dropdown')) {
    accountMenu.classList.remove('active');
  }
});

// Funciones para el menú de cuenta y panel de registro

function toggleAccountMenu() {
  document.getElementById("accountMenu").classList.toggle("show");
}

function openRegisterPanel() {
  document.getElementById("registerPanel").classList.add("show");
}

function closeRegisterPanel() {
  document.getElementById("registerPanel").classList.remove("show");
}

/* Opcional: cerrar menú si se hace clic fuera */
document.addEventListener("click", function (e) {
  const menu = document.getElementById("accountMenu");
  const button = document.querySelector(".btn-account");
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.remove("show");
  }
});




