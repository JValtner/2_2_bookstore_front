import React, { useEffect, useState } from "react";
import { getSortedFilteredPagedBooks, getSortTypes, deleteBook } from "../../service/books.service";
import { getAllAuthors } from "../../service/authors.service";
import { createReview } from "../../service/review.service";
import BookDisplay from "./BookDisplay";
import Pagination from "../Pagination";
import BookFilterSection from "../BookFilterSection";
import SortForm from "../SortForm";
import ReviewModal from "../review/Modal_review";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../layout/Spiner";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";

const Books = () => {
  const { user, roles } = useUser();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [sortTypes, setSortTypes] = useState([]);
  const [chosenType, setChosenType] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [filter, setFilter] = useState({
    Title: null,
    PublishedDateFrom: null,
    PublishedDateTo: null,
    AuthorFullName: null,
    AuthorId: null,
    AuthorDateOfBirthFrom: null,
    AuthorDateOfBirthTo: null,
  });

  // Review modal state
  const [modalBook, setModalBook] = useState(null);
  const [reviewRating, setReviewRating] = useState(1);
  const [reviewComment, setReviewComment] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load sort types and authors
  useEffect(() => {
    const loadSortTypes = async () => {
      try {
        const authorsData = await getAllAuthors();
        const sortData = await getSortTypes();
        setSortTypes(sortData);
        setAuthors(authorsData);
      } catch (err) {
        console.error("Greška pri učitavanju tipova sortiranja:", err.message);
        setErrorMsg("Greška pri učitavanju tipova sortiranja.");
      }
    };
    loadSortTypes();
  }, []);

  // Load books
  useEffect(() => {
    const loadBooks = async () => {
      if (location.state?.message) {
        setFeedbackMsg(location.state.message);
        setTimeout(() => setFeedbackMsg(""), 3000);
      }

      try {
        setLoading(true);
        const fetchedBooks = await getSortedFilteredPagedBooks(filter, page + 1, pageSize, chosenType);
        setBooks(fetchedBooks.items || []);
        setTotalItems(fetchedBooks.count || fetchedBooks.length);
        setHasNextPage(fetchedBooks.hasNextPage || false);
        setHasPreviousPage(fetchedBooks.hasPreviousPage || false);
        setPageCount(fetchedBooks.totalPages || 1);
      } catch (error) {
        setErrorMsg(`Greška pri učitavanju knjiga: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [filter, page, pageSize, chosenType, location.state, modalBook]);

  // Handlers
  const handleEdit = (id) => navigate(`/books/edit/${id}`);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      setFeedbackMsg("Knjiga uspešno obrisana.");
      setTimeout(() => setFeedbackMsg(""), 3000);
    } catch (error) {
      setErrorMsg(`Greška pri brisanju knjige: ${error.message}`);
    }
  };

  const handleReviewSubmit = async () => {
    if (!user || !modalBook) return;

    setLoadingReview(true);
    try {
      console.log("Sending review:", { rating: reviewRating, comment: reviewComment });
      await createReview({
        bookId: modalBook.id,
        rating: reviewRating,
        comment: reviewComment,
      });

      setFeedbackMsg("Recenzija uspešno dodata!");
      setTimeout(() => setFeedbackMsg(""), 3000);
      handleReviewClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Greška prilikom dodavanja recenzije!");
    } finally {
      setLoadingReview(false);
    }
  };

  const handleReviewClose = () => {
    setModalBook(null);
    setReviewRating(1);
    setReviewComment("");
  };

  return (
    <div className="page books">
      {loading && <Spinner />}
      {!loading && feedbackMsg && <p className="message-box success">{feedbackMsg}</p>}
      {!loading && errorMsg && <p className="message-box error">{errorMsg}</p>}

      <h1>BOOKS</h1>

      <BookFilterSection filter={filter} setFilter={setFilter} authors={authors} />

      <SortForm
        sortTypes={sortTypes}
        chosenType={chosenType}
        onSortChange={(value) => {
          setChosenType(value);
          setPage(0);
        }}
      />

      <table className="table books">
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Datum</th>
            <th>ISBN</th>
            <th>Autor</th>
            <th>Prosecna ocena</th>
            <th>Izdavač</th>
            {(user || roles.includes("Editor")) && <th>Akcije</th>}
          </tr>
        </thead>

        {!loading && !errorMsg && (
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <BookDisplay
                  key={book.id}
                  book={book}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onReview={() => setModalBook(book)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Nema dostupnih knjiga
                </td>
              </tr>
            )}
          </tbody>
        )}
        <Pagination
        page={page}
        pageCount={pageCount}
        totalCount={totalItems}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      </table>
      {modalBook && (
        <ReviewModal
          book={modalBook}
          rating={reviewRating}
          setRating={setReviewRating}
          comment={reviewComment}
          setComment={setReviewComment}
          loading={loadingReview}
          onClose={handleReviewClose}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default Books;
