/* docs.js — renders docs/*.md into the guide. Edit the markdown, not this file.
   Page list lives in PAGES; real URLs: docs.html?page=<slug>#<anchor>.
   Bilingual: RU pages live under ru/ — same slugs, translated titles.
   RU headings carry explicit <!-- #id --> anchors matching the EN slugs
   (rendered as comments on GitHub). */

const LANG = document.documentElement.lang.startsWith("ru") ? "ru" : "en";

const I18N = {
  en: {
    titles: {
      "getting-started": "Getting started",
      "servers":         "Servers & nodes",
      "subscriptions":   "Subscriptions & providers",
      "providers":       "For providers",
      "routing":         "Routing",
      "connect":         "Connect & system entries",
      "vpn-tunnel":      "VPN tunnel & platforms",
      "backup":          "Backup & restore",
      "troubleshooting": "Troubleshooting & FAQ",
    },
    guide: "Guide",
    onThisPage: "On this page",
    titleSuffix: "— Qubiq docs",
    loadFailH: "Couldn't load this page",
    loadFailP: page => `The file <code>docs/${page}.md</code> didn't come through —
      check your connection or read it
      <a href="https://github.com/knstntnkek/qubiq-site/blob/main/docs/${page}.md">on GitHub</a>.`,
    lb: {
      urlLabel: "Subscription URL",
      urlPh: "https://panel.example/sub/…",
      nameLabel: "Name (optional)",
      namePh: "My VPN",
      errFull: "Enter a full https:// address.",
      errHttps: "Qubiq only accepts HTTPS subscription URLs.",
      errCred: "Remove the user:password@ part — links with credentials are rejected.",
      errSize: "This link is over the 256 KiB limit.",
      copyLink: "Copy link",
      open: "Open in Qubiq",
      htmlCap: "Button HTML for your panel:",
      copyHtml: "Copy HTML",
      copied: "Copied",
      addBtn: "Add to Qubiq",
      copyJson: "Copy JSON",
    },
  },
  ru: {
    titles: {
      "getting-started": "Начало работы",
      "servers":         "Серверы и узлы",
      "subscriptions":   "Подписки и провайдеры",
      "providers":       "Провайдерам",
      "routing":         "Маршрутизация",
      "connect":         "Подключение и системные интеграции",
      "vpn-tunnel":      "VPN-туннель и платформы",
      "backup":          "Резервная копия и восстановление",
      "troubleshooting": "Устранение неполадок и вопросы",
    },
    guide: "Руководство",
    onThisPage: "На этой странице",
    titleSuffix: "— документация Qubiq",
    loadFailH: "Не удалось загрузить страницу",
    loadFailP: page => `Файл <code>docs/${page}.md</code> не загрузился —
      проверьте соединение или прочитайте его
      <a href="https://github.com/knstntnkek/qubiq-site/blob/main/ru/docs/${page}.md">на GitHub</a>.`,
    lb: {
      urlLabel: "URL подписки",
      urlPh: "https://panel.example/sub/…",
      nameLabel: "Название (необязательно)",
      namePh: "Мой VPN",
      errFull: "Введите полный адрес https://.",
      errHttps: "Qubiq принимает только HTTPS-адреса подписок.",
      errCred: "Уберите часть user:password@ — ссылки с учётными данными отклоняются.",
      errSize: "Эта ссылка превышает лимит 256 КиБ.",
      copyLink: "Копировать ссылку",
      open: "Открыть в Qubiq",
      htmlCap: "HTML кнопки для вашей панели:",
      copyHtml: "Копировать HTML",
      copied: "Скопировано",
      addBtn: "Добавить в Qubiq",
      copyJson: "Копировать JSON",
    },
  },
};
const T = I18N[LANG];

const PAGE_SLUGS = [
  "getting-started", "servers", "subscriptions", "providers",
  "routing", "connect", "vpn-tunnel", "backup", "troubleshooting",
];
const PAGES = PAGE_SLUGS.map(slug => ({ slug, title: T.titles[slug] }));

