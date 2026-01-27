import React from "react";
export interface SidebarNavItemProps {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    asChild?: boolean;
    children?: React.ReactNode;
}
export declare const SidebarNavItem: React.FC<SidebarNavItemProps>;
export interface SidebarNavProps {
    children: React.ReactNode;
    className?: string;
}
export declare const SidebarNav: React.FC<SidebarNavProps>;
