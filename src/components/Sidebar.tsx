import React from "react";

export interface SidebarProps {
  children: React.ReactNode;
  /**
   * Whether the sidebar is in a collapsed (narrow) state on desktop.
   * Apps can control this based on their own focus mode / toggle logic.
   */
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, collapsed = false }) => {
  return (
    <aside
      className={
        "bg-white border-r border-gray-200 flex-shrink-0 " +
        (collapsed ? "w-16" : "w-64") +
        " hidden md:flex flex-col min-h-screen"
      }
    >
      {children}
    </aside>
  );
};
