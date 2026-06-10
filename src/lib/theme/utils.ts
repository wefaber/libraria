import { type ThemeTokens } from "./types";

export function themeToCSSVars(theme: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // Colors
  vars["--color-bg-deep"] = theme.colors.background.deep;
  vars["--color-bg-mid"] = theme.colors.background.mid;
  vars["--color-bg-elevated"] = theme.colors.background.elevated;
  vars["--color-bg-glass"] = theme.colors.background.glass;

  vars["--color-text-primary"] = theme.colors.text.primary;
  vars["--color-text-secondary"] = theme.colors.text.secondary;
  vars["--color-text-muted"] = theme.colors.text.muted;
  vars["--color-text-disabled"] = theme.colors.text.disabled;

  vars["--color-accent"] = theme.colors.accent.primary;
  vars["--color-accent-hover"] = theme.colors.accent.hover;

  vars["--color-border-subtle"] = theme.colors.border.subtle;
  vars["--color-border-standard"] = theme.colors.border.standard;
  vars["--color-border-active"] = theme.colors.border.active;

  vars["--color-error"] = theme.colors.semantic.error;
  vars["--color-success"] = theme.colors.semantic.success;
  vars["--color-warning"] = theme.colors.semantic.warning;

  // Typography families
  vars["--font-display"] = theme.typography.family.display;
  vars["--font-body"] = theme.typography.family.body;
  vars["--font-mono"] = theme.typography.family.mono;

  // Radii
  for (const [name, val] of Object.entries(theme.radii)) {
    vars[`--radius-${name}`] = val;
  }

  // Spacing
  for (const [name, val] of Object.entries(theme.spacing)) {
    vars[`--spacing-${name}`] = val;
  }

  // Animations
  vars["--transition-duration-fast"] = theme.animation.duration.fast;
  vars["--transition-duration-normal"] = theme.animation.duration.normal;
  vars["--transition-duration-slow"] = theme.animation.duration.slow;

  vars["--transition-timing-default"] = theme.animation.easing.default;
  vars["--transition-timing-spring"] = theme.animation.easing.spring;
  vars["--transition-timing-bounce"] = theme.animation.easing.bounce;

  // Glass variables
  const transparency = theme.glass.transparency; // 0 to 100
  const opacity = (0.95 - 0.20 * (transparency / 100)).toFixed(2);
  const blur = `${(12 + 8 * (transparency / 100)).toFixed(1)}px`;
  const saturation = `${(100 + 80 * (transparency / 100)).toFixed(0)}%`;

  vars["--glass-opacity"] = opacity;
  vars["--glass-blur"] = blur;
  vars["--glass-saturation"] = saturation;
  vars["--glass-transparency"] = `${transparency}%`;

  return vars;
}

export function themeToTailwindV4(theme: ThemeTokens): string {
  const vars = themeToCSSVars(theme);
  let css = "@theme {\n";
  for (const [key, val] of Object.entries(vars)) {
    css += `  ${key}: ${val};\n`;
  }
  css += "}";
  return css;
}

export function themeToJSON(theme: ThemeTokens): string {
  return JSON.stringify(theme, null, 2);
}

export function generateComponentCSS(theme: ThemeTokens, componentName: string): string {
  const name = componentName.toLowerCase();
  if (name === "button") {
    return `/* Button Component CSS */
.btn {
  font-family: ${theme.typography.family.body};
  transition: all ${theme.animation.duration.fast} ${theme.animation.easing.default};
  border-radius: ${theme.radii.standard};
}
.btn-primary {
  background-color: ${theme.colors.accent.primary};
  color: ${theme.colors.text.primary};
}
.btn-primary:hover {
  background-color: ${theme.colors.accent.hover};
}
.btn-outline {
  border: 1px solid ${theme.colors.border.standard};
  color: ${theme.colors.text.primary};
}
.btn-outline:hover {
  border-color: ${theme.colors.accent.primary};
}
.btn-glass {
  background: ${theme.colors.background.glass};
  backdrop-filter: blur(${theme.glass.blur}) saturate(${theme.glass.saturation});
  border: 1px solid ${theme.colors.border.standard};
  color: ${theme.colors.text.primary};
}`;
  } else if (name === "card") {
    return `/* Card Component CSS */
.card {
  background-color: ${theme.colors.background.elevated};
  border: 1px solid ${theme.colors.border.subtle};
  border-radius: ${theme.radii.comfortable};
  padding: ${theme.spacing.lg};
}
.card-glass {
  background: ${theme.colors.background.glass};
  backdrop-filter: blur(${theme.glass.blur}) saturate(${theme.glass.saturation});
  border: 1px solid ${theme.colors.border.standard};
  border-radius: ${theme.radii.large};
}`;
  } else if (name === "input") {
    return `/* Input Component CSS */
.input {
  background-color: ${theme.colors.background.mid};
  border: 1px solid ${theme.colors.border.standard};
  border-radius: ${theme.radii.standard};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.typography.family.body};
  transition: border-color ${theme.animation.duration.fast} ${theme.animation.easing.default};
}
.input:focus {
  border-color: ${theme.colors.accent.primary};
  outline: none;
}`;
  } else {
    return `/* ${componentName} Component CSS */
.${name} {
  font-family: ${theme.typography.family.body};
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.background.mid};
  border-radius: ${theme.radii.standard};
  border: 1px solid ${theme.colors.border.standard};
}`;
  }
}
