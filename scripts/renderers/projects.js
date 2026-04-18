import { createSingleFilter, renderFilterControls } from "../filters.js";
import { escapeHtml, parseDateValue, safeLink } from "../utils.js";

export function renderProjects(data, filtersElement, mountElement) {
  const items = [...(data.items || [])].sort((a, b) => parseDateValue(b.completedAt) - parseDateValue(a.completedAt));
  const filter = createSingleFilter(items, "category");

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
        const technologies = (item.technologies || []).map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("");

        return `
          <article class="card floating-card project-card">
            <div class="card-icon">${escapeHtml(item.emoji || "📦")}</div>
            <h3 class="card-title multi-line">${escapeHtml(item.name)}</h3>
            <p class="card-description multi-line">${escapeHtml(item.details)}</p>
            <div class="meta">
              <span class="chip">${escapeHtml(item.category)}</span>
              <span class="chip">Completed: ${escapeHtml(item.completedAt)}</span>
            </div>
            ${technologies ? `<div class="meta">${technologies}</div>` : ""}
            <div class="link-group centered-links">
              ${demo ? `<a class="btn btn-link-action" href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
              ${repo ? `<a class="btn btn-link-action" href="${escapeHtml(repo)}" target="_blank" rel="noopener noreferrer">Repository</a>` : ""}
            </div>
          </article>
        `;
      })
      .join("");
  }

  paint();
}
