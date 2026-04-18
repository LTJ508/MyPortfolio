import { createMultiFilter, renderFilterControls } from "../filters.js";
import { escapeHtml, parseDateValue, safeLink } from "../utils.js";

export function renderProjects(data, filtersElement, mountElement) {
  const items = [...(data.items || [])].sort((a, b) => parseDateValue(b.completedAt) - parseDateValue(a.completedAt));
  const filter = createMultiFilter(items, "category");

  function paint() {
    renderFilterControls(filtersElement, filter, paint);

    const filtered = filter.apply();
    if (!filtered.length) {
      mountElement.innerHTML = '<p class="empty-state">No projects found for selected category.</p>';
      return;
    }

    mountElement.innerHTML = filtered
      .map((item) => {
        const demo = safeLink(item.links?.demo);
        const repo = safeLink(item.links?.repo);

        return `
          <article class="card">
            <h3>${escapeHtml(item.emoji || "")}&nbsp; ${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.details)}</p>
            <div class="meta">
              <span class="chip">${escapeHtml(item.category)}</span>
              <span class="chip">Completed: ${escapeHtml(item.completedAt)}</span>
            </div>
            <div class="link-group">
              ${demo ? `<a class="link-tag" href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
              ${repo ? `<a class="link-tag" href="${escapeHtml(repo)}" target="_blank" rel="noopener noreferrer">Repository</a>` : ""}
            </div>
          </article>
        `;
      })
      .join("");
  }

  paint();
}
