import React from "react";

// Minimal class name join helper to avoid depending on app-specific utilities
function cx(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export interface SidebarNavItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
  asChild = false,
  children,
}) => {
  const content = (
    <div
      className={cx(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium cursor-pointer",
        active
          ? "bg-slate-100 text-sokr-dark"
          : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
      )}
      onClick={onClick}
    >
      {icon && <span className="h-4 w-4 flex items-center justify-center">{icon}</span>}
      <span className="truncate">{label}</span>
    </div>
  );

  if (asChild && children) {
    return React.cloneElement(children as React.ReactElement, {
      className: cx((children as any).props?.className, "block"),
      children: content,
    });
  }

  return content;
};

export interface SidebarNavProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ children, className }) => {
  return <nav className={cx("flex flex-col gap-1", className)}>{children}</nav>;
};
