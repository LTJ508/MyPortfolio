import { escapeHtml } from "./utils.js";

export function createMultiFilter(items, keyName) {
  const selected = new Set();

  function options() {
    return Array.from(new Set(items.map((item) => item[keyName]).filter(Boolean))).sort((a, b) =>
      String(a).localeCompare(String(b))
    );
  }

  function toggle(value) {
    if (selected.has(value)) {
      selected.delete(value);
    } else {
      selected.add(value);
    }
  }

  function clear() {
    selected.clear();
  }

  function apply() {
    if (selected.size === 0) {
      return items;
    }

    return items.filter((item) => selected.has(item[keyName]));
  }

  function snapshot() {
    return Array.from(selected);
  }

  return {
    options,
    toggle,
    clear,
    apply,
    snapshot,
  };
}

export function renderFilterControls(container, filter, onChange) {
  const active = new Set(filter.snapshot());
  const chipButtons = filter
    .options()
    .map((option) => {
      const isActive = active.has(option) ? " active" : "";
      return `<button class="filter-chip${isActive}" data-filter-value="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`;
    })
    .join("");

  container.innerHTML = `${chipButtons}<button class="filter-chip" data-filter-clear="true" type="button">Clear</button>`;

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const clearValue = button.getAttribute("data-filter-clear");
      const filterValue = button.getAttribute("data-filter-value");

      if (clearValue === "true") {
        filter.clear();
      } else if (filterValue) {
        filter.toggle(filterValue);
      }

      onChange();
    });
  });
}
