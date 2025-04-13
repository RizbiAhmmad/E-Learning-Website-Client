import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/classes`)
      .then((response) => {
        const approvedClasses = response.data.filter(
          (cls) => cls.status === "approved"
        );
        setClasses(approvedClasses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  // Sorting Logic
  const sortedClasses = [...classes].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedClasses.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = sortedClasses.slice(startIndex, endIndex);

  const handleEnroll = (id) => navigate(`/classes/${id}`);
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`w-full mx-auto px-8 py-12 transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
        All Approved Classes
      </h1>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          className={`px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900 text-white border-gray-700"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentClasses.map((cls) => (
          <motion.div
            key={cls._id}
            className={`relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-900 text-white border border-gray-700"
                : "bg-white text-black border border-gray-200"
            } hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Image with Hover Zoom */}
            <div className="relative overflow-hidden">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent ${
                  isDarkMode ? "opacity-70" : "opacity-50"
                }`}
              ></div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
                {cls.title}
              </h2>
              <p
                className={`text-sm mb-3 line-clamp-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {cls.description}
              </p>
              <p
                className={`text-sm mb-3 font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Instructor: {cls.teacherEmail}
              </p>
              <p className="text-lg font-semibold text-yellow-400 mb-2">
                Price: ${cls.price}
              </p>
              <p className="text-lg font-semibold text-green-400 mb-4">
                Status: {cls.status}
              </p>

              {/* Enroll Button */}
              <motion.button
                className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${
                  isDarkMode
                    ? "from-purple-600 to-cyan-500"
                    : "from-purple-500 to-cyan-400"
                } hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transition-all duration-300`}
                onClick={() => handleEnroll(cls._id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-10 flex justify-center items-center gap-4">
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r ${
            currentPage === 1
              ? "from-gray-500 to-gray-600 cursor-not-allowed"
              : "from-purple-500 to-cyan-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          } transition-all duration-300`}
          whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        >
          Previous
        </motion.button>
        <span
          className={`px-6 py-2 rounded-lg ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          Page {currentPage} of {totalPages}
        </span>
        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r ${
            currentPage === totalPages
              ? "from-gray-500 to-gray-600 cursor-not-allowed"
              : "from-purple-500 to-cyan-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          } transition-all duration-300`}
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default AllApprovedClasses;