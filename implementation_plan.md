# Portfolio Revamp Implementation Plan

## Goal
Redesign the personal portfolio website to present a professional, polished UI that highlights 5+ GitHub projects, updated skill metrics, live demos, Cisco badges, and an improved resume download experience. Fix the broken navigation button, replace placeholder contact details, and enhance visual effects for a seamless, expert look.

---

## User Review Required
- **Resume PDF source**: Provide the updated CV file (or path) that should be uploaded for download.
- **Cisco badge access**: Confirm if badge images are available locally or need to be fetched from a Cisco account (provide URLs or files).
- **Preferred communication apps**: List the software (e.g., LinkedIn, WhatsApp, email) that should be linked from the contact section.
- **Live demo URLs**: Verify the correct URLs for each project demo (bimafast, under‑1000, KDMS, etc.).
- **Colour/theme preferences**: Confirm any specific colour palette or font families you want to keep.
- **Hosting environment**: Confirm that the site is served from `http://localhost:8080/` and if any build step (e.g., static server) is required.

---

## Open Questions
> [!IMPORTANT] Are there any accessibility requirements (ARIA, contrast) we must satisfy?
> [!IMPORTANT] Should the resume be offered as both PDF and a printable HTML version?
> [!IMPORTANT] Do you want the Cisco badge tile to include hover tooltips describing each certification?

---

## Proposed Changes
### 1. Home Page (index.html, style.css, app.js)
- **[MODIFY] index.html** – Replace the current hero section with a clean layout showcasing 5+ GitHub projects, each as a card containing:
  - Project name, short description, tech‑stack badge, and a "Live Demo" button.
  - Add a professional tagline (e.g., "Full‑Stack Engineer Open to Software Opportunities").
- **[MODIFY] style.css** – Remove blinking animations; introduce a subtle glass‑morphism card style, smoother hover transitions, and a refined colour palette (dark‑mode friendly). Add a highlight effect on card click.
- **[MODIFY] app.js** – Implement the navigation button functionality (smooth scroll to sections). Add click handlers for project cards to animate highlight effect.

### 2. Resume / CV Section
- **[NEW] resume.html** – Simple page with a styled download button linking to the PDF.
- **[MODIFY] index.html** – Add a "Resume" button in the navigation that opens `resume.html`.
- **[UPLOAD] SOPHY_NALIAKA_WAFULA_CV.pdf** – (User to provide) placed in `assets/` directory.
- **[MODIFY] app.js** – Add download tracking analytics (optional).

### 3. Navigation Button
- Fix the broken option navigation button:
  - Ensure the button has an `id="nav-options"` and attaches a click listener that toggles the mobile menu.
  - Update CSS for smooth slide‑down animation.

### 4. Skills Section
- Update skill percentages in HTML markup.
- Add progress‑bar UI (CSS) to visualise the percentages.
- Ensure the list reflects: Python 80%, JavaScript 84%, Kotlin 50%, HTML/CSS 89%, C++ 70%, MySQL 85%.

### 5. Projects Section
- Group projects by technical stack (e.g., **JavaScript**, **Kotlin**, **Python**).
- For each project card display:
  - Title, brief blurb, tech‑stack icons, live‑demo link, GitHub link.
  - Projects: **bimafast**, **under‑1000 (online thrift)**, **KDMS**, **Medtriage** (private note), plus educational repos.
- Ensure the list updates dynamically from a JSON data file (`projects.json`).

### 6. Live Demo Links
- Add verified URLs to each project card.
- Include fallback message if a demo is unavailable.

### 7. Cisco Badges Tile
- **[NEW] cisco-badges.html** – Single tiled component displaying badge icons in a row.
- Use CSS Grid to align badges uniformly.
- Hover tooltip shows badge name and date.
- Integrate this tile under the "Certifications" section.

### 8. Contact / Connect Section
- Remove placeholder "Jane Doe" details.
- Insert your proper name, email, phone, and links to preferred communication apps (e.g., LinkedIn, WhatsApp).
- Ensure each link opens in a new tab and uses appropriate URL schemes.
- Update footnote text to a professional tagline (e.g., "© 2026 Sophy Naliaka Wafula – All Rights Reserved").

### 9. UI Effects & Polish
- Replace the purple moving lines with a subtle background gradient animation.
- Add focus/highlight effect on interactive elements (buttons, cards) via CSS `:focus-visible`.
- Refine icon set: use a consistent style (e.g., Feather icons) and ensure proper sizing.
- Apply a professional font family (e.g., "Inter" from Google Fonts).
- Ensure responsive layout across mobile, tablet, and desktop.

### 10. Accessibility & Performance
- Add `alt` attributes to all images.
- Ensure colour contrast meets WCAG AA.
- Lazy‑load images and demo thumbnails.
- Minify CSS/JS for production.

---

## Verification Plan
### Automated Tests
- Run `npm run lint` (if a bundler is used) to ensure no syntax errors.
- Use a headless browser script to verify that navigation links scroll to the correct sections.
- Check that the resume download link returns a 200 response and correct `Content‑Type`.

### Manual Verification
- Open the site in Chrome/Firefox and confirm:
  - Home hero shows 5+ project cards with correct links.
  - Navigation button toggles the menu.
  - Skill bars display correct percentages.
  - Cisco badge tile appears and tooltips work.
  - Contact info reflects your details and links open correctly.
  - Visual effects (highlights, background animation) are smooth and not distracting.
- Test on mobile viewport for responsive layout.

---

*Once the above open questions are answered, the implementation can proceed.*
