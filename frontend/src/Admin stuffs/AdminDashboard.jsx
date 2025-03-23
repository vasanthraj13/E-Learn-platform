import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [totalEnrolledUsers, setTotalEnrolledUsers] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/status/getallenroll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch enrolled users');
        }

        const data = await response.json();
        setEnrolledUsers(data.enrollments);
        setTotalEnrolledUsers(data.enrollments.length);
      } catch (error) {
        console.error('Error fetching enrolled users:', error);
      }
    };

    fetchEnrolledUsers();
  }, [token]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Enrolled Users per Course Card */}
      <div className="card mb-4">
        <div className="card-header">
          Enrolled Users per Course
        </div>
        <ul className="list-group list-group-flush">
          {enrolledUsers.map((course, index) => (
            <li key={index} className="list-group-item">
              <strong>{course.courseId}</strong>: {course.joiningDate}
            </li>
          ))}
        </ul>
      </div>

      {/* Total Enrolled Users Card */}
      <div className="card">
        <div className="card-header">
          Total Enrolled Users
        </div>
        <div className="card-body">
          <p>{totalEnrolledUsers}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
