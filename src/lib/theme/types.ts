export interface TypographyScale {
  size: string;
  weight: number;
  lineHeight: number;
  letterSpacing: string;
}

export interface ThemeTokens {
  colors: {
    background: {
      deep: string;
      mid: string;
      elevated: string;
      glass: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      disabled: string;
    };
    accent: {
      primary: string;
      hover: string;
    };
    border: {
      subtle: string;
      standard: string;
      active: string;
    };
    semantic: {
      error: string;
      success: string;
      warning: string;
    };
  };
  typography: {
    family: {
      display: string;
      body: string;
      mono: string;
    };
    scale: Record<string, TypographyScale>;
  };
  radii: Record<string, string>;
  spacing: Record<string, string>;
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      spring: string;
      bounce: string;
    };
    reducedMotion: boolean;
  };
  glass: {
    transparency: number;
    blur: string;
    saturation: string;
  };
}

export const DEFAULT_THEME: ThemeTokens = {
  colors: {
    background: {
      deep: "#0a1628",
      mid: "#0f1d35",
      elevated: "#152238",
      glass: "rgba(15, 29, 53, 0.75)"
    },
    text: {
      primary: "#e8edf5",
      secondary: "#8da4c7",
      muted: "#5c7299",
      disabled: "#3d5070"
    },
    accent: {
      primary: "#00c6b0",
      hover: "#0ea5a0"
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.06)",
      standard: "rgba(255, 255, 255, 0.10)",
      active: "rgba(0, 198, 176, 0.30)"
    },
    semantic: {
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b"
    }
  },
  typography: {
    family: {
      display: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace"
    },
    scale: {
      "Display Hero": { size: "56px", weight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" },
      "Section Title": { size: "40px", weight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
      "Card Title": { size: "24px", weight: 600, lineHeight: 1.4, letterSpacing: "0px" },
      "Heading": { size: "20px", weight: 600, lineHeight: 1.4, letterSpacing: "0px" },
      "Body Large": { size: "18px", weight: 400, lineHeight: 1.5, letterSpacing: "0px" },
      "Body": { size: "16px", weight: 400, lineHeight: 1.5, letterSpacing: "0px" },
      "Body Medium": { size: "14px", weight: 400, lineHeight: 1.5, letterSpacing: "0px" },
      "Caption": { size: "12px", weight: 400, lineHeight: 1.4, letterSpacing: "0px" },
      "Label": { size: "12px", weight: 500, lineHeight: 1.2, letterSpacing: "0.05em" },
      "Micro": { size: "10px", weight: 500, lineHeight: 1.2, letterSpacing: "0.05em" }
    }
  },
  radii: {
    micro: "4px",
    standard: "8px",
    comfortable: "12px",
    large: "16px",
    full: "9999px",
    circle: "50%"
  },
  spacing: {
    none: "0px",
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "48px",
    "6xl": "64px"
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms"
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      bounce: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
    },
    reducedMotion: false
  },
  glass: {
    transparency: 75,
    blur: "20px",
    saturation: "180%"
  }
};
