import { useState } from "react";
import { Settings2, Component, BoxSelect, MessageSquare } from "lucide-react";

export default function App() {
  const [aiMode, setAiMode] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-bg-deep font-[family-name:var(--font-display)]">
      {/* Top Bar */}
      <header className="h-12 glass-surface flex items-center justify-between px-4 shrink-0 z-10">
        <h1 className="text-text-primary font-semibold text-sm tracking-tight">
          Libraria
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiMode(!aiMode)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              aiMode
                ? "bg-accent/15 text-accent border border-accent/30"
                : "text-text-secondary hover:text-text-primary border border-transparent hover:border-border-subtle"
            }`}
          >
            <MessageSquare size={14} />
            AI Mode
          </button>
          <button className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
            <Settings2 size={16} />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Config */}
        <aside className="w-[40%] min-w-[360px] max-w-[480px] glass-surface border-r border-border-subtle flex flex-col">
          <div className="p-4 border-b border-border-subtle">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-medium uppercase tracking-wider">
              <Settings2 size={12} />
              Theme Configuration
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {aiMode ? (
              <AIChat />
            ) : (
              <div className="space-y-4">
                <ThemeConfigSection title="Colors" />
                <ThemeConfigSection title="Typography" />
                <ThemeConfigSection title="Border Radius" />
                <ThemeConfigSection title="Animation" />
              </div>
            )}
          </div>
        </aside>

        {/* Right Panel — Preview */}
        <main className="flex-1 dot-grid flex items-center justify-center p-8">
          <PreviewArea />
        </main>
      </div>

      {/* Bottom Bar — Component Selector */}
      <footer className="h-14 glass-surface border-t border-border-subtle flex items-center px-4 gap-2 shrink-0">
        <Component size={14} className="text-text-muted" />
        <span className="text-xs text-text-muted font-medium uppercase tracking-wider">
          Components
        </span>
        <div className="flex-1" />
        <button className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
          <BoxSelect size={14} />
        </button>
      </footer>
    </div>
  );
}

function ThemeConfigSection({ title }: { title: string }) {
  return (
    <div className="p-3 rounded-xl border border-border-subtle bg-bg-mid/50">
      <h3 className="text-text-secondary text-xs font-medium mb-2">{title}</h3>
      <div className="h-20 rounded-lg bg-bg-deep/50 border border-border-subtle flex items-center justify-center">
        <span className="text-text-muted text-xs">Config coming soon</span>
      </div>
    </div>
  );
}

function PreviewArea() {
  return (
    <div className="glass-surface-elevated rounded-2xl p-8 min-w-[300px] min-h-[200px] flex items-center justify-center shadow-lg">
      <span className="text-text-muted text-sm">
        Select a component to preview
      </span>
    </div>
  );
}

function AIChat() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 rounded-xl border border-border-subtle bg-bg-mid/50 p-4 mb-4 overflow-y-auto">
        <p className="text-text-muted text-xs text-center">
          Describe the component you want to create...
        </p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="A navy button with glass hover effect..."
          className="flex-1 px-3 py-2 rounded-lg bg-bg-deep border border-border-subtle text-text-primary text-sm placeholder:text-text-disabled focus:outline-none focus:border-accent/30 transition-colors"
        />
        <button className="px-3 py-2 rounded-lg bg-accent/15 text-accent border border-accent/30 text-sm font-medium hover:bg-accent/20 transition-colors">
          Send
        </button>
      </div>
    </div>
  );
}
