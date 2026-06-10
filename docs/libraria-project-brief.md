# Libraria — Project Brief

> Prompt autocontenido para LLM. Arquitectura, diseño, features y plan de construcción.

---

## 1. Identidad

**Nombre**: Libraria
**Propósito**: Builder visual de componentes UI con theme engine genérico. Manual-first, AI-assisted opcional. Exporta componentes y themes como paquetes npm instalables con `bun`.
**Audiencia**: Interna (equipo Eternum/Itica) → posiblemente pública después.
**Mantenimiento**: En equipo. Documentación, configuraciones y código explícito son obligatorios.

---

## 2. Stack

| Capa | Tecnología |
|------|-----------|
| Runtime | Bun (nunca npm) |
| Lenguaje | TypeScript (strict) |
| Frontend | React 19 + Vite |
| Estilos | TailwindCSS v4 |
| Animaciones | Motion.dev |
| Backend | Elysia (para chat AI, npm publish, auditoría de prompts) |
| Testing | Vitest |
| CI/CD | GitHub Actions → self-hosted runner → VPS |
| Deploy | Local dev → VPS (54.36.175.107), Nginx reverse proxy |
| Package manager | Bun |
| Formateo/Lint | oxFMT + oxlint + Husky |

---

## 3. Diseño Visual

### 3.1 Lenguaje base

Fusión de dos sistemas:

**Apple Liquid Glass** (del template `apple.md`):
- `backdrop-filter: saturate(180%) blur(20px)` sobre fondos translúcidos
- Superficies que flotan sobre el contenido
- Transparencia configurable por accesibilidad
- Sombras suaves y difusas, una sola sombra o nada
- Tipografía comprimida con tracking negativo

**Linear Dark Precision** (del template `linear.app.md`):
- Canvas near-black con contenido que emerge por luminancia
- Bordes semi-transparentes blancos (`rgba(255,255,255,0.05)` a `0.08`)
- Elevación por steps de opacidad de fondo, no por sombras
- Un solo acento cromático, uso quirúrgico
- Sin bordes sólidos en dark mode

### 3.2 Paleta — Navy Blue

```
Background Deep:  #0a1628    (canvas principal, el "near-black" navy)
Background Mid:   #0f1d35    (paneles, sidebar)
Background Elevated: #152238  (cards, superficies elevadas)
Surface Glass:    rgba(15,29,53,0.75) + backdrop-blur  (glass panels)
Text Primary:     #e8edf5    (near-white con tono frío, no blanco puro)
Text Secondary:   #8da4c7    (gris azulado para cuerpo)
Text Muted:       #5c7299    (metadata, placeholders)
Text Disabled:    #3d5070    (texto deshabilitado)
Accent Cyan:      #00c6b0    (interactivo primario — links, botones, focus)
Accent Teal:      #0ea5a0    (hover states, variante del accent)
Border Subtle:    rgba(255,255,255,0.06)
Border Standard:  rgba(255,255,255,0.10)
Border Active:    rgba(0,198,176,0.30)  (bordes con accent)
Error:            #ef4444
Success:          #10b981
Warning:          #f59e0b
```

### 3.3 Tipografía

**Display + Body**: Plus Jakarta Sans
- Cargar desde Google Fonts: weights 300, 400, 500, 600, 700
- Stack: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
- Mono: `'JetBrains Mono', ui-monospace, monospace` (para código exportado)

**Escala tipográfica** (hereda de Apple + Linear):

| Rol | Size | Weight | Line Height | Letter Spacing |
|-----|------|--------|-------------|----------------|
| Display Hero | 56px | 600 | 1.07 | -0.28px |
| Section Title | 40px | 600 | 1.10 | -0.02em |
| Card Title | 24px | 600 | 1.20 | -0.01em |
| Heading | 20px | 500 | 1.25 | normal |
| Body Large | 18px | 400 | 1.60 | -0.01em |
| Body | 16px | 400 | 1.50 | normal |
| Body Medium | 16px | 500 | 1.50 | normal |
| Caption | 14px | 400 | 1.43 | -0.01em |
| Label | 12px | 500 | 1.40 | normal |
| Micro | 11px | 400 | 1.40 | normal |

