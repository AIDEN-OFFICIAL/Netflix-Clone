import { Routes,Route, useNavigate,useLocation} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSign } from "../context/signContext";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signedIn, setSignedIn } = useSign();
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
      if (location.pathname === '/login' || location.pathname === '/') {
        navigate('/home');
      }
    } else {
      setSignedIn(false);
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  });

  return () => unsubscribe();
}, [navigate, location, setSignedIn]);

  return (
    <div>
      <ToastContainer theme='dark' closeOnClick={true} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {signedIn ? <Route path="/login" element={<Home />} /> : <Route path="/login" element={<Login />} />}
        <Route path="/Player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App
