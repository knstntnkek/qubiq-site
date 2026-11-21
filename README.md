# qubiq-site

Website for [Qubiq](https://github.com/knstntnkek/yavpnclient) — an
cross-platform Xray-core client. Static site on GitHub Pages:
<https://knstntnkek.github.io/qubiq-site/>

No build step. `docs/*.md` pages render client-side via `docs.html` +
`docs.js` (vendored `marked.min.js`); the page list lives in the `PAGES`
array in `docs.js`. Doc files also read fine directly on GitHub.

## Conventions

- Bump `?v=` on `style.css`/`docs.js` after editing them — Pages caches
  aggressively.
- Internal doc links use `page.md` / `page.md#anchor` form; `docs.js`
  rewrites them to hash routes, so they work on GitHub too.
- Update `sitemap.xml` whenever a page is added, removed or renamed.