const navEl  = document.getElementById("docs-nav");
const bodyEl = document.getElementById("doc-body");
const tocEl  = document.getElementById("docs-toc");

const slugify = s => s.toLowerCase().replace(/<[^>]+>/g, "")
  .replace(/[^\p{L}\p{N}]+/gu, "-")
  .replace(/^-+|-+$/g, "");

const safeDecode = s => { try { return decodeURIComponent(s); } catch { return s; } };

let currentPage = "";

function route() {
  const q = new URLSearchParams(location.search).get("page") || "";
  return {
    page: PAGES.some(p => p.slug === q) ? q : PAGES[0].slug,
    anchor: safeDecode(location.hash.replace(/^#/, "")),
  };
}

// legacy #<slug>/<anchor> hashes → ?page=<slug>#<anchor>
function upgradeLegacyHash() {
  if (new URLSearchParams(location.search).get("page")) return;
  const h = location.hash.replace(/^#/, "");
  if (!h) return;
  const [slug, anchor] = h.split("/");
  if (!PAGES.some(p => p.slug === slug)) return;
  history.replaceState(null, "",
    `${location.pathname}?page=${slug}${anchor ? "#" + anchor : ""}`);
}

const SITE_ORIGIN = "https://knstntnkek.github.io/qubiq-site";

function setHead(selector, tag, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  for (const k in attrs) el.setAttribute(k, attrs[k]);
}

function setDocHead(page, title) {
  document.title = `${title} ${T.titleSuffix}`;

  let p = bodyEl.querySelector("h1");
  while (p && p.tagName !== "P") p = p.nextElementSibling;
  let desc = p ? p.textContent.trim().replace(/\s+/g, " ") : "";
  if (desc.length > 160) {
    desc = desc.slice(0, 160);
    const cut = desc.lastIndexOf(" ");
    if (cut > 40) desc = desc.slice(0, cut);
    desc = desc.trimEnd() + "…";
  }

  const prefix = LANG === "ru" ? "ru/" : "";
  const pageUrl = slug =>
    `${SITE_ORIGIN}/${prefix}docs.html?page=${slug}`;
  setHead('meta[name="description"]', "meta",
    { name: "description", content: desc });
  setHead('meta[property="og:title"]', "meta",
    { property: "og:title", content: title });
  setHead('meta[property="og:description"]', "meta",
    { property: "og:description", content: desc });
  setHead('meta[property="og:url"]', "meta",
    { property: "og:url", content: pageUrl(page) });
  setHead('link[rel="canonical"]', "link",
    { rel: "canonical", href: pageUrl(page) });
  setHead('link[rel="alternate"][hreflang="en"]', "link",
    { rel: "alternate", hreflang: "en",
      href: `${SITE_ORIGIN}/docs.html?page=${page}` });
  setHead('link[rel="alternate"][hreflang="ru"]', "link",
    { rel: "alternate", hreflang: "ru",
      href: `${SITE_ORIGIN}/ru/docs.html?page=${page}` });
  setHead('link[rel="alternate"][hreflang="x-default"]', "link",
    { rel: "alternate", hreflang: "x-default",
      href: `${SITE_ORIGIN}/docs.html?page=${page}` });
}

async function render() {
  const { page, anchor } = route();
  currentPage = page;

  [...navEl.querySelectorAll("a")].forEach(a =>
    a.classList.toggle("on", a.dataset.slug === page));

  let md;
  try {
    const r = await fetch(`docs/${page}.md`);
    if (!r.ok) throw new Error(r.status);
    md = await r.text();
  } catch {
    bodyEl.innerHTML = `<h1>${T.loadFailH}</h1><p>${T.loadFailP(page)}</p>`;
    return;
  }

  // explicit heading ids: a trailing <!-- #id --> on a heading line wins
  // over the auto-slug (used by the RU pages to keep EN anchors; renders
  // as a comment on GitHub). Fenced code ignored.
  const explicitIds = [];
  let inFence = false;
  md = md.split("\n").map(line => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return line; }
    if (inFence || !/^#{1,3} /.test(line)) return line;
    const m = line.match(/\s*<!--\s*#([A-Za-z0-9-]+)\s*-->\s*$/);
    explicitIds.push(m ? m[1] : null);
    return m ? line.replace(/\s*<!--\s*#[A-Za-z0-9-]+\s*-->\s*$/, "") : line;
  }).join("\n");

  bodyEl.innerHTML = marked.parse(md);

  // img/x.png in the .md files → docs/img/x.png (files also preview on GitHub)
  bodyEl.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute("src");
    if (src && !src.includes("/") && !src.includes(":")) img.src = `docs/img/${src}`;
    else if (src && src.startsWith("img/")) img.src = `docs/${src}`;
    img.setAttribute("loading", "lazy");
  });

  // a.md links → ?page=a ; a.md#b → ?page=a#b
  bodyEl.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute("href");
    const m = href.match(/^([\w-]+)\.md(?:#(.*))?$/);
    if (m) a.setAttribute("href", `?page=${m[1]}${m[2] ? "#" + m[2] : ""}`);
    else if (/^(https?:)?\/\//.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
  });

  // heading ids + in-page TOC from h2s
  const used = new Set();
  const h2s = [];
  let ord = 0;
  bodyEl.querySelectorAll("h1, h2, h3").forEach(h => {
    const base = explicitIds[ord++] || slugify(h.textContent);
    let id = base;
    for (let i = 2; used.has(id); i++) id = `${base}-${i}`;
    used.add(id);
    h.id = id;
    if (h.tagName === "H2") h2s.push(h);
  });

  tocEl.innerHTML = h2s.length > 1
    ? `<p class="toc-title">${T.onThisPage}</p>` +
      h2s.map(h => `<a href="#${h.id}">${h.textContent}</a>`).join("")
    : "";

  const lb = bodyEl.querySelector("[data-link-builder]");
  if (lb) mountLinkBuilder(lb);
  mountThemeExamples(bodyEl);

  // prev / next footer
  const i = PAGES.findIndex(p => p.slug === page);
  const prev = PAGES[i - 1], next = PAGES[i + 1];
  bodyEl.insertAdjacentHTML("beforeend",
    `<nav class="docs-prevnext">
       ${prev ? `<a class="pn" href="?page=${prev.slug}">← ${prev.title}</a>` : "<span></span>"}
       ${next ? `<a class="pn" href="?page=${next.slug}">${next.title} →</a>` : "<span></span>"}
     </nav>`);

  setDocHead(page, PAGES[i].title);

  const target = anchor && document.getElementById(anchor);
  (target || bodyEl).scrollIntoView(target ? {} : { block: "start" });
  if (!target) window.scrollTo(0, 0);

  document.dispatchEvent(new CustomEvent("docs:rendered"));
}

function mountLinkBuilder(el) {
  el.classList.add("link-builder");
  const L = T.lb;

  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("for", "lb-url");
  urlLabel.textContent = L.urlLabel;
  const urlInput = document.createElement("input");
  urlInput.id = "lb-url";
  urlInput.type = "url";
  urlInput.placeholder = L.urlPh;
  urlInput.autocomplete = "off";
  urlInput.spellcheck = false;

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "lb-name");
  nameLabel.textContent = L.nameLabel;
  const nameInput = document.createElement("input");
  nameInput.id = "lb-name";
  nameInput.type = "text";
  nameInput.placeholder = L.namePh;
  nameInput.autocomplete = "off";
  nameInput.spellcheck = false;

  const err = document.createElement("p");
  err.className = "link-builder-error";
  err.setAttribute("role", "alert");
  err.hidden = true;

  const out = document.createElement("div");
  out.className = "link-builder-output";
  out.hidden = true;

  const linkPre = document.createElement("pre");
  const linkCode = document.createElement("code");
  linkPre.appendChild(linkCode);
  const linkRow = document.createElement("div");
  linkRow.className = "link-builder-actions";
  const copyLink = document.createElement("button");
  copyLink.type = "button";
  copyLink.textContent = L.copyLink;
  const open = document.createElement("a");
  open.textContent = L.open;
  linkRow.append(copyLink, open);

  const htmlCap = document.createElement("p");
  htmlCap.className = "link-builder-caption";
  htmlCap.textContent = L.htmlCap;
  const htmlPre = document.createElement("pre");
  const htmlCode = document.createElement("code");
  htmlPre.appendChild(htmlCode);
  const htmlRow = document.createElement("div");
  htmlRow.className = "link-builder-actions";
  const copyHtml = document.createElement("button");
  copyHtml.type = "button";
  copyHtml.textContent = L.copyHtml;
  htmlRow.appendChild(copyHtml);

  out.append(linkPre, linkRow, htmlCap, htmlPre, htmlRow);
  el.append(urlLabel, urlInput, nameLabel, nameInput, err, out);

  function fail(msg) {
    err.textContent = msg;
    err.hidden = false;
    out.hidden = true;
  }

  function update() {
    const url = urlInput.value.trim();
    err.hidden = true;
    if (!url) { out.hidden = true; return; }
    let u;
    try { u = new URL(url); }
    catch { return fail(L.errFull); }
    if (u.protocol !== "https:")
      return fail(L.errHttps);
    if (u.username || u.password)
      return fail(L.errCred);
    const name = nameInput.value.trim();
    const link = "qubiq://add?url=" + encodeURIComponent(url) +
      (name ? "&name=" + encodeURIComponent(name) : "");
    if (link.length > 262144)
      return fail(L.errSize);
    linkCode.textContent = link;
    open.setAttribute("href", link);
    htmlCode.textContent =
      `<a href="${link.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">${L.addBtn}</a>`;
    out.hidden = false;
  }

  wireCopy(copyLink, linkCode, L.copied);
  wireCopy(copyHtml, htmlCode, L.copied);

  urlInput.addEventListener("input", update);
  nameInput.addEventListener("input", update);
  update();
}

function wireCopy(btn, code, copiedLabel) {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      const label = btn.textContent;
      btn.textContent = copiedLabel;
      setTimeout(() => { btn.textContent = label; }, 1500);
    } catch {
      const s = getSelection();
      s.removeAllRanges();
      s.selectAllChildren(code);
    }
  });
}