### 3.4 Bordes y superficies

```
Border Radius Scale:
  Micro:    4px   (inputs pequeños, badges inline)
  Standard: 8px   (botones, inputs, cards)
  Comfortable: 12px (paneles, cards destacados)
  Large:    16px  (modales, diálogos)
  Full Pill: 9999px (chips, filtros, pills)
  Circle:   50%   (icon buttons, avatares)

Glass Surfaces (liquid glass):
  background: rgba(15, 29, 53, 0.75)
  backdrop-filter: blur(20px) saturate(180%)
  border: 1px solid rgba(255, 255, 255, 0.08)
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25)

Glass Surface Elevated:
  background: rgba(21, 34, 56, 0.85)
  backdrop-filter: blur(24px) saturate(180%)
  border: 1px solid rgba(255, 255, 255, 0.10)

Glass — Reduced Transparency (accesibilidad):
  background: rgba(15, 29, 53, 0.95)
  backdrop-filter: blur(12px) saturate(100%)
```

### 3.5 Dot Grid

El preview de componentes se renderiza sobre un dot grid para referencia visual de tamaño:

```
Dot Grid Pattern:
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)
  background-size: 20px 20px
```

---

## 4. Arquitectura de la Aplicación

### 4.1 Layout principal

```
┌──────────────────────────────────────────────────────┐
│  Top Bar (nav, modo AI toggle, export, settings)     │
├────────────────────┬─────────────────────────────────┤
│                    │                                 │
│  Left Panel        │  Right Panel                    │
│  (40% width)       │  (60% width)                    │
│                    │                                 │
│  ┌──────────────┐  │  ┌───────────────────────────┐  │
│  │ Theme Config │  │  │                           │  │
│  │ ─ Colors     │  │  │   Live Preview             │  │
│  │ ─ Typography │  │  │   (dot grid background)    │  │
│  │ ─ Radius     │  │  │                           │  │
│  │ ─ Spacing    │  │  │   [Componente renderizado] │  │
│  │ ─ Animation  │  │  │                           │  │
│  └──────────────┘  │  │                           │  │
│                    │  └───────────────────────────┘  │
│  ┌──────────────┐  │                                 │
│  │ Component    │  │  ┌───────────────────────────┐  │
│  │ Config       │  │  │ Size Reference            │  │
│  │ ─ Variant    │  │  │ (medidas px/rem)          │  │
│  │ ─ Content    │  │  └───────────────────────────┘  │
│  │ ─ Behavior   │  │                                 │
│  │ ─ States     │  │                                 │
│  └──────────────┘  │                                 │
│                    │                                 │
├────────────────────┴─────────────────────────────────┤
│  Component Selector (base components + custom list)  │
└──────────────────────────────────────────────────────┘
```

### 4.2 User Journey

1. **Abrís Libraria** → Landing con glass panels, selector de theme inicial
2. **Definís theme base**: paleta de colores + tipografía
3. **Componentes base aparecen**: botones, accordion, inputs, etc. (sin estética, heredan el theme)
4. **Lista custom**: importás componentes shadcn existentes o creás desde cero
5. **Seleccionás un componente** → panel izq muestra config, panel der muestra preview en vivo
6. **Tweakeás**: border-radius, colors, tipografía, animaciones, comportamiento
7. **Exportás**: componente individual, set de componentes, o theme completo
8. **AI-driven (opcional)**: alternás a modo AI para generación asistida

### 4.3 Secciones del panel izquierdo

**Theme Config** (global):
- Color palette (pickers para cada token)
- Typography (familia, escala, weights)
- Border radius scale
- Spacing scale
- Animation presets (duration, easing)
- Glass transparency slider (accesibilidad)

**Component Config** (por componente):
- Variant selector
- Content editor (labels, icons, children)
- Behavior (hover, focus, active, disabled states)
- Layout props (size, padding, alignment)
- Advanced (CSS overrides, data attributes)

