import React from "react";
export interface SidebarProps {
    children: React.ReactNode;
    /**
     * Whether the sidebar is in a collapsed (narrow) state on desktop.
     * Apps can control this based on their own focus mode / toggle logic.
     */
    collapsed?: boolean;
}
export declare const Sidebar: React.FC<SidebarProps>;
