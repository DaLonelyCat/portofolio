# DESIGN.md: Playful Frosted Space Design System

## Identity & Mood
A personal portfolio and interactive CV for Christian Emanuel Ikajaya: computer science student, founder, and software builder. The mood is a playful, luminous Deep Space Observatory aesthetic, blending a dense blooming spiral galaxy with tactile frosted glass depth, floating pill navigation, and approachable rounded surfaces.

## Dial Settings
- **ENERGY**: 2 (Focused, confident, real screenshot showcase)
- **RHYTHM**: 3 (Varied compositions: standalone display hero, minimal 2-column academic split, featured POS dossier, integrated directory toolbar, asymmetric career timeline, 4-column competency matrix, colophon footer)
- **MOTION**: 2 (Dense 6,000-star blooming galaxy with calm, steady orbital rotation; zero dizzying mouse or scroll parallax)

## Theme & Palette
Deep space frosted observatory palette engineered for long reading sessions and high contrast:

| Token | Hex | Role | Contrast on Background |
|---|---|---|---|
| `page` | `#090A10` | Interstellar void baseline | Baseline |
| `surface` | `#11131E` | Deep-space frosted container surface | Baseline surface |
| `rule` | `#222638` | Celestial hairline dividers and borders | Structural only |
| `ink` | `#F0F2F8` | Crisp starlight primary text and headings | 17.5:1 (WCAG AAA) |
| `muted` | `#949AB0` | Cosmic dust secondary text, captions, dates | 6.8:1 (WCAG AAA) |
| `accent` | `#E07A5F` | Solar flare / pulsar copper-amber accent | 6.1:1 (WCAG AA) |

## Shape & Radius System (Playful & Tactile)
- **Interactive Actions & Buttons**: `rounded-full` pills with smooth tactile padding and soft hover glow.
- **Surface Cards & Modules**: `rounded-2xl` and `rounded-3xl` organic frosted glass containers (`backdrop-blur-xl bg-surface/60 border border-white/10`).
- **Pill Badges & Tabs**: `rounded-full` chips and floating active pill states.
- **Hierarchy**: Clear visual distinction between small action pills (`rounded-full`) and spacious content surfaces (`rounded-2xl`, `rounded-3xl`).

## Background Architecture
1. **Dense 6,000-Star Galaxy**: Procedural Three.js simulation (6,000 stars on desktop, 2,500 on mobile) featuring a radiant additive core bulge and 4 logarithmic spiral arms.
2. **Optical Bloom**: Additive blending (`THREE.AdditiveBlending`) creates a natural luminous bloom where core star densities overlap.
3. **Calm, Steady Orbit (No Parallax)**: Camera is stably positioned with near-zero mouse or scroll displacement, allowing the galaxy to rotate smoothly without dizzying perspective shifts.
4. **Frosted Background Diffusion**: A layered `backdrop-blur-md bg-page/35` wash diffuses star particles into a celestial dreamscape behind the UI.

## Typography
- **Primary Family**: IBM Plex Sans, self-hosted locally via `@fontsource/ibm-plex-sans` (zero external runtime network calls).
- **Weights**: Light (`font-light`, 300) for display headings; Regular (`font-normal`, 400) for body and UI elements.
- **Hierarchy**: Governed by font size, letterform spacing, and structural whitespace rather than excessive bold weights.

## Layout Compositions (RHYTHM 3)
- **Hero**: Standalone display headline, playful rounded quote card, and frosted snapshot panel.
- **Active Explorations**: Clean 2-column flex layout with strict topic title and status pills only (zero descriptive sentences).
- **Featured Case Study**: Production core dossier for UniCash POS (Fruqita) with rounded pill screenshot tabs and frosted breakdown cards.
- **Project Index**: Integrated directory toolbar with category filter pills and interactive rounded project cards.
- **Experience**: Asymmetric 2-column split with sticky section summary on left and rounded frosted career cards on right.
- **Skills**: Architectural 4-column competency matrix with smooth rounded hover elevations.
- **Contact**: Direct conversational inquiry card with rounded email pill bar.

## Design Decisions & One-Line Reasons (R-31)
- **Deep Space Palette**: Interstellar void and starlight off-white provide effortless legibility without harsh white glare.
- **Dense Galaxy Bloom**: Dense 6,000-particle canvas with additive core creates a breathtaking, alive cosmic backdrop.
- **Calm Orbit**: Eliminating heavy parallax ensures readers focus comfortably on content without motion sickness.
- **Playful Rounded Curves**: Replacing boxy 90-degree corners with organic curves and pills brings warmth, personality, and modern tactile delight.
- **No Terminal Remnants**: Completely removed the command palette to maintain clean, focused browsing.
- **No Em Dashes**: Clean, natural human punctuation using colons, commas, and parentheses.
