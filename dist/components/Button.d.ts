import React from "react";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "default" | "destructive" | "link" | "sokr-primary" | "sokr-secondary" | "sokr-cta" | "sokr-filter-selected" | "sokr-ai";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}
export declare const Button: React.FC<ButtonProps>;
