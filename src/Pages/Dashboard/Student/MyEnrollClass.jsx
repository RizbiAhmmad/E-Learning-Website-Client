import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyEnrollClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchEnrolledClasses = async () => {
      try {
        const { data } = await axiosSecure.get("/payments");
        const userPayments = data.filter((payment) => payment.BuyerEmail === user.email);
        
        // Fetch class details for each enrolled class
        const classRequests = userPayments.map((payment) =>
          axiosSecure.get(`/classes/${payment.courseId}`).then((res) => res.data)
        );

        const classDetails = await Promise.all(classRequests);
        setEnrolledClasses(classDetails);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      }
    };

    fetchEnrolledClasses();
  }, [user?.email, axiosSecure]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Enrolled Classes ({enrolledClasses.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {enrolledClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{cls.title}</h2>
              <p className="text-gray-600 mt-2">
                <strong>Teacher:</strong> {cls.teacherName || "Unknown"}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
                // onClick={() => navigate(`dashboard/my-enroll/${_id}`)}
              >
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
