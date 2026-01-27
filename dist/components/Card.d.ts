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
export declare const Card: React.FC<CardProps>;
