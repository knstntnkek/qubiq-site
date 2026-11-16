// Modal hub cards — open/close, ESC and backdrop handling.
(function () {
  const open = id => {
    const m = document.getElementById(id);
    if (!m) return;
    m.hidden = false;
    document.body.classList.add('modal-open');
    const card = m.querySelector('.modal-card');
    if (card) card.focus();
  };
  const close = m => {
    m.hidden = true;
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      open(el.dataset.modal);
    });
  });

  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m || e.target.closest('[data-close]')) close(m);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal:not([hidden])').forEach(close);
  });

  // deep links: index.html#modal-download opens that modal on load
  const h = location.hash.replace(/^#/, "");
  if (h && document.getElementById(h) && document.getElementById(h).classList.contains('modal')) {
    open(h);
  }
})();
