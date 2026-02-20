import { jsx as _jsx } from "react/jsx-runtime";
export const Sidebar = ({ children, collapsed = false }) => {
    return (_jsx("aside", { className: "bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-screen sticky top-0 " +
            (collapsed ? "w-16" : "w-64"), children: children }));
};
