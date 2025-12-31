/* This code snippet is defining a React functional component called `Pagination` that takes in props
of type `PaginationProps`. The component renders a pagination UI with buttons to navigate between
pages and a select dropdown to change the number of items per page. */
import { Button } from "@/common/components/";
import type { PaginationProps } from "@/common/interfaces";
import type { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const Pagination: FC<PaginationProps> = ({ pages, currentPage, handlePageChange, itemsPerPage, handleItemsPerPageChange, itemsPerPageOptions, t }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center mt-5 min-[480px]:flex-row min-[480px]:justify-between min-[480px]:gap-2 min-[480px]:w-full min-[480px]:max-w-245 min-[480px]:my-0 min-[480px]:mx-auto">
            <div className="flex items-center mb-2.5 min-[480px]:justify-center min-[480px]:gap-2 min-[480px]:mb-0">
                <Button className="my-0 mx-1.25 py-1.25 px-2.5 border-none bg-[#333] text-[#d1d1d1] cursor-pointer" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <FaChevronLeft />
                </Button>
                {pages.map((page, index) => (
                    <Button key={index} className={currentPage === page ? 'my-0 mx-1.25 py-1.25 px-2.5 border-none bg-[#666] text-[#d1d1d1] cursor-pointer' : 'my-0 mx-1.25 py-1.25 px-2.5 border-none bg-[#333] text-[#d1d1d1] cursor-pointer'} onClick={() => handlePageChange(page)} disabled={page === '...'}>
                        {page}
                    </Button>
                ))}
                <Button className="my-0 mx-1.25 py-1.25 px-2.5 border-none bg-[#333] text-[#d1d1d1] cursor-pointer" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pages}>
                    <FaChevronRight />
                </Button>
            </div>

            {/* new wrapper: label above select */}
            <div className="flex flex-col items-center my-0 mx-2.5 min-[480px]:justify-between min-[480px]:m-0">
                <label htmlFor="items-per-page" className="text-[#d1d1d1] text-[14px] mt-1.25">{t.rowPerPage}</label>
                <select id="items-per-page" className="m-2.5 p-2.5 border border-[#ccc] rounded-[5px] bg-[#333] text-[#d1d1d1] text-[16px] w-full h-10 overflow-y-auto min-[480px]:w-25  [&>option:checked]:bg-[#d1d1d1] [&>option:checked]:text-[#333] dashboard-users-pagination-select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {itemsPerPageOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
