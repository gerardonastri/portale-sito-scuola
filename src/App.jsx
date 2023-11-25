
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Corso from './pages/Corso/Corso'
import Autogestione from './pages/Autogestione/Autogestione';

import { Analytics } from "@vercel/analytics/react";

function App() {


  return (
    <Router>

      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Navigate to="/autogestione" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/autogestione' element={<Autogestione />} />
        <Route path='/corso/:id' element={<Corso />} />
      </Routes>

      <Analytics />
    </Router>
  );
}

export default App;
