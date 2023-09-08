import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom'
import axios from 'axios';
import VehiclePage from '../VehiclePage/VehiclePage'
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';


export default function App() {
  const [user, setUser] = useState(true)
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
    <main className=''>
      {user ? 
      <>
          <NavBar />
          <Routes>
            <Route path='/vehicles' element={<VehiclePage vehicleList={vehicleList} />}></Route>
          </Routes>
      </>
        :
          
          <AuthPage />
      } 
    </main>
  )
}


