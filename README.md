# Portfolio and Curriculum Vitae

A personal portfolio and interactive CV for Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, CFO at Fruqita, and software builder. Designed in a calm editorial style with a warm paper and dark ink aesthetic. Built for static export deployment on Cloudflare Pages and Workers.

---

## Design System

- **Paper Foundation**: `#F6F1E7` background with `#1C1A17` dark ink text.
- **Muted Contrast**: `#5B554B` for secondary captions, metadata, and dates (6.54:1 contrast ratio, WCAG AA compliant).
- **Hairline Rules**: `#D9D1C1` borders providing structural layout without heavy container cards.
- **Rust Accent**: `#8F3B1F` highlighting interactive links, focus states, and primary actions (6.60:1 contrast ratio).
- **Typography**: IBM Plex Sans in light (300) and regular (400) weights.
- **Accessibility**: Full keyboard navigation support (Tab, Enter, Escape) and high-contrast focus rings.

---

## Features

1. **Editorial Presentation**: Clear background summary and narrative bio.
2. **Learning & Research**: Overview of active studies in 3D Drosophila brain connectomics, agentic AI, and multimedia systems.
3. **Selected Work Index**: Filterable project catalog with deep-dive problem, solution, and impact dialogs.
4. **Experience & Education**: Chronological record of operational roles and academic coursework.
5. **Direct Contact**: Instant clipboard email copy with visual confirmation and mailto dispatch.
6. **CV Viewer**: Dedicated `/cv` route embedding the curriculum vitae with quick print and download actions.
7. **Terminal Easter Egg**: Quiet command palette accessible via `Ctrl+K` or `⌘K`.

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css         # Baseline typography, focus indicators, and print styles
│   │   ├── layout.tsx          # Font configuration, meta tags, and OpenGraph data
│   │   ├── page.tsx            # Single-page editorial portfolio
│   │   └── cv/page.tsx         # CV reader and PDF viewer
│   ├── components/
│   │   ├── Navbar.tsx          # Clean header with responsive drawer
│   │   ├── Hero.tsx            # Overview and background snapshot
│   │   ├── Learning.tsx        # Active learning topics
│   │   ├── Projects.tsx        # Filterable project index
│   │   ├── ProjectModal.tsx    # Accessible project overview modal
│   │   ├── Experience.tsx      # Work history and formal education
│   │   ├── Skills.tsx          # Categorized competency lists
│   │   ├── ContactSection.tsx  # Direct email copy and links
│   │   ├── TacticalTerminal.tsx # Hidden terminal easter egg
│   │   └── Toast.tsx           # Notification toast
│   ├── types/
│   │   └── portfolio.ts        # TypeScript data definitions
│   └── data/
│       └── portfolio.ts        # Central data source for personal, project, and CV information
├── DESIGN.md                   # Design system documentation
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

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
