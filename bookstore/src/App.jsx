import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Home from "./components/home/Home"
import Publishers from "./components/publishers/Publishers"
import SortPublishers from "./components/publishers/SortPublishers"
import Authors from "./components/authors/authors"
import Books from "./components/books/Books"
import BookForm from "./components/form/BookForm"
import "./styles/style.scss"

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/publishers/sort" element={<SortPublishers />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
)

export default App
