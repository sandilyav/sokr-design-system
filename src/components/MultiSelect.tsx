import React, { useMemo, useState } from "react";
import { Button } from "./Button";

export interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  /**
   * Plain-text representation used for searching/filtering.
   * If omitted, no search match will be found for this option.
   */
  searchText?: string;
}

export interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select items",
  loading = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedSet = useMemo(() => new Set(value), [value]);

  const filteredOptions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return options;
    return options.filter((opt) => {
      const text = (opt.searchText ?? "").toLowerCase();
      return text.includes(term);
    });
  }, [options, search]);

  const toggleValue = (val: string) => {
    if (selectedSet.has(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const selectedLabels = useMemo(() => {
    const byValue = new Map(options.map((o) => [o.value, o.label] as const));
    return value
      .map((v) => byValue.get(v))
      .filter((l): l is React.ReactNode => l !== undefined);
  }, [options, value]);

  return (
    <div className={"relative w-full " + (className ?? "")}>
      <Button
        variant="outline"
        type="button"
        className="w-full justify-between min-h-10 h-auto items-center flex-wrap py-2"
        onClick={() => !loading && setOpen((prev) => !prev)}
        disabled={loading}
      >
        {loading ? (
          <span className="text-muted-foreground">Loading...</span>
        ) : selectedLabels.length > 0 ? (
          <div className="flex flex-wrap gap-1 max-w-[90%] text-left">
            {selectedLabels.map((label, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground w-full text-left">
            {placeholder}
          </span>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {open ? "▲" : "▼"}
        </span>
      </Button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full rounded-md border bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1 text-sm">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-2 text-muted-foreground text-xs">
                No items found.
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedSet.has(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm hover:bg-accent ${
                      isSelected ? "bg-accent" : ""
                    }`}
                    onClick={() => toggleValue(opt.value)}
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center text-[10px]">
                      {isSelected ? "✓" : ""}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
