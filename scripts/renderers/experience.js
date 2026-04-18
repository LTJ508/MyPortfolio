import { escapeHtml } from "../utils.js";

export function renderExperience(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map(
      (item) => `
      <article class="card floating-card experience-card">
        <div class="card-icon">${escapeHtml(item.emoji || "💼")}</div>
        <h3 class="card-title">${escapeHtml(item.role)}</h3>
        <p class="card-subtitle">${escapeHtml(item.company)} - ${escapeHtml(item.location)}</p>
        <p class="experience-period">${escapeHtml(item.period)}</p>
        <p class="card-description">${escapeHtml(item.details)}</p>
      </article>
    `
    )
    .join("");
}
