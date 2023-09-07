import { useEffect, useState } from "react"
import API from "../../utilities/API"

export default function VehiclePage(props) {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(0)
  const [mileage, setMileage] = useState(0)
  const [vin, setVin] = useState('')
  const [vehicleList, setVehicleList] = useState(props.vehicleList)

  useEffect(() => {
    refreshVehicles()
  }, [])

  const refreshVehicles = () => {
    API.get('/')
    .then((res) => {
      setVehicleList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let vehicle = {
      year,
      make,
      model,
      mileage,
      vin
    }
    API.post('/', vehicle).then(() => refreshVehicles())
  }

  const onUpdate = (id) => {
    let vehicle = {
      year,
      make,
      model,
      mileage,
      vin
    }
    API.patch(`/${id}/`, vehicle).then(() => refreshVehicles())
  } 

  const onDelete = (id) => {
    API.delete(`/${id}/`).then(() => refreshVehicles())
  }

  //Find a better way
  const selectVehicle = (id) => {
    let vehicle = vehicleList.filter((vehicle) => vehicle.id === id)
    setMake(vehicle.make)
    setMileage(vehicle.mileage)
    setYear(vehicle.year)
    setModel(vehicle.model)
    setVin(vehicle.vin)
  }
  return (
    <>
      
      {vehicleList.map((vehicle) => (
        <div key={vehicle.id}>
          <p>{vehicle.year}</p>
          <p>{vehicle.make}</p>
          <p>{vehicle.model}</p>
          <p>{vehicle.mileage}</p>
          <p>{vehicle.vin}</p>
          <button onClick={() => onDelete(vehicle.id)}>DELETE</button>
          <button onClick={() => selectVehicle(vehicle.id)}></button>
          <button onClick={() => onUpdate(vehicle.id)}>Update</button>
        </div>
      ))}
      
    {/*  this is a rough form that will be put on a different page, just here for now */}
    {/* TODO:Put this form in the New Vehicle Page */}
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="make">Make:</label>
        <input
          type="text"
          id="make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="mileage">Mileage:</label>
        <input
          type="number"
          id="mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="vin">VIN:</label>
        <input
          type="text"
          id="vin"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
      </div>
      <button type="submit">Create Vehicle</button>
    </form>
    </>
  )
}