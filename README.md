# Libraria

A visual component builder with a generic theme engine.

Libraria is a browser-based tool for designing UI components on top of a fully configurable design-token theme. The workflow is manual-first: you tune colors, typography, radii, spacing, animation, and glass transparency in a live left-hand panel while the component renders instantly on a dot-grid preview — then export the result as a theme or component CSS.

The interface is built around a navy "liquid glass" aesthetic: translucent, blurred glass surfaces floating over a near-black navy canvas, with a single cyan accent. AI-assisted editing is part of the project's design (documented in `docs/libraria-project-brief.md`); the current build ships the manual-first workflow with an AI-mode toggle in the top bar.

## Features

- **Generic theme engine** — design tokens are modeled as typed `ThemeTokens` (colors, typography scale, radii, spacing, animation durations/easings, glass transparency) that are independent of any specific design system.
- **Live theming** — the theme is applied to the document as CSS custom properties in real time, so every component, panel, and surface re-skins instantly as you edit.
- **Theme persistence** — tokens are saved to `localStorage` and deep-merged on load, so a session survives a refresh; a reset button restores the default navy theme.
- **Color configuration** — color pickers for every token group: background, text, accent, borders, and semantic colors (error, success, warning).
- **Typography configuration** — per-role editing of the type scale (10 roles from Display Hero to Micro), with Plus Jakarta Sans for display/body and JetBrains Mono for code.
- **Glass transparency slider** — a single control maps 0–100% transparency to live opacity, blur, and saturation values, updating the glass surfaces (and the dialog preview) immediately.
- **Per-component configuration** — select a component and edit its properties: label text, variant, size, border radius, and disabled state where supported.
- **Live preview** — the selected component renders centered on a dot-grid canvas inside a glass card, with a real-time px/rem size indicator driven by a `ResizeObserver`.
- **12 base components** — Button (motion-animated, 4 variants, 3 sizes, 4 radii), Input, Card, Badge, Avatar, Accordion, Tabs, Dialog, Form, Sidebar, Header, and Footer, all styled exclusively from theme tokens.
- **Export** — the export menu writes the theme to the clipboard as portable JSON, generates a Tailwind CSS v4 `@theme` block, and provides component-specific CSS built from the current tokens.
- **Motion micro-interactions** — spring-based hover/tap feedback on interactive components, honoring the theme's `reducedMotion` token.

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | Bun |
| Language | TypeScript (strict) |
| Frontend | React 19, Vite |
| Styling | Tailwind CSS v4 (`@theme` tokens in CSS) |
| Animation | Motion (motion/react) |
| Icons | lucide-react |
| Lint / format | oxlint, oxfmt |
| Testing | Vitest (script wired up; no test files yet) |

## Getting started

Prerequisites: [Bun](https://bun.sh).

```bash
bun install
bun dev            # Vite dev server
```

### Useful scripts

```bash
bun run build      # tsc -b && vite build (typecheck + production build)
bun run preview    # preview the production build
bun run lint       # oxlint
bun run format     # oxfmt
bun test           # vitest (test runner configured)
```

## Project structure

```
src/
  lib/theme/
    types.ts          # ThemeTokens type + DEFAULT_THEME tokens
    ThemeContext.tsx  # theme state, deep-merge updates, localStorage persistence
    utils.ts          # theme -> CSS vars / Tailwind v4 / JSON / component CSS
  components/
    layout/           # TopBar (AI-mode toggle, export menu, reset) and BottomBar (component selector)
    panels/           # ColorConfig, TypographyConfig, GlassSlider, per-component config
    preview/          # ComponentPreview (dot grid, glass card, px/rem indicator)
    base/             # Button
  App.tsx             # workspace orchestrator: left config panel, right preview, bottom selector
docs/
  libraria-project-brief.md   # design brief: architecture, visual language, roadmap
```

## Status

Early-stage (v0.1.0). The theme engine, configuration panels, live preview, and the 12 base components are implemented. The backend services described in the design brief (AI chat, npm publishing, prompt auditing) and the export-to-npm flow are not part of this repository yet. See `docs/libraria-project-brief.md` for the full roadmap.