const HEX_COLOR = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

// Theme-profile JSON blocks get a color preview strip and a Copy button.
function mountThemeExamples(root) {
  root.querySelectorAll("pre > code.language-json").forEach(code => {
    let theme;
    try { theme = JSON.parse(code.textContent); }
    catch { return; }
    if (!theme || typeof theme !== "object" || Array.isArray(theme) ||
        !Array.isArray(theme.backgroundColors) ||
        typeof theme.buttonColor !== "string") return;

    // marked leaves a trailing newline inside fenced code; drop it so
    // the rendered block and the copied JSON stay a single line
    code.textContent = code.textContent.replace(/\n+$/, "");

    const pick = k =>
      typeof theme[k] === "string" && HEX_COLOR.test(theme[k])
        ? theme[k] : null;

    const pre = code.parentElement;
    const wrap = document.createElement("div");
    wrap.className = "theme-example";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    const strip = document.createElement("div");
    strip.className = "theme-preview";
    strip.setAttribute("aria-hidden", "true");
    const stops = theme.backgroundColors.filter(c =>
      typeof c === "string" && HEX_COLOR.test(c));
    if (stops.length)
      strip.style.background = stops.length === 1 ? stops[0]
        : `linear-gradient(90deg, ${stops.join(", ")})`;

    const chip = () => {
      const d = document.createElement("div");
      d.className = "tp-chip";
      return d;
    };
    const rowChip = (bg, name, ms, title, sub) => {
      const c = chip();
      c.style.background = bg;
      const n = document.createElement("span");
      n.textContent = name;
      n.style.color = title;
      const t = document.createElement("span");
      t.className = "tp-ms";
      t.textContent = ms;
      t.style.color = sub;
      c.append(n, t);
      strip.appendChild(c);
    };

    const btnBg = pick("buttonColor"), pwr = pick("powerIconColor");
    if (btnBg && pwr) {
      const c = document.createElement("div");
      c.className = "tp-power";
      c.style.background = btnBg;
      c.style.color = pwr;
      c.textContent = "⏻";
      strip.appendChild(c);
    }
    const hdr = pick("subsHeaderColor"), hdrTxt = pick("disclosureHeaderTextColor");
    if (hdr && hdrTxt) {
      const c = chip();
      c.style.background = hdr;
      c.style.color = hdrTxt;
      c.textContent = "Aa";
      strip.appendChild(c);
    }
    const sel = pick("selectedServerRowColor"),
      rowTitle = pick("serverRowTitleTextColor"),
      rowSub = pick("serverRowSubTitleTextColor");
    if (sel && rowTitle && rowSub)
      rowChip(sel, "Amsterdam", "38 ms", rowTitle, rowSub);
    const rowBg = pick("serverRowBackgroundColor");
    if (rowBg && rowTitle && rowSub)
      rowChip(rowBg, "Frankfurt", "52 ms", rowTitle, rowSub);
    const tint = pick("settingsControlsTintColor");
    if (tint) {
      const sw = document.createElement("div");
      sw.className = "tp-switch";
      sw.style.background = tint;
      strip.appendChild(sw);
    }

    const copyRow = document.createElement("div");
    copyRow.className = "link-builder-actions";
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.textContent = T.lb.copyJson;
    copyRow.appendChild(copyBtn);

    wrap.insertBefore(strip, pre);
    wrap.appendChild(copyRow);
    wireCopy(copyBtn, code, T.lb.copied);
  });
}

