import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from "@/components/ui/pagination";
import { useState } from "react";
import Loading from "../../atoms/Loading";
import QuestionCard from "./QuestionCard";

export default function PaginationSCN({
  data,
  totalRecords,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
  refetch,
}) {
  const [jumpToPage, setJumpToPage] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);
  const totalPages = Math.ceil(totalRecords / perPage);

  // Page click handling with loader
  const handlePageClick = (page) => {
    setLoadingPage(true);
    onPageChange(page);
    refetch().finally(() => setLoadingPage(false));
  };

  // Previous/Next click handlers with loader
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  // Per-page change handling
  const handlePerPageChange = (e) => {
    onPerPageChange(parseInt(e.target.value, 10));
    onPageChange(1); // Reset to page 1 on per-page change
  };

  // Jump to page handling
  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (page >= 1 && page <= totalPages) {
      handlePageClick(page);
      setJumpToPage("");
    }
  };

  // Generate displayed page numbers
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 6) pages.push("...");
      const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
        (page) => page > 3 && page < totalPages - 2
      );
      pages.push(...middlePages);
      if (currentPage < totalPages - 5) pages.push("...");
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-5">
      {/* Display list of questions or loader */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {
          loadingPage ? (
            <Loading />
          ) : (
            data.map((question) => (
              <QuestionCard
                key={question.id}
                data={question}
                refetch={refetch}
              />
            ))
          )
        }
      </div>

      <div className="space-y-4">
        {/* Display total records and pages */}
        <div className="text-gray-700 dark:text-gray-300 text-sm">
          <span>Total Records: {totalRecords}</span> | <span>Total Pages: {totalPages}</span>
        </div>

        {/* Pagination controls */}
        <Pagination className="flex items-center justify-center space-x-2">
          <PaginationContent>
            <PaginationItem>
              <Button onClick={handlePreviousClick} disabled={currentPage === 1}>
                Previous
              </Button>
            </PaginationItem>

            {generatePageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <span className="px-3 text-gray-500">...</span>
                ) : (
                  <button
                    className={`px-3 py-[.06rem] rounded-sm text-white duration-500 ${page === currentPage ? "bg-gray-800" : "bg-gray-500 hover:bg-gray-800"
                      }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button onClick={handleNextClick} disabled={currentPage === totalPages}>
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Options for "per page" and "jump to page" */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div>
            <label className="mr-2 text-gray-700 dark:text-gray-300">Items per page:</label>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {[10, 20, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder="Jump to page"
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-24"
            />
            <Button onClick={handleJumpToPage} disabled={!jumpToPage}>
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
