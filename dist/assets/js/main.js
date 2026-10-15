/**
 * ========================================================
 * MAIN CONTROLLER & COMPONENT LOADER
 * Orchestrates modular components and feature modules
 * ========================================================
 */

import { initTheme } from './modules/theme.js';
import { initTyping } from './modules/typing.js';
import { initFilter } from './modules/filter.js';
import { initCounter } from './modules/counter.js';
import { initContact } from './modules/contact.js';

// List of all components to be dynamically loaded
const components = [
  { id: 'navbar-container', path: 'components/navbar.html' },
  { id: 'Profile-container', path: 'components/Profile.html', fallbackId: 'hero-container', fallbackPath: 'components/hero.html' },
  { id: 'about-container', path: 'components/about.html' },
  { id: 'skills-container', path: 'components/skills.html' },
  { id: 'projects-container', path: 'components/projects.html' },
  { id: 'experience-container', path: 'components/experience.html' },
  { id: 'certificates-container', path: 'components/certificates.html' },
  { id: 'contact-container', path: 'components/contact.html' },
  { id: 'footer-container', path: 'components/footer.html' }
];

/**
 * Loads a single HTML component into its container
 */
async function loadComponent(id, path, fallbackId, fallbackPath) {
  let container = document.getElementById(id);
  if (!container && fallbackId) {
    container = document.getElementById(fallbackId);
  }
  if (!container) return;

  // If container already has content (e.g. pre-rendered by build script), skip fetch
  if (container.children.length > 0) return;

  try {
    let response = await fetch(path);
    if (!response.ok && fallbackPath) {
      response = await fetch(fallbackPath);
    }
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error(`Could not load component from ${path}:`, error);
  }
}

/**
 * Initializes Navigation, Scrollspy, and Back to Top
 */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Scroll events
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar scroll elevation
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('shadow-2xl', 'shadow-purple-950/40', 'bg-[#0c0914]/90');
      } else {
        navbar.classList.remove('shadow-2xl', 'shadow-purple-950/40', 'bg-[#0c0914]/90');
      }
    }

    // Scrollspy active indicator
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-purple-300', 'font-semibold', 'bg-purple-950/40');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-purple-300', 'font-semibold', 'bg-purple-950/40');
          }
        });
      }
    });

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Initializes Certificate Lightbox Modal
 */
function initCertificatesModal() {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalIssuer = document.getElementById('cert-modal-issuer');
  const modalRef = document.getElementById('cert-modal-ref');
  const modalNewTab = document.getElementById('cert-modal-newtab');
  const closeBtn = document.getElementById('cert-modal-close');

  if (!modal) return;

  function openModal(imgSrc, title, issuer, ref) {
    if (modalImg) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title || '';
    if (modalIssuer) modalIssuer.textContent = issuer || '';
    if (modalRef) modalRef.textContent = ref || '';
    if (modalNewTab) modalNewTab.href = imgSrc;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  // Delegate click for certificate preview triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.cert-preview-trigger');
    if (trigger) {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-img');
      const title = trigger.getAttribute('data-title');
      const issuer = trigger.getAttribute('data-issuer');
      const ref = trigger.getAttribute('data-ref');
      openModal(imgSrc, title, issuer, ref);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * Bootstrap the entire application
 */
async function bootstrap() {
  // 1. Load all component templates asynchronously
  await Promise.all(components.map(c => loadComponent(c.id, c.path, c.fallbackId, c.fallbackPath)));

  // 2. Initialize interactive features
  initTheme();
  initNavigation();
  initTyping();
  initFilter();
  initCounter();
  initContact();
  initCertificatesModal();
}

// Start execution once DOM content is ready
document.addEventListener('DOMContentLoaded', bootstrap);
