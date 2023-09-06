import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleList from '../../';
import VehiclePage from '../VehiclePage/VehiclePage';
import AuthPage from '../AuthPage/AuthPage';


export default function App() {
  const [user, setUser] = useState(null)

  return(
    <main className='App'>
      {user ? 
        <VehiclePage /> 
        :
        <AuthPage />
      }
    </main>
  )
}


