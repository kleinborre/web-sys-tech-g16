/* Smooth scroll for same-page anchors */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (id.length > 1) {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Collapse bootstrap navbar if open
      const nav = document.querySelector('.navbar-collapse.show');
      if (nav) new bootstrap.Collapse(nav, { toggle: true });
    }
  }
});

/* Optional: prevent default form posts when modals chain success */
document.querySelectorAll('form').forEach((f) => {
  f.addEventListener('submit', (e) => {
    // If a submit button is wired to open a success modal, we let Bootstrap handle it.
    e.preventDefault();
  });
});