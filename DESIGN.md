# DESIGN.md: Space and Cyberpunk Observatory Design System

## Identity & Mood
A personal portfolio and interactive engineering dossier for Christian Emanuel Ikajaya: computer science student, founder, and systems builder. The aesthetic blends a deep cosmic void with sharp cyberpunk telemetry: electric neon cyan accents, solid alloy backing panels for razor-sharp readability, and floating HUD navigation pills.

## Dial Settings
- **ENERGY**: 2 (Focused, confident, real engineering showcase)
- **RHYTHM**: 3 (Varied compositions: flight deck hero with telemetry HUD, core engineering project directory with category filter rail, 3-column research frontiers grid, operational flight log, 4-column systems matrix, comms uplink console, semi-fullscreen project modal)
- **MOTION**: 2 (Interactive 3D Solar System with canonical planetary orbits and calm celestial drift; zero dizzying parallax displacement)

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
1. **Solid Alloy Surfaces**: All text containers use 95% opacity dark alloy backing (`bg-[#0B0D16]/95`) with frosted backdrop diffusion, ensuring text is never washed out by background star clusters or planetary paths.
2. **Deep Space Scrim**: An 80% opaque void wash (`bg-[#05060A]/80`) and dimmed orbital opacity (`opacity-45`) guarantees content readability without sacrificing cosmic depth.
3. **High-Contrast Typography**: Display headlines and titles render in pure white (`#FFFFFF`), while body copy is set in slate-200 / slate-300 and metadata in slate-400.

## Shape & HUD System
- **HUD Navigation**: Dual-state fluid navigation bar with seamless scroll transformation: spans full width across the viewport at the top of the page, and fluidly morphs into a centered floating capsule pill with frosted glass depth (`backdrop-blur-2xl`), cyan starlight borders, and top specular reflection highlights upon scrolling. Flashing dot removed for clean typography.
- **Surface Panels**: `rounded-2xl` and `rounded-3xl` alloy cards with subtle hairline borders (`border-white/10`) and neon hover states.
- **Pill Badges & Tags**: Monospace status chips (`[ PRODUCTION CORE ]`, `[ CURRENT ]`, `[ MATRIX // 01 ]`) with translucent neon badges.
- **Profile Avatar**: Framed profile portrait with cyber cyan rim glow (purged of flashing dots or redundant tags).
- **Semi-Fullscreen Modal**: Expansive `max-w-6xl` responsive dialog with two-column space utilization and dedicated frosted cards for Problem, Solution, and Impact.

## Background Simulation: Isometric 3D Solar System
1. **Isometric Projection & Depth**: Orbital plane inclined at ~33 degrees with diagonal orientation, turning circular orbits into dynamic isometric ellipses with true 3D spatial depth.
2. **Central Star (The Sun in the Middle)**: Radiant emissive core (`#FFBA08`) with pulsating additive corona halo, outer starlight lens aura, and 4.5 intensity PointLight illumination casting day/night terminator lines across orbiting bodies.
3. **8 Orbiting Planets**: Mercury, Venus, Earth (with Moon), Mars, Jupiter, Saturn (with tilted rings), Uranus, and Neptune revolving in 3D depth, sweeping in front of and behind the Sun.
4. **Holographic Trajectory Rails**: Glowing starlight cyan and blue orbital paths with enhanced visibility (`0.38` opacity) outlining planetary flight tracks.
5. **Calibrated Scrim & Contrast**: 90% canvas visibility paired with a subtle depth vignette wash (`bg-[#05060A]/35`), allowing the celestial motion to shine through between the solid 95% alloy UI cards.
6. **Distant Starfield**: 1,600 ambient stars providing atmospheric cosmic scale.

## Typography
- **Primary Family**: IBM Plex Sans, self-hosted locally via `@fontsource/ibm-plex-sans` (zero external runtime network calls).
- **Monospace Family**: System monospace for telemetry badges, IDs, years, and status codes.
- **Hierarchy**: Guided by font scale, tracking, and structural hierarchy.

## Layout Narrative Flow
1. **Flight Deck Hero**: Profile picture with cyber frame, "Hello, I'm Christian" headline, bio, action buttons, and Station Telemetry HUD module.
2. **Engineering Projects**: Primary directory with category filter rail, year markers, conversational "View Details" buttons, and UniCash POS highlighted with `PRODUCTION CORE`.
3. **Research Frontiers**: 3-column grid covering Connectomics, Agentic AI, and Multimedia.
4. **Operational Flight Log**: Detailed career timeline covering venture leadership, financial oversight, and software engineering.
5. **Systems Competencies**: 4-column capability matrix.
6. **Comms Uplink**: Direct email console and official platform vector logos (GitHub, LinkedIn, CV PDF).
7. **Colophon Footer**: Minimal cyber footer with edge deployment status.

## Design Decisions & Verification
- **Direct & Grounded Hero**: Removed all flashing dots, Hero tags, and corny one-liners to focus purely on Christian's identity, headline, and bio.
- **Conversational Action Copy**: Replaced "Dossier" with "View Details" for intuitive everyday browsing.
- **Semi-Fullscreen Detail View**: Expanded modal dialog to `max-w-6xl` to comfortably display rich technical overviews, problem/solution breakdowns, and high-resolution screenshots.
- **Repository Link Hygiene**: Verified that project source links exclusively navigate to valid individual repositories rather than general profile pages.
- **No Em Dashes**: Pure standard punctuation with colons, commas, and parentheses.
- **Zero Terminal Remnants**: Clean codebase without command line or terminal components.
