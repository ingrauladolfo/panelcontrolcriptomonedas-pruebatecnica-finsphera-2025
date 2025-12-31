/* This code snippet is defining an interface named `PaginationProps` in TypeScript. Interfaces in
TypeScript are used to define the structure of objects. */
export interface PaginationProps {
    pages: (any)[];
    currentPage: any;
    handlePageChange: (page: number) => void;
    itemsPerPage: number;
    handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    itemsPerPageOptions: { value: number; label: string }[];
    t: { rowPerPage: string };
}