import React, { useEffect, useState } from "react"
import { getSortedPublishers, getSortTypes } from "../../service/publishers.service"
import Spinner from "../layout/Spiner"
import "../../styles/style.scss"

const Publishers = () => {
    const [publishers, setPublishers] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const [sortTypes, setSortTypes] = useState([])
    const [chosenType, setChosenType] = useState(0);

    useEffect(() => {
        const getPublishers = async () => {
            try {
                setLoading(true)
                const fetchedSortedPublishers = await getSortedPublishers(chosenType)
                setPublishers(fetchedSortedPublishers)
            } catch (error) {
                setErrorMsg(`Greška pri učitavanju: ${error.message}`)
                console.error("Error fetching publishers:", error)
            } finally {
                setTimeout(() => setLoading(false), 600)
            }
        }

        getPublishers()
    }, [chosenType])

    useEffect(() => {
        const loadSortTypes = async () => {
            try {
                const data = await getSortTypes()
                setSortTypes(data)
            } catch (err) {
                console.error("Greška pri učitavanju tipova sortiranja:", err.message)
            }
        }

        loadSortTypes()
    }, [])

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
                        <option key={stype.key} value={stype.key}>
                            {stype.name || stype.Name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )

    return (
        <>
            {loading && <Spinner />}

            {!loading && errorMsg && (
                <p className="message-box error">{errorMsg}</p>
            )}

            {!loading && !errorMsg && (
                <div className="page publishers">
                    <h1>IZDAVAČI</h1>

                    {displaySortForm()}

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
