import React from "react";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-component d-flex ">
      <ul className="list-group-sidebar">
        <li className="list-group-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/mycourses">My courses</Link>
        </li>
        <li className="list-group-item">
          <Link to="/profile">My profile</Link>
        </li>
        <li className="list-group-item">
          <Link to="/login/user" onClick={() => localStorage.removeItem("token")}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;