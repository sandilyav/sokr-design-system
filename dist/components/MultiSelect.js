import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "./Button";
// Lightweight utility equivalent to the app's `cn`
const cn = (...classes) => classes.filter(Boolean).join(" ");
const Popover = ({ open, onOpenChange, children }) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (!open)
            return;
        const handleClick = (event) => {
            const root = ref.current;
            if (!root)
                return;
            if (event.target instanceof Node && root.contains(event.target))
                return;
            onOpenChange(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open, onOpenChange]);
    return (_jsx("div", { ref: ref, className: "relative w-full", children: children }));
};
const PopoverTrigger = ({ children }) => children;
const PopoverContent = ({ className, children }) => (_jsx("div", { className: cn("absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md", className), children: children }));
const Command = ({ className, children }) => (_jsx("div", { className: cn("flex flex-col", className), children: children }));
const CommandInput = ({ placeholder, onValueChange }) => (_jsx("div", { className: "border-b p-2", children: _jsx("input", { type: "text", placeholder: placeholder, className: "flex h-8 w-full rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", onChange: (e) => onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(e.target.value) }) }));
const CommandList = ({ children }) => (_jsx("div", { className: "max-h-60 overflow-y-auto p-1 text-sm", children: children }));
const CommandEmpty = ({ children }) => (_jsx("div", { className: "px-2 py-2 text-xs text-muted-foreground", children: children }));
const CommandGroup = ({ heading, children }) => (_jsxs("div", { className: "py-1", children: [heading && (_jsx("div", { className: "px-2 pb-1 text-xs font-medium text-muted-foreground", children: heading })), children] }));
const CommandItem = ({ disabled, className, onSelect, children, }) => (_jsx("button", { type: "button", className: cn("flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-left text-sm text-sokr-dark hover:bg-accent", disabled && "cursor-not-allowed opacity-60", className), onClick: disabled ? undefined : onSelect, children: children }));
const MultiSelectItem = React.forwardRef(({ value, children, className, disabled, ...props }, ref) => {
    return (_jsx(CommandItem, { value: value, className: cn("flex items-center", className), disabled: disabled, ...props, children: children }));
});
MultiSelectItem.displayName = "MultiSelectItem";
const MultiSelect = ({ value = [], onChange, placeholder = "Select items", children, className, loading = false }) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const options = React.useMemo(() => {
        const extractOptions = (nodes) => {
            return React.Children.toArray(nodes).flatMap((child) => {
                if (React.isValidElement(child)) {
                    if (child.type === CommandGroup) {
                        return extractOptions(child.props.children);
                    }
                    else if (child.type === MultiSelectItem) {
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
    const toggleSelection = (itemValue) => {
        if (value.includes(itemValue)) {
            onChange(value.filter((s) => s !== itemValue));
        }
        else {
            onChange([...value, itemValue]);
        }
    };
    const handleUnselect = (item) => {
        onChange(value.filter((s) => s !== item));
    };
    const selectedCount = value.length;
    const filteredOptions = React.useMemo(() => {
        const term = searchValue.trim().toLowerCase();
        if (!term)
            return options;
        return options.filter((opt) => {
            var _a;
            const text = ((_a = opt.displayLabel) !== null && _a !== void 0 ? _a : "").toLowerCase();
            return text.includes(term);
        });
    }, [options, searchValue]);
    return (_jsx("div", { className: cn("w-full", className), children: _jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { children: _jsxs(Button, { variant: "outline", type: "button", role: "combobox", "aria-expanded": open, className: cn("w-full justify-between min-h-10 h-auto items-center flex-wrap py-2", selectedCount > 0 ? "text-left" : "text-center"), onClick: () => !loading && setOpen((prev) => !prev), disabled: loading, children: [loading ? (_jsx("span", { className: "text-muted-foreground", children: "Loading..." })) : selectedCount > 0 ? (options.length === 0 ? (_jsxs("span", { className: "px-2 py-0.5 text-xs text-muted-foreground", children: [selectedCount, " selected"] })) : (_jsx("div", { className: "flex max-w-[90%] flex-wrap gap-1", children: value.map((itemValue) => {
                                    const option = options.find((opt) => opt.value === itemValue);
                                    if (!option)
                                        return null;
                                    return (_jsxs("span", { className: "flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 pl-1 pr-2 py-0.5 text-xs text-sokr-dark", children: [option.label, _jsx(X, { className: "h-3 w-3 cursor-pointer text-sokr-dark/70 hover:text-sokr-dark", onClick: (e) => {
                                                    e.stopPropagation();
                                                    handleUnselect(itemValue);
                                                } })] }, itemValue));
                                }) }))) : (_jsx("span", { className: "text-sokr-dark/60", children: placeholder })), _jsx(ChevronsUpDown, { className: "ml-auto h-4 w-4 shrink-0 opacity-50" })] }) }), open && (_jsx(PopoverContent, { className: "w-80 p-0", align: "start", children: _jsxs(Command, { className: "w-full", children: [_jsx(CommandInput, { placeholder: "Search items...", onValueChange: (val) => setSearchValue(val) }), _jsx(CommandList, { children: filteredOptions.length === 0 ? (_jsx(CommandEmpty, { children: "No items found." })) : (_jsx(_Fragment, { children: React.Children.map(children, (child) => {
                                        if (!React.isValidElement(child))
                                            return null;
                                        const renderItem = (item) => {
                                            const isSelected = value.includes(item.props.value);
                                            const searchLabel = item.props.displayLabel || item.props.value;
                                            if (searchValue &&
                                                !searchLabel.toLowerCase().includes(searchValue.trim().toLowerCase())) {
                                                return null;
                                            }
                                            return (_jsxs(CommandItem, { value: item.props.value, disabled: item.props.disabled, className: "owner-select-item", onSelect: () => toggleSelection(item.props.value), children: [_jsx("div", { className: "flex w-4 items-center justify-center", children: isSelected && _jsx(Check, { className: "h-4 w-4" }) }), _jsx("div", { className: "flex-1", children: item.props.children })] }, item.props.value));
                                        };
                                        if (child.type === CommandGroup) {
                                            const groupChildren = React.Children.map(child.props.children, (item) => {
                                                if (React.isValidElement(item) &&
                                                    item.type === MultiSelectItem) {
                                                    return renderItem(item);
                                                }
                                                return null;
                                            });
                                            return (_jsx(CommandGroup, { heading: child.props.heading, children: groupChildren }));
                                        }
                                        else if (child.type === MultiSelectItem) {
                                            return renderItem(child);
                                        }
                                        return null;
                                    }) })) })] }) }))] }) }));
};
MultiSelect.Item = MultiSelectItem;
MultiSelect.Group = CommandGroup;
export { MultiSelect };
