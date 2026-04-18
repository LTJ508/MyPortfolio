import { escapeHtml } from "./utils.js";

export function createSingleFilter(items, keyName) {
  let selected = null;

  function options() {
    return Array.from(new Set(items.map((item) => item[keyName]).filter(Boolean))).sort((a, b) =>
      String(a).localeCompare(String(b))
    );
  }

  function select(value) {
    selected = value;
  }

  function clear() {
    selected = null;
  }

  function apply() {
    if (selected === null) {
      return items;
    }

    return items.filter((item) => item[keyName] === selected);
  }

  function snapshot() {
    return selected;
  }

  return {
    options,
    select,
    clear,
    apply,
    snapshot,
  };
}

export function renderFilterControls(container, filter, onChange) {
  const selected = filter.snapshot();
  const chipButtons = filter
    .options()
    .map((option) => {
      const isActive = selected === option ? " active" : "";
      return `<button class="filter-chip${isActive}" data-filter-value="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`;
    })
    .join("");

  container.innerHTML = `<button class="filter-chip${selected === null ? " active" : ""}" data-filter-all="true" type="button">Show All</button>${chipButtons}`;

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const allValue = button.getAttribute("data-filter-all");
      const filterValue = button.getAttribute("data-filter-value");

      if (allValue === "true") {
        filter.clear();
      } else if (filterValue) {
        filter.select(filterValue);
      }

      onChange();
    });
  });
}
