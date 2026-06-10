import React, { useState } from "react";
import { useTheme } from "@/lib/theme/ThemeContext";
import { Type, ChevronDown, ChevronUp } from "lucide-react";

export const TypographyConfig: React.FC = () => {
  const { theme, updateTheme } = useTheme();
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const roles = [
    "Display Hero",
    "Section Title",
    "Card Title",
    "Heading",
    "Body Large",
    "Body",
    "Body Medium",
    "Caption",
    "Label",
    "Micro",
  ];

  const handleScaleChange = (role: string, field: string, val: string | number) => {
    updateTheme((prev) => {
      const currentScale = prev.typography.scale[role] || {
        size: "16px",
        weight: 400,
        lineHeight: 1.5,
        letterSpacing: "0px",
      };

      return {
        ...prev,
        typography: {
          ...prev.typography,
          scale: {
            ...prev.typography.scale,
            [role]: {
              ...currentScale,
              [field]: val,
            },
          },
        },
      };
    });
  };

  const handleFamilyChange = (key: "display" | "body" | "mono", val: string) => {
    updateTheme((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        family: {
          ...prev.typography.family,
          [key]: val,
        },
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
        <Type className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-sm tracking-wide text-text-primary uppercase">Typography</h3>
      </div>

      {/* Font Families */}
      <div className="flex flex-col gap-3 p-3 rounded-lg bg-bg-elevated/50 border border-border-subtle">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Font Families
        </h4>
        <div className="flex flex-col gap-2">
          {Object.entries(theme.typography.family).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary capitalize font-mono">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleFamilyChange(key as any, e.target.value)}
                className="w-full text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary font-mono focus:border-accent focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">
          Scale Editor
        </h4>
        <div className="flex flex-col gap-2">
          {roles.map((role) => {
            const scale = theme.typography.scale[role] || {
              size: "16px",
              weight: 400,
              lineHeight: 1.5,
              letterSpacing: "0px",
            };
            const isExpanded = expandedRole === role;

            return (
              <div
                key={role}
                className={`flex flex-col rounded-lg border transition ${
                  isExpanded ? "border-border-active bg-bg-elevated" : "border-border-standard bg-bg-elevated/40 hover:bg-bg-elevated/60"
                }`}
              >
                {/* Header Button */}
                <button
                  onClick={() => setExpandedRole(isExpanded ? null : role)}
                  className="w-full flex items-center justify-between p-3 cursor-pointer text-left"
                >
                  <div className="flex flex-col gap-1 min-w-0 pr-2">
                    <span className="text-xs font-semibold text-text-primary">{role}</span>
                    <span
                      className="text-text-secondary truncate block"
                      style={{
                        fontSize: scale.size,
                        fontWeight: scale.weight,
                        lineHeight: scale.lineHeight,
                        letterSpacing: scale.letterSpacing,
                      }}
                    >
                      Preview Text
                    </span>
                  </div>
                  <div className="shrink-0 text-text-muted">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Editor */}
                {isExpanded && (
                  <div className="border-t border-border-subtle p-3 bg-bg-mid/50 grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-text-secondary font-mono">Size</label>
                      <input
                        type="text"
                        value={scale.size}
                        onChange={(e) => handleScaleChange(role, "size", e.target.value)}
                        className="text-xs p-1.5 rounded bg-bg-elevated border border-border-standard text-text-primary font-mono focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-text-secondary font-mono">Weight</label>
                      <select
                        value={scale.weight}
                        onChange={(e) => handleScaleChange(role, "weight", parseInt(e.target.value))}
                        className="text-xs p-1.5 rounded bg-bg-elevated border border-border-standard text-text-primary font-mono focus:border-accent focus:outline-none cursor-pointer"
                      >
                        <option value={300}>300 - Light</option>
                        <option value={400}>400 - Regular</option>
                        <option value={500}>500 - Medium</option>
                        <option value={600}>600 - Semibold</option>
                        <option value={700}>700 - Bold</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-text-secondary font-mono">Line Height</label>
                      <input
                        type="number"
                        step={0.1}
                        value={scale.lineHeight}
                        onChange={(e) => handleScaleChange(role, "lineHeight", parseFloat(e.target.value) || 1)}
                        className="text-xs p-1.5 rounded bg-bg-elevated border border-border-standard text-text-primary font-mono focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-text-secondary font-mono">Spacing</label>
                      <input
                        type="text"
                        value={scale.letterSpacing}
                        onChange={(e) => handleScaleChange(role, "letterSpacing", e.target.value)}
                        className="text-xs p-1.5 rounded bg-bg-elevated border border-border-standard text-text-primary font-mono focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
