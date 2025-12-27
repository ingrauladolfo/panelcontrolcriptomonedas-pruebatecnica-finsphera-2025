import type { ChangeEvent } from "react";

export interface SearchState {
    searchTerm: string;
    active: boolean;
}
export interface SearchActions {
    setSearchTerm: (v: string) => void;
    setActive: (v: boolean) => void;
    reset: () => void;

    getValueByKey: <T extends Record<string, unknown>>(
        obj: T,
        key: string
    ) => unknown;

    doFilter: <T extends Record<string, unknown>>(
        params: {
            data: T[];
            filterKey: string;
            onSearch: (filteredData: T[]) => void;
        }
    ) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (
        e: React.KeyboardEvent<HTMLInputElement>,
        inputRef: HTMLInputElement | null,
        data: any[],
        filterKey: string,
        onSearch: (filtered: any[]) => void
    ) => void;
    handleClear: (inputRef: HTMLInputElement | null, onSearch: (filtered: any[]) => void, data: any[]) => void;
    handleSearch: (filtered: any[], onSearch: (filtered: any[], term?: string) => void) => void;

}
/* export interface SearchActions {
    setSearchTerm: (term: string) => void;
    setActive: (active: boolean) => void;
    setFilteredData: (data: any[]) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    doFilter: (term: string, data: any[]) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, data: any[]) => void;
    handleClear: (data: any[]) => void;
    getValueByKey: (obj: any, key: string) => any;
    handleSearch: (onSearch: (data: any[]) => void) => void;
} */