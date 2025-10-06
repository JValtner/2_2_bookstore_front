import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../service/books.service";
import BookDisplay from "./BookDisplay";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../layout/Spiner";
import "../../styles/style.scss";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch books on mount
  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        setErrorMsg(`Greška pri učitavanju: ${error.message}`);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getBooks();
  }, []);

  // Handle feedback message from navigation
  useEffect(() => {
    if (location.state?.message) {
      setFeedbackMsg(location.state.message);
      setTimeout(() => setFeedbackMsg(""), 3000);
    }
  }, [location.state]);

  // Edit handler
  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
      setFeedbackMsg("Knjiga uspešno obrisana.");
      setTimeout(() => setFeedbackMsg(""), 3000);
    } catch (error) {
      setErrorMsg(`Greška pri brisanju knjige: ${error.message}`);
    }
  };

  return (
    <>
      {loading && <Spinner />}

      {!loading && feedbackMsg && (
        <p className="message-box success">{feedbackMsg}</p>
      )}

      {!loading && errorMsg && (
        <p className="message-box error">{errorMsg}</p>
      )}


      <div className="page books">
        <h1>BOOKS</h1>
        <table className="table books">
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Datum</th>
              <th>ISBN</th>
              <th>Autor</th>
              <th>Izdavač</th>
              <th>Akcije</th>
            </tr>
          </thead>
          {!loading && !errorMsg && (
            <tbody>
              {books.length > 0 ? (
                books.map(book => (
                  <BookDisplay
                    key={book.id}
                    book={book}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
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
        </table>
      </div>

    </>
  );
};

export default Books;