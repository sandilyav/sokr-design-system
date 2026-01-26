import * as React from "react";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "./Button";

// Lightweight utility equivalent to the app's `cn`
const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(" ");

// Minimal popover + command primitives used by MultiSelect. These are
// intentionally simple and local to the design system so that the
// exported MultiSelect behaves the same as in the main app.

interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ open, onOpenChange, children }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      const root = ref.current;
      if (!root) return;
      if (event.target instanceof Node && root.contains(event.target)) return;
      onOpenChange(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onOpenChange]);

  return (
    <div ref={ref} className="relative w-full">
      {children}
    </div>
  );
};

interface PopoverTriggerProps {
  children: React.ReactElement;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => children;

interface PopoverContentProps {
  className?: string;
  align?: "start" | "end" | "center";
  children: React.ReactNode;
}

const PopoverContent: React.FC<PopoverContentProps> = ({ className, children }) => (
  <div
    className={cn(
      "absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md",
      className,
    )}
  >
    {children}
  </div>
);

// Command primitives (very small approximation of shadcn/ui command)

interface CommandProps {
  className?: string;
  children: React.ReactNode;
}

const Command: React.FC<CommandProps> = ({ className, children }) => (
  <div className={cn("flex flex-col", className)}>{children}</div>
);

interface CommandInputProps {
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ placeholder, onValueChange }) => (
  <div className="border-b p-2">
    <input
      type="text"
      placeholder={placeholder}
      className="flex h-8 w-full rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onChange={(e) => onValueChange?.(e.target.value)}
    />
  </div>
);

interface CommandListProps {
  children: React.ReactNode;
}

const CommandList: React.FC<CommandListProps> = ({ children }) => (
  <div className="max-h-60 overflow-y-auto p-1 text-sm">{children}</div>
);

interface CommandEmptyProps {
  children: React.ReactNode;
}

const CommandEmpty: React.FC<CommandEmptyProps> = ({ children }) => (
  <div className="px-2 py-2 text-xs text-muted-foreground">{children}</div>
);

interface CommandGroupProps {
  heading?: string;
  children: React.ReactNode;
}

const CommandGroup: React.FC<CommandGroupProps> = ({ heading, children }) => (
  <div className="py-1">
    {heading && (
      <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">{heading}</div>
    )}
    {children}
  </div>
);

interface CommandItemBaseProps {
  value: string;
  disabled?: boolean;
  className?: string;
  onSelect?: () => void;
  children: React.ReactNode;
}

const CommandItem: React.FC<CommandItemBaseProps> = ({
  disabled,
  className,
  onSelect,
  children,
}) => (
  <button
    type="button"
    className={cn(
      "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-left text-sm text-sokr-dark hover:bg-accent",
      disabled && "cursor-not-allowed opacity-60",
      className,
    )}
    onClick={disabled ? undefined : onSelect}
  >
    {children}
  </button>
);

export interface MultiSelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  displayLabel?: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  displayLabel?: string;
}

