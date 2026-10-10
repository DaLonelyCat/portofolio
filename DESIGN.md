# DESIGN.md: Editorial Portfolio Design System

## Identity & Mood
A personal portfolio and interactive CV for Christian Emanuel Ikajaya: computer science student, founder, and software builder. The mood is a refined, physical dark editorial aesthetic, evoking dark charcoal stationery, tactile paper grain, and architectural hairline divisions.

## Dial Settings
- **ENERGY**: 2 (Focused, confident, real screenshot showcase)
- **RHYTHM**: 3 (Varied compositions: oversized hero display type, interactive POS case study, year-grouped archive index, 4-column competency matrix, colophon footer)
- **MOTION**: 1 (Subtle hover and focus color transitions only; zero looping keyframes or performance-draining canvas simulations)

## Theme & Palette
Matte dark palette designed for long reading sessions and high contrast:

| Token | Hex | Role | Contrast on Background |
|---|---|---|---|
| `page` | `#121316` | Background tone | Baseline |
| `surface` | `#1A1B20` | Elevated container surface | Baseline surface |
| `rule` | `#2C2D35` | Hairline dividers and borders | Structural only |
| `ink` | `#F0EFEB` | Primary text and headings | 16.15:1 (WCAG AAA) |
| `muted` | `#A3A1A8` | Secondary text, captions, dates | 7.27:1 (WCAG AAA) |
| `accent` | `#E07A5F` | Interactive links, active tab, buttons | 6.30:1 (WCAG AA) |

## Background Texture
A lightweight static SVG noise texture (`/noise.svg`, 300x300, 3.5% opacity overlay) gives tactile physical depth and material feel without animation or GPU cost.

## Typography
- **Primary Family**: IBM Plex Sans, self-hosted locally via `@fontsource/ibm-plex-sans` (no external runtime requests).
- **Weights**: Light (`font-light`, 300) for display headings; Regular (`font-normal`, 400) for body and UI elements.
- **Hierarchy**: Governed by font size, letterform spacing, and structural whitespace rather than excessive bold weights.

## Layout & Motifs
- **Identity Motif**: Section markers (`01 / Focus`, `02 / Case Study`, `03 / Archive`, `04 / Experience`, `05 / Skills`, `06 / Contact`) establishing rhythm and hierarchy.
- **Featured Showcase**: Dedicated production case study for UniCash POS (Fruqita) with interactive screenshot tabs.
- **Archive Structure**: Year-grouped chronological project listing (`2026`, `2025`, `2024`) with category filtering.
- **Colophon**: Formal footer with typography details, hosting information, and hidden terminal shortcut (`Ctrl+K`).

## Design Decisions & One-Line Reasons (R-31)
- **Palette**: Deep charcoal and crisp off-white provide effortless legibility without the harsh glare of pure black and white.
- **Texture**: Faint noise overlay gives physical material depth to dark mode without gimmicky scanlines or neon glow.
- **Screenshots**: Real production software images anchor credibility and prove shipped engineering capability.
- **Typography**: IBM Plex Sans at 300 and 400 delivers architectural clarity without aggressive bold styling.
- **Spacing**: Generous structural spacing guides reader attention and separates narrative milestones.
- **Icons**: Decorative glyphs are omitted to prioritize reading; minimal inline SVGs appear strictly for essential interactive tasks.
