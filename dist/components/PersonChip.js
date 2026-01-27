import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-7 w-7 text-xs",
    lg: "h-8 w-8 text-sm",
};
const variantClasses = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    selected: "bg-blue-100 text-blue-800 border-blue-200",
    muted: "bg-muted text-muted-foreground border-transparent",
};
/**
 * Generic pill-style person chip: avatar + name.
 * Visual-only, no data fetching. Consumers pass in name/avatar and click handlers.
 */
export const PersonChip = ({ name, avatarUrl, initials, size = "sm", variant = "default", className, showName = true, onClick, }) => {
    const chipClasses = [
        // Slightly tighter left padding and smaller gap so the avatar sits visually
        // close to the pill border without leaving a crescent of empty space.
        "inline-flex items-center gap-1.5 rounded-full border pl-1.5 pr-2 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className,
    ]
        .filter(Boolean)
        .join(" ");
    const avatarSize = sizeClasses[size];
    const content = (_jsxs("div", { className: chipClasses, children: [_jsx("div", { className: `flex items-center justify-center rounded-full overflow-hidden bg-gray-100 -ml-0.5 ${avatarSize}`, children: avatarUrl ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                // eslint-disable-next-line @next/next/no-img-element
                _jsx("img", { src: avatarUrl, alt: name, className: "h-full w-full object-cover" })) : (_jsx("span", { className: "flex h-full w-full items-center justify-center font-medium", children: (initials || name.charAt(0) || "?").toUpperCase() })) }), showName && _jsx("span", { className: "font-medium whitespace-nowrap", children: name })] }));
    if (onClick) {
        return (_jsx("button", { type: "button", onClick: onClick, className: "border-none bg-transparent p-0 cursor-pointer", children: content }));
    }
    return content;
};
