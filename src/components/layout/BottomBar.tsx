import React from "react";
import { BoxSelect, Plus } from "lucide-react";

interface BottomBarProps {
  selectedComponent: string | null;
  onSelectComponent: (name: string) => void;
  components: string[];
}

export const BottomBar: React.FC<BottomBarProps> = ({
  selectedComponent,
  onSelectComponent,
  components,
}) => {
  return (
    <footer className="h-14 glass-surface flex items-center justify-between px-4 z-40 border-t border-border-standard relative select-none shrink-0">
      {/* Left side: Label with BoxSelect icon */}
      <div className="flex items-center gap-2 shrink-0 border-r border-border-subtle pr-4 h-full">
        <BoxSelect className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-text-primary tracking-wide uppercase">
          Components
        </span>
      </div>

      {/* Scrollable list of base component pills */}
      <div className="flex-1 flex items-center gap-1.5 px-4 overflow-x-auto scrollbar-none h-full py-2">
        {components.map((name) => {
          const isActive = selectedComponent?.toLowerCase() === name.toLowerCase();
          return (
            <button
              key={name}
              onClick={() => onSelectComponent(name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Right side: Plus button for custom components */}
      <div className="flex items-center pl-2 shrink-0 border-l border-border-subtle h-full">
        <button
          onClick={() => alert("Custom component builder is under development in Sprint 2!")}
          className="w-8 h-8 rounded-full bg-bg-elevated/45 border border-border-standard hover:border-border-active text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
          title="Add Custom Component"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
