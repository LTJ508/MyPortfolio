import { escapeHtml, safeLink } from "../utils.js";

export function renderPublications(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map((item) => {
      const doiLink = item.doi ? safeLink(`https://doi.org/${item.doi}`) : null;

      return `
        <article class="card">
          <p class="single-line"><strong>${escapeHtml(item.title)}</strong> - ${escapeHtml(item.status)} (${escapeHtml(item.year)}) - ${escapeHtml(item.authorOrder)}</p>
          ${doiLink ? `<a class="link-tag" href="${escapeHtml(doiLink)}" target="_blank" rel="noopener noreferrer">DOI: ${escapeHtml(item.doi)}</a>` : ""}
        </article>
      `;
    })
    .join("");
}
