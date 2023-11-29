import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Corso from './pages/Corso/Corso'
import Autogestione from './pages/Autogestione/Autogestione';
import Admin from './pages/Admin/Admin';
import Create from './pages/Create/Create';

import { useSelector} from 'react-redux'

import { Analytics } from "@vercel/analytics/react";


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

          {user?.user.isAdmin && (
            <Route path="/admin" element={<Admin />} />
          )}

          {(user?.user.isAdmin || user?.user.organizzatore) && (
            <Route path="/manage" element={<Create />} />
          )}
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
