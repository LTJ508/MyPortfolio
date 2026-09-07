/* ============================================================
   JOY KUMAR GHOSH — Academic Portfolio
   Data Loading, Rendering & Interactions
   ============================================================ */

(() => {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    dataPath: './data',
    selfName: 'Joy Kumar Ghosh',
    animationThreshold: 0.12,
    scrollOffset: 100,
  };

  // ===== UTILITY FUNCTIONS =====

  async function loadJSON(filename) {
    try {
      const response = await fetch(`${CONFIG.dataPath}/${filename}`);
      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return null;
    }
  }

  function formatStatusLabel(status) {
    const labels = {
      'published': 'Published',
      'under-preparation': 'Under Preparation',
      'under-review': 'Under Review',
      'preprint': 'Preprint',
    };
    return labels[status] || status;
  }

  function highlightSelfAuthor(authors) {
    return authors.map(author => {
      if (author === CONFIG.selfName) {
        return `<span class="self-author">${author}</span>`;
      }
      return author;
    }).join(', ');
  }

  // ===== RENDER FUNCTIONS =====

  function renderHero(profile) {
    const container = document.getElementById('hero-content');
    if (!container || !profile) return;

    const socialLinks = [];

    if (profile.links.linkedin) {
      socialLinks.push(`<a href="${profile.links.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn" class="hero-social-link"><i class="fab fa-linkedin-in"></i></a>`);
    }
    if (profile.links.github) {
      socialLinks.push(`<a href="${profile.links.github}" target="_blank" rel="noopener" aria-label="GitHub" class="hero-social-link"><i class="fab fa-github"></i></a>`);
    }
    if (profile.links.googleScholar) {
      socialLinks.push(`<a href="${profile.links.googleScholar}" target="_blank" rel="noopener" aria-label="Google Scholar" class="hero-social-link"><i class="ai ai-google-scholar"></i></a>`);
    }
    if (profile.links.orcid) {
      socialLinks.push(`<a href="${profile.links.orcid}" target="_blank" rel="noopener" aria-label="ORCID" class="hero-social-link"><i class="ai ai-orcid"></i></a>`);
    }
    socialLinks.push(`<a href="mailto:${profile.email}" aria-label="Email" class="hero-social-link"><i class="fas fa-envelope"></i></a>`);

    const initials = profile.name.split(' ').map(n => n[0]).join('');

    container.innerHTML = `
      <div class="hero-text">
        <span class="hero-label">Hello, I'm</span>
        <h1 class="hero-name">${profile.name}</h1>
        <p class="hero-tagline">${profile.tagline}</p>
        <p class="hero-bio">${profile.bio}</p>
        <div class="hero-meta">
          <span class="hero-meta-item"><i class="fas fa-map-marker-alt"></i> ${profile.location}</span>
          <span class="hero-meta-item"><i class="fas fa-university"></i> ${profile.affiliation}</span>
        </div>
        <div class="hero-social">${socialLinks.join('')}</div>
        <div class="hero-cta">
          <a href="#publications" class="btn btn-primary"><i class="fas fa-book-open"></i> View Publications</a>
          <a href="resume/Joy%20Kumar%20Ghosh.pdf" download class="btn btn-outline"><i class="fas fa-download"></i> Download CV</a>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-image-wrapper">
          <img src="${profile.photo}" alt="Photo of ${profile.name}" id="profile-photo">
          <div class="hero-initials" id="profile-initials" style="display:none">${initials}</div>
        </div>
      </div>
    `;

    // Handle missing profile photo
    const img = document.getElementById('profile-photo');
    if (img) {
      img.addEventListener('error', function () {
        this.style.display = 'none';
        const initialsEl = document.getElementById('profile-initials');
        if (initialsEl) initialsEl.style.display = 'flex';
      });
    }
  }

  function renderResearchInterests(interests) {
    const container = document.getElementById('research-content');
    if (!container || !interests) return;

    container.classList.add('stagger-children');

    container.innerHTML = interests.map(item => `
      <div class="research-card animate-on-scroll">
        <div class="research-card-icon">
          <i class="fas ${item.icon}"></i>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  }

  function renderPublications(publications) {
    const container = document.getElementById('publications-content');
    if (!container || !publications) return;

    container.classList.add('stagger-children');

    container.innerHTML = publications.map(pub => {
      const statusClass = `pub-status-${pub.status}`;
      const isHighlighted = pub.highlight ? 'highlighted' : '';

      // Build links
      const links = [];
      if (pub.links.pdf) {
        links.push(`<a href="${pub.links.pdf}" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>`);
      }
      if (pub.links.doi) {
        links.push(`<a href="${pub.links.doi}" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-link"></i> DOI</a>`);
      }
      if (pub.links.code) {
        links.push(`<a href="${pub.links.code}" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-code"></i> Code</a>`);
      }

      // Build venue line
      let venue = '';
      if (pub.journal) {
        venue = `${pub.journal}`;
        if (pub.volume) venue += `, ${pub.volume}`;
        venue += `, ${pub.year}`;
        if (pub.publisher) venue += ` — ${pub.publisher}`;
      } else if (pub.year) {
        venue = `${pub.year}`;
      }

      return `
        <div class="pub-card ${isHighlighted} animate-on-scroll">
          <div class="pub-header">
            <span class="pub-status ${statusClass}">${formatStatusLabel(pub.status)}</span>
            <span class="pub-type">${pub.type}</span>
          </div>
          <h3 class="pub-title">${pub.title}</h3>
          <p class="pub-authors">${highlightSelfAuthor(pub.authors)}</p>
          ${venue ? `<p class="pub-venue">${venue}</p>` : ''}
          ${pub.abstract ? `<p class="pub-abstract">${pub.abstract}</p>` : ''}
          <div class="pub-tags">
            ${pub.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          ${links.length > 0 ? `<div class="pub-links">${links.join('')}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  function renderTimelineItem(item) {
    let linksHtml = '';
    if (item.links) {
      const linkEntries = [];
      if (item.links.demo) linkEntries.push(`<a href="${item.links.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fas fa-external-link-alt"></i> Live Demo</a>`);
      if (item.links.report) linkEntries.push(`<a href="${item.links.report}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fas fa-file-alt"></i> Report</a>`);
      if (item.links.repository) linkEntries.push(`<a href="${item.links.repository}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fab fa-github"></i> Repository</a>`);
      if (linkEntries.length > 0) {
        linksHtml = `<div class="timeline-links">${linkEntries.join('')}</div>`;
      }
    }

    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h4 class="timeline-title">${item.title}</h4>
            <span class="timeline-period">${item.period}</span>
          </div>
          <p class="timeline-org">${item.organization}${item.location ? ` • ${item.location}` : ''}</p>
          ${item.supervisor ? `<p class="timeline-supervisor"><i class="fas fa-user-tie"></i> Supervisor: ${item.supervisor}</p>` : ''}
          <ul class="timeline-bullets">
            ${item.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
          ${linksHtml}
        </div>
      </div>
    `;
  }

  function renderExperience(experience) {
    const container = document.getElementById('experience-content');
    if (!container || !experience) return;

    let html = '';

    // Research
    if (experience.research && experience.research.length > 0) {
      html += `
        <div class="experience-category animate-on-scroll">
          <h3 class="subsection-title"><i class="fas fa-flask"></i> Research</h3>
          <div class="timeline">
            ${experience.research.map(renderTimelineItem).join('')}
          </div>
        </div>
      `;
    }

    // Teaching
    if (experience.teaching && experience.teaching.length > 0) {
      html += `
        <div class="experience-category animate-on-scroll">
          <h3 class="subsection-title"><i class="fas fa-chalkboard-teacher"></i> Teaching</h3>
          <div class="timeline">
            ${experience.teaching.map(renderTimelineItem).join('')}
          </div>
        </div>
      `;
    }

    // Industry
    if (experience.industry && experience.industry.length > 0) {
      html += `
        <div class="experience-category animate-on-scroll">
          <h3 class="subsection-title"><i class="fas fa-briefcase"></i> Industry</h3>
          <div class="timeline">
            ${experience.industry.map(renderTimelineItem).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  function renderEducation(profile) {
    const container = document.getElementById('education-content');
    if (!container || !profile) return;

    let html = '';

    // Education Cards
    if (profile.education && profile.education.length > 0) {
      html += `
        <div class="education-grid animate-on-scroll">
          ${profile.education.map(edu => `
            <div class="edu-card">
              <div class="edu-icon"><i class="fas fa-graduation-cap"></i></div>
              <div class="edu-details">
                <h3>${edu.institution}</h3>
                <p class="edu-degree">${edu.degree}</p>
                <div class="edu-meta">
                  <span class="edu-badge"><i class="fas fa-star"></i> ${edu.distinction}</span>
                  <span class="edu-meta-item"><i class="fas fa-chart-line"></i> CGPA: ${edu.cgpa} (${edu.equivalentMarks})</span>
                  <span class="edu-meta-item"><i class="fas fa-calendar-alt"></i> ${edu.period}</span>
                  <span class="edu-meta-item"><i class="fas fa-map-marker-alt"></i> ${edu.location}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Honors & Awards
    if (profile.honorsAwards && profile.honorsAwards.length > 0) {
      html += `
        <h3 class="subsection-title animate-on-scroll" style="margin-top: 16px;"><i class="fas fa-trophy"></i> Honors & Awards</h3>
        <div class="honors-grid stagger-children">
          ${profile.honorsAwards.map(honor => `
            <div class="honor-card animate-on-scroll">
              <div class="honor-icon"><i class="fas ${honor.icon || 'fa-award'}"></i></div>
              <div class="honor-details">
                <h4>${honor.title}</h4>
                <p class="honor-issuer">${honor.issuer} • ${honor.date || honor.period}</p>
                ${honor.description ? `<p class="honor-description">${honor.description}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = html;
  }

  function renderProjects(projects) {
    const container = document.getElementById('projects-content');
    if (!container || !projects) return;

    container.classList.add('stagger-children');

    container.innerHTML = projects.map(project => {
      const links = [];
      if (project.links.report) {
        links.push(`<a href="${project.links.report}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fas fa-file-alt"></i> Report</a>`);
      }
      if (project.links.repository) {
        links.push(`<a href="${project.links.repository}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fab fa-github"></i> Repository</a>`);
      }
      if (project.links.demo) {
        links.push(`<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fas fa-external-link-alt"></i> Demo</a>`);
      }

      return `
        <div class="project-card animate-on-scroll">
          <div class="project-meta">
            <span class="project-course">${project.course}</span>
            <span class="project-semester">${project.semester}</span>
          </div>
          <h3>${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  function renderSkillsAndCertifications(profile, certifications) {
    const container = document.getElementById('skills-content');
    if (!container) return;

    let skillsHtml = '';
    let certsHtml = '';

    // Skills
    if (profile && profile.skills) {
      const groups = Object.entries(profile.skills).map(([category, skills]) => `
        <div class="skill-group">
          <p class="skill-group-title">${category}</p>
          <div class="skill-pills">
            ${skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
          </div>
        </div>
      `).join('');

      skillsHtml = `
        <div class="skills-section">
          <h3><i class="fas fa-code"></i> Technical Skills</h3>
          ${groups}
        </div>
      `;
    }

    // Certifications
    if (certifications && certifications.length > 0) {
      const certCards = certifications.map(cert => `
        <a href="${cert.link}" target="_blank" rel="noopener" class="cert-card">
          <div class="cert-icon"><i class="fas ${cert.icon}"></i></div>
          <div class="cert-info">
            <h4>${cert.title}</h4>
            <p class="cert-issuer">${cert.issuer}</p>
          </div>
          <i class="fas fa-arrow-right cert-arrow"></i>
        </a>
      `).join('');

      certsHtml = `
        <div class="certifications-section">
          <h3><i class="fas fa-certificate"></i> Certifications</h3>
          <div class="cert-list">
            ${certCards}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="skills-certifications-layout animate-on-scroll">
        ${skillsHtml}
        ${certsHtml}
      </div>
    `;
  }

  function renderFooter(profile) {
    const container = document.getElementById('footer-content');
    if (!container || !profile) return;

    const socialLinks = [];
    if (profile.links.linkedin) socialLinks.push(`<a href="${profile.links.linkedin}" target="_blank" rel="noopener" class="footer-social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>`);
    if (profile.links.github) socialLinks.push(`<a href="${profile.links.github}" target="_blank" rel="noopener" class="footer-social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>`);
    if (profile.links.googleScholar) socialLinks.push(`<a href="${profile.links.googleScholar}" target="_blank" rel="noopener" class="footer-social-link" aria-label="Google Scholar"><i class="ai ai-google-scholar"></i></a>`);
    if (profile.links.orcid) socialLinks.push(`<a href="${profile.links.orcid}" target="_blank" rel="noopener" class="footer-social-link" aria-label="ORCID"><i class="ai ai-orcid"></i></a>`);
    socialLinks.push(`<a href="mailto:${profile.email}" class="footer-social-link" aria-label="Email"><i class="fas fa-envelope"></i></a>`);

    container.innerHTML = `
      <div class="footer-about">
        <h3>${profile.name}</h3>
        <p>${profile.tagline}. ${profile.currentRole} at ${profile.affiliation}.</p>
        <a href="mailto:${profile.email}" class="footer-email"><i class="fas fa-envelope"></i> ${profile.email}</a>
      </div>
      <div class="footer-quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#research">Research Interests</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume / CV</a></li>
        </ul>
      </div>
      <div class="footer-connect">
        <h4>Connect</h4>
        <div class="footer-social-links">
          ${socialLinks.join('')}
        </div>
      </div>
    `;
  }

  // ===== NAVIGATION =====

  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // Mobile toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Close mobile menu on link click
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) + 20}px 0px -50% 0px`,
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          allNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ===== DARK MODE =====

  function initDarkMode() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

    html.setAttribute('data-theme', initialTheme);
    updateIcon(initialTheme);

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
      });
    }

    function updateIcon(theme) {
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  // ===== SCROLL ANIMATIONS =====

  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: CONFIG.animationThreshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  // Re-observe after dynamic content is rendered
  function reInitAnimations() {
    // Small delay to ensure DOM is updated
    requestAnimationFrame(() => {
      initScrollAnimations();
    });
  }

  // ===== SCROLL TO TOP =====

  function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== CURRENT YEAR =====

  function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ===== INITIALIZATION =====

  async function init() {
    // Set year
    setCurrentYear();

    // Init UI features that don't depend on data
    initDarkMode();
    initScrollToTop();

    // Load all data in parallel
    const [profile, publications, experience, projects, certifications] = await Promise.all([
      loadJSON('profile.json'),
      loadJSON('publications.json'),
      loadJSON('experience.json'),
      loadJSON('projects.json'),
      loadJSON('certifications.json'),
    ]);

    // Render all sections
    renderHero(profile);
    renderResearchInterests(profile?.researchInterests);
    renderPublications(publications);
    renderExperience(experience);
    renderEducation(profile);
    renderProjects(projects);
    renderSkillsAndCertifications(profile, certifications);
    renderFooter(profile);

    // Init navigation (after content is rendered)
    initNavigation();

    // Init scroll animations (after all content is in DOM)
    reInitAnimations();
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);
})();
