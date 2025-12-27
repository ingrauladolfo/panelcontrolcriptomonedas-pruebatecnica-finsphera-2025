import { Button } from "@/common/components/";
import type { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
interface PaginationProps {
    pages: (any)[];
    currentPage: any;
    handlePageChange: (page: number) => void;
    itemsPerPage: number;
    handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    itemsPerPageOptions: { value: number; label: string }[];
    t: { rowPerPage: string };
}
export const Pagination: FC<PaginationProps> = ({ pages, currentPage, handlePageChange, itemsPerPage, handleItemsPerPageChange, itemsPerPageOptions, t }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between my-0 mx-2.5">
            <div className="flex items-center mx-5 mt-5 mb-2.5 sm:justify-center sm:gap-2 sm:mb-0 dashboard-users-pagination-pages">
                <Button className="my-0 mx-0.5 py-1.25 px-1.25 border-none rounded-[5px] bg-[#333] text-[#d1d1d1] cursor-pointer" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <FaChevronLeft />
                </Button>
                {pages.map((page, index) => (
                    <Button key={index} className={`mx-1.25 py-1.25 px-2.5 border-none rounded-[5px] text-[#d1d1d1] cursor-pointer bg-[#333] ${currentPage === page ? 'bg-[#666]' : ''}`} onClick={() => handlePageChange(page)} disabled={page === '...'}>
                        {page}
                    </Button>
                ))}
                <Button className="my-0 mx-1.25 py-1.25 px-2.5 border-none rounded-[5px] bg-[#333] text-[#d1d1d1] cursor-pointer" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pages}>
                    <FaChevronRight />
                </Button >
            </div>

            {/* new wrapper: label above select */}
            <div className="flex flex-col items-center my-0 mx-2.5 sm:m-0">
                <label htmlFor="items-per-page" className="text-[14px] text-[#d1d1d1] mt-1.25">{t.rowPerPage}</label>
                <select id="items-per-page" className="m-2.5 p-2.5 border border-[#ccc] rounded-[5px] text-[#d1d1d1] bg-[#333] text-[16px] w-full h-10 overflow-y-auto  [@min-width:480px]:w-25" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {itemsPerPageOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

