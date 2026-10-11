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
- **Seamless Cosmic Continuity**: Full-bleed section divider lines (`border-b border-rule/60` and `footer border-t`) are completely removed, allowing the 3D celestial solar system background to flow without visual interruptions between sections.
- **Right-Side Vertical Category Rail**: On desktop, the Engineering Projects section mounts a dedicated sticky vertical filter rail on the right side with category domain counts, allowing effortless browsing and filtering.
- **Pill Badges & Tags**: Monospace status chips (`[ PRODUCTION CORE ]`, `[ CURRENT ]`, `[ MATRIX // 01 ]`) with translucent neon badges.
- **Profile Avatar**: Framed profile portrait with cyber cyan rim glow (purged of flashing dots or redundant tags).
- **Semi-Fullscreen Modal**: Expansive `max-w-6xl` responsive dialog with two-column space utilization and dedicated frosted cards for Problem, Solution, and Impact.

## Background Simulation: Isometric 3D Solar System
1. **Isometric Projection & Depth**: Orbital plane inclined at ~33 degrees with diagonal orientation, turning circular orbits into dynamic isometric ellipses with true 3D spatial depth.
2. **Central Star (The Sun in the Middle)**: Radiant emissive core (`#FFBA08`) with pulsating additive corona halo, outer starlight lens aura, and 4.5 intensity PointLight illumination casting day/night terminator lines across orbiting bodies. Configured with `depthWrite: false` across all corona and halo materials to eliminate Z-buffer black box clipping over planetary orbit paths.
3. **8 Orbiting Planets**: Mercury, Venus, Earth (with Moon), Mars, Jupiter, Saturn (with tilted rings), Uranus, and Neptune revolving in 3D depth, sweeping in front of and behind the Sun.
4. **Holographic Trajectory Rails**: Glowing starlight cyan and blue orbital paths with enhanced visibility (`0.38` opacity) and `depthWrite: false` outlining planetary flight tracks without occlusion artifacts.
5. **Calibrated Scrim & Contrast**: 90% canvas visibility paired with a subtle depth vignette wash (`bg-[#05060A]/35`), allowing the celestial motion to shine through between the solid 95% alloy UI cards.
6. **GPU Procedural Twinkling Starfield**: 1,600 ambient stars rendered via custom GPU ShaderMaterial with per-vertex twinkle speeds and phases, displaying soft circular starlight discs with smoothstep falloff.
7. **Dynamic Flying Comets**: Periodic celestial shooting stars streaking diagonally across the upper cosmic vista with luminous white/cyan heads and gradient fading tails.
8. **Interactive Spherical Orbit Controls**: Left-click and hold anywhere to spin the solar system in 3D. The camera movement is strictly locked to spherical orbiting around the central Sun at (0, 0, 0) with zero panning or off-center drift. Features fluid momentum damping on pointer release before returning to calm celestial spin.

## Typography
- **Primary Family**: IBM Plex Sans, self-hosted locally via `@fontsource/ibm-plex-sans` (zero external runtime network calls).
- **Monospace Family**: System monospace for telemetry badges, IDs, years, and status codes.
- **Hierarchy**: Guided by font scale, tracking, and structural hierarchy.

## Layout Narrative Flow
1. **Flight Deck Hero**: Profile picture with cyber frame, role and location (deduplicated), "Hello, I'm Christian" headline, bio, action buttons ("View Projects", "Read CV", "Contact Me"), and At a Glance overview module.
2. **Engineering Projects**: Featured UniCash POS hero card with cashier screenshot and production core highlight, followed by 2-column responsive grid for remaining 7 projects.
3. **Currently Learning**: 3-column clean overview covering Autonomous Multi-Agent AI Systems, WebXR & Shaders, and Offline-First POS Architecture.
4. **Experience**: Compact 2-column layout pairing Work & Leadership roles on the left with Education & Academics on the right.
5. **Skills**: 4-column capability matrix.
6. **Contact**: Direct email console and official platform vector logos (GitHub, LinkedIn, CV PDF).
7. **Colophon Footer**: Centered footer with edge deployment status and back-to-top button.

## Design Decisions & Verification
- **Direct & Grounded Hero**: Removed all flashing dots, Hero tags, and corny one-liners to focus purely on Christian's identity, headline, and bio. Name deduplicated next to avatar.
- **Conversational Copy**: Replaced jargon with everyday language ("View Details", "Contact Me", "Currently Learning", "Experience", "Skills", "At a Glance").
- **Featured Hero Card & 2-Col Grid**: Elevated UniCash POS as the flagship production highlight with screenshot preview, pairing the remaining projects in a clean 2-column grid.
- **Compact 2-Column Experience**: Balanced career leadership on the left with formal education on the right.
- **Active Section Highlighting & Back-to-Top**: Navbar smoothly tracks scroll position; floating glass button enables one-click scroll to top.
- **Semi-Fullscreen Detail View**: Expansive modal dialog at `max-w-6xl` displaying technical overviews, problem/solution breakdowns, and high-resolution screenshots.
- **Open Graph Metadata**: 1200x630 preview card generated and linked in layout metadata for social media shares.
- **No Em Dashes**: Pure standard punctuation with colons, commas, and parentheses.
- **Zero Terminal Remnants**: Clean codebase without command line or terminal components.
- **Cyberpunk Rocket Ship Pointer**: High-precision vector spacecraft mouse pointer featuring aerodynamic metallic hull, glowing cyan canopy visor, delta wings, stateful plasma thruster flame (cruising idle, boost flare on interactive hover, recoil pulse on click), starlight exhaust particle trail, and automatic touch device suppression.
- **Real Playwright Browser Verification**: End-to-end headless browser test verifying filters, modal open/close, email copying, navigation, rocket cursor tracking, and capturing desktop and mobile screenshots.

