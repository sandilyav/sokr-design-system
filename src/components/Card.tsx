import React from "react";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Simple panel/card container used for settings and detail sections.
 *
 * - Soft rounded border
 * - White background
 * - Subtle border and shadow
 */
export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <section
      className={[
        "bg-white border border-gray-100 rounded-xl shadow-sm",
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
