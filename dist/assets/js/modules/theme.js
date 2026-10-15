/**
 * THEME MODULE
 * Enforces permanent Dark (Black & Purple) theme
 */

export function initTheme() {
  // Always lock dark mode
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}
