// Pippin & Pals — Branding Page JS
// Scroll-reveal: sections fade + slide up on enter
(function () {
  'use strict';

  const sections = document.querySelectorAll(
    '#s02,#s03,#s04,#s05,#s06,#s07,#s08,#s09,' +
    '#s10,#s11,#s12,#s13,#s14,#s15,#s16,#s17,' +
    '#s18,#s19,#s20,#s21,#s22'
  );

  sections.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.70s ease, transform 0.70s ease';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  sections.forEach(el => io.observe(el));
})();
