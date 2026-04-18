import { createSingleFilter, renderFilterControls } from "../filters.js";
import { escapeHtml } from "../utils.js";

export function renderSkills(data, filtersElement, mountElement) {
  const allGroups = data.groups || [];
  const filterItems = allGroups.map((group) => ({ category: group.category }));
  const filter = createSingleFilter(filterItems, "category");

  function paint() {
    renderFilterControls(filtersElement, filter, paint);

    const selected = filter.snapshot();
    const groups = selected === null
      ? allGroups
      : allGroups.filter((group) => group.category === selected);

    if (!groups.length) {
      mountElement.innerHTML = '<p class="empty-state">No skills found for this filter.</p>';
      return;
    }

    mountElement.innerHTML = groups
      .map((group) => {
        const items = (group.items || []).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("");
        const icon = group.emoji || "✨";

        return `
          <article class="card floating-card skill-card">
            <div class="card-icon">${escapeHtml(icon)}</div>
            <h3 class="card-title">${escapeHtml(group.category)}</h3>
            <div class="meta">${items}</div>
          </article>
        `;
      })
      .join("");
  }

  paint();
}
