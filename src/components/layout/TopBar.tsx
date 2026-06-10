import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Download, Settings2, Sparkles, RefreshCw } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeContext";

interface TopBarProps {
  aiMode: boolean;
  onToggleAiMode: () => void;
  onExport: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ aiMode, onToggleAiMode, onExport }) => {
  const { resetTheme } = useTheme();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };
    if (showExportMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showExportMenu]);

  return (
    <header className="h-12 glass-surface flex items-center justify-between px-4 z-40 border-b border-border-standard relative select-none">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-accent flex items-center justify-center font-bold text-bg-deep text-[11px] tracking-tighter">
          L
        </div>
        <span className="font-semibold text-sm tracking-wider text-text-primary">Libraria</span>
      </div>

      {/* Center: Breadcrumb spacer */}
      <div className="hidden md:flex items-center text-xs text-text-muted font-mono">
        <span>workspace</span>
        <span className="mx-2 text-border-standard">/</span>
        <span className="text-text-secondary">theme-engine</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* AI Mode Toggle */}
        <button
          onClick={onToggleAiMode}
          className={`h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs transition duration-200 border cursor-pointer ${
            aiMode
              ? "bg-accent/15 border-accent text-accent shadow-[0_0_12px_rgba(0,198,176,0.15)]"
              : "bg-bg-elevated/45 border-border-standard text-text-secondary hover:text-text-primary hover:border-border-active"
          }`}
          title="Toggle AI Assist Mode"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {aiMode && <Sparkles className="w-3 h-3 text-accent animate-spin" />}
          <span>AI Assist</span>
        </button>

        {/* Export Button & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="h-8 px-3 rounded-lg bg-bg-elevated/45 border border-border-standard hover:border-border-active text-text-secondary hover:text-text-primary flex items-center gap-1.5 text-xs transition duration-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-bg-mid border border-border-standard shadow-2xl p-1.5 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <button
                onClick={() => {
                  onExport();
                  setShowExportMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition font-mono cursor-pointer"
              >
                Copy Tailwind CSS
              </button>
              <button
                onClick={() => {
                  // Trigger direct download of config JSON
                  onExport();
                  setShowExportMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition font-mono cursor-pointer"
              >
                Copy Theme JSON
              </button>
            </div>
          )}
        </div>

        {/* Reset / Settings */}
        <button
          onClick={resetTheme}
          className="w-8 h-8 rounded-lg bg-bg-elevated/45 border border-border-standard hover:border-border-active text-text-secondary hover:text-text-primary flex items-center justify-center transition duration-200 cursor-pointer"
          title="Reset Theme to Default"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Settings button */}
        <button
          onClick={() => alert("Settings panel is under development!")}
          className="w-8 h-8 rounded-lg bg-bg-elevated/45 border border-border-standard hover:border-border-active text-text-secondary hover:text-text-primary flex items-center justify-center transition duration-200 cursor-pointer"
          title="Settings"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
