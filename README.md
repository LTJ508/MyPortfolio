# Portfolio Website

This repository now contains a fully static portfolio website built with only HTML, CSS, and JavaScript.

## Highlights

- Fully responsive layout for mobile to large desktop screens.
- Interactive cards and hover effects.
- Section-by-section modular structure.
- Content separated into editable JSON files.
- Multi-select filtering for:
  - Technical skills (by subsection/category)
  - Certifications (by provider)
  - Projects (by category)
- Certifications, projects, and achievements are shown in latest-first order.
- Resume download button included.

## Project Structure

```text
.
|-- index.html
|-- styles/
|   |-- base.css
|   |-- layout.css
|   |-- components.css
|   `-- animations.css
|-- scripts/
|   |-- app.js
|   |-- utils.js
|   |-- filters.js
|   `-- renderers/
|       |-- about.js
|       |-- education.js
|       |-- experience.js
|       |-- skills.js
|       |-- certifications.js
|       |-- projects.js
|       |-- publications.js
|       |-- achievements.js
|       `-- contact.js
|-- sections/
|   |-- about.html
|   |-- education.html
|   |-- experience.html
|   |-- skills.html
|   |-- certifications.html
|   |-- projects.html
|   |-- publications.html
|   |-- achievements.html
|   |-- contact.html
|   `-- footer.html
|-- data/
|   |-- site.json
|   |-- about.json
|   |-- education.json
|   |-- experience.json
|   |-- skills.json
|   |-- certifications.json
|   |-- projects.json
|   |-- publications.json
|   |-- achievements.json
|   `-- contact.json
`-- Resume/
    `-- Joy Kumar Ghosh.pdf
```

## How To Reorder Sections

Update the `sectionOrder` array in `data/site.json`.

Example:

```json
"sectionOrder": [
  "about",
  "projects",
  "skills",
  "contact"
]
```

## How To Update Data

- About text and interests: `data/about.json`
- Education: `data/education.json`
- Work experience: `data/experience.json`
- Technical skills and subsections: `data/skills.json`
- Certifications: `data/certifications.json`
- Projects: `data/projects.json`
- Publications: `data/publications.json`
- Achievements: `data/achievements.json`
- Contact details: `data/contact.json`

## Data Notes

- Certification date format: `YYYY-MM-DD`
- Project completion date format: `YYYY-MM-DD`
- Achievement year can be `YYYY`
- Optional project links:
  - `links.demo`
  - `links.repo`

## Resume Download Link

Resume path is controlled by `resumePath` in `data/site.json`.

Current file:

- `Resume/Joy Kumar Ghosh.pdf`

## Local Preview

Because this site uses `fetch()` for JSON and HTML section files, run it with a local server (not by double-clicking the HTML file).

Quick option using Python:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Deploy To GitHub Pages

1. Push this repository to GitHub.
2. Open repository settings.
3. Go to **Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Save and wait for deployment.

Your portfolio will be available from the GitHub Pages URL.
