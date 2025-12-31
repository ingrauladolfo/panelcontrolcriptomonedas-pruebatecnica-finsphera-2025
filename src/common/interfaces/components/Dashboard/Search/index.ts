/* This TypeScript code snippet is defining an interface named `SearchProps`. Interfaces in TypeScript
are used to define the structure of objects. In this case, the `SearchProps` interface has the
following properties: */
export interface SearchProps {
    data: any[];
    filterKey: string;
    placeholder: string;
    onSearch: (filteredData: any[], term?: string) => void;
}