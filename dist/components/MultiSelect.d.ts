import * as React from "react";
interface CommandGroupProps {
    heading?: string;
    children: React.ReactNode;
}
declare const CommandGroup: React.FC<CommandGroupProps>;
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
declare const MultiSelectItem: React.ForwardRefExoticComponent<MultiSelectItemProps & React.RefAttributes<HTMLDivElement>>;
declare const MultiSelect: React.FC<MultiSelectProps> & {
    Item: typeof MultiSelectItem;
    Group: typeof CommandGroup;
};
export { MultiSelect };
