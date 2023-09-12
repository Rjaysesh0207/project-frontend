import apiUrl from '../apiConfig'
import axios from 'axios'


export const vehicleList = (user) => {
  return axios.get(apiUrl + '/vehicles/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createVehicle = async (formData, user) => {

  try {
    console.log(user)
    // Set the owner field in the formData
    formData.owner = user.id;

    // Make the POST request
    const response = await axios.post(apiUrl + '/vehicles/', { vehicle: formData }, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    });

    // Return the response data or handle it as needed
    return response.data;
  } catch (error) {
    // Handle any errors
    throw error;
  }
};


export const deleteVehicle = async (vehicleId, user) => {
  try {
    // Make the DELETE request
    await axios.delete(apiUrl + `/vehicles/${vehicleId}/`, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    });
  } catch (error) {
    // Handle any errors
    throw error;
  }
};