import React from "react";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Visual variant of the card.
   * - default: plain white card
   * - selected: subtle highlighted background + stronger border
   */
  variant?: "default" | "selected";
}

/**
 * Simple panel/card container used for settings and detail sections.
 *
 * - Soft rounded border
 * - White background
 * - Subtle border and shadow
 */
export const Card: React.FC<CardProps> = ({ title, children, className, variant = "default" }) => {
  const variantClasses =
    variant === "selected"
      ? "bg-indigo-50 border-indigo-200"
      : "bg-white border-gray-100";

  return (
    <section
      className={[
        "border rounded-xl shadow-sm",
        variantClasses,
        "p-4 md:p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title && (
        <h3 className="text-base font-semibold text-sokr-dark mb-2">{title}</h3>
      )}
      {children}
    </section>
  );
};
