import React, { useState } from "react";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";
import { createReview } from "../../service/review.service";

const BookDisplay = ({ book, onDelete, onEdit, onReview }) => {
  const { user, roles } = useUser();
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleEdit = (id) => {
    setLoadingEdit(true);
    setTimeout(() => {
      setLoadingEdit(false);
      onEdit(id);
    }, 1000);
  };

  const handleDelete = (id) => {
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
      onDelete(id);
    }, 1000);
  };

  return (
    <tr>
      <td data-label="Naslov">{book.title}</td>
      <td data-label="Datum">{new Date(book.publishedDate).toLocaleDateString()}</td>
      <td data-label="ISBN">{book.isbn}</td>
      <td data-label="Autor">{book.authorName}</td>
      <td data-label="Prosecna ocena">{book.averageRating ? book.averageRating.toFixed(2) : "N/A"}</td>
      <td data-label="Izdavač">{book.publisherName}</td>

      <td data-label="Akcije" className="actions-cell">
        <div className="actions">
          {/* Editors still get Edit/Delete */}
          {user && roles.includes("Editor") && (
            <>
              <button className="btn btn-edit" onClick={() => handleEdit(book.id)} disabled={loadingEdit}>
                {loadingEdit ? <span className="button-spinner"></span> : "Edit"}
              </button>
              <button className="btn btn-delete" onClick={() => handleDelete(book.id)} disabled={loadingDelete}>
                {loadingDelete ? <span className="button-spinner"></span> : "Delete"}
              </button>
            </>
          )}

          {/* All logged-in users get Review */}
          {user && (
            <button className="btn btn-review" onClick={onReview}>
              Review
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BookDisplay;
