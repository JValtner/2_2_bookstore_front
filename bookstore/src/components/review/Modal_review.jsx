import React from "react";
import ReactDOM from "react-dom";

const ReviewModal = ({ book, rating, setRating, comment, setComment, loading, onClose, onSubmit }) => {
  const handleSubmit = async () => {
    await onSubmit();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h3>Submit Review for "{book.title}"</h3>

        <label>
          Rating:
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          Comment (optional):
          <textarea value={comment} onChange={e => setComment(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button className="btn" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReviewModal;
