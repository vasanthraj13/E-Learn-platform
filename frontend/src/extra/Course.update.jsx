import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCoursePage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    courseName: '',
    fees: '',
    subject: '',
    courseDescription: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/courses/${id}`);
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5002/api/courses/${id}`, courseData);
      console.log(response.data);
      // Redirect or navigate to another page after successful update
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fees:</label>
          <input
            type="text"
            name="fees"
            value={courseData.fees}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={courseData.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="courseDescription"
            value={courseData.courseDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCoursePage;
