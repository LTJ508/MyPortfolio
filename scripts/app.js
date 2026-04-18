import { fetchJson, fetchText } from "./utils.js";
import { renderEducation } from "./renderers/education.js";
import { renderExperience } from "./renderers/experience.js";
import { renderSkills } from "./renderers/skills.js";
import { renderCertifications } from "./renderers/certifications.js";
import { renderProjects } from "./renderers/projects.js";
import { renderPublications } from "./renderers/publications.js";
import { renderAchievements } from "./renderers/achievements.js";
import { renderContact } from "./renderers/contact.js";

const dataFiles = {
  education: "data/education.json",
  experience: "data/experience.json",
  skills: "data/skills.json",
  certifications: "data/certifications.json",
  projects: "data/projects.json",
  publications: "data/publications.json",
  achievements: "data/achievements.json",
  contact: "data/contact.json",
};

const renderers = {
  education: (data) => renderEducation(data, document.getElementById("education-content")),
  experience: (data) => renderExperience(data, document.getElementById("experience-content")),
  skills: (data) => renderSkills(data, document.getElementById("skills-filters"), document.getElementById("skills-content")),
  certifications: (data) =>
    renderCertifications(data, document.getElementById("certifications-filters"), document.getElementById("certifications-content")),
  projects: (data) => renderProjects(data, document.getElementById("projects-filters"), document.getElementById("projects-content")),
  publications: (data) => renderPublications(data, document.getElementById("publications-content")),
  achievements: (data) => renderAchievements(data, document.getElementById("achievements-content")),
  contact: (data) => renderContact(data, document.getElementById("contact-content")),
};

const typingTexts = [
    "Quantum Computing",
    "Quantum Cryptography",
    "Machine Learning",
    "Scientific Software Development",
    "Research and Publications",
];

function startAboutTypingAnimation() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) {
    return;
  }

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex -= 1;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex += 1;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1000);
}

function setupScrollToTop() {
  const scrollButton = document.getElementById("scroll-to-top");
  if (!scrollButton) {
    return;
  }

  const updateVisibility = () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();

  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

async function loadSections(order, rootElement) {
  for (const key of order) {
    const sectionMarkup = await fetchText(`sections/${key}.html`);
    rootElement.insertAdjacentHTML("beforeend", sectionMarkup);
  }
}

async function loadFooter(site) {
  const footer = document.getElementById("site-footer");
  footer.innerHTML = await fetchText("sections/footer.html");
  const footerContent = document.getElementById("footer-content");
  footerContent.textContent = site.copyright || "";
}

async function start() {
  const site = await fetchJson("data/site.json");
  const root = document.getElementById("sections-root");
  const resumeDownload = document.getElementById("resume-download");
  const brandName = document.getElementById("brand-name");

  if (resumeDownload && site.resumePath) {
    resumeDownload.setAttribute("href", site.resumePath);
  }

  if (brandName && site.name) {
    brandName.textContent = site.name;
  }

  if (site.name && site.title) {
    document.title = `${site.name} | ${site.title}`;
  }

  await loadSections(site.sectionOrder || [], root);

  for (const sectionName of site.sectionOrder || []) {
    const dataPath = dataFiles[sectionName];
    const render = renderers[sectionName];

    if (!dataPath || !render) {
      continue;
    }

    const data = await fetchJson(dataPath);
    render(data, site);
  }

  await loadFooter(site);
  startAboutTypingAnimation();
  setupScrollToTop();
}

start().catch((error) => {
  const root = document.getElementById("sections-root");
  root.innerHTML = `<section class="section"><h2>Unable to load portfolio content</h2><p>${error.message}</p></section>`;
  console.error(error);
});
