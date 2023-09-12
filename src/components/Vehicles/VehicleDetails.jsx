export default function VehicleDetail({vehicles = []}) {
  return (
    <div>
      <h1>Edit your vehicle info</h1>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>
            <p>{vehicle.make} {vehicle.model}</p>
            <p>Year: {vehicle.year}</p>
            <p>Vin: {vehicle.vin}</p>
            <p>Mileage: {vehicle.mi}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
