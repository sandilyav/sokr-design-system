import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
// Minimal class name join helper to avoid depending on app-specific utilities
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const SidebarNavItem = ({ icon, label, active = false, onClick, asChild = false, children, }) => {
    var _a;
    const content = (_jsxs("div", { className: cx("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium cursor-pointer", active
            ? "bg-slate-100 text-sokr-dark"
            : "text-sokr-dark hover:bg-slate-50 hover:text-sokr-dark"), onClick: onClick, children: [icon && _jsx("span", { className: "h-4 w-4 flex items-center justify-center", children: icon }), _jsx("span", { className: "truncate", children: label })] }));
    if (asChild && children) {
        return React.cloneElement(children, {
            className: cx((_a = children.props) === null || _a === void 0 ? void 0 : _a.className, "block"),
            children: content,
        });
    }
    return content;
};
export const SidebarNav = ({ children, className }) => {
    return _jsx("nav", { className: cx("flex flex-col gap-1", className), children: children });
};
