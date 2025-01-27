import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllApprovedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalClasses, setTotalClasses] = useState(0); 
  const [itemsPerPage] = useState(6); 
  const navigate = useNavigate();

  useEffect(() => {
    
  
  axiosSecure
    .get(`/classes`)
    .then(response => {
      const approvedClasses = response.data.filter(
        (cls) => cls.status === "approved"
      );
      setClasses(approvedClasses);
  })
  .catch(error => {
      console.error("Error fetching properties:", error); // Handle err
  });
  }, [axiosSecure, currentPage]);

  const handleEnroll = (id) => {
    navigate(`/classes/${id}`);
  };

  const totalPages = Math.ceil(totalClasses / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Classes: {classes?.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classes?.map((cls) => (
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
              <p className="text-gray-500 mt-2">{cls.description}</p>
              <p className="text-gray-500 mt-2">{cls.teacherEmail}</p>
              <p className="mt-2 text-green-600 font-bold">
                Price: ${cls.price}
              </p>
              <p className="mt-2 text-green-600 font-bold">
                Status: {cls.status}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
                onClick={() => handleEnroll(cls._id)}
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-l hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllApprovedClasses;
