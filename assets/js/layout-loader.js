const SHARED_BASE = "https://ishrakfarhanb-spec.github.io";

async function injectFragment(place, name) {
  const el = document.querySelector(`[data-include="${place}"]`);
  if (!el) return;
  const base = SHARED_BASE || "";
  const url = `${base}/shared/${name}.html`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    el.innerHTML = html;
    document.dispatchEvent(new CustomEvent(`${place}:loaded`, { detail: { url } }));
  } catch (err) {
    console.error(`Failed to load ${place} from ${url}:`, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectFragment("header", "header");
  injectFragment("footer", "footer");
});
