import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TopBar = ({ title, rightSlot }) => {
    return (_jsxs("header", { className: "flex items-center justify-between h-14 px-4 md:px-6 lg:px-8 bg-white border-b border-gray-200", children: [_jsx("h1", { className: "text-2xl font-semibold text-sokr-dark truncate m-0 leading-none", children: title }), rightSlot && _jsx("div", { className: "flex items-center gap-2", children: rightSlot })] }));
};
