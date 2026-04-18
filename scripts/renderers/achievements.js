import { escapeHtml, parseDateValue } from "../utils.js";

export function renderAchievements(data, mountElement) {
  const items = [...(data.items || [])].sort((a, b) => parseDateValue(b.year) - parseDateValue(a.year));

  mountElement.innerHTML = items
    .map(
      (item) => `
      <article class="card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.provider)}</p>
        <div class="meta">
          <span class="chip">Year: ${escapeHtml(item.year)}</span>
          <span class="chip">${escapeHtml(item.context)}</span>
        </div>
      </article>
    `
    )
    .join("");
}
