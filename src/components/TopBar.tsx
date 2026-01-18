import React from "react";

export interface TopBarProps {
  title: string;
  rightSlot?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, rightSlot }) => {
  return (
    <header className="flex items-center justify-between h-14 px-4 md:px-6 lg:px-8 bg-white border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-sokr-dark truncate m-0 leading-none">{title}</h1>
      {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
    </header>
  );
};
