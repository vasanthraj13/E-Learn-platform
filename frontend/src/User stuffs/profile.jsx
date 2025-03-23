import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem("id");

        if (!token || !id) {
          throw new Error("Token or ID not available");
        }

        // Fetch user profile
        const userProfileResponse = await axios.post("http://localhost:5002/api/users/profile", {
          id: id
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userProfileResponse.data.user) {
          setUser(userProfileResponse.data.user);
        } else {
          toast.error("Failed to fetch user profile");
        }
        console.log(userProfileResponse)

        // Fetch user enrollments
        const enrollmentsResponse = await axios.post("http://localhost:5002/api/status/getenroll", {
          id: id
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (enrollmentsResponse.data.enrollments) {
          setEnrollments(enrollmentsResponse.data.enrollments);
        } else {
          toast.error("Failed to fetch enrollments");
        }

      } catch (error) {
        console.error("Error fetching user profile or enrollments:", error);
        toast.error("Failed to fetch user profile or enrollments");
        navigate("/"); // Navigate to home page or error page
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h1 className="text-center">User Profile</h1>
        {user ? (
          <div className="profile-details">
          <p><i>Name:</i> {user.name}</p>
            <p><i>Username:</i> {user.username}</p>

            <p><i>Email:</i> {user.email}</p>
            {/* Add other user details here as needed */}
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}

        <h2 className="text-center mt-4">Enrollments</h2>
        <div className="enrollments-list">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment, index) => (
              <div key={index} className="enrollment-item">
                <p><strong>Course Name:</strong> {enrollment.courseName}</p>
                <p><strong>Enrollment Date:</strong> {new Date(enrollment.joiningDate).toLocaleDateString()}</p>
                {/* Add other enrollment details here as needed */}
              </div>
            ))
          ) : (
            <p>No enrollments found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
