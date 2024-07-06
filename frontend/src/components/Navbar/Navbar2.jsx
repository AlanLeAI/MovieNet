import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/MovieNet_Text.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase";

function Navbar() {
  const navRef = React.useRef();
  const navigate = useNavigate();

  const [query, setQuery] = React.useState("");

  useEffect(() => {
    if (query) {
      navigate(`/search?query=${query}`);
    } else {
      navigate("/home");
    }
  }, [query]);

  function toggleNavbar() {
    setIsSearchbarVisible(!isSearchbarVisible);
  }

  function queryMovie(event) {
    setQuery(event.target.value);
  }

  return (
    <nav className="custom-navbar">
      <div className="mx-5 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img className="text-logo" src={logo} alt="MovieNet Text Logo" onClick={() => navigate('/home')}/>
          <ul className="d-flex align-items-center mt-2" style={{listStyle: "none"}}>
            <li className="nav-items"  onClick={() => navigate("/home")}>Home</li>
            <li className="nav-items">Trending</li>
            <li className="nav-items">Upcoming</li>
            <li className="nav-items">Top Rated</li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
            <input onChange={queryMovie} type="text" name="search" placeholder='Search' value={query}/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
