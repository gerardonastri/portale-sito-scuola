import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Corso from './pages/Corso/Corso'
import Autogestione from './pages/Autogestione/Autogestione';
import Admin from './pages/Admin/Admin';
import Create from './pages/Create/Create';

import { useSelector} from 'react-redux'

import { Analytics } from "@vercel/analytics/react";
import Iscritti from './pages/Iscritti/Iscritti';
import Edit from './pages/Edit/Edit';
import Users from './pages/Users/Users';
import CorsiAdmin from './pages/CorsiAdmin/CorsiAdmin';


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

          {user?.user?.isAdmin && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path='/edit/:id' element={<Edit />} /> 
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/corsi" element={<CorsiAdmin />} />
            </>
          )}

          {(user?.user?.isAdmin || user?.user?.organizzatore) && (
           <>
             <Route path="/manage" element={<Create />} />
             <Route path="/iscritti/:id" element={<Iscritti />} />
           </>
          )}
        </>
       ) : (
        <> {/* pagine accedibili da un utente normale */}
          
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
