import React, { useState, useEffect } from 'react';

function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const id = localStorage.getItem('id'); // Retrieve user ID from localStorage

    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/status/getenroll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in the Authorization header
          },
          body: JSON.stringify({ id }), // Send user ID in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch enrolled courses');
        }

        const data = await response.json();
        setEnrolledCourses(data.enrollments);
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const getCourseById = (courseId) => {
    return courses.find(course => course.id === courseId);
  };

  return (
    <div className="container">
      <h1 className="text-center">My Courses</h1>

      <div className="courses-list">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((enrollment, index) => {
            const course = getCourseById(enrollment.courseId);
            return (
              <div key={index} className="course-item">
                {course ? (
                  <>
                    <h2>{index+1} . {course.courseName}</h2>
                    <p><strong>Joined on:</strong> {new Date(enrollment.joiningDate).toLocaleDateString()}</p>
                    <p><strong>Subject:</strong> {course.subject}</p>
                    <p><strong>Fees:</strong> ${course.fees}</p>
                  </>
                ) : (
                  <p>No course details available.</p>
                )}
                {/* Add other course details here as needed */}
              </div>
            );
          })
        ) : (
          <p>No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
