import  { useState } from 'react';
import { createVehicle } from '../../api/vehicles'; // Import your API functions
import { deleteVehicle } from '../../api/vehicles';

export default function VehicleList({ vehicles, user, setVehicles }) {  
  const userId = user ? user.id : null;

  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    
    make: '',
    model: '',
    year: 0,
    vin: '',
    mileage: 0,
    owner: user.id, // Set the owner_id here
  });

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleCreateVehicle = async (event) => {
    event.preventDefault();
  
    try {
      console.log('Sending formData:', formData);
  
      // Send the vehicle data to the server
      const response = await createVehicle(formData, user); // Pass formData and user to the API function
  
      // Check the response status or data if needed
      if (response.status === 201) {
        // Vehicle created successfully
  
        // Get the newly created vehicle from the response data
        const newVehicle = response.data;
  
        // Update the vehicles state by adding the new vehicle to the current list
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  
        // Clear the form and hide it
        setFormData({
          make: '',
          model: '',
          year: '',
          vin: '',
          mileage: '',
          owner: user.id, // Reset the owner_id
        });
        setFormVisible(false);
  
        // You can also update your vehicle list here if needed
      } else {
        // Handle other response statuses or errors
        console.error('Error creating vehicle:', response.data);
      }
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error('Error creating vehicle:', error);
    }
  };
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'mileage' ? parseInt(value, 10) : value,
    });
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      // Send a delete request to the server
      await deleteVehicle(vehicleId, user);
  
      // Update the vehicle list by filtering out the deleted vehicle
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId));
  
      // Display a success message or handle other actions as needed
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error('Error deleting vehicle:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">List of Vehicles</h1>
      <button
        onClick={toggleFormVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create New Vehicle
      </button>
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Create Vehicle</h2>
          <form onSubmit={handleCreateVehicle} className="space-y-4">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
                VIN
              </label>
              <input
                type="text"
                id="vin"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                Mileage
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create
            </button>
          </form>
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {vehicles.map((vehicle, index) => (
          <li key={index} className="bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <p className="text-lg font-semibold">
                {vehicle.make} {vehicle.model}
              </p>
              <p>Year: {vehicle.year}</p>
              <p>VIN: {vehicle.vin}</p>
              <p>Mileage: {vehicle.mileage}</p>
              <button
                onClick={() => handleDeleteVehicle(vehicle.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

