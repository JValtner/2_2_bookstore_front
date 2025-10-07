import React, { useEffect, useState } from "react";
import { getSortedBooks, getSortTypes, deleteBook } from "../../service/books.service";
import BookDisplay from "./BookDisplay";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../layout/Spiner";
import "../../styles/style.scss";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [sortTypes, setSortTypes] = useState([]);
  const [chosenType, setChosenType] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Load sort types once
  useEffect(() => {
    const loadSortTypes = async () => {
      try {
        const data = await getSortTypes();
        setSortTypes(data);
      } catch (err) {
        console.error("Greška pri učitavanju tipova sortiranja:", err.message);
        setErrorMsg("Greška pri učitavanju tipova sortiranja.");
      }
    };
    loadSortTypes();
  }, []);

  // 🔹 Load books when chosenType changes or after navigation
  useEffect(() => {
    const loadBooks = async () => {
      if (location.state?.message) {
        setFeedbackMsg(location.state.message);
        setTimeout(() => setFeedbackMsg(""), 3000);
      }

      try {
        setLoading(true);
        const fetchedBooks = await getSortedBooks(chosenType);
        setBooks(fetchedBooks);
      } catch (error) {
        setErrorMsg(`Greška pri učitavanju knjiga: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [chosenType, location.state]);

  // 🔹 Handlers
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

  // 🔹 Sorting control
  const displaySortForm = () => (
    <div className="controls">
      <label>
        Sortiraj po:
        <select
          className="select"
          value={chosenType}
          onChange={(e) => setChosenType(e.target.value)}
        >
          <option value="">-- Odaberi --</option>
          {sortTypes.map((stype) => (
            <option key={stype.key ?? stype.id} value={stype.key ?? stype.id}>
              {stype.name ?? stype.Name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  return (
    <div className="page books">
      {loading && <Spinner />}
      
      {!loading && feedbackMsg && (
        <p className="message-box success">{feedbackMsg}</p>
      )}
      {!loading && errorMsg && (
        <p className="message-box error">{errorMsg}</p>
      )}

      <h1>BOOKS</h1>
      {displaySortForm()}

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
              books.map((book) => (
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
  );
};

export default Books;
