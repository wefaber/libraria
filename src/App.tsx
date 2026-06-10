import React, { useState } from "react";
import { ThemeProvider, useTheme } from "@/lib/theme/ThemeContext";
import { themeToTailwindV4, themeToJSON } from "@/lib/theme/utils";
import { TopBar } from "@/components/layout/TopBar";
import { BottomBar } from "@/components/layout/BottomBar";
import { ColorConfig } from "@/components/panels/ColorConfig";
import { TypographyConfig } from "@/components/panels/TypographyConfig";
import { GlassSlider } from "@/components/panels/GlassSlider";
import { ComponentPreview } from "@/components/preview/ComponentPreview";
import { Button } from "@/components/base/Button";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Lock,
  User,
  Layout,
  Eye,
  Sliders,
  Settings
} from "lucide-react";

// ==========================================
// INLINED SUPPLEMENTARY BASE COMPONENTS
// ==========================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input: React.FC<InputProps> = ({ className = "", disabled, ...props }) => (
  <input
    disabled={disabled}
    className={`w-full px-3 py-2 text-sm bg-bg-mid hover:bg-bg-mid/80 border border-border-standard focus:border-accent focus:ring-1 focus:ring-accent rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition duration-200 ${
      disabled ? "opacity-50 pointer-events-none" : ""
    } ${className}`}
    {...props}
  />
);

export interface CardProps {
  title: string;
  description: string;
  glass?: boolean;
  children?: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({ title, description, glass = false, children }) => (
  <div
    className={`p-6 rounded-xl border flex flex-col gap-3 min-w-[280px] max-w-sm shadow-xl transition-all duration-300 ${
      glass ? "glass-surface" : "bg-bg-elevated border-border-standard"
    }`}
  >
    <h4 className="font-semibold text-base text-text-primary font-display">{title}</h4>
    <p className="text-xs text-text-secondary leading-relaxed font-display">{description}</p>
    {children}
  </div>
);

export interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "error";
  text: string;
}
export const Badge: React.FC<BadgeProps> = ({ variant = "primary", text }) => {
  const bgClasses = {
    primary: "bg-accent/15 border-accent/30 text-accent",
    success: "bg-[#10b981]/15 border-[#10b981]/30 text-[#10b981]",
    warning: "bg-[#f59e0b]/15 border-[#f59e0b]/30 text-[#f59e0b]",
    error: "bg-[#ef4444]/15 border-[#ef4444]/30 text-[#ef4444]",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border font-mono ${bgClasses[variant]}`}
    >
      {text}
    </span>
  );
};

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}
export const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border border-border-standard overflow-hidden bg-bg-elevated flex items-center justify-center shrink-0 shadow-lg`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold text-text-secondary font-mono uppercase">
          {alt.slice(0, 2)}
        </span>
      )}
    </div>
  );
};

export interface AccordionProps {
  items: { title: string; content: string }[];
}
export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-2 w-[320px]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-lg border transition duration-200 overflow-hidden ${
              isOpen ? "border-border-active bg-bg-elevated" : "border-border-standard bg-bg-elevated/40"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-text-primary hover:bg-bg-elevated/60 transition text-left cursor-pointer"
            >
              <span>{item.title}</span>
              {isOpen ? <ChevronUp className="w-4 h-4 text-accent" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </button>
            {isOpen && (
              <div className="p-3.5 text-xs text-text-secondary border-t border-border-subtle bg-bg-mid/30 leading-relaxed font-display">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export interface TabsProps {
  tabs: string[];
}
export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0] || "");
  return (
    <div className="flex flex-col gap-3 w-[320px]">
      <div className="flex border-b border-border-standard gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold border-b-2 transition duration-200 cursor-pointer ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className="p-4 rounded-lg bg-bg-elevated/35 border border-border-subtle text-xs text-text-secondary leading-relaxed font-display">
        Displaying panels details for <strong className="text-text-primary font-mono">{activeTab}</strong>. The theme variables dynamically change all borders, backgrounds, and fonts inside this pane container.
      </div>
    </div>
  );
};

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1628]/80 backdrop-blur-md">
      <div className="glass-surface-elevated rounded-xl border border-border-active p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <h4 className="font-semibold text-sm text-text-primary font-display">{title}</h4>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
        <div className="text-xs text-text-secondary leading-relaxed font-display">{children}</div>
      </div>
    </div>
  );
};

