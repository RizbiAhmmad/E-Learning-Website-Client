import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OurTopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://e-learning-server-theta.vercel.app/classes");
        const data = await response.json();

        // Filter only approved courses
        const approvedCourses = data.filter((course) => course.status === "approved");

        // Display the latest 6 approved courses
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
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🌟 Our Top Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
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
              <p className="text-gray-200 text-sm mt-2 line-clamp-2">
                {course.description || "No description available."}
              </p>
              <p className="text-white mt-3">
                <strong>👨‍🏫 Teacher:</strong> {course.teacherName || "Unknown"}
              </p>
              <p className="text-white">
                <strong>💰 Price: </strong> ${course.price || "N/A"}
              </p>

             <Link to={`/classes`}>
             <motion.button
                className="w-full mt-5 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-200 transition duration-300"
                whileTap={{ scale: 0.95 }}
              >
                Explore More 🚀
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
