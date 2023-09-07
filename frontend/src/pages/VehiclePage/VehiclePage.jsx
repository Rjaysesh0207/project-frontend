import { useState, useEffect } from "react"
import axios from "axios"

export default function VehiclePage() {
  const [vehicleList, setVehicleList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/api/vehicles/')
    .then((res) => {
      console.log(res.data)
      setVehicleList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <>
    <h1>VehiclePage</h1>
    <p>
      {vehicleList.map((vehicle) => {
        return (
          <div>
            <p>{vehicle.year}</p>
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>

          </div>
        )
      })}
    </p>
    </>
  )
}