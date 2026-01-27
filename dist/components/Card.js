import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Simple panel/card container used for settings and detail sections.
 *
 * - Soft rounded border
 * - White background
 * - Subtle border and shadow
 */
export const Card = ({ title, children, className, variant = "default" }) => {
    const variantClasses = variant === "selected"
        ? "bg-indigo-50 border-indigo-200"
        : "bg-white border-gray-100";
    return (_jsxs("section", { className: [
            "border rounded-xl shadow-sm",
            variantClasses,
            "p-4 md:p-5",
            className,
        ]
            .filter(Boolean)
            .join(" "), children: [title && (_jsx("h3", { className: "text-base font-semibold text-sokr-dark mb-2", children: title })), children] }));
};
