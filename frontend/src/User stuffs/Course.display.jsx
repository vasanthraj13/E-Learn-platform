import React, { useState, useEffect } from 'react';
import '../App.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
const CourseDisplayPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch("http://localhost:5002/api/courses", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCourses(data);
          console.log('Courses fetched successfully:', data);
        } else {
          console.error('Error fetching courses:', data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    navigate(`/payments/${courseId}`)
    
  };

  return (
    <div className="course-list-container">
      <h2 className="course-list-title">Course List</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Fees</th>
            <th>Subject</th>
            <th>Video Url</th>
            <th>Description</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td>{course.fees}</td>
              <td>{course.subject}</td>
              <td>{course.videoUrl}</td>
              <td>{course.courseDescription}</td>
              <td>
                {/* Added buttons for enrolling and de-enrolling from courses */}
                <button onClick={() => handleEnroll(course.id)}>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseDisplayPage;
