import React from "react";

export interface EnvironmentBadgeProps {
  label: string;
}

export const EnvironmentBadge: React.FC<EnvironmentBadgeProps> = ({ label }) => {
  return (
    <span className="inline-flex items-center rounded-md border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
      {label}
    </span>
  );
};
