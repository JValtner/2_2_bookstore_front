import React, { useEffect, useState } from "react"
import { getAllPublishers } from "../../service/service"
import Spinner from "../layout/Spiner"
import "../../styles/style.scss"

const Publishers = () => {
  const [publishers, setPublishers] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const getPublishers = async () => {
      try {
        setLoading(true)
        const fetchedPublishers = await getAllPublishers()
        setPublishers(fetchedPublishers)
      } catch (error) {
        setErrorMsg(`Greška pri učitavanju: ${error.message}`)
        console.error("Error fetching publishers:", error)
      } finally {
        setTimeout(() => setLoading(false), 1000)
      }
    }

    getPublishers()
  }, [])

  return (
    <>
      {loading && <Spinner />}

      {!loading && errorMsg && (
        <p className="message-box error">{errorMsg}</p>
      )}

      {!loading && !errorMsg && (
        <div className="page publishers">
          <h1>IZDAVAČI</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Adresa</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {publishers.length > 0 ? (
                publishers.map((pub) => (
                  <tr key={pub.id}>
                    <td data-label="Naziv">{pub.name}</td>
                    <td data-label="Adresa">{pub.address}</td>
                    <td data-label="Website">{pub.website}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Nema dostupnih izdavača
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Publishers
