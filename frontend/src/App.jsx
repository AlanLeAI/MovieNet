import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import SearchPage from "./pages/SearchPage/SearchPage";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate("/home");
      } else {
        console.log("Logged Out");
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="app-container">
      <ToastContainer theme="black" />
      {location.pathname !== "/" && <Navbar />}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
