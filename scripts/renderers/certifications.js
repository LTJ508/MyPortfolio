import { createSingleFilter, renderFilterControls } from "../filters.js";
import { escapeHtml, parseDateValue, safeLink } from "../utils.js";

export function renderCertifications(data, filtersElement, mountElement) {
  const items = [...(data.items || [])].sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date));
  const filter = createSingleFilter(items, "provider");

  function paint() {
    renderFilterControls(filtersElement, filter, paint);

    const filtered = filter.apply();
    if (!filtered.length) {
      mountElement.innerHTML = '<p class="empty-state">No certifications found for selected provider.</p>';
      return;
    }

    mountElement.innerHTML = filtered
      .map((item) => {
        const link = safeLink(item.verificationLink);

        return `
          <article class="card">
            <h3>${escapeHtml(item.emoji || "")}&nbsp; ${escapeHtml(item.course)}</h3>
            <p>${escapeHtml(item.provider)}</p>
            <div class="meta">
              <span class="chip">Date: ${escapeHtml(item.date)}</span>
            </div>
            ${
              link
                ? `<a class="link-tag" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Verify Certificate</a>`
                : ""
            }
          </article>
        `;
      })
      .join("");
  }

  paint();
}
