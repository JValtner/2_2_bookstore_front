import React, { useEffect, useState } from "react"
import { getAllBooks, deleteBook} from "../service/service"
import BookDisplay from "./BookDisplay"
import Spinner from "./Spiner"
import "../styles/style.scss"

const Books = () => {
    const [books,setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    useEffect(()=>{
        const getBooks = async () => {
        try {
            setLoading(true)
            const fetchedBooks = await getAllBooks()
            setBooks(fetchedBooks)
        } catch (error) {
            setErrorMsg(`Eror fething data: ${error.message}`)
            console.error("Error fetching books:", error)
        }
        finally{
            setTimeout(()=>setLoading(false),2000)
        }
    }

    getBooks()
    },[]);
    
  const handleDelete = async (id) => {
    try {
      await deleteBook(id)
      setBooks(prev => prev.filter(book => book.id !== id))
    } catch (error) {
      setErrorMsg(`Eror deleting book: ${error.message}`)
      console.error("Error deleting book:", error)
    }
  }
  return (
    <>
    {loading && <Spinner />}

    {!loading && errorMsg && (
      <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
    )}

    {!loading && !errorMsg && (
      <div className="page publishers">
        <h1>BOOKS </h1>
        <table className="table publishers">
          <thead>
            <tr>
                <th>Title</th>
                    <th>Pages</th>
                    <th>Published on</th>
                    <th>ISBN</th>
                    <th>Author</th>
                    <th>Publisher</th>
                </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
                    books.map(book => (
                    <BookDisplay  key={book.id} book={book} onDelete={handleDelete}/>
                    ))
                ) : (
                    <tr>
                      <td colSpan="7">No books available</td>
                    </tr>
                )}
          </tbody>
        </table>
      </div>
    )}
  </>

  )
}

export default Books
