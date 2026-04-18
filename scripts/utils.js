export async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

export async function fetchText(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.text();
}

export function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function safeLink(value) {
  if (!value) {
    return null;
  }

  const trimmed = String(value).trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function parseDateValue(value) {
  if (!value) {
    return Number.NEGATIVE_INFINITY;
  }

  const timestamp = Date.parse(value);
  if (!Number.isNaN(timestamp)) {
    return timestamp;
  }

  const year = Number.parseInt(String(value), 10);
  if (!Number.isNaN(year)) {
    return Date.parse(`${year}-01-01`);
  }

  return Number.NEGATIVE_INFINITY;
}
