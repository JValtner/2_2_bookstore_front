import React, { useEffect, useState } from "react"
import { getAllBooks} from "../service/service"
import "../styles/style.scss"

const Books = () => {
    const [books,setBooks] = useState([])
    useEffect(()=>{
        const getBooks = async () => {
        try {
            const fetchedBooks = await getAllBooks()
            setBooks(fetchedBooks)
        } catch (error) {
            console.error("Error fetching books:", error)
        }
    }

    getBooks()
    },[]);
    

  return (
    <div className="page books">
      <h1>BOOKS</h1>
      <table className="table books">
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
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.pageCount}</td>
                    <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                    <td>{book.isbn}</td>
                    <td>{book.author?.name}</td>
                    <td>{book.publisher?.name}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="6">No books available</td>
                </tr>
            )}
        </tbody>
        
      </table>
    </div>
  )
}

export default Books
