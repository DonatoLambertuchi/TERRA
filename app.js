/* ============================================================
   TERRA — app.js
   ============================================================ */

/* ---------- Scroll suave a sección ---------- */
function scrollTo(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ---------- Menú hamburguesa ---------- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const iconMenu   = document.getElementById('icon-menu');
const iconClose  = document.getElementById('icon-close');

let menuOpen = false;

function openMenu() {
  menuOpen = true;
  mobileMenu.classList.add('is-open');
  iconMenu.style.display  = 'none';
  iconClose.style.display = 'block';
  hamburger.setAttribute('aria-label', 'Cerrar menú');
}

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('is-open');
  iconMenu.style.display  = 'block';
  iconClose.style.display = 'none';
  hamburger.setAttribute('aria-label', 'Abrir menú');
}

hamburger.addEventListener('click', () => {
  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

/* ---------- Cerrar menú al hacer clic fuera ---------- */
document.addEventListener('click', (e) => {
  if (menuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

/* ---------- Cerrar menú al redimensionar a desktop ---------- */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menuOpen) {
    closeMenu();
  }
});

/* ---------- Header: sombra al hacer scroll ---------- */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 16px rgba(107,142,111,0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
}, { passive: true });

/* ---------- Animación de aparición al hacer scroll (Intersection Observer) ---------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Aplicar animación inicial a cards y secciones */
document.querySelectorAll('.problem-card, .donate-card, .footer__grid > div').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
