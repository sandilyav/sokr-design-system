import React from "react";

export type ButtonVariant = "primary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const baseClass = "sokr-btn";
  const variantClass =
    variant === "primary" ? "sokr-btn-primary" : "sokr-btn-primary";

  const mergedClassName = [baseClass, variantClass, className]
    .filter(Boolean)
    .join(" ");

  return <button className={mergedClassName} {...props} />;
};