### 4.4 Component Selector (barra inferior o drawer)

- **Base Components** (predefinidos, sin estética):
  Button, Input, Select, Checkbox, Radio, Switch, Textarea, Label, Badge, Avatar, Card, Dialog, Accordion, Tabs, DropdownMenu, Tooltip, Separator, Skeleton, Table, DataTable, Form, Sidebar, Header, Footer, Navigation

- **Custom Components** (importados por el usuario):
  - Importar desde shadcn/ui (parsea código fuente)
  - Crear nuevo componente vacío
  - Subir archivo .tsx/.jsx

---

## 5. Theme Engine

### 5.1 Diseño

El theme engine es completamente genérico — no está atado a ningún design system. Define tokens en un formato intermedio que luego se exporta a:

- **CSS Custom Properties** (`:root { --color-bg: #0a1628; }`)
- **TailwindCSS v4 config** (`@theme { --color-bg: #0a1628; }`)
- **Motion.dev tokens** (objeto de configuración de animaciones)
- **JSON portable** (para consumir desde cualquier stack)

### 5.2 Estructura de tokens

```typescript
interface ThemeTokens {
  colors: {
    background: { deep: string; mid: string; elevated: string; glass: string }
    text: { primary: string; secondary: string; muted: string; disabled: string }
    accent: { primary: string; hover: string }
    border: { subtle: string; standard: string; active: string }
    semantic: { error: string; success: string; warning: string }
  }
  typography: {
    family: { display: string; body: string; mono: string }
    scale: Record<string, { size: string; weight: number; lineHeight: number; letterSpacing: string }>
  }
  radii: Record<string, string>
  spacing: Record<string, string>
  animation: {
    duration: { fast: string; normal: string; slow: string }
    easing: { default: string; spring: string; bounce: string }
    reducedMotion: boolean
  }
  glass: {
    transparency: number  // 0.0 a 1.0 (accesibilidad)
    blur: string
    saturation: string
  }
}
```

---

## 6. Export System

### 6.1 Exportar componente individual

- `.tsx` con imports de TailwindCSS
- Componente autocontenido con sus variantes
- Props tipadas con TypeScript
- Archivo de historias (Storybook-like) opcional

### 6.2 Exportar theme

- `theme.css` con CSS custom properties
- `tailwind.config.ts` o `@theme` block para Tailwind v4
- `motion.config.ts` con tokens de animación
- `theme.json` portable

### 6.3 Publicar a npm

- El componente/theme se empaqueta con `package.json` generado
- Se publica con `bun publish` (usando `npm publish` bajo el capó)
- Namespace: `@libraria/button`, `@libraria/theme-navy`, etc.
- El usuario configura su token de npm desde la UI

---

## 7. AI-Driven Zone (opcional, secundario)

### 7.1 Comportamiento

- Toggle "AI Mode" en el top bar
- Al activarse, el panel izquierdo se transforma en chat
- El chat genera/edita componentes con lenguaje natural
- **El camino principal sigue siendo manual** — la AI es asistente, no reemplazo

### 7.2 System Prompt

- Totalmente editable por el usuario
- Auditado por un agente LLM secundario antes de ejecutarse
- Si se detectan 3 intentos maliciosos (prompt injection, exfiltración, etc.), se bloquea al usuario
- El usuario puede ver el log de auditoría

### 7.3 Flujo del chat AI

1. Usuario describe el componente deseado
2. El system prompt se audita (agente secundario)
3. Si pasa → se genera el componente con la LLM
4. El componente aparece en el preview
5. El usuario tweakea manualmente si quiere
6. Export normal

---

## 8. Capturas de pantalla estilo macOS

- Botón "Capture" en el top bar
- Genera una imagen PNG del componente en el preview
- Estilo macOS: shadow sutil, fondo translúcido, bordes redondeados
- La captura incluye el dot grid de fondo
- Implementar con `html2canvas` o `dom-to-image`
- Descarga directa o copiar al portapapeles

---

## 9. Plan de Construcción

