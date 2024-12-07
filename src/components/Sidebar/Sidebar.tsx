import React from "react";
import { FaBars, FaHome, FaCloudUploadAlt, FaRegClipboard, FaBell, FaUser, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <div className="sidebar-icon">
          <FaBars />
        </div>
        <div className="sidebar-icon">
          <FaHome />
        </div>
        <div className="sidebar-icon">
          <FaBell />
        </div>
        <div className="sidebar-icon">
          <FaRegClipboard />
        </div>
        <div className="sidebar-icon">
          <FaCloudUploadAlt />
        </div>
        <div className="sidebar-icon">
          <FaCog />
        </div>
      </div>
      <div className="sidebar-user">
        <FaUser />
      </div>
    </div>
  );
};

export default Sidebar;
