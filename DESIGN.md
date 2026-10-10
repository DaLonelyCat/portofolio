# DESIGN.md — Editorial Portfolio Design System

## Identity & Mood
A personal portfolio and CV for Christian Emanuel Ikajaya: computer science student, founder, and software builder. The mood is calm, editorial, and literary, evoking warm paper and dark ink.

## Dial Settings
- **ENERGY**: 1 (Calm, understated, content-focused)
- **RHYTHM**: 2 (Consistent baseline with asymmetric breaks between sections)
- **MOTION**: 1 (Subtle hover and focus color transitions only; no looping animations or floating elements)

## Theme & Palette
Single light theme inspired by editorial print:

| Token | Hex | Role | Contrast on Paper |
|---|---|---|---|
| `paper` | `#F6F1E7` | Background tone | Baseline |
| `ink` | `#1C1A17` | Primary text and headings | 15.34:1 (WCAG AAA) |
| `muted` | `#5B554B` | Secondary text, captions, dates | 6.54:1 (WCAG AA) |
| `rule` | `#D9D1C1` | Hairline dividers and borders | Structural only |
| `accent` | `#8F3B1F` | Links, primary button, focus outline | 6.60:1 (WCAG AA) |

## Typography
- **Primary Family**: IBM Plex Sans (fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif)
- **Weights**: Light (`font-light`, 300) for display headings; Regular (`font-normal`, 400) for body and UI elements.
- **Hierarchy**: Governed by font size, letterform spacing, and structural whitespace rather than excessive bold weights.

## Layout & Motifs
- **Identity Motif**: Editorial section titles paired with hairline dividers (`rule`).
- **Structure**: Asymmetric hero layout, index-style project listing, two-column chronological experience rows, and plain definition lists for competencies.
- **Interactions**: Clean inline SVGs for functional buttons (close, menu, copy, external links). Hidden terminal easter egg accessible via `Ctrl+K` / `Cmd+K`.

## Design Decisions & One-Line Reasons (R-31)
- **Palette**: Paper and ink evoke tactile print and readability, while the rust accent highlights actions without visual fatigue.
- **Layout**: Hairline rules and clean rows organize content naturally without repetitive AI card containers.
- **Typography**: IBM Plex Sans in weights 300 and 400 maintains technical clarity without aggressive bold styling.
- **Spacing**: Generous structural spacing guides reader attention and separates narrative milestones.
- **Icons**: Decorative glyphs are omitted to prioritize reading; minimal inline SVGs appear strictly for essential interactive tasks.