function scrollToAnchor(anchor) {
  const el = anchor && document.getElementById(anchor);
  if (el) el.scrollIntoView();
}

function countView() {
  if (window.goatcounter && window.goatcounter.count)
    window.goatcounter.count({ path: location.pathname + location.search });
}

// sidebar
navEl.innerHTML = `<p class="docs-nav-title">${T.guide}</p>` +
  PAGES.map(p => `<a href="?page=${p.slug}" data-slug="${p.slug}">${p.title}</a>`).join("");

// same-document navigation: ?page= links render without a reload
document.addEventListener("click", e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
    return;
  const a = e.target.closest("a[href]");
  if (!a || !a.closest(".docs-layout") || a.target === "_blank") return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname)
    return;
  const q = url.searchParams.get("page");
  const target = PAGES.some(p => p.slug === q) ? q : PAGES[0].slug;
  if (target === currentPage && url.search === location.search)
    return; // only the hash differs — native scroll
  e.preventDefault();
  history.pushState(null, "", url.pathname + url.search + url.hash);
  if (target === currentPage) {
    scrollToAnchor(safeDecode(url.hash.replace(/^#/, "")));
    return;
  }
  countView();
  render();
});

addEventListener("popstate", () => {
  const { page, anchor } = route();
  if (page === currentPage) {
    if (anchor) scrollToAnchor(anchor);
    else window.scrollTo(0, 0);
    return;
  }
  countView();
  render();
});

// manual hash edits scroll to the anchor; page changes go through ?page=
addEventListener("hashchange", () => scrollToAnchor(route().anchor));

upgradeLegacyHash();
render();
