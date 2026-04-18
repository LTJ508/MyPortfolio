import { escapeHtml } from "../utils.js";

export function renderAbout(data, mountElement) {
  const interests = (data.interests || []).map((interest) => `<span class="chip">${escapeHtml(interest)}</span>`).join("");

  mountElement.innerHTML = `
    <div class="card">
      <h3 class="single-line">${escapeHtml(data.headline || "")}</h3>
      <p class="multi-line">${escapeHtml(data.shortBio || "")}</p>
      <div class="meta">${interests}</div>
    </div>
  `;
}
