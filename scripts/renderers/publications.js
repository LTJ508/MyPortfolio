import { escapeHtml, safeLink } from "../utils.js";

export function renderPublications(data, mountElement) {
  mountElement.innerHTML = (data.items || [])
    .map((item) => {
      const doiLink = item.doi ? safeLink(`https://doi.org/${item.doi}`) : null;

      return `
        <article class="card">
          <h3>${escapeHtml(item.title)}</h3>
          <div class="meta">
            <span class="chip">${escapeHtml(item.status)}</span>
            <span class="chip">Year: ${escapeHtml(item.year)}</span>
            <span class="chip">${escapeHtml(item.authorOrder)}</span>
          </div>
          ${doiLink ? `<a class="link-tag" href="${escapeHtml(doiLink)}" target="_blank" rel="noopener noreferrer">DOI: ${escapeHtml(item.doi)}</a>` : ""}
        </article>
      `;
    })
    .join("");
}