export const Form: React.FC = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-6 rounded-xl bg-bg-elevated border border-border-standard flex flex-col gap-4 w-[320px] shadow-xl"
    >
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-sm text-text-primary">Sign In</h4>
        <p className="text-[10px] text-text-muted">Enter credentials to test standard input fields.</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-text-secondary font-mono flex items-center gap-1">
            <Mail className="w-3 h-3 text-accent" /> Email Address
          </label>
          <Input type="email" placeholder="name@domain.com" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-text-secondary font-mono flex items-center gap-1">
            <Lock className="w-3 h-3 text-accent" /> Password
          </label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </div>
      <Button variant="primary" size="md" className="w-full mt-1">
        Authenticate
      </Button>
    </form>
  );
};

export const Sidebar: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
  return (
    <div
      className={`border border-border-standard rounded-xl p-3 flex flex-col gap-4 bg-bg-elevated/40 transition-all duration-300 ${
        collapsed ? "w-16" : "w-[200px]"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
        <div className="w-6 h-6 rounded bg-accent flex items-center justify-center shrink-0">
          <Layout className="w-3.5 h-3.5 text-[#0a1628]" />
        </div>
        {!collapsed && <span className="text-xs font-bold text-text-primary">Dashboard</span>}
      </div>
      <div className="flex flex-col gap-1">
        {["Overview", "Analytics", "Settings", "Profile"].map((item, i) => (
          <button
            key={item}
            className={`flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition cursor-pointer ${
              i === 0
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary border border-transparent"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {!collapsed && <span>{item}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="w-[320px] rounded-lg border border-border-standard bg-bg-elevated p-3 flex justify-between items-center shadow-lg">
      <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-accent animate-pulse" /> AppShell
      </span>
      <div className="flex gap-2">
        <span className="text-[10px] text-text-secondary cursor-pointer hover:text-text-primary font-medium">Docs</span>
        <span className="text-[10px] text-text-secondary cursor-pointer hover:text-text-primary font-medium">Pricing</span>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <div className="w-[320px] rounded-lg border border-border-standard bg-bg-mid/50 p-3 flex flex-col items-center gap-1 text-[10px] text-text-muted font-mono">
      <span>© 2026 Libraria Inc. All rights reserved.</span>
      <span className="text-text-disabled">Designed with Navy Liquid Glass theme.</span>
    </div>
  );
};

// ==========================================
// INLINED COMPONENT CONFIG PANEL
// ==========================================

interface ComponentConfigProps {
  selectedComponent: string | null;
  config: any;
  onChange: (newConfig: any) => void;
}

export const ComponentConfig: React.FC<ComponentConfigProps> = ({
  selectedComponent,
  config,
  onChange,
}) => {
  if (!selectedComponent) {
    return (
      <div className="flex flex-col gap-4 p-4 border-t border-border-subtle mt-4">
        <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
          <Settings className="w-4 h-4 text-text-disabled" />
          <h3 className="font-semibold text-sm tracking-wide text-text-disabled uppercase">Properties</h3>
        </div>
        <p className="text-xs text-text-muted italic text-center py-4">
          Select a component below to configure its properties.
        </p>
      </div>
    );
  }

  const handleFieldChange = (field: string, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const name = selectedComponent.toLowerCase();

  return (
    <div className="flex flex-col gap-4 p-4 border-t border-border-subtle mt-4">
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
        <Sliders className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-sm tracking-wide text-text-primary uppercase">
          {selectedComponent} Properties
        </h3>
      </div>

      <div className="flex flex-col gap-3 p-3 rounded-lg bg-bg-elevated/40 border border-border-standard">
        {name === "button" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Button Text</label>
              <input
                type="text"
                value={config.text || "Click Me"}
                onChange={(e) => handleFieldChange("text", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Variant</label>
              <select
                value={config.variant || "primary"}
                onChange={(e) => handleFieldChange("variant", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="primary">Primary</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
                <option value="glass">Glass</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Size</label>
              <select
                value={config.size || "md"}
                onChange={(e) => handleFieldChange("size", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Border Radius</label>
              <select
                value={config.rounded || "md"}
                onChange={(e) => handleFieldChange("rounded", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="sm">Micro (4px)</option>
                <option value="md">Standard (8px)</option>
                <option value="lg">Comfortable (12px)</option>
                <option value="full">Full Pill</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-text-secondary font-mono">Disabled State</span>
              <input
                type="checkbox"
                checked={!!config.disabled}
                onChange={(e) => handleFieldChange("disabled", e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-accent"
              />
            </div>
          </>
        )}

        {name === "input" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Placeholder Text</label>
              <input
                type="text"
                value={config.placeholder || "Type here..."}
                onChange={(e) => handleFieldChange("placeholder", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-text-secondary font-mono">Disabled State</span>
              <input
                type="checkbox"
                checked={!!config.disabled}
                onChange={(e) => handleFieldChange("disabled", e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-accent"
              />
            </div>
          </>
        )}

        {name === "card" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Title</label>
              <input
                type="text"
                value={config.title || "Liquid Glass Card"}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Description</label>
              <textarea
                value={config.description || "This is a premium card details."}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                rows={3}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-text-secondary font-mono">Glass Style</span>
              <input
                type="checkbox"
                checked={!!config.glass}
                onChange={(e) => handleFieldChange("glass", e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-accent"
              />
            </div>
          </>
        )}

        {name === "badge" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Badge Text</label>
              <input
                type="text"
                value={config.text || "New"}
                onChange={(e) => handleFieldChange("text", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Semantic Variant</label>
              <select
                value={config.variant || "primary"}
                onChange={(e) => handleFieldChange("variant", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="primary">Primary (Cyan)</option>
                <option value="success">Success (Green)</option>
                <option value="warning">Warning (Amber)</option>
                <option value="error">Error (Red)</option>
              </select>
            </div>
          </>
        )}

        {name === "avatar" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Initial Label</label>
              <input
                type="text"
                maxLength={2}
                value={config.alt || "JD"}
                onChange={(e) => handleFieldChange("alt", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={config.src || ""}
                onChange={(e) => handleFieldChange("src", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-text-secondary font-mono">Size</label>
              <select
                value={config.size || "md"}
                onChange={(e) => handleFieldChange("size", e.target.value)}
                className="text-xs p-2 rounded bg-bg-elevated border border-border-standard text-text-primary focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </>
        )}

        {name === "sidebar" && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-text-secondary font-mono">Collapsed Sidebar</span>
            <input
              type="checkbox"
              checked={!!config.collapsed}
              onChange={(e) => handleFieldChange("collapsed", e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-accent"
            />
          </div>
        )}

        {!["button", "input", "card", "badge", "avatar", "sidebar"].includes(name) && (
          <p className="text-[10px] text-text-muted italic text-center py-2">
            No configurable options for {selectedComponent}.
          </p>
        )}
      </div>
    </div>
  );
};

// ==========================================
// MAIN LIBRARIA APP ORCHESTRATOR
// ==========================================

const BASE_COMPONENTS = [
  "Button",
  "Input",
  "Card",
  "Badge",
  "Avatar",
  "Accordion",
  "Tabs",
  "Dialog",
  "Form",
  "Sidebar",
  "Header",
  "Footer",
];

const LibrariaApp: React.FC = () => {
  const { theme } = useTheme();
  const [selectedComponent, setSelectedComponent] = useState<string | null>("Button");
  const [aiMode, setAiMode] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // States for component configs to make preview fully interactive
  const [componentConfigs, setComponentConfigs] = useState<Record<string, any>>({
    button: {
      text: "Interactive Button",
      variant: "primary",
      size: "md",
      rounded: "md",
      disabled: false,
    },
    input: {
      placeholder: "Enter value...",
      disabled: false,
    },
    card: {
      title: "Liquid Glass Card",
      description: "This surface blends backdrop blur, opacity, and saturation into a premium glassmorphic panel.",
      glass: true,
    },
    badge: {
      text: "Premium Active",
      variant: "primary",
    },
    avatar: {
      alt: "JD",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      size: "md",
    },
    sidebar: {
      collapsed: false,
    },
  });

  const handleConfigChange = (newConfig: any) => {
    if (!selectedComponent) return;
    setComponentConfigs((prev) => ({
      ...prev,
      [selectedComponent.toLowerCase()]: newConfig,
    }));
  };

  const handleExport = () => {
    const tailwindTheme = themeToTailwindV4(theme);
    const jsonTheme = themeToJSON(theme);
    
    // Copy the config JSON to clipboard
    navigator.clipboard.writeText(jsonTheme).then(() => {
      alert("Theme configuration copied to clipboard in JSON format!\n\nCheck out tailwind v4 export as well.");
    }).catch(err => {
      console.error("Failed to copy theme", err);
    });

    console.log("Tailwind V4 theme config:\n", tailwindTheme);
  };

  const renderActiveComponent = () => {
    if (!selectedComponent) return null;
    const name = selectedComponent.toLowerCase();
    const config = componentConfigs[name] || {};

    switch (name) {
      case "button":
        return (
          <Button
            variant={config.variant}
            size={config.size}
            rounded={config.rounded}
            disabled={config.disabled}
          >
            {config.text}
          </Button>
        );
      case "input":
        return (
          <Input
            placeholder={config.placeholder}
            disabled={config.disabled}
          />
        );
      case "card":
        return (
          <Card
            title={config.title}
            description={config.description}
            glass={config.glass}
          >
            <div className="flex gap-2 justify-end mt-2">
              <Button variant="ghost" size="sm">Dismiss</Button>
              <Button variant="primary" size="sm">Action</Button>
            </div>
          </Card>
        );
      case "badge":
        return (
          <Badge
            variant={config.variant}
            text={config.text}
          />
        );
      case "avatar":
        return (
          <Avatar
            src={config.src}
            alt={config.alt}
            size={config.size}
          />
        );
      case "accordion":
        return (
          <Accordion
            items={[
              { title: "Liquid Glass System", content: "Libraria maps color variables directly to document custom properties, enabling seamless live theme adjustments." },
              { title: "Micro-animations", content: "Built-in spring configurations powered by motion/react deliver snappy user feedback." },
              { title: "Strict TypeScript Setup", content: "All templates are written in strict TypeScript mode with precise component typing." },
            ]}
          />
        );
      case "tabs":
        return (
          <Tabs
            tabs={["Dashboard", "Analytics", "Settings", "Activity"]}
          />
        );
      case "dialog":
        return (
          <div className="flex flex-col gap-2 items-center">
            <Button variant="glass" onClick={() => setIsDialogOpen(true)}>
              Open Preview Dialog
            </Button>
            <Dialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Libraria Preview System"
            >
              <p className="mb-4">This modal uses the backdrop-blur value configured by the Glass Transparency slider.</p>
              <Button variant="primary" size="sm" className="w-full" onClick={() => setIsDialogOpen(false)}>
                Acknowledge
              </Button>
            </Dialog>
          </div>
        );
      case "form":
        return <Form />;
      case "sidebar":
        return <Sidebar collapsed={config.collapsed} />;
      case "header":
        return <Header />;
      case "footer":
        return <Footer />;
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen flex flex-col bg-bg-deep text-text-primary overflow-hidden font-display ${aiMode ? "border-2 border-accent/20" : ""}`}>
      {/* Top Bar */}
      <TopBar
        aiMode={aiMode}
        onToggleAiMode={() => setAiMode(!aiMode)}
        onExport={handleExport}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - sidebar configs */}
        <aside className="w-80 glass-surface border-r border-border-standard flex flex-col overflow-y-auto shrink-0 select-none">
          <ColorConfig />
          <TypographyConfig />
          <GlassSlider />
          <ComponentConfig
            selectedComponent={selectedComponent}
            config={componentConfigs[selectedComponent?.toLowerCase() || ""]}
            onChange={handleConfigChange}
          />
        </aside>

        {/* Right Panel - Component Preview */}
        <main className="flex-1 overflow-hidden relative">
          <ComponentPreview selectedComponent={selectedComponent}>
            {renderActiveComponent()}
          </ComponentPreview>
        </main>
      </div>

      {/* Bottom Bar */}
      <BottomBar
        selectedComponent={selectedComponent}
        onSelectComponent={setSelectedComponent}
        components={BASE_COMPONENTS}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LibrariaApp />
    </ThemeProvider>
  );
}
