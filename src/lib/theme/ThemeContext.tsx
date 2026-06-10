import React, { createContext, useContext, useState, useEffect } from "react";
import { type ThemeTokens, DEFAULT_THEME } from "./types";
import { themeToCSSVars } from "./utils";

interface ThemeContextType {
  theme: ThemeTokens;
  updateTheme: (updatedFields: Partial<ThemeTokens> | ((prev: ThemeTokens) => ThemeTokens)) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "libraria-theme-tokens";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeTokens>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        // Deep merge or validate parsed config to ensure it matches the full ThemeTokens structure
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_THEME,
          ...parsed,
          colors: {
            ...DEFAULT_THEME.colors,
            ...(parsed.colors || {}),
            background: { ...DEFAULT_THEME.colors.background, ...(parsed.colors?.background || {}) },
            text: { ...DEFAULT_THEME.colors.text, ...(parsed.colors?.text || {}) },
            accent: { ...DEFAULT_THEME.colors.accent, ...(parsed.colors?.accent || {}) },
            border: { ...DEFAULT_THEME.colors.border, ...(parsed.colors?.border || {}) },
            semantic: { ...DEFAULT_THEME.colors.semantic, ...(parsed.colors?.semantic || {}) },
          },
          typography: {
            ...DEFAULT_THEME.typography,
            ...(parsed.typography || {}),
            family: { ...DEFAULT_THEME.typography.family, ...(parsed.typography?.family || {}) },
            scale: { ...DEFAULT_THEME.typography.scale, ...(parsed.typography?.scale || {}) },
          },
          glass: {
            ...DEFAULT_THEME.glass,
            ...(parsed.glass || {})
          }
        };
      }
    } catch (e) {
      console.error("Failed to parse theme from localStorage", e);
    }
    return DEFAULT_THEME;
  });

  // Apply theme tokens to document style variables when theme changes
  useEffect(() => {
    const vars = themeToCSSVars(theme);
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (
    updatedFields: Partial<ThemeTokens> | ((prev: ThemeTokens) => ThemeTokens)
  ) => {
    setTheme((prev) => {
      if (typeof updatedFields === "function") {
        return updatedFields(prev);
      }
      
      // We perform a deep merge of colors, typography scale, radii, spacing, animation, glass
      return {
        ...prev,
        ...updatedFields,
        colors: updatedFields.colors
          ? {
              ...prev.colors,
              ...updatedFields.colors,
              background: { ...prev.colors.background, ...updatedFields.colors.background },
              text: { ...prev.colors.text, ...updatedFields.colors.text },
              accent: { ...prev.colors.accent, ...updatedFields.colors.accent },
              border: { ...prev.colors.border, ...updatedFields.colors.border },
              semantic: { ...prev.colors.semantic, ...updatedFields.colors.semantic },
            }
          : prev.colors,
        typography: updatedFields.typography
          ? {
              ...prev.typography,
              ...updatedFields.typography,
              family: { ...prev.typography.family, ...updatedFields.typography.family },
              scale: { ...prev.typography.scale, ...updatedFields.typography.scale },
            }
          : prev.typography,
        radii: updatedFields.radii ? { ...prev.radii, ...updatedFields.radii } : prev.radii,
        spacing: updatedFields.spacing ? { ...prev.spacing, ...updatedFields.spacing } : prev.spacing,
        animation: updatedFields.animation
          ? {
              ...prev.animation,
              ...updatedFields.animation,
              duration: { ...prev.animation.duration, ...updatedFields.animation.duration },
              easing: { ...prev.animation.easing, ...updatedFields.animation.easing },
            }
          : prev.animation,
        glass: updatedFields.glass ? { ...prev.glass, ...updatedFields.glass } : prev.glass,
      };
    });
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
