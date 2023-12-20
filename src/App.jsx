import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Corso from './pages/Corso/Corso'
import Autogestione from './pages/Autogestione/Autogestione';
import Admin from './pages/Admin/Admin';
import Manage from './pages/Manage/Manage';
import Create from './pages/Create/Create';

import { useSelector} from 'react-redux'

import { Analytics } from "@vercel/analytics/react";
import Iscritti from './pages/Iscritti/Iscritti';
import Edit from './pages/Edit/Edit';
import Users from './pages/Users/Users';
import CorsiAdmin from './pages/CorsiAdmin/CorsiAdmin';
import Iscrizioni from './pages/Iscrizoni/Iscrizioni';
import EditUser from './pages/EditUser/EditUser';
import Contact from './pages/Contact/Contact';
import PageNotFound from './pages/PageNotFound/PageNotFound';


function App() {

  const user = useSelector(state => state.currentUser)

  return (
    <Router>

      <Routes>
       
      </Routes>

      <Analytics />
    </Router>
  );
}

export default App;
