# qubiq-site

Website for [Qubiq](https://knstntnkek.github.io/qubiq-site/) — a
cross-platform Xray-core client. Static site on GitHub Pages:
<https://knstntnkek.github.io/qubiq-site/>

No build step. `docs/*.md` pages render client-side via `docs.html` +
`docs.js` (vendored `marked.min.js`); the page list lives in the `PAGES`
array in `docs.js`. Doc files also read fine directly on GitHub.

## Conventions

- Bump `?v=` on `style.css`/`docs.js`/`site.js` after editing them —
  Pages caches aggressively.
- Internal doc links use `page.md` / `page.md#anchor` form; `docs.js`
  rewrites them to `docs.html?page=<slug>` / `…#<anchor>` URLs, so they
  work on GitHub too. Legacy hash routes (`#<slug>/<anchor>`) are
  upgraded on load.
- Update `sitemap.xml` whenever a page is added, removed or renamed.

## Languages

The site is bilingual — English at the root, Russian under `ru/`
(`ru/docs/<slug>.md` mirrors each `docs/<slug>.md`; RU headings carry
explicit `<!-- #en-slug -->` anchors, invisible on GitHub). Every
user-visible change updates both languages in the same change.
