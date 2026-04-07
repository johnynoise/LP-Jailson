// Intersection Observer for reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => observer.observe(el));

// Staggered reveals for grid children
document.querySelectorAll('.areas-grid, .diff-metrics, .process-steps').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});

// Nav scroll behavior
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.background = 'rgba(10,10,10,0.97)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.borderBottom = '1px solid rgba(184,150,90,0.1)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0) 100%)';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom = 'none';
  }
});

// ── Mobile nav drawer ──
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.querySelector('.nav-drawer');

if (navToggle && navDrawer) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navDrawer.classList.toggle('open', !isOpen);
    navDrawer.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close drawer when any link inside is clicked
  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.classList.remove('open');
      navDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.classList.remove('open');
      navDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      navToggle.focus();
    }
  });
}
