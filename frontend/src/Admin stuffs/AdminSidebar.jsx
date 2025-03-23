import React from "react";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-component d-flex ">
      <ul className="list-group-sidebar">
        <li className="list-group-item">
          <Link to="/admin">Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/create-course">Create course</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/display-course">View course</Link>
        </li>
        <li className="list-group-item">
          <Link to="/login/admin" onClick={() => localStorage.removeItem("token")}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;