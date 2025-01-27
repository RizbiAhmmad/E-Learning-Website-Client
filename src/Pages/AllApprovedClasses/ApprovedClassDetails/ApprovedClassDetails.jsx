import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ApprovedClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/classes/${id}`)
      .then((res) => setClassDetails(res.data))
      .catch((error) => console.error("Error fetching class details:", error));
  }, [axiosSecure, id]);

  const handlePayment = () => {
    navigate(`/payment`, {
      state: { classId: classDetails._id, classPrice: classDetails.price },
    });
  };

  if (!classDetails) {
    return <p className="text-center mt-20">Loading class details...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={classDetails.image}
          alt={classDetails.title}
          className="rounded-xl w-full h-56 object-cover mb-4"
        />
        <h1 className="text-3xl font-bold mb-4 text-center">
          {classDetails.title}
        </h1>
        <p className="text-gray-700 mb-2 text-center">
          <span className="font-semibold">Price:</span> ${classDetails.price}
        </p>
        <p className="text-gray-700 mb-4 text-center">
          {classDetails.description}
        </p>
        <motion.button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/2 mx-auto block hover:bg-blue-600"
          onClick={handlePayment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Pay Now
        </motion.button>
      </motion.div>

      <Link to={`/payment/${classDetails._id}`}>
        <button className="btn btn-primary">PAY Now 2</button>
      </Link>
    </div>
  );
};

export default ApprovedClassDetails;