### Sprint 1 — Fundación
- [P0] Inicializar proyecto: Bun + Vite + React 19 + TailwindCSS v4 + Motion.dev
- [P0] Configurar oxFMT + oxlint + Husky + lint-staged
- [P0] Setup GitHub repo + GitHub Actions (CI: build + lint + test)
- [P0] Implementar theme engine core (tokens, types, export/import)
- [P1] Layout base: split panel + dot grid preview
- [P1] Glass surface components (panel, card, top bar)

### Sprint 2 — Configuración de Theme
- [P0] Panel de color palette (color pickers para todos los tokens)
- [P0] Panel de tipografía (familia, escala, weights)
- [P1] Panel de border radius + spacing
- [P1] Panel de animación (duration, easing presets)
- [P1] Glass transparency slider con live preview
- [P1] Persistencia de theme (localStorage → export)

### Sprint 3 — Componentes Base
- [P0] Component selector UI (base + custom lists)
- [P0] Button component con todas las variantes y estados
- [P0] Input component con variantes
- [P1] Card component
- [P1] Badge, Avatar, Label
- [P1] Accordion, Tabs
- [P2] Dialog, DropdownMenu, Tooltip

### Sprint 4 — Configuración por Componente
- [P0] Component config panel (variants, content, behavior, states)
- [P0] Live preview reactivity (cambios en config → preview instantáneo)
- [P1] Dot grid con medidas (px/rem overlay)
- [P1] Theme inheritance (componente hereda theme global)

### Sprint 5 — Componentes Complejos
- [P0] Form component (composición de inputs + validación)
- [P0] Sidebar component
- [P1] Header + Footer components
- [P1] Navigation component
- [P2] DataTable, Table

### Sprint 6 — Export System
- [P0] Export componente individual (.tsx con tipos)
- [P0] Export theme (CSS vars + Tailwind v4 config + Motion tokens + JSON)
- [P1] Empaquetado npm (`package.json` generado, `bun publish`)
- [P1] npm token management UI
- [P2] Export batch (múltiples componentes)

### Sprint 7 — AI-Driven Zone
- [P0] AI Mode toggle + chat UI
- [P0] System prompt editor
- [P0] Prompt auditor (agente secundario, bloqueo tras 3 intentos)
- [P1] Generación de componentes vía LLM
- [P1] Integración con preview (componente generado → tweakeo manual)

### Sprint 8 — Capturas, Custom Imports y Polish
- [P0] Capturas estilo macOS (html2canvas)
- [P0] Importar componentes shadcn existentes (parseo de source)
- [P1] Subir archivo .tsx/.jsx custom
- [P1] Animaciones de transición entre paneles (Motion.dev)
- [P2] Keyboard shortcuts
- [P2] Responsive design

### Sprint 9 — Deploy y Documentación
- [P0] Deploy a VPS con Nginx + GitHub Actions
- [P0] README + ARCHITECTURE.md + docs de uso
- [P1] Certbot SSL
- [P1] Health checks + monitoring básico

---

## 10. Principios de Código

- **DRY / YAGNI / TDD** — tests antes de implementación, no sobre-ingeniería
- **Commits atómicos** — `feat(scope): mensaje` después de cada subtarea
- **Nada de emojis en UI** — solo `lucide-react` para iconografía
- **Skeletons/lazy loading** para todo componente que cargue datos
- **Sin deploy directo a prod** — siempre branch → PR → review → merge
- **Documentación en Obsidian vault**: `personal-vault/Proyectos/Libraria/`
- **Worktrees con Git** para features paralelas

---

## 11. Notas Técnicas

- TailwindCSS v4 usa `@theme` blocks en CSS, no `tailwind.config.ts`
- Motion.dev se importa como `import { motion, AnimatePresence } from "motion/react"`
- El backend Elysia solo se activa para: chat AI, npm publish, auditoría de prompts
- La auditoría de prompts usa una LLM secundaria (modelo pequeño, rápido) para evaluar seguridad
- Las capturas se generan client-side, no requieren backend
- El dot grid es CSS puro (`radial-gradient`), no un canvas
