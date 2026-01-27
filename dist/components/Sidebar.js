import { jsx as _jsx } from "react/jsx-runtime";
export const Sidebar = ({ children, collapsed = false }) => {
    return (_jsx("aside", { className: "bg-white border-r border-gray-200 flex-shrink-0 flex flex-col min-h-screen " +
            (collapsed ? "w-16" : "w-64"), children: children }));
};
