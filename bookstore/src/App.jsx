import React, { useState, useEffect } from "react" 
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Publishers from "./components/Publishers"
import Books from "./components/Books"
import BookForm from "./components/BookForm"
import Footer from "./components/Footer"

const App = () => {
  
  return (
  <BrowserRouter>
    <Header />
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<Publishers/>} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/new/:name" element={<BookForm />}/>
        </Routes>
    </main>
    <Footer />
  </BrowserRouter>
)
}

export default App

