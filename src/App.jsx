
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Analytics } from "@vercel/analytics/react";
import Autogestione from './pages/Autogestione/Autogestione';

function App() {


  return (
    <Router>

      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Navigate to="/autogestione" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/autogestione' element={<Autogestione />} />
      </Routes>

      <Analytics />
    </Router>
  );
}

export default App;
