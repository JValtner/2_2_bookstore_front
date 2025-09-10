import React, { useEffect, useState } from "react"
import { getAllPublishers} from "../service/service"
import "../styles/style.scss"

const Publishers = () => {
    const [publishers,setPublishers] = useState([])
    useEffect(()=>{
        const getPublishers = async () => {
        try {
            const fetchedPublishers = await getAllPublishers()
            setPublishers(fetchedPublishers)
        } catch (error) {
            console.error("Error fetching publishers:", error)
        }
    }

    getPublishers()
    },[]);
    

  return (
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
            {publishers.map(pub => (
                <tr key={pub.id}>
                    <td>{pub.name}</td>
                    <td>{pub.address}</td>
                    <td>{pub.website}</td>
                </tr>
        ))}
        </tbody>
        
      </table>
    </div>
  )
}

export default Publishers
