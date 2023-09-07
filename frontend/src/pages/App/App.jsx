import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import VehiclePage from '../VehiclePage/VehiclePage'
import NewVehiclePage from '../NewVehiclePage/NewVehiclePage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';



export default function App() {
  const [user, setUser] = useState({})
  

  return (
    <main className='App'>
      {user ? 
        <>
          <NavBar />
          <Routes>
            {/* Put client side routes here */}
            <Route path="/vehicles/new" element={<NewVehiclePage />}/>
            <Route path="/vehicles/" element={<VehiclePage />}/>
          </Routes>
        </>
        :
        <AuthPage />
      }
    </main>
  )
}


