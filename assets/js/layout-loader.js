// PROJECT SITE base (your Pages URL path)
const SHARED_BASE = "https://ishrakfarhanb-spec.github.io/ishrakfarhan.b.github.io";

async function inject(place, name) {
  const mount = document.querySelector(`[data-include="${place}"]`);
  if (!mount) return;
  const url = `${SHARED_BASE}/shared/${name}.html`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    mount.innerHTML = await res.text();
    document.dispatchEvent(new CustomEvent(`${place}:loaded`, { detail: { url } }));
  } catch (e) {
    console.error(`[layout-loader] Failed to load ${place} from ${url}`, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inject("header", "header");
  inject("footer", "footer");
});
