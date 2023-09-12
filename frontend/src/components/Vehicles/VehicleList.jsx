import { Link } from "react-router-dom";

export default function VehicleList({ vehicles }) {
  return (
    <div>
      <h1>List of Vehicles</h1>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>
            <p>{vehicle.make} {vehicle.model}</p>
            <p>Year: {vehicle.year}</p>
            <p>Vin: {vehicle.vin}</p>
            <p>Mileage: {vehicle.mi}</p>
            <Link to={`/vehicles/${vehicle.id}`}>Vehicle Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
