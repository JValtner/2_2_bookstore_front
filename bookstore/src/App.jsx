import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Home from "./components/home/Home"
import Publishers from "./components/publishers/Publishers"
import Authors from "./components/authors/authors"
import Books from "./components/books/Books"
import BookForm from "./components/form/BookForm"
import Login from "./components/users/login"
import Register from "./components/users/register"
import GoogleCallback from "./components/users/googleCallback"
import Profile from "./components/users/profile"
import VolumesSearch from "./components/comics/VolumesSearch"
import IssuesSearch from "./components/comics/IssuesSearch"
import LocalIssueForm from "./components/comics/LocalIssueForm"
import "./styles/style.scss"

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/comics/volumes-search" element={<VolumesSearch />} />
          <Route path="/comics/issues-search" element={<IssuesSearch />} />
          <Route path="/comics/local-issue-form" element={<LocalIssueForm />} />

        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
)

export default App
