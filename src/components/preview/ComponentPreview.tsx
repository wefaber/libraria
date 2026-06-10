import React, { useRef, useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface ComponentPreviewProps {
  children?: React.ReactNode;
  selectedComponent: string | null;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ children, selectedComponent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    // We observe the component container inside the preview card
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width: Math.round(width), height: Math.round(height) });
      }
    });

    const target = containerRef.current;
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [children, selectedComponent]);

  const widthRem = (dimensions.width / 16).toFixed(3);
  const heightRem = (dimensions.height / 16).toFixed(3);

  return (
    <div className="relative flex-1 w-full h-full flex flex-col dot-grid bg-bg-deep select-none">
      {/* Top indicator bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-glass backdrop-blur border border-border-standard text-xs font-mono text-text-secondary">
        <Eye className="w-3.5 h-3.5 text-accent animate-pulse" />
        <span className="capitalize">{selectedComponent || "No component selected"}</span>
      </div>

      {/* Main centering container */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4 overflow-auto">
        {selectedComponent && children ? (
          <>
            {/* The glass card holding the active component */}
            <div
              className="glass-surface-elevated rounded-2xl p-12 shadow-2xl flex items-center justify-center transition-all duration-300 min-w-[280px] max-w-[90%] max-h-[80%]"
            >
              <div ref={containerRef} className="flex items-center justify-center">
                {children}
              </div>
            </div>

            {/* Size Indicator */}
            <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-bg-mid border border-border-subtle text-xs font-mono text-text-muted shadow-lg">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-text-disabled uppercase">Pixels</span>
                <span className="text-text-secondary font-semibold">
                  {dimensions.width}px × {dimensions.height}px
                </span>
              </div>
              <div className="w-px h-6 bg-border-standard" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-text-disabled uppercase">Rem Units</span>
                <span className="text-text-secondary font-semibold">
                  {widthRem}rem × {heightRem}rem
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-12 rounded-2xl bg-bg-glass backdrop-blur border border-border-standard text-center max-w-md">
            <Eye className="w-12 h-12 text-text-disabled" />
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-text-primary text-base">Select a component</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Choose a base component from the bottom shelf to render a live interactive preview using your navy liquid glass design tokens.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
