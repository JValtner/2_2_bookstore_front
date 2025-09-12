import React, { useState } from "react"
import "../../styles/style.scss"

const BookDisplay = ({ book, onDelete, onEdit }) => {
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const handleEdit = (id) => {
    setLoadingEdit(true)
    setTimeout(() => {
      setLoadingEdit(false)
      onEdit(id)
    }, 1000) // 1 second delay
  }

  const handleDelete = (id) => {
    setLoadingDelete(true)
    setTimeout(() => {
      setLoadingDelete(false)
      onDelete(id)
    }, 1000)
  }

  return (
    <tr>
      <td data-label="Naslov">{book.title}</td>
      <td data-label="Strane">{book.pageCount}</td>
      <td data-label="Datum">{new Date(book.publishedDate).toLocaleDateString()}</td>
      <td data-label="ISBN">{book.isbn}</td>
      <td data-label="Autor">{book.author?.fullName}</td>
      <td data-label="Izdavač">{book.publisher?.name}</td>
      <td data-label="Akcije" className="actions-cell">
        <div className="actions">
          <button className="btn btn-edit" onClick={() => handleEdit(book.id)} disabled={loadingEdit}>
            {loadingEdit ? <span className="button-spinner"></span> : "Edit"}
          </button>
          <button className="btn btn-delete" onClick={() => handleDelete(book.id)} disabled={loadingDelete}>
            {loadingDelete ? <span className="button-spinner"></span> : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BookDisplay
