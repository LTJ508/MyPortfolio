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
          <article class="card floating-card cert-card">
            <div class="card-icon">${escapeHtml(item.emoji || "🎓")}</div>
            <h3 class="card-title multi-line">${escapeHtml(item.course)}</h3>
            <p class="card-subtitle single-line">${escapeHtml(item.provider)}</p>
            <p class="meta-text">Date: ${escapeHtml(item.date)}</p>
            ${
              link
                ? `<div class="link-group centered-links"><a class="btn btn-link-action" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Verify Certificate</a></div>`
                : ""
            }
          </article>
        `;
      })
      .join("");
  }

  paint();
}
