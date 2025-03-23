import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const CoursePay = () => {
  const { courseId } = useParams(); // Get the course ID from URL
  const Navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem("id")
  
      const response = await fetch("http://localhost:5002/api/status/enroll", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          userId
        }),
      });
  
      const data = await response.json();
      console.log(data);
      
      if(data.error){
        toast("error")
        console.log("erorbro")
      }
      if (response.ok) {
        Navigate("/profile");
        console.log('Course enrolled successfully:', data);
        toast("You enrolled in the course Successfully");
        // TODO: Refresh course list or update enrollment status
      } 

    } catch (error) {
    //   console.error('Error processing payment or enrolling course:', error);
    //   setMessage('Payment failed. Please try again.');
    }
  };
    return (
    <div className="payment-container">
      <h2>Course Payment</h2>
      <p>Enroll in Course ID: {courseId}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Pay & Enroll</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CoursePay;
