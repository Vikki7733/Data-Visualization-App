import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-tabs">
        <div className="navbar-text-frame">
          <div className="navbar-text">Charging Stations</div>
        </div>
        <div className="navbar-text-frame">
          <div className="navbar-text">Fleet Sizing</div>
        </div>
        <div className="navbar-text-frame">
          <div className="navbar-text">Parking</div>
        </div>
      </div>
      <div className="search-box">
        <FaSearch className="search-box-icon" />
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default Navbar;