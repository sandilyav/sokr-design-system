import React from "react";

export type ButtonVariant = "primary";

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

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  // For now we treat all variants the same and rely on caller's className
  const mergedClassName = [BASE_CLASSES, className].filter(Boolean).join(" ");

  return <button className={mergedClassName} {...props} />;
};
