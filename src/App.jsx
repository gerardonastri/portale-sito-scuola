
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Analytics } from "@vercel/analytics/react";

function App() {


  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Analytics />
    </Router>
  );
}

export default App;
