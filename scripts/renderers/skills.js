import { createMultiFilter, renderFilterControls } from "../filters.js";
import { escapeHtml } from "../utils.js";

export function renderSkills(data, filtersElement, mountElement) {
  const allGroups = data.groups || [];
  const filterItems = allGroups.map((group) => ({ category: group.category }));
  const filter = createMultiFilter(filterItems, "category");

  function paint() {
    renderFilterControls(filtersElement, filter, paint);

    const active = new Set(filter.snapshot());
    const groups = active.size
      ? allGroups.filter((group) => active.has(group.category))
      : allGroups;

    if (!groups.length) {
      mountElement.innerHTML = '<p class="empty-state">No skills found for this filter.</p>';
      return;
    }

    mountElement.innerHTML = groups
      .map((group) => {
        const items = (group.items || []).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("");

        return `
          <article class="card">
            <h3>${escapeHtml(group.category)}</h3>
            <div class="meta">${items}</div>
          </article>
        `;
      })
      .join("");
  }

  paint();
}
