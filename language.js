(function () {
  const KEY = "qubiq-language";
  const current = document.documentElement.lang.toLowerCase().startsWith("ru") ? "ru" : "en";

  const valid = value => value === "ru" || value === "en";
  const read = () => {
    try {
      const value = localStorage.getItem(KEY);
      if (valid(value)) return value;
    } catch {}
    try {
      const value = sessionStorage.getItem(KEY);
      if (valid(value)) return value;
    } catch {}
    return "";
  };
  const write = value => {
    try {
      localStorage.setItem(KEY, value);
      return;
    } catch {}
    try {
      sessionStorage.setItem(KEY, value);
    } catch {}
  };
  const browserLanguage = () => {
    const list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    for (const item of list) {
      const lang = String(item).toLowerCase().replace("_", "-");
      if (lang === "ru" || lang.startsWith("ru-")) return "ru";
      if (lang === "en" || lang.startsWith("en-")) return "en";
    }
    return "en";
  };
  const counterpart = target => {
    const path = location.pathname;
    if (target === "ru") {
      if (path.endsWith("/")) return path + "ru/";
      return path.replace(/([^/]+)$/, "ru/$1");
    }
    return path.replace(/\/ru(?=\/|$)/, "") || "/";
  };

  window.QubiqLanguage = {
    setPreference(lang) {
      if (valid(lang)) write(lang);
    },
  };

  const preferred = read() || browserLanguage();
  if (preferred === current) return;
  const target = counterpart(preferred);
  if (!target || target === location.pathname) return;
  location.replace(target + location.search + location.hash);
})();
