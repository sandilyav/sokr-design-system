import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MultiSelect } from "./MultiSelect";
export const PeopleSelect = ({ options, value, onChange, placeholder = "Select people", loading = false, disabled = false, className, }) => {
    return (_jsx(MultiSelect, { value: value, onChange: onChange, placeholder: placeholder, loading: loading, className: disabled ? `opacity-70 pointer-events-none ${className !== null && className !== void 0 ? className : ""}` : className, children: options.map((person) => {
            var _a, _b;
            return (_jsx(MultiSelect.Item, { value: person.id, displayLabel: [person.name, person.email].filter(Boolean).join(" "), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-gray-100 border border-gray-300 overflow-hidden flex-shrink-0", children: person.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            _jsx("img", { src: person.avatarUrl, alt: person.name || person.email || "", className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center text-[10px] text-sokr-dark", children: (_b = (_a = person.name) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase()) !== null && _b !== void 0 ? _b : "?" })) }), _jsxs("span", { className: "text-sm", children: [person.name || person.email, person.isCurrentUser && (_jsx("span", { className: "ml-1 text-xs text-gray-500", children: "(You)" }))] })] }) }, person.id));
        }) }));
};
