/**
 * FILTER MODULE
 * Handles filtering projects by category with smooth fade/scale animations
 */

export function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  const activeClasses = ['bg-gradient-to-r', 'from-purple-600', 'to-indigo-600', 'text-white', 'shadow-lg', 'shadow-purple-600/30'];
  const inactiveClasses = ['text-purple-300', 'hover:text-white', 'border', 'border-purple-500/20', 'bg-purple-950/20', 'hover:border-purple-400/50'];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });
      btn.classList.remove(...inactiveClasses);
      btn.classList.add(...activeClasses);

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.classList.add('opacity-100', 'scale-100');
            card.classList.remove('opacity-0', 'scale-95');
          }, 40);
        } else {
          card.classList.add('opacity-0', 'scale-95');
          card.classList.remove('opacity-100', 'scale-100');
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
}
