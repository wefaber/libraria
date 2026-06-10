import React from "react";
import { useTheme } from "@/lib/theme/ThemeContext";
import { Layers } from "lucide-react";

export const GlassSlider: React.FC = () => {
  const { theme, updateTheme } = useTheme();
  
  const transparency = theme.glass.transparency; // 0 to 100

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    // Calculate values based on specs:
    // At 0 -> opacity 0.95, blur 12px, saturate 100%
    // At 100 -> opacity 0.75, blur 20px, saturate 180%
    const opacity = (0.95 - 0.20 * (value / 100)).toFixed(2);
    const blurVal = `${(12 + 8 * (value / 100)).toFixed(1)}px`;
    const saturationVal = `${(100 + 80 * (value / 100)).toFixed(0)}%`;
    const glassColor = `rgba(15, 29, 53, ${opacity})`;

    // Update context
    updateTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        background: {
          ...prev.colors.background,
          glass: glassColor,
        },
      },
      glass: {
        transparency: value,
        blur: blurVal,
        saturation: saturationVal,
      },
    }));

    // Directly set CSS custom properties on document.documentElement for live preview
    const root = document.documentElement;
    root.style.setProperty("--glass-transparency", `${value}%`);
    root.style.setProperty("--glass-opacity", opacity);
    root.style.setProperty("--glass-blur", blurVal);
    root.style.setProperty("--glass-saturation", saturationVal);
    root.style.setProperty("--color-bg-glass", glassColor);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
        <Layers className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-sm tracking-wide text-text-primary uppercase">Glass Transparency</h3>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-bg-elevated/40 border border-border-standard">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-text-secondary">Transparency Level</span>
          <span className="text-accent font-semibold">{transparency}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={transparency}
          onChange={handleSliderChange}
          aria-label="Glass Transparency Level"
          className="w-full h-1.5 bg-bg-mid rounded-lg appearance-none cursor-pointer accent-accent border border-border-subtle transition-all"
        />

        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-border-subtle/50 text-[10px] font-mono text-text-muted">
          <div className="flex flex-col">
            <span>Opacity</span>
            <span className="text-text-secondary">{(0.95 - 0.20 * (transparency / 100)).toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span>Blur</span>
            <span className="text-text-secondary">{(12 + 8 * (transparency / 100)).toFixed(1)}px</span>
          </div>
          <div className="flex flex-col">
            <span>Saturate</span>
            <span className="text-text-secondary">{(100 + 80 * (transparency / 100)).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
