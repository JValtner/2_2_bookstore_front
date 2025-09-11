import React, { useEffect, useState } from "react"
import { getAllPublishers} from "../service/service"
import Spinner from "./Spiner"
import "../styles/style.scss"

const Publishers = () => {
    const [publishers,setPublishers] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(()=>{
        const getPublishers = async () => {
        try {
            setLoading(true)
            const fetchedPublishers = await getAllPublishers()
            setPublishers(fetchedPublishers)
        } catch (error) {
            setErrorMsg(`Eror fething data: ${error.message}`)
            console.error("Error fetching publishers:", error)
        }
        finally{
            setTimeout(()=>setLoading(false),2000)
        }
    }

    getPublishers()
    },[]);
    

    return (
    <>
    {loading && <Spinner />}

    {!loading && errorMsg && (
      <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
    )}

    {!loading && !errorMsg && (
      <div className="page publishers">
        <h1>PUBLISHERS</h1>
        <table className="table publishers">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {publishers.length > 0 ? (
              publishers.map((pub) => (
                <tr key={pub.id}>
                  <td>{pub.name}</td>
                  <td>{pub.address}</td>
                  <td>{pub.website}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No publishers available</td>
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
