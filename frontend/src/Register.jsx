import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  });

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
        "http://localhost:5002/api/users/register",
        {
          name: formData.name,
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );
      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Successfully registered");
      } else {
        toast.error("Failed to register. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="mb-4">Registration Form</h2>
    <form onSubmit={formHandler}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button><br></br>
      <Link className="btn btn-primary mt-3" to={"/login/user"}>Login</Link>
      
    </form>
  </div>
  );
}

export default RegisterPage;