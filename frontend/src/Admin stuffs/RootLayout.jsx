import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "./AdminSidebar";
import { useEffect } from "react";  

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/user");
    }
  }, []); // Ensure empty dependency array for useEffect

  return (
    <div className="d-flex flex-column h-100">
      <div className="row flex-grow-1 d-flex">
        {/* Header in its own row for clarity and potential layout customization */}
        <div className="col-lg-12">
          <Header />
        </div>

        {/* Flex container for sidebar and output */}
        <div className="row flex-grow-1 d-flex">
          <div className="col-lg-2 border-end d-flex flex-column h-100">
            <Sidebar />
          </div>
          <div className="col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;