/* This code snippet is a TypeScript React component called `Search`. It is a functional component that
takes in props of type `SearchProps`. Here is a breakdown of what the component does: */
// Search.tsx
import type { SearchProps } from "@/common/interfaces";
import { useSearchStore } from "@/common/stores";
import { useRef, type FC } from "react";
import { FaMagnifyingGlass, FaX } from "react-icons/fa6";

export const Search: FC<SearchProps> = ({ data, filterKey, placeholder, onSearch }) => {
    const {
        searchTerm,
        active,
        handleChange,
        handleKeyDown,
        handleClear,
        handleSearch, // ← viene del store
    } = useSearchStore();

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="relative w-full max-w-lg mx-auto mb-5">
            {!active && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <FaMagnifyingGlass className="text-gray-400 text-lg md:text-xl" />
                </div>
            )}

            <input
                ref={inputRef}
                type="search"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={(e) =>
                    handleKeyDown(e, inputRef.current, data, filterKey, (filtered) =>
                        handleSearch(filtered, onSearch)
                    )
                }
                placeholder={placeholder}
                aria-label={placeholder}
                className={`w-full bg-white text-gray-900 rounded-lg transition-all ${!active ? "pl-10 md:pl-12" : "pl-4"
                    } pr-10 h-10 md:h-11 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            {active && (
                <button
                    type="button"
                    onClick={() =>
                        handleClear(inputRef.current, (filtered) =>
                            handleSearch(filtered, onSearch),
                            data
                        )
                    }
                    aria-label="Limpiar búsqueda"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200"
                >
                    <FaX className="text-gray-700 text-lg md:text-xl" />
                </button>
            )}
        </div>
    );
};
