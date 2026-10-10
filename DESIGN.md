# DESIGN.md: Deep Space Observatory Portfolio Design System

## Identity & Mood
A personal portfolio and interactive CV for Christian Emanuel Ikajaya: computer science student, founder, and software builder. The mood is a refined Deep Space Observatory aesthetic, blending the quiet vastness of an interstellar void with architectural precision, starlight contrast, and tactile depth.

## Dial Settings
- **ENERGY**: 2 (Focused, confident, real screenshot showcase)
- **RHYTHM**: 3 (Varied compositions: standalone display hero, minimal 2-column academic split, featured POS dossier, integrated directory ledger toolbar, asymmetric career timeline, 4-column competency matrix, colophon footer)
- **MOTION**: 2 (Lightweight 3D rotating spiral galaxy simulation with protective background blur; subtle hover and focus transitions)

## Theme & Palette
Deep space observatory palette engineered for long reading sessions and high contrast:

| Token | Hex | Role | Contrast on Background |
|---|---|---|---|
| `page` | `#090A10` | Interstellar void baseline | Baseline |
| `surface` | `#11131E` | Deep-space observatory container | Baseline surface |
| `rule` | `#222638` | Celestial hairline dividers and borders | Structural only |
| `ink` | `#F0F2F8` | Crisp starlight primary text and headings | 17.5:1 (WCAG AAA) |
| `muted` | `#949AB0` | Cosmic dust secondary text, captions, dates | 6.8:1 (WCAG AAA) |
| `accent` | `#E07A5F` | Solar flare / pulsar copper-amber accent | 6.1:1 (WCAG AA) |

## Background Architecture
1. **Procedural Spiral Galaxy Simulation**: 1,800 stars (800 on mobile) distributed across 3 logarithmic spiral arms via Three.js. Slow orbital rotation (0.03 rad/s), 35-degree perspective tilt, and subtle mouse/scroll parallax.
2. **Protective Background Blur**: A `backdrop-blur-[2px] bg-page/40` overlay guarantees that star particles never compete with foreground letterforms, preserving razor-sharp text clarity.
3. **Stardust Noise**: A lightweight static SVG noise texture (`/noise.svg`, 3% opacity overlay) gives tactile physical depth without GPU strain.

## Typography
- **Primary Family**: IBM Plex Sans, self-hosted locally via `@fontsource/ibm-plex-sans` (zero external runtime network calls).
- **Weights**: Light (`font-light`, 300) for display headings; Regular (`font-normal`, 400) for body and UI elements.
- **Hierarchy**: Governed by font size, letterform spacing, and structural whitespace rather than excessive bold weights.

## Layout Compositions (RHYTHM 3)
- **Hero**: Standalone display headline and executive summary without decorative eyebrow badges.
- **Active Explorations**: Clean 2-column flex layout with strict topic title and status pills only (zero descriptive sentences).
- **Featured Case Study**: Production core dossier for UniCash POS (Fruqita) with interactive 5-screen tabs.
- **Project Index**: Integrated directory ledger toolbar with category filter buttons aligned on the header line.
- **Experience**: Asymmetric 2-column split with sticky section summary on left and career timeline on right.
- **Skills**: Architectural 4-column competency matrix.
- **Contact**: Direct conversational inquiry card with one-click email copy.
- **Command Palette**: Hidden `Cmd+K` / `Ctrl+K` palette easter egg with zero terminal terminology.

## Design Decisions & One-Line Reasons (R-31)
- **Deep Space Palette**: Interstellar void and starlight off-white provide effortless legibility without harsh white glare.
- **Galaxy Simulation**: A lightweight 3D celestial canvas visually grounds the builder's curiosity in connectomics and computing.
- **Protective Blur**: Soft backdrop blur ensures foreground typography achieves flawless WCAG AAA legibility.
- **Screenshots**: Real production software images anchor credibility and prove shipped engineering capability.
- **Typography**: IBM Plex Sans delivers architectural clarity without aggressive bold styling.
- **Spacing**: Generous structural spacing guides reader attention and separates narrative milestones.
- **No Em Dashes**: Clean, natural human punctuation using colons, commas, and parentheses.
