import React from "react";

export interface AppShellProps {
  sidebar?: React.ReactNode;
  topBar?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * High-level layout shell with optional sidebar and top bar.
 *
 * Structure only:
 * - Sidebar on the left (fixed width on md+)
 * - Top bar above the main content
 * - Children rendered as-is for the main content
 *
 * Padding and <main> wrappers are left to the consuming app so SOKR/AiCRM
 * can control those details.
 */
export const AppShell: React.FC<AppShellProps> = ({ sidebar, topBar, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {sidebar}
      <div className="flex flex-col flex-1 min-w-0">
        {topBar}
        {children}
      </div>
    </div>
  );
};
