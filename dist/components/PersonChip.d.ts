import React from "react";
export type PersonChipSize = "sm" | "md" | "lg";
export type PersonChipVariant = "default" | "selected" | "muted";
export interface PersonChipProps {
    id?: string;
    name: string;
    avatarUrl?: string | null;
    initials?: string;
    size?: PersonChipSize;
    variant?: PersonChipVariant;
    className?: string;
    showName?: boolean;
    onClick?: () => void;
}
/**
 * Generic pill-style person chip: avatar + name.
 * Visual-only, no data fetching. Consumers pass in name/avatar and click handlers.
 */
export declare const PersonChip: React.FC<PersonChipProps>;
