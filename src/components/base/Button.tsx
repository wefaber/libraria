import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/lib/theme/ThemeContext";

export interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "disabled"> {
  variant?: "primary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  rounded = "md",
  disabled = false,
  children,
  className = "",
  ...props
}) => {
  const { theme } = useTheme();

  // Variant classes mapping
  const variantClasses = {
    primary: "bg-accent hover:bg-accent-hover text-[#0a1628] font-semibold border border-transparent shadow-[0_2px_8px_rgba(0,198,176,0.2)]",
    outline: "border border-border-standard text-text-primary hover:border-accent hover:bg-bg-elevated/30",
    ghost: "text-text-secondary hover:bg-bg-elevated hover:text-text-primary border border-transparent",
    glass: "glass-surface text-text-primary hover:bg-bg-elevated/60 shadow-lg",
  };

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-medium",
    md: "px-4 py-2 text-sm font-semibold",
    lg: "px-6 py-2.5 text-base font-semibold",
  };

  // Border radius mapping
  const roundedClasses = {
    sm: "rounded-[4px]", // micro
    md: "rounded-[8px]", // standard
    lg: "rounded-[12px]", // comfortable
    full: "rounded-[9999px]", // pill
  };

  // Animation values configured in theme tokens
  const transitionConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 15,
    mass: 0.8,
    ...(theme.animation.reducedMotion ? { type: "tween" as const, duration: 0 } : {})
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={transitionConfig}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-display transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg-deep cursor-pointer ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${roundedClasses[rounded]} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
