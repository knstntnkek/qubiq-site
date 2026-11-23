/* docs.js — renders docs/*.md into the guide. Edit the markdown, not this file.
   Page list lives in PAGES; hash routing: docs.html#<page>/<anchor>.
   Bilingual: RU pages live under ru/ — same slugs, translated titles.
   RU headings carry explicit {#id} anchors matching the EN slugs. */

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

function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  const [page, anchor] = h.split("/");
  return {
    page: PAGES.some(p => p.slug === page) ? page : PAGES[0].slug,
    anchor: anchor || "",
  };
}

async function render() {
  const { page, anchor } = route();

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

  // explicit heading ids: a trailing {#id} on a heading line wins over the
  // auto-slug (used by the RU pages to keep EN anchors). Fenced code ignored.
  const explicitIds = [];
  let inFence = false;
  md = md.split("\n").map(line => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return line; }
    if (inFence || !/^#{1,3} /.test(line)) return line;
    const m = line.match(/\s*\{#([A-Za-z0-9-]+)\}\s*$/);
    explicitIds.push(m ? m[1] : null);
    return m ? line.replace(/\s*\{#[A-Za-z0-9-]+\}\s*$/, "") : line;
  }).join("\n");

  bodyEl.innerHTML = marked.parse(md);

  // img/x.png in the .md files → docs/img/x.png (files also preview on GitHub)
  bodyEl.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute("src");
    if (src && !src.includes("/") && !src.includes(":")) img.src = `docs/img/${src}`;
    else if (src && src.startsWith("img/")) img.src = `docs/${src}`;
    img.setAttribute("loading", "lazy");
  });

  // a.md links → #a (hash routing); a.md#b → #a/b
  bodyEl.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute("href");
    const m = href.match(/^([\w-]+)\.md(?:#(.*))?$/);
    if (m) a.setAttribute("href", `#${m[1]}${m[2] ? "/" + m[2] : ""}`);
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
      h2s.map(h => `<a href="#${page}/${h.id}">${h.textContent}</a>`).join("")
    : "";

  const lb = bodyEl.querySelector("[data-link-builder]");
  if (lb) mountLinkBuilder(lb);

  // prev / next footer
  const i = PAGES.findIndex(p => p.slug === page);
  const prev = PAGES[i - 1], next = PAGES[i + 1];
  bodyEl.insertAdjacentHTML("beforeend",
    `<nav class="docs-prevnext">
       ${prev ? `<a class="pn" href="#${prev.slug}">← ${prev.title}</a>` : "<span></span>"}
       ${next ? `<a class="pn" href="#${next.slug}">${next.title} →</a>` : "<span></span>"}
     </nav>`);

  document.title = `${PAGES[i].title} ${T.titleSuffix}`;

  const target = anchor && document.getElementById(anchor);
  (target || bodyEl).scrollIntoView(target ? {} : { block: "start" });
  if (!target) window.scrollTo(0, 0);
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

  function wireCopy(btn, code) {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        const label = btn.textContent;
        btn.textContent = L.copied;
        setTimeout(() => { btn.textContent = label; }, 1500);
      } catch {
        const s = getSelection();
        s.removeAllRanges();
        s.selectAllChildren(code);
      }
    });
  }
  wireCopy(copyLink, linkCode);
  wireCopy(copyHtml, htmlCode);

  urlInput.addEventListener("input", update);
  nameInput.addEventListener("input", update);
  update();
}

// sidebar
navEl.innerHTML = `<p class="docs-nav-title">${T.guide}</p>` +
  PAGES.map(p => `<a href="#${p.slug}" data-slug="${p.slug}">${p.title}</a>`).join("");

addEventListener("hashchange", render);
render();
