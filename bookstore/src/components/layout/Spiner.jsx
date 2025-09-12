import React from "react"
import '../../styles/style.scss'

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Učitavanje...</p>
    </div>
  )
}

export default Spinner