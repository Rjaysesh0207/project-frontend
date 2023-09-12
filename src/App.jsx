import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert';
import Header from './components/Header/Header';
import SignUp from './components/auth/SignUp.jsx';
import SignIn from './components/auth/SignIn.jsx';
import SignOut from './components/auth/SignOut';
import VehicleList from './components/Vehicles/VehicleList';
import VehicleDetail from './components/Vehicles/VehicleDetails';
import ChangePassword from './components/auth/ChangPassword';
import HomePage from './components/Home/HomePage';
import { vehicleList } from './api/vehicles';
import { v4 as uuid } from 'uuid';



const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await vehicleList(user);
      console.log(response);
      setVehicles(response.data.vehicles);
    }
    fetchData();
  }, [user]);

  const clearUser = () => setUser(null);

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts((msgAlerts) => [...msgAlerts, { heading, message, variant, id }]);
  };

  return (
    <>
      <Header user={user} />
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
        />
      ))}
      <main className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/sign-up'
            element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path='/sign-in'
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path='/sign-out'
            element={<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />}
          />
          <Route
            path='/change-password'
            element={<ChangePassword msgAlert={msgAlert} user={user} />}
          />
          <Route
            path='/vehicles'
            element={<VehicleList setVehicles={setVehicles} vehicles={vehicles} user={user} />}
          />
          <Route
            path='/vehicles/:id'
            element={<VehicleDetail user={user} />}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
