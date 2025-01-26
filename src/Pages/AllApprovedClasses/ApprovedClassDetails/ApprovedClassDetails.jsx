import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ApprovedClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
 
    axiosSecure.get(`/classes/${id}`)
      .then((res) => setClassDetails(res.data))
      .catch((error) =>
        console.error("Error fetching class details:", error)
      );
  }, [axiosSecure, id]);

  const handlePayment = () => {
    navigate(`/payment/${id}`);
  };

  if (!classDetails) {
    return <p>Loading class details...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{classDetails.title}</h1>
      <p className="text-gray-700 mb-2">Teacher: {classDetails.teacherName}</p>
      <p className="text-gray-700 mb-2">Price: ${classDetails.price}</p>
      <p className="text-gray-700 mb-4">{classDetails.description}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handlePayment}
      >
        Pay
      </button>
    </div>
  );
};

export default ApprovedClassDetails;
