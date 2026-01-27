import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * High-level layout shell with optional sidebar and top bar.
 *
 * Structure only:
 * - Sidebar on the left (fixed width on md+)
 * - Top bar above the main content
 * - Children rendered as-is for the main content
 *
 * Padding and <main> wrappers are left to the consuming app so SOKR/AiCRM
 * can control those details.
 */
export const AppShell = ({ sidebar, topBar, children }) => {
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-row", children: [sidebar, _jsxs("div", { className: "flex flex-col flex-1 min-w-0", children: [topBar, children] })] }));
};
