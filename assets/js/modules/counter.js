/**
 * COUNTER MODULE
 * Animates numerical stats count-up when scrolled into view
 * Supports integers, decimals (e.g. GPA 3.84), and custom suffixes (+, %, or none)
 */

export function initCounter() {
  const statsSection = document.getElementById('about');
  if (!statsSection) return;

  let counted = false;

  function countUp(el, target, suffix = '', decimals = 0) {
    let current = 0;
    const duration = 1400;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = (decimals > 0 ? target.toFixed(decimals) : Math.round(target)) + suffix;
        clearInterval(timer);
      } else {
        el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-number').forEach(numEl => {
          const rawTarget = numEl.getAttribute('data-target') || '0';
          const target = parseFloat(rawTarget);
          const suffix = numEl.getAttribute('data-suffix') !== null ? numEl.getAttribute('data-suffix') : '+';
          const decimals = parseInt(numEl.getAttribute('data-decimals') || '0', 10);
          
          if (target > 0) {
            countUp(numEl, target, suffix, decimals);
          }
        });
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsSection);
}