const MultiSelectItem = React.forwardRef<HTMLDivElement, MultiSelectItemProps>(
  ({ value, children, className, disabled, ...props }, ref) => {
    return (
      <CommandItem
        value={value}
        className={cn("flex items-center", className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </CommandItem>
    );
  },
);

MultiSelectItem.displayName = "MultiSelectItem";

const MultiSelect: React.FC<MultiSelectProps> & {
  Item: typeof MultiSelectItem;
  Group: typeof CommandGroup;
} = ({ value = [], onChange, placeholder = "Select items", children, className, loading = false }) => {
  const [open, setOpen] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState("");

  const options: MultiSelectOption[] = React.useMemo(() => {
    const extractOptions = (nodes: React.ReactNode): MultiSelectOption[] => {
      return React.Children.toArray(nodes).flatMap((child) => {
        if (React.isValidElement(child)) {
          if (child.type === CommandGroup) {
            return extractOptions(child.props.children as React.ReactNode);
          } else if (child.type === MultiSelectItem) {
            return [
              {
                value: child.props.value,
                label: child.props.children,
                disabled: child.props.disabled,
                displayLabel: child.props.displayLabel,
              },
            ];
          }
        }
        return [];
      });
    };
    return extractOptions(children);
  }, [children]);

  const toggleSelection = (itemValue: string) => {
    if (value.includes(itemValue)) {
      onChange(value.filter((s) => s !== itemValue));
    } else {
      onChange([...value, itemValue]);
    }
  };

  const handleUnselect = (item: string) => {
    onChange(value.filter((s) => s !== item));
  };

  const selectedCount = value.length;

  const filteredOptions = React.useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    if (!term) return options;
    return options.filter((opt) => {
      const text = (opt.displayLabel ?? "").toLowerCase();
      return text.includes(term);
    });
  }, [options, searchValue]);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="outline"
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between min-h-10 h-auto items-center flex-wrap py-2",
              selectedCount > 0 ? "text-left" : "text-center",
            )}
            onClick={() => !loading && setOpen((prev) => !prev)}
            disabled={loading}
          >
            {loading ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : selectedCount > 0 ? (
              options.length === 0 ? (
                <span className="px-2 py-0.5 text-xs text-muted-foreground">
                  {selectedCount} selected
                </span>
              ) : (
                <div className="flex max-w-[90%] flex-wrap gap-1">
                  {value.map((itemValue) => {
                    const option = options.find((opt) => opt.value === itemValue);
                    if (!option) return null;
                    return (
                      <span
                        key={itemValue}
                        className="flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 pl-1.5 pr-2 py-0.5 text-xs text-sokr-dark"
                      >
                        {option.label}
                        <X
                          className="h-3 w-3 cursor-pointer text-sokr-dark/70 hover:text-sokr-dark"
                          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                            e.stopPropagation();
                            handleUnselect(itemValue);
                          }}
                        />
                      </span>
                    );
                  })}
                </div>
              )
            ) : (
              <span className="text-sokr-dark/60">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {open && (
          <PopoverContent className="w-80 p-0" align="start">
            <Command className="w-full">
              <CommandInput
                placeholder="Search items..."
                onValueChange={(val) => setSearchValue(val)}
              />
              <CommandList>
                {filteredOptions.length === 0 ? (
                  <CommandEmpty>No items found.</CommandEmpty>
                ) : (
                  <>
                    {React.Children.map(children, (child) => {
                      if (!React.isValidElement(child)) return null;

                      const renderItem = (item: React.ReactElement<MultiSelectItemProps>) => {
                        const isSelected = value.includes(item.props.value);
                        const searchLabel = item.props.displayLabel || item.props.value;
                        if (
                          searchValue &&
                          !searchLabel.toLowerCase().includes(searchValue.trim().toLowerCase())
                        ) {
                          return null;
                        }
                        return (
                          <CommandItem
                            key={item.props.value}
                            value={item.props.value}
                            disabled={item.props.disabled}
                            className="owner-select-item"
                            onSelect={() => toggleSelection(item.props.value)}
                          >
                            <div className="flex w-4 items-center justify-center">
                              {isSelected && <Check className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">{item.props.children}</div>
                          </CommandItem>
                        );
                      };

                      if (child.type === CommandGroup) {
                        const groupChildren = React.Children.map(
                          child.props.children,
                          (item) => {
                            if (
                              React.isValidElement<MultiSelectItemProps>(item) &&
                              item.type === MultiSelectItem
                            ) {
                              return renderItem(item);
                            }
                            return null;
                          },
                        );
                        return (
                          <CommandGroup heading={child.props.heading}>
                            {groupChildren}
                          </CommandGroup>
                        );
                      } else if (child.type === MultiSelectItem) {
                        return renderItem(child as React.ReactElement<MultiSelectItemProps>);
                      }
                      return null;
                    })}
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

MultiSelect.Item = MultiSelectItem;
MultiSelect.Group = CommandGroup;

export { MultiSelect };

