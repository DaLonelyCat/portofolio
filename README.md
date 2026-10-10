# Portfolio and Curriculum Vitae

A personal portfolio and interactive CV for Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, CFO at Fruqita, and software builder. Designed in a physical, textured dark editorial aesthetic. Built for static export deployment on Cloudflare Pages and Workers.

---

## Design System

- **Charcoal Base**: `#121316` background with `#F0EFEB` crisp off-white text (16.15:1 contrast, WCAG AAA compliant).
- **Matte Surfaces**: `#1A1B20` for elevated case-study and project containers.
- **Hairline Rules**: `#2C2D35` structural dividers and borders.
- **Warm Copper Accent**: `#E07A5F` for interactive links, focus states, and primary actions (6.30:1 contrast ratio).
- **Tactile Texture**: Lightweight static SVG noise overlay (`/noise.svg` at 3.5% opacity) adding material depth without animation cost.
- **Typography**: IBM Plex Sans in light (300) and regular (400) weights, self-hosted via `@fontsource/ibm-plex-sans`.
- **Accessibility**: Full keyboard navigation support (Tab, Enter, Escape) and high-contrast focus rings.

---

## Features

1. **Editorial Presentation**: Bold display typography and personal builder statement.
2. **Learning & Research**: Status on 3D Drosophila brain connectomics, agentic AI, and multimedia systems.
3. **Featured Production Case Study**: Deep dive into UniCash POS (Fruqita) with interactive screenshot tabs (Cashier, Sales Log, Financials).
4. **Chronological Project Archive**: Year-grouped catalog (`2026`, `2025`, `2024`) with category filtering.
5. **Operational History**: Work record as CFO and software developer at Fruqita, Founder at MyBeans, and BINUS CS education.
6. **Technical Competencies**: 4-column matrix indexing languages, frameworks, systems, and operations.
7. **Direct Contact**: Instant clipboard email copy with visual feedback and direct mailto link.
8. **CV Viewer**: Dedicated `/cv` route embedding the curriculum vitae with print and download capabilities.
9. **Colophon & Terminal**: Formal colophon footer with hidden `Ctrl+K` command terminal easter egg.

---

## Development and Deployment

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:2010](http://localhost:2010) in your browser.

### Deploying to Cloudflare Pages
1. Push your repository to GitHub.
2. Connect your repository in the Cloudflare Dashboard under Workers and Pages.
3. Build command: `npm run build`
4. Output directory: `out`
