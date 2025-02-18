import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../providers/ThemeProvider";

const IndustryTrendsPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [trendingSkills, setTrendingSkills] = useState([]);

  // Sample Data (Can be replaced with live API)
  useEffect(() => {
    setTrendingSkills([
      { skill: "AI & Machine Learning", demand: "High", growth: "Projected 40% growth by 2027" },
      { skill: "Cybersecurity", demand: "Very High", growth: "Expected 3.5M job openings globally" },
      { skill: "Cloud Computing", demand: "High", growth: "70% of companies moving to cloud-based solutions" },
      { skill: "Data Science", demand: "High", growth: "Huge demand with 11M new jobs by 2026" },
      { skill: "Blockchain", demand: "Growing", growth: "Expanding use in finance & security sectors" },
      { skill: "UX/UI Design", demand: "Steady", growth: "35% growth in product design jobs" },
    ]);
  }, []);

  return (
    <div className={`min-h-screen px-6 py-12 transition-all duration-300 ${
      isDarkMode 
        ? "bg-black text-white" 
        : "bg-gray-100 text-black"
    }`}>
      
      <motion.h2 
        className="text-4xl  font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Trending Skills & Careers
      </motion.h2>

      <motion.p 
        className="text-center text-sm md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Stay ahead of the curve with the latest industry trends. Explore high-demand skills and their career growth opportunities!
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingSkills.map((trend, index) => (
          <motion.div 
            key={index} 
            className={`relative p-6 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-75 overflow-hidden transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-black border border-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Floating Effect */}
            <motion.div 
              className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500 rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500 rounded-full opacity-30"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />

            <h3 className="text-2xl font-semibold mb-3">{trend.skill}</h3>
            <p className="text-sm md:text-base">
              <strong className="text-green-500">Demand:</strong> {trend.demand}
            </p>
            <p className="text-sm md:text-base">
              <strong className="text-yellow-500">Growth:</strong> {trend.growth}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IndustryTrendsPage;
