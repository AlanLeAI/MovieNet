import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase";

function Navbar() {
  const navRef = React.useRef();
  const navigate = useNavigate();

  const [isSearchbarVisible, setIsSearchbarVisible] = React.useState(false);
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

  function homeClick() {
    navigate("/home");
  }

  return (
    <div ref={navRef} className="custom-navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li onClick={homeClick}>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
          <li
            onClick={() => {
              navigate("/blog/6");
            }}
          >
            Blog
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {isSearchbarVisible && (
          <input
            onChange={queryMovie}
            type="text"
            name="search"
            placeholder="Search"
            value={query}
          />
        )}
        <img
          onClick={toggleNavbar}
          src={search_icon}
          alt=""
          className="icons"
        />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />

          <div className="custom-dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
