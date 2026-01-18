import React from "react";
import { MultiSelect, MultiSelectOption } from "./MultiSelect";

export interface PeopleSelectOption {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string | null;
  isCurrentUser?: boolean;
}

export interface PeopleSelectProps {
  options: PeopleSelectOption[];
  value: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const PeopleSelect: React.FC<PeopleSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select people",
  loading = false,
  disabled = false,
  className,
}) => {
  const multiOptions: MultiSelectOption[] = React.useMemo(
    () =>
      options.map((person) => ({
        value: person.id,
        searchText: [person.name, person.email].filter(Boolean).join(" "),
        label: (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
              {person.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.avatarUrl}
                  alt={person.name || person.email || ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                  {person.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
              )}
            </div>
            <span className="text-sm">
              {person.name || person.email}
              {person.isCurrentUser && (
                <span className="ml-1 text-xs text-gray-500">(You)</span>
              )}
            </span>
          </div>
        ),
      })),
    [options]
  );

  return (
    <MultiSelect
      value={value}
      onChange={onChange}
      options={multiOptions}
      placeholder={placeholder}
      loading={loading}
      className={disabled ? `opacity-70 pointer-events-none ${className ?? ""}` : className}
    />
  );
};
