# Cyberpunk Neon Portfolio & CV for Vercel

A modern, high-performance web portfolio and interactive CV for a **UI/UX Designer & Creative Developer**, crafted with an authentic **Cyberpunk neon aesthetic** featuring Electric Cyan, Neon Magenta, Acid Amber, chamfered HUD geometry, and CRT scanlines. Built for instant, zero-configuration deployment on **Vercel**.

---

## Visual Design & Aesthetics

- **Void Black Foundation**: `#030308` background with dark tech carbon `#080911` and `#0d0f1a` surfaces.
- **Neon Color Triad**:
  - **Electric Cyan (`#00f0ff`)**: Primary telemetry, active focus rings, and glowing neon edges.
  - **Neon Magenta (`#ff0055`)**: High-energy CTA buttons, alert badges, and laser highlights.
  - **Acid Yellow (`#ffe600`)**: Technical status codes, coordinates, and telemetry badges.
  - **Matrix Green (`#00ff9f`)**: Real-time system online beacon.
- **Tactical HUD Geometry**: Chamfered cut corners (`clip-corner`), corner crosshairs (`+`), and monospace telemetry tags (`SYS://ONLINE`, `CASE_FILE // 01`).
- **Retro-Futuristic CRT Scanlines**: Subtle background scanline overlay with restrained opacity.
- **WCAG AA Compliance**: High-contrast typography and neon focus outlines for full keyboard accessibility.

---

## Features

1. **HUD Navigation Dock**: Tactical telemetry badge, section jump anchors, mobile drawer menu, and quick comms link.
2. **Featured Case Dossiers**: Interactive protocol filtering (`[ ALL_SYSTEMS ]`, `[ PRODUCT_DESIGN ]`, etc.) with an accessible modal dialog for deep-dive problem/solution/impact overviews.
3. **Operational Logs Timeline**: Chronological CV career history with glowing data nodes and accomplishment telemetry.
4. **Cyberware Competency Matrix**: Categorized skills breakdown (Design, Code, Workflow) with contextual descriptions and power status nodes.
5. **Encrypted Comms Uplink**: Instant clipboard copy with cyberpunk feedback toast notification and direct `mailto:` transmission.
6. **Print-Friendly Mode**: Built-in `@media print` stylesheet that strips dark backgrounds and formats a clean black-and-white physical/PDF CV when pressing "Export CV (PDF)" or `Ctrl+P` / `Cmd+P`.

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css         # Glassmorphism utilities, scrollbars, and print styles
│   │   ├── layout.tsx          # Meta tags, SEO, and OpenGraph configuration
│   │   └── page.tsx            # Main single-page portfolio layout
│   ├── components/
│   │   ├── Navbar.tsx          # Floating header with mobile responsive drawer
│   │   ├── Hero.tsx            # Introduction, bio summary, and quick CTAs
│   │   ├── Projects.tsx        # Filterable project gallery
│   │   ├── ProjectModal.tsx    # Accessible modal dialog for case studies
│   │   ├── Experience.tsx      # Interactive career history & education
│   │   ├── Skills.tsx          # Categorized competency matrix
│   │   ├── ContactSection.tsx  # Direct email copy, social links, and footer
│   │   └── Toast.tsx           # Accessible notification toast
│   ├── types/
│   │   └── portfolio.ts        # TypeScript data definitions
│   └── data/
│       └── portfolio.ts        # Central data source for all personal and CV information
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## Customizing Your Information

All portfolio content is decoupled from components and stored in a single typed configuration file:
👉 **`src/data/portfolio.ts`**

To personalize:
1. Update `personal.name`, `personal.role`, `personal.bio`, and `personal.socials` with your information.
2. Edit or add projects in `projects` array with your case studies, screenshots, and live demo URLs.
3. Update your work history in `experiences` array and degree info in `education`.
4. Adjust skills in `skillCategories` to match your core capabilities.

---

## Development & Deployment

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:2010](http://localhost:2010) in your browser.

### Deploying to Vercel
1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Vercel automatically detects Next.js; click **"Deploy"** with default settings.
5. Your portfolio will be live with a global edge CDN and automatic HTTPS!
