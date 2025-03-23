import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage({ role }) {
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });
  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5002/api/users/login",
        {
          userName: formData.userName,
          password: formData.password,
          role,
        }
        );
        
        console.log(response)

      localStorage.setItem('token', response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("id", response.data.payload.id);
      

      if (response.data.role === "admin") {
        Navigate("/admin");
      } else if (response.data.role === "user") {
        setTimeout( ()=>Navigate("/"),1000)
        toast.success("Login successful");
       
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Username or Password");    }
  };

  return (
    <>
    <ToastContainer />
    <div className="container">
      <div className="col-5">
      <h1 className="text-center">Login Page</h1>
      <form onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            className="form-control form-control-sm" // Add "form-control-sm" class
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control form-control-sm" // Add "form-control-sm" class
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
       
      </form>
      <div className="mt-3">
        <Link to="/login/admin" className="btn btn-primary mr-5">Admin login</Link>
        <button type="submit" className="btn btn-secondary">Submit</button>
        <Link to="/login/user" className="btn btn-primary ml-5">User login</Link>
      </div>
    </div>
    </div>
  </>
);
}



export default LoginPage;