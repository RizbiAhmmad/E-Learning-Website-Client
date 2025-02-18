import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider"; 
import Loading from "./Loading";

const OurTopCourses = () => {
  const { isDarkMode } = useContext(ThemeContext); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://e-learning-server-theta.vercel.app/classes");
        const data = await response.json();

        const approvedCourses = data.filter((course) => course.status === "approved");
        setCourses(approvedCourses.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`w-full px-8 py-12 transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className={`text-4xl font-bold text-center mb-10 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
        🌟 Our Top Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            className={`rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ${
              isDarkMode
                ? "bg-gray-900 text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={course.image || "https://via.placeholder.com/300"}
              alt={course.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold">{course.title || "Untitled Course"}</h2>
              <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                {course.description || "No description available."}
              </p>
              <p className="mt-3">
                <strong>👨‍🏫 Teacher:</strong> {course.teacherName || "Unknown"}
              </p>
              <p>
                <strong>💰 Price: </strong> ${course.price || "N/A"}
              </p>

              <Link to={`/classes`}>
                <motion.button
                  className={`w-full mt-5 py-3 rounded-lg font-semibold transition duration-300 ${
                    isDarkMode
                      ? "bg-white text-gray-900 hover:bg-gray-300"
                      : "bg-white text-blue-600 hover:bg-gray-200"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  See More 🚀
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurTopCourses;
