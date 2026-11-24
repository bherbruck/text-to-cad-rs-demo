// The site's few behaviours: theme toggle, copy buttons, mobile menu, and client-side search.
(() => {
  const root = document.documentElement.dataset.root || "./";

  // Theme: light / dark, remembered; the default follows the system.
  const theme = document.querySelector("button.theme");
  theme?.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  });

  // Copy buttons on code blocks.
  for (const b of document.querySelectorAll("pre.code .copy")) {
    b.addEventListener("click", async () => {
      const code = b.parentElement.querySelector("code").innerText;
      try {
        await navigator.clipboard.writeText(code);
        b.textContent = "Copied";
      } catch {
        b.textContent = "Select";
      }
      setTimeout(() => (b.textContent = "Copy"), 1200);
    });
  }

  // Mobile menu: the sidebar (on docs pages) or the main nav.
  const menu = document.querySelector("button.menu");
  if (document.querySelector(".sidebar")) document.body.classList.add("has-sidebar");
  menu?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if (document.body.classList.contains("nav-open") && e.target.closest(".sidebar a, .main-nav a")) document.body.classList.remove("nav-open");
  });

  // Search: a small index of titles, headings and text, scored by term.
  const input = document.querySelector(".search input");
  const box = document.querySelector(".search .results");
  if (!input || !box) return;
  let index = null;
  let active = -1;
  const load = async () => {
    if (index) return index;
    try {
      const r = await fetch(root + "search-index.json");
      index = await r.json();
    } catch {
      index = [];
    }
    return index;
  };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const show = async () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { box.classList.remove("open"); return; }
    const terms = q.split(/\s+/).filter(Boolean);
    const docs = await load();
    const hits = [];
    for (const d of docs) {
      const t = d.t.toLowerCase();
      const x = d.x.toLowerCase();
      let score = 0;
      let anchor = null;
      let ok = true;
      for (const term of terms) {
        let s = 0;
        if (t.includes(term)) s += t.startsWith(term) ? 12 : 8;
        for (const [h, id] of d.h) {
          if (h.toLowerCase().includes(term)) { s += 4; anchor ??= id; }
        }
        if (x.includes(term)) s += 1;
        if (!s) { ok = false; break; }
        score += s;
      }
      if (ok) hits.push({ d, score, anchor });
    }
    hits.sort((a, b) => b.score - a.score);
    active = -1;
    box.innerHTML = hits.length
      ? hits.slice(0, 12).map(({ d, anchor }) => {
          const h = anchor ? d.h.find(([, id]) => id === anchor)[0] : "";
          return `<a href="${root}${d.u}${anchor ? "#" + anchor : ""}">${esc(d.t)}<small>${esc(d.s)}${h ? " · " + esc(h) : ""}</small></a>`;
        }).join("")
      : `<div class="none">No results for “${esc(q)}”</div>`;
    box.classList.add("open");
  };
  input.addEventListener("input", show);
  input.addEventListener("focus", () => { load(); if (input.value) show(); });
  input.addEventListener("keydown", (e) => {
    const links = [...box.querySelectorAll("a")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      active = Math.max(0, Math.min(links.length - 1, active + (e.key === "ArrowDown" ? 1 : -1)));
      links.forEach((l, i) => l.classList.toggle("active", i === active));
    } else if (e.key === "Enter" && links.length) {
      location.href = links[Math.max(active, 0)].href;
    } else if (e.key === "Escape") {
      box.classList.remove("open");
      input.blur();
    }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) box.classList.remove("open"); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input && !/input|textarea/i.test(document.activeElement?.tagName || "")) {
      e.preventDefault();
      input.focus();
    }
  });
})();
