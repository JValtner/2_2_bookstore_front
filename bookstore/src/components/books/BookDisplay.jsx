import React, { useState } from "react"
import "../../styles/style.scss"
import { useUser } from "../../context/contextUser";

const BookDisplay = ({ book, onDelete, onEdit }) => {
  const { user, roles } = useUser();
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
      <td data-label="Datum">{new Date(book.publishedDate).toLocaleDateString()}</td>
      <td data-label="ISBN">{book.isbn}</td>
      <td data-label="Autor">{book.authorName}</td>
      <td data-label="Izdavač">{book.publisherName}</td>
      {(user && roles.includes("Editor")) && (
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
      )}

    </tr>
  )
}

export default BookDisplay
