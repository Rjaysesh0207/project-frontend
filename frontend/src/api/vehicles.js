import apiUrl from '../apiConfig'
import axios from 'axios'


export const vehicleList = (user) => {
  return axios.get(apiUrl + '/vehicles/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const vehicleDetail = (user) => {
  return axios.get(apiUrl + '/vehicles/<int:pk>', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}