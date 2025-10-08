import React from 'react'

function Pagination({
  page,
  pageCount,
  totalCount,
  hasPreviousPage,
  hasNextPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}) {
  return (
    <tfoot>
      <tr>
        <td colSpan={3}>
          <div className="pagination-container">
            {/* Pagination buttons */}
            <div className="pagination">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPreviousPage}
              >
                ← Prethodna
              </button>

              <span>Stranica {page + 1} / {pageCount} Ukupno rezultata: {totalCount}</span>

              <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNextPage}
              >
                Sledeća →
              </button>
            </div>
            {/* Page size selector */}
            <div className="controls">
              <label>
                Authors per page:
                <input
                  type="number"
                  min="1"
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default Pagination
