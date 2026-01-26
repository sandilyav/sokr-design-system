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

const sizeClasses: Record<PersonChipSize, string> = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-7 w-7 text-xs",
  lg: "h-8 w-8 text-sm",
};

const variantClasses: Record<PersonChipVariant, string> = {
  default:
    "bg-gray-100 text-gray-800 border-gray-200",
  selected:
    "bg-blue-100 text-blue-800 border-blue-200",
  muted:
    "bg-muted text-muted-foreground border-transparent",
};

/**
 * Generic pill-style person chip: avatar + name.
 * Visual-only, no data fetching. Consumers pass in name/avatar and click handlers.
 */
export const PersonChip: React.FC<PersonChipProps> = ({
  name,
  avatarUrl,
  initials,
  size = "sm",
  variant = "default",
  className,
  showName = true,
  onClick,
}) => {
  const chipClasses = [
    "inline-flex items-center gap-1.5 rounded-full border pl-1.25 pr-2 py-0.5 text-xs font-semibold transition-colors",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const avatarSize = sizeClasses[size];

  const content = (
    <div className={chipClasses}>
      <div
        className={`flex items-center justify-center rounded-full overflow-hidden bg-gray-100 ${avatarSize}`}
      >
        {avatarUrl ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium">
            {(initials || name.charAt(0) || "?").toUpperCase()}
          </span>
        )}
      </div>
      {showName && <span className="font-medium whitespace-nowrap">{name}</span>}
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="border-none bg-transparent p-0 cursor-pointer"
      >
        {content}
      </button>
    );
  }

  return content;
};
