import { escapeHtml } from "../utils.js";

export function renderEducation(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map(
      (item) => `
      <article class="card">
        <p class="single-line"><strong>${escapeHtml(item.degree)}</strong> - ${escapeHtml(item.institution)} - ${escapeHtml(item.passingYear)} - ${escapeHtml(item.result)}</p>
      </article>
    `
    )
    .join("");
}
