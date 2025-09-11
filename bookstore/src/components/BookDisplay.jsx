import React from "react"
import "../styles/style.scss"

const BookDisplay = ({book, onDelete}) => {
  return (
   <tr>
        <td>{book.title}</td>
        <td>{book.pageCount}</td>
        <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
        <td>{book.isbn}</td>
        <td>{book.author?.name}</td>
        <td>{book.publisher?.name}</td>
        <td><button onClick={() => onDelete(book.id)}>Delete</button></td>
    </tr>                
  )
}

export default BookDisplay
