import { escapeHtml } from "../utils.js";

export function renderEducation(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map(
      (item) => `
      <article class="card">
        <h3>${escapeHtml(item.degree)}</h3>
        <p>${escapeHtml(item.institution)}</p>
        <div class="meta">
          <span class="chip">Passing Year: ${escapeHtml(item.passingYear)}</span>
          <span class="chip">Result: ${escapeHtml(item.result)}</span>
        </div>
      </article>
    `
    )
    .join("");
}
