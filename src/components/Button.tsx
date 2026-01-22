import React from "react";

export type ButtonVariant =
  | "primary" // alias for "default" (main action)
  | "secondary"
  | "outline"
  | "ghost"
  | "default"
  | "destructive"
  | "link"
  | "sokr-primary"
  | "sokr-secondary"
  | "sokr-cta"
  | "sokr-filter-selected"
  | "sokr-ai";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// Base classes mirror the SOKR shadcn Button base + default size (h-10 px-4 py-2)
const BASE_CLASSES =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium " +
  "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
  "h-10 px-4 py-2";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Core app variants
  default:
    "border border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  primary:
    "border border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive:
    "border border-destructive bg-background text-destructive hover:bg-destructive/10",
  link: "text-primary underline-offset-4 hover:underline border border-transparent bg-transparent",

  // SOKR-specific marketing/AI variants – classes copied from main app
  "sokr-primary":
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover font-semibold text-base px-6 py-3 rounded-lg border-none",
  "sokr-secondary":
    "bg-primary/50 text-slate-800 shadow-none hover:bg-primary/40 font-semibold text-base px-6 py-3 rounded-lg border-none",
  "sokr-cta":
    "bg-primary text-primary-foreground shadow-none hover:bg-primary-hover font-bold text-base px-7 py-3 rounded-xl tracking-wide border-none",
  "sokr-filter-selected":
    "border border-input bg-[#e3e6ea] hover:bg-accent hover:text-accent-foreground",
  "sokr-ai": "sokr-ai-button border-none",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const variantClasses = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default;
  const mergedClassName =
    [BASE_CLASSES, variantClasses, className].filter(Boolean).join(" ");

  return <button className={mergedClassName} {...props} />;
};
