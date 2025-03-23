import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCoursePage = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    fees: '',
    subject: '',
    courseDescription: '',
    videoUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    try {
      const response = await fetch("http://localhost:5002/api/courses", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          "role": role
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Course added successfully");
        console.log('Course added successfully:', data);
        setCourseData({
          courseName: '',
          fees: '',
          subject: '',
          courseDescription: '',
          videoUrl: '',
        }); // Clear form fields after successful submission
      } else {
        console.error('Error adding course:', data);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fees" className="form-label">Fees</label>
          <input
            type="text"
            className="form-control"
            id="fees"
            name="fees"
            value={courseData.fees}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={courseData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="videoUrl" className="form-label">Video Url</label>
          <input
            type="text"
            className="form-control"
            id="videoUrl"
            name="videoUrl"
            value={courseData.videoUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="courseDescription"
            name="courseDescription"
            value={courseData.courseDescription}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
};

export default AddCoursePage;
