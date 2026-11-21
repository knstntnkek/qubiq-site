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

  // Download modal: replace static platform rows with direct package
  // links once downloads/release.json exists (the Azure pipeline pushes
  // it on tag and merge builds). Platforms absent from the manifest
  // keep their "soon" placeholder row.
  const labels = { windows: 'Windows', linux: 'Linux', macos: 'macOS',
                   android: 'Android', ios: 'iOS / iPadOS' };
  const hydrateDownloads = () => {
    fetch('downloads/release.json')
      .then(r => r.ok ? r.json() : null)
      .then(m => {
        const files = m && Array.isArray(m.files) ? m.files : [];
        const cols = document.querySelectorAll('#modal-download .modal-col');
        if (!files.length || cols.length < 2) return;

        const parsed = files.map(f => {
          const mm = f.name.match(/^Qubiq-(windows|linux|macos|android|ios)(?:-(.+))?\.(exe|dmg|apk|ipa|deb|rpm|zip)$/);
          if (!mm) return null;
          const [, plat, arch, ext] = mm;
          const mb = (f.bytes / 1048576).toFixed(1);
          return { plat, html: `<a class="dl-row" href="downloads/${f.name}">
            <span class="dl-main">
              <span class="dl-name">${labels[plat]}${arch ? ' ' + arch.replaceAll('_', ' ') : ''}</span>
              <span class="dl-meta">.${ext} · ${mb} MB</span>
            </span>
            <span class="dl-arrow">↓</span>
          </a>` };
        }).filter(Boolean);
        if (!parsed.length) return;

        // first column desktop platforms, second column mobile
        const desktop = /^(windows|linux|macos)$/;
        [cols[0], cols[1]].forEach((col, i) => {
          const slice = parsed.filter(p => i === 0 ? desktop.test(p.plat) : !desktop.test(p.plat));
          if (!slice.length) return;
          // drop the generic row for platforms the manifest covers
          col.querySelectorAll('.dl-row').forEach(el => {
            const name = el.querySelector('.dl-name').textContent;
            if (slice.some(p => name.startsWith(labels[p.plat]))) el.remove();
          });
          slice.forEach(p => col.insertAdjacentHTML('beforeend', p.html));
        });

        const foot = document.querySelector('#modal-download .modal-foot');
        if (foot && m.tag) {
          foot.insertAdjacentHTML('afterbegin',
            `<strong>${m.tag}</strong> — published ${String(m.published).slice(0, 10)}.<br>`);
        }
      })
      .catch(() => {});
  };

  document.querySelectorAll('[data-modal="modal-download"]').forEach(el =>
    el.addEventListener('click', hydrateDownloads));
  if (h === 'modal-download') hydrateDownloads();
})();
