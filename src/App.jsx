
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Corso from './pages/Corso/Corso'
import Autogestione from './pages/Autogestione/Autogestione';


import { useSelector} from 'react-redux'

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from 'react';

function App() {

  const user = useSelector(state => state.currentUser)

  return (
    <Router>

      <Routes>
       {user ? ( //solo s l'utente è loggato può accedere a queste pagine
         <>
          <Route path='/' element={<Navigate to="/autogestione" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/autogestione' element={<Autogestione />} />
          <Route path='/corso/:id' element={<Corso />} />
         </>
       ) : (
        <>
          
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/:id' element={<Navigate to="/login" />} />
         </>
       )}
      </Routes>

      <Analytics />
    </Router>
  );
}

export default App;
