import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";

const MyEnrollClass = () => {
  const { user } = useAuth(); 
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.email) return; 

    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/payments"); 
        const data = await response.json();
        
        const filteredPayments = data.filter(payment => payment.BuyerEmail === user.email);
        setPayments(filteredPayments); 
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [user?.email]); 

  console.log(payments);

  return (
    <div>
      <h1>Total Payments for {user?.email || "Unknown"}: {payments.length}</h1>
      <div>
        {payments.map(payment => (
          <div key={payment._id} className="border p-4 mb-4 rounded shadow">
            <h2 className="font-bold text-lg">Course ID: {payment.courseId}</h2>
            <h2 className="font-bold text-lg">Course Title: {payment.courseTitle}</h2>
            <p><strong>Buyer Name:</strong> {payment.BuyerName}</p>
            <p><strong>Buyer Email:</strong> {payment.BuyerEmail}</p>
            <p><strong>Teacher Email:</strong> {payment.teacherEmail}</p>
            <p><strong>Price:</strong> ${payment.price}</p>
            <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
            <p><strong>Date:</strong> {new Date(payment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
