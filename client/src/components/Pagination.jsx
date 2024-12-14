import React, { useContext, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'


const Pagination = observer(() => {
  const {device} = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(device.totalCount / device.limit)



  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page)
    device.setPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage === 3) {
        pages.push(1, 2, currentPage, currentPage + 1, "...", totalPages);
      } else if (currentPage === totalPages - 2) {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, totalPages);
      } else if (currentPage > totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return (
      <div className="pages">
        {
          pages.map((page, index) => (
            <button
              key={index}
              disabled={page === currentPage || page === "..."}
              onClick={() => page !== "..." && handlePageChange(page)}
              className={`page-color ${page === "..." ? "" : "number"}`}
            >
              {page}
            </button>
          ))
        }
      </div>
    )
  };

  return (
    <div className="pagination-container">
      {/* Кнопка Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="previous-button"
      >
        previous
      </button>

      {/* Номера страниц */}
      {renderPageNumbers()}

      {/* Кнопка Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="next-button"
      >
        next
      </button>
    </div>
  );
})

export default Pagination;
