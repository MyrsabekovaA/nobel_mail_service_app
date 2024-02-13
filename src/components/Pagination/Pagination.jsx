import React from "react";
import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  onChange,
  itemsPerPage,
  totalItems,
}) {
  const handlePageChange = (pageNumber) => {
    onChange(pageNumber);
  };

  // Function to generate a range of page numbers
  const getPageNumbers = () => {
    let pages = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      // If there are 5 or fewer total pages, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // If there are more than 5 total pages, calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  let endIndex = startIndex + itemsPerPage - 1;
  endIndex = endIndex > totalItems ? totalItems : endIndex;

  return (
    <>
      {totalItems > 0 && totalPages > 1 && (
        <div className="flex flex-col gap-2 items-center justify-center flex-wrap pt-4">
          <ul className="flex text-sm h-8">
            {currentPage > 1 && (
              <li>
                <button
                  className="nav-button-prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
            )}
            {getPageNumbers().map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`nav-link ${currentPage === page ? "active" : ""}`}
                >
                  {page}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <li>
                <button
                  className="nav-button-next"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            )}
          </ul>
          <div className="text-sm font-normal mb-4 md:mb-0 md:inline md:w-auto">
            <span className="font-semibold text-darkgray dark:text-whiten">
              {" "}
              {startIndex}-{endIndex}
            </span>{" "}
            of
            <span className="font-semibold text-graydark dark:text-whiten">
              {" "}
              {totalItems}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
