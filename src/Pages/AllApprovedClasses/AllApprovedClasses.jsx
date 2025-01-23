import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AllApprovedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes with status "approved"
    axiosSecure
      .get("/classes?status=approved")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((error) => console.error("Error fetching approved classes:", error));
  }, [axiosSecure]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{cls.title}</h2>
              <p className="text-gray-600">By: {cls.teacherName || "Unknown"}</p>
              <p className="text-gray-500 mt-2">{cls.description}</p>
              <p className="mt-2 text-green-600 font-bold">
                Price: ${cls.price}
              </p>
              <p className="mt-1 text-gray-500">
                Total Enrollment: {cls.totalEnrollment || 0}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
                onClick={() =>
                  alert(`Enroll in class: ${cls.title} - ${cls.price}`)
                }
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApprovedClasses;