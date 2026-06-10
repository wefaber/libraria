import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/lib/theme/ThemeContext";
import { Palette } from "lucide-react";

interface ColorItem {
  label: string;
  path: string; // e.g. "background.deep"
  value: string;
}

interface ColorGroup {
  name: string;
  items: ColorItem[];
}

export const ColorConfig: React.FC = () => {
  const { theme, updateTheme } = useTheme();
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setActivePicker(null);
      }
    };
    if (activePicker !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activePicker]);

  const groups: ColorGroup[] = [
    {
      name: "Background",
      items: [
        { label: "deep", path: "background.deep", value: theme.colors.background.deep },
        { label: "mid", path: "background.mid", value: theme.colors.background.mid },
        { label: "elevated", path: "background.elevated", value: theme.colors.background.elevated },
        { label: "glass", path: "background.glass", value: theme.colors.background.glass },
      ],
    },
    {
      name: "Text",
      items: [
        { label: "primary", path: "text.primary", value: theme.colors.text.primary },
        { label: "secondary", path: "text.secondary", value: theme.colors.text.secondary },
        { label: "muted", path: "text.muted", value: theme.colors.text.muted },
        { label: "disabled", path: "text.disabled", value: theme.colors.text.disabled },
      ],
    },
    {
      name: "Accent",
      items: [
        { label: "primary", path: "accent.primary", value: theme.colors.accent.primary },
        { label: "hover", path: "accent.hover", value: theme.colors.accent.hover },
      ],
    },
    {
      name: "Border",
      items: [
        { label: "subtle", path: "border.subtle", value: theme.colors.border.subtle },
        { label: "standard", path: "border.standard", value: theme.colors.border.standard },
        { label: "active", path: "border.active", value: theme.colors.border.active },
      ],
    },
    {
      name: "Semantic",
      items: [
        { label: "error", path: "semantic.error", value: theme.colors.semantic.error },
        { label: "success", path: "semantic.success", value: theme.colors.semantic.success },
        { label: "warning", path: "semantic.warning", value: theme.colors.semantic.warning },
      ],
    },
  ];

  const handleColorChange = (path: string, val: string) => {
    const [group, key] = path.split(".");
    updateTheme((prev) => {
      const updatedColors = {
        ...prev.colors,
        [group]: {
          ...(prev.colors as any)[group],
          [key]: val,
        },
      };

      // If updating background.deep or background.mid or background.glass, handle properly
      if (path === "background.glass") {
        // Just save it
      }

      return {
        ...prev,
        colors: updatedColors,
      };
    });
  };

  // Helper to check if color is RGBA vs Hex (RGBA doesn't play nice with native color input, so fallback to Hex parsing)
  const getHexForPicker = (val: string): string => {
    if (val.startsWith("rgba") || val.startsWith("rgb")) {
      // Return a temporary hex or parse it
      const match = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]).toString(16).padStart(2, "0");
        const g = parseInt(match[2]).toString(16).padStart(2, "0");
        const b = parseInt(match[3]).toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
      }
      return "#000000";
    }
    return val;
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
        <Palette className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-sm tracking-wide text-text-primary uppercase">Colors</h3>
      </div>

      {groups.map((group) => (
        <div key={group.name} className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">
            {group.name}
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {group.items.map((item) => {
              const isActive = activePicker === item.path;
              return (
                <div key={item.path} className="relative">
                  <button
                    onClick={() => setActivePicker(isActive ? null : item.path)}
                    className="w-full flex flex-col items-center gap-1.5 p-2 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 border border-border-standard hover:border-border-active transition text-left cursor-pointer"
                  >
                    <div className="w-full flex items-center justify-between gap-1">
                      <span className="text-[10px] text-text-secondary truncate font-mono">
                        {item.label}
                      </span>
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-border-standard shrink-0"
                        style={{ backgroundColor: item.value }}
                      />
                    </div>
                    <span className="text-[9px] text-text-muted font-mono self-start truncate">
                      {item.value}
                    </span>
                  </button>

                  {isActive && (
                    <div
                      ref={popoverRef}
                      className="absolute z-50 top-full mt-2 left-0 right-0 p-3 rounded-lg bg-bg-mid border border-border-active shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={getHexForPicker(item.value)}
                          onChange={(e) => handleColorChange(item.path, e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-border-standard bg-transparent shrink-0"
                        />
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleColorChange(item.path, e.target.value)}
                          className="w-full text-xs p-1 rounded bg-bg-elevated border border-border-standard text-text-primary font-mono focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
