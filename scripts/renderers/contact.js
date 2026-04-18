import { escapeHtml, safeLink } from "../utils.js";

export function renderContact(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map((item) => {
      const href = safeLink(item.href);
      const valueHtml = href
        ? `<a class="link-tag" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.value)}</a>`
        : `<span>${escapeHtml(item.value)}</span>`;

      return `
        <article class="card">
          <h3>${escapeHtml(item.type)}</h3>
          <p>${valueHtml}</p>
        </article>
      `;
    })
    .join("");
}
