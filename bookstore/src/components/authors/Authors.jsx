import React, { useEffect, useState } from "react"
import { getAllAuthorsPaged } from "../../service/authors.service"
import Spinner from "../layout/Spiner"
import "../../styles/style.scss"

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [totalItems, setTotalItems] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const getAuthorsPage = async () => {
      setLoading(true)
      setErrorMsg("")
      try {
        const fetchedAuthors = await getAllAuthorsPaged(page + 1, pageSize)
        setAuthors(fetchedAuthors.items)
        setTotalItems(fetchedAuthors.count)
        setHasNextPage(fetchedAuthors.hasNextPage)
        setHasPreviousPage(fetchedAuthors.hasPreviousPage)
        setPageCount(fetchedAuthors.totalPages)
      } catch (err) {
        console.error("Error fetching authors:", err)
        setErrorMsg(`Greška pri učitavanju: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    getAuthorsPage()
  }, [page, pageSize])

  const renderAuthors = () => (
    authors.length > 0 ? (
      authors.map((auth) => (
        <tr key={auth.id}>
          <td data-label="Name">{auth.fullName}</td>
          <td data-label="Biography">{auth.biography}</td>
          <td data-label="DateOfBirth">{new Date(auth.dateOfBirth).toLocaleDateString()}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" style={{ textAlign: "center" }}>
          Nema dostupnih autora
        </td>
      </tr>
    )
  )
  const renderPagination = () => (
    <tfoot>
      <tr>
        <td colSpan={3}>
          <div className="pagination">
            <button onClick={() => setPage((p) => p - 1)} disabled={!hasPreviousPage}> ← Prethodna </button>
            <span>Stranica {page + 1} / {pageCount}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={!hasNextPage}>Sledeća →</button>
          </div>
        </td>
      </tr>
    </tfoot>
  )

  const displayPageSizeForm = () => (
    <div className="controls">
      <label>
        Authors per page:
        <input
          type="number"
          min="1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))} />
      </label>
    </div>
  )

  return (
    <>
      {loading && <Spinner />}

      {!loading && errorMsg && (
        <p className="message-box error">{errorMsg}</p>
      )}

      {!loading && !errorMsg && (
        <div className="page authors">
          <h1>Autori</h1>

          {displayPageSizeForm()}

          <table className="table">
            <thead>
              <tr>
                <th>Ime</th>
                <th>Biografija</th>
                <th>Datum rođenja</th>
              </tr>
            </thead>
            <tbody>
              {renderAuthors()}
            </tbody>
            {renderPagination()}
          </table>


        </div>
      )}
    </>
  )
}

export default Authors
