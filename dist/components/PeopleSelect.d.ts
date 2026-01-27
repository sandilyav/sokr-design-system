import React from "react";
export interface PeopleSelectOption {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string | null;
    isCurrentUser?: boolean;
}
export interface PeopleSelectProps {
    options: PeopleSelectOption[];
    value: string[];
    onChange: (ids: string[]) => void;
    placeholder?: string;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}
export declare const PeopleSelect: React.FC<PeopleSelectProps>;
