/* =============================================
   POLYLIB WEBSITE — app.js
   Hash-based SPA router
   ============================================= */

const pages = {
  '/':        'page-home',
  '/privacy': 'page-privacy',
  '/terms':   'page-terms',
};

function showPage(path) {
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
  });

  const pageId = pages[path] || pages['/'];
  const el = document.getElementById(pageId);
  if (el) {
    el.style.display = 'block';
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'fadeUp 0.45s ease both';
  }

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', href === path);
  });

  window.scrollTo({ top: 0 });
  closeMobileMenu();
}

function getPath() {
  const hash = window.location.hash || '#/';
  return hash.replace('#', '') || '/';
}

window.addEventListener('hashchange', () => showPage(getPath()));
window.addEventListener('load', () => showPage(getPath()));

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity  = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity = '';
  });
}

document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

// ===== SCROLL REVEAL =====
window.addEventListener('load', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeUp 0.5s ${i * 0.07}s ease both`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature-card, .step, .stat').forEach(el => observer.observe(el));
});
