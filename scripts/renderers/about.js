import { escapeHtml, safeLink } from "../utils.js";

export function renderAbout(data, mountElement, resumePath) {
  const interests = (data.interests || []).map((interest) => `<span class="chip">${escapeHtml(interest)}</span>`).join("");

  const contacts = (data.quickContacts || [])
    .map((contact) => {
      const href = safeLink(contact.href);
      if (!href) {
        return `<span class="chip">${escapeHtml(contact.label)}: ${escapeHtml(contact.value)}</span>`;
      }

      return `<a class="link-tag" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
        contact.label
      )}: ${escapeHtml(contact.value)}</a>`;
    })
    .join("");

  mountElement.innerHTML = `
    <div class="card">
      <h3>${escapeHtml(data.headline || "")}</h3>
      <p>${escapeHtml(data.shortBio || "")}</p>
      <div class="meta">${interests}</div>
      <div class="link-group">
        ${contacts}
        <a class="btn" href="${escapeHtml(resumePath)}" download>Resume PDF</a>
      </div>
    </div>
  `;
}
