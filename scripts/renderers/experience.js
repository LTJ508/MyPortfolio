import { escapeHtml } from "../utils.js";

export function renderExperience(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map(
      (item) => `
      <article class="card">
        <h3>${escapeHtml(item.role)}</h3>
        <p>${escapeHtml(item.company)} - ${escapeHtml(item.location)}</p>
        <div class="meta">
          <span class="chip">${escapeHtml(item.period)}</span>
        </div>
        <p>${escapeHtml(item.details)}</p>
      </article>
    `
    )
    .join("");
}
