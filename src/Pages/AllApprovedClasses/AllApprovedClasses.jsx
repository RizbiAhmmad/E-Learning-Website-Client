import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ThemeContext } from "../../providers/ThemeProvider";
import Loading from "../../Components/Loading";

const AllApprovedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // Start loading
    axiosSecure
      .get(`/classes`)
      .then((response) => {
        const approvedClasses = response.data.filter(
          (cls) => cls.status === "approved"
        );
        setClasses(approvedClasses);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [axiosSecure]);

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Sorting Logic
  const sortedClasses = [...classes].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedClasses.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = sortedClasses.slice(startIndex, endIndex);

  const handleEnroll = (id) => navigate(`/classes/${id}`);
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`w-full mx-auto px-8 py-12  transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">All Classes</h1>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          className={`px-4 py-2 border rounded ${
            isDarkMode
              ? "bg-black text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High ⬆</option>
          <option value="desc">Price: High to Low ⬇</option>
        </select>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((cls) => (
          <div
            key={cls._id}
            className={`shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{cls.title}</h2>
              <p className="text-sm mt-2">{cls.description}</p>
              <p className="text-sm mt-2">Instructor: {cls.teacherEmail}</p>
              <p className="mt-2 font-bold text-yellow-400">
                Price: $ {cls.price}
              </p>
              <p className="mt-2 font-bold text-green-400">
                Status: {cls.status}
              </p>
              <button
                className={`w-full py-2 mt-4 rounded font-semibold transition duration-300 ${
                  isDarkMode
                    ? "bg-purple-600 hover:bg-purple-500 text-white"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
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
          className="px-4 py-2 text-white bg-purple-500 rounded-l hover:bg-purple-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-purple-500 rounded-r hover:bg-purple-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllApprovedClasses;
