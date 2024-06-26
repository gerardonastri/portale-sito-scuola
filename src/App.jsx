import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Corso from "./pages/Corso/Corso";
import Autogestione from "./pages/Autogestione/Autogestione";
import Admin from "./pages/Admin/Admin";
import Manage from "./pages/Manage/Manage";
import Create from "./pages/Create/Create";

import { useSelector } from "react-redux";

import { Analytics } from "@vercel/analytics/react";
import Iscritti from "./pages/Iscritti/Iscritti";
import Edit from "./pages/Edit/Edit";
import Users from "./pages/Users/Users";
import CorsiAdmin from "./pages/CorsiAdmin/CorsiAdmin";
import Iscrizioni from "./pages/Iscrizoni/Iscrizioni";
import EditUser from "./pages/EditUser/EditUser";
import Contact from "./pages/Contact/Contact";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const user = useSelector(state => state.currentUser);

  console.log(user);

  return (
    <Router>
      <Routes>
        {user ? ( //solo s l'utente è loggato può accedere a queste pagine
          <>
            <Route path="/" element={<Navigate to="/autogestione" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/autogestione" element={<Autogestione />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/corso/:id" element={<Corso />} />
            <Route path="/iscrizioni" element={<Iscrizioni />} />

            {user?.user?.isAdmin && ( //utente admin
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/user/:id" element={<EditUser />} />
                <Route path="/admin/corsi" element={<CorsiAdmin />} />
                <Route path="/admin/create" element={<Create />} />
              </>
            )}

            {(user?.user?.isAdmin || user?.user?.organizzatore) && ( //utente organizzatore
              <>
                <Route path="/manage" element={<Manage />} />
                <Route path="/iscritti/:id" element={<Iscritti />} />
              </>
            )}
          </>
        ) : (
          <>
            {/* pagine accedibili da un utente normale */}
            <Route path="/login" element={<Login />} />
            <Route path="/autogestione" element={<Navigate to="/login" />} />
            <Route path="/:id" element={<Navigate to="/login" />} />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
