# DESIGN.md: Space and Cyberpunk Observatory Design System

## Identity & Mood
A personal portfolio and interactive engineering dossier for Christian Emanuel Ikajaya: computer science student, founder, and systems builder. The aesthetic blends a deep cosmic void with sharp cyberpunk telemetry: electric neon cyan accents, solid alloy backing panels for razor-sharp readability, and floating HUD navigation pills.

## Dial Settings
- **ENERGY**: 2 (Focused, confident, real engineering showcase)
- **RHYTHM**: 3 (Varied compositions: flight deck hero with telemetry HUD, core engineering project directory with category filter rail, 3-column research frontiers grid, operational flight log, 4-column systems matrix, comms uplink console)
- **MOTION**: 2 (Dense blooming spiral galaxy with calm, steady orbital rotation; zero dizzying parallax displacement)

## Theme & Palette
Space and Cyberpunk palette engineered for maximum legibility and high contrast:

| Token | Hex | Role | Contrast on Background |
|---|---|---|---|
| `page` | `#05060A` | Deep orbital space void | Baseline void |
| `surface` | `#0B0D16` | High-opacity cyber alloy panel backing | 95% solid container surface |
| `rule` | `#1C2236` | Celestial structural dividers and borders | Structural only |
| `ink` | `#FFFFFF` | Razor-sharp starlight text and headings | 21:1 (WCAG AAA) |
| `muted` | `#94A3B8` | Cool telemetry slate secondary text | 7.2:1 (WCAG AAA) |
| `accent` | `#00F0FF` | Electric neon cyan primary HUD accent | 13.8:1 on `#05060A` |
| `neonAmber` | `#F59E0B` | Production core and active status amber | 9.4:1 on `#05060A` |

## Readability Architecture
1. **Solid Alloy Surfaces**: All text containers use 95% opacity dark alloy backing (`bg-[#0B0D16]/95`) with frosted backdrop diffusion, ensuring text is never washed out by background star clusters.
2. **Deep Space Scrim**: An 80% opaque void wash (`bg-[#05060A]/80`) and dimmed star opacity (`opacity-35`) guarantees content readability without sacrificing cosmic depth.
3. **High-Contrast Typography**: Display headlines and titles render in pure white (`#FFFFFF`), while body copy is set in slate-200 / slate-300 and metadata in slate-400.

## Shape & HUD System
- **HUD Navigation**: Floating pill navigation bar with cyber station status indicator and mono labels.
- **Surface Panels**: `rounded-2xl` and `rounded-3xl` alloy cards with subtle hairline borders (`border-white/10`) and neon hover states.
- **Pill Badges & Tags**: Monospace status chips (`[ PRODUCTION CORE ]`, `[ CURRENT ]`, `[ MATRIX // 01 ]`) with translucent neon badges.

## Background Simulation
1. **Dense Galaxy Particle Canvas**: Three.js procedural galaxy simulation (6,000 stars on desktop, 2,500 on mobile) with luminous additive core and spiral arms.
2. **Calm Steady Orbit**: Stable camera coordinates with steady rotation (0.015 rad/s) and zero parallax displacement, keeping reading comfortable.

## Typography
- **Primary Family**: IBM Plex Sans, self-hosted locally via `@fontsource/ibm-plex-sans` (zero external runtime network calls).
- **Monospace Family**: System monospace for telemetry badges, IDs, years, and status codes.
- **Hierarchy**: Guided by font scale, tracking, and structural hierarchy.

## Layout Narrative Flow
1. **Flight Deck Hero**: Status beacon, bold mission statement, bio, and Station Telemetry HUD module.
2. **Engineering Projects**: Primary directory with category filter rail, year markers, and UniCash POS highlighted with `PRODUCTION CORE`.
3. **Research Frontiers**: 3-column grid covering Connectomics, Agentic AI, and Multimedia.
4. **Operational Flight Log**: Detailed career timeline covering venture leadership, financial oversight, and software engineering.
5. **Systems Competencies**: 4-column capability matrix.
6. **Comms Uplink**: Direct email console with one-click copy and messaging actions.
7. **Colophon Footer**: Minimal cyber footer with edge deployment status.

## Design Decisions & Verification
- **Readability Solved**: High-opacity dark containers eliminate previous legibility issues from blooming star fields.
- **Unified Engineering Showcase**: Integrating UniCash POS directly into the primary project directory creates a cohesive archive without redundant featured hero banners.
- **No Em Dashes**: Pure standard punctuation with colons, commas, and parentheses.
- **Zero Terminal Remnants**: Verified clean codebase without command line or terminal components.
