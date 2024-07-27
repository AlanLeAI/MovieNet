import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/MovieNet_Text.png";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../../public/imgs/profile_img_default.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../firebase";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const [query, setQuery] = React.useState("");

  useEffect(() => {
    if (query) {
      navigate(`/search?query=${query}`);
    } else {
      navigate("/home");
    }
  }, [query]);

  function queryMovie(event) {
    setQuery(event.target.value);
  }

  return (
    <nav className="custom-navbar">
      <div className="mx-5 py-1 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            className="text-logo"
            src={logo}
            alt="MovieNet Text Logo"
            onClick={() => navigate("/home")}
          />
          <ul
            className="d-flex align-items-center mt-2"
            style={{ listStyle: "none" }}
          >
            <li
              className={`nav-items ${isActive("/home")}`}
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <li className={`nav-items ${isActive("/trending")}`}>Trending</li>
            <li className={`nav-items ${isActive("/top-rated")}`}>Top Rated</li>
            <li className={`nav-items ${isActive("/tv-shows")}`}>TV Shows</li>
            <li className={`nav-items ${isActive("/movies")}`}>Movies</li>
            <li className={`nav-items ${isActive("/new-popular")}`}>
              New & Popular
            </li>
          </ul>
        </div>
        <div className="navbar-profile d-flex justify-content-between align-items-center">
          <div className="search-box mx-2">
            <button className="btn-search">
              <i className="fas fa-search"></i>
            </button>
            <input
              type="text"
              onChange={queryMovie}
              className="input-search"
              placeholder="Type to Search..."
            />
          </div>
          <img src={bell_icon} alt="notification" className="icons" />

          <div className="d-flex align-items-center">
            <div className="dropdown">
              <img
                src={profile_img}
                alt="profile image"
                className="avatar dropdown-toggle"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <img
                src={caret_icon}
                alt="Caret Icon"
                className="dropdown-toggle py-3"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <p className="dropdown-item" onClick={logout}>
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
