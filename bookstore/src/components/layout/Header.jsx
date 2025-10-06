import React from "react"
import { Link } from "react-router-dom"
import "../../styles/style.scss"

const Header = () => {
  return (
    <header>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/publishers">Publishers</Link>
        <Link to="/books">Books</Link>
        <Link to="/authors">Authors</Link>  
        <Link to="/books/new">Create New Book</Link>
      </div>
    </header>
  )
}

export default Header
