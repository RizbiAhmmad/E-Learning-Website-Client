import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../providers/ThemeProvider";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const LearningPathPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedPath, setSelectedPath] = useState(null);
  const [progress, setProgress] = useState(0);
  const [roadmap, setRoadmap] = useState([]);

  const learningPaths = [
    { name: "Web Development", id: 1 },
    { name: "Data Science", id: 2 },
    { name: "Machine Learning", id: 3 },
  ];

  const roadmapData = {
    1: [
      { milestone: "HTML & CSS Basics", completed: false },
      { milestone: "JavaScript Basics", completed: false },
      { milestone: "Frontend Frameworks", completed: false },
      { milestone: "Backend Development", completed: false },
      { milestone: "Fullstack Project", completed: false },
    ],
    2: [
      { milestone: "Python Basics", completed: false },
      { milestone: "Data Wrangling", completed: false },
      { milestone: "Data Visualization", completed: false },
      { milestone: "Machine Learning Algorithms", completed: false },
      { milestone: "Data Science Project", completed: false },
    ],
    3: [
      { milestone: "Python for ML", completed: false },
      { milestone: "Supervised Learning", completed: false },
      { milestone: "Unsupervised Learning", completed: false },
      { milestone: "Deep Learning", completed: false },
      { milestone: "ML Project", completed: false },
    ],
  };

  // Set "Web Development" as the default selected path on component mount
  useEffect(() => {
    const defaultPath = learningPaths.find(path => path.name === "Web Development");
    setSelectedPath(defaultPath);
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (selectedPath) {
      setRoadmap(roadmapData[selectedPath.id]);
    }
  }, [selectedPath]);

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setProgress(0);
  };

  const handleMilestoneCompletion = (index) => {
    const newRoadmap = [...roadmap];
    newRoadmap[index].completed = !newRoadmap[index].completed;
    setRoadmap(newRoadmap);

    const completedMilestones = newRoadmap.filter(
      (milestone) => milestone.completed
    ).length;
    setProgress(Math.floor((completedMilestones / newRoadmap.length) * 100));
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-black to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-100 to-gray-200 text-black"
      }`}
    >
      <motion.h2
        className={`text-4xl font-bold text-center mb-10 ${isDarkMode ? "text-white" : "text-gray-800"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Learning Path
      </motion.h2>

      {/* Learning Path Selection */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {learningPaths.map((path) => (
          <motion.button
            key={path.id}
            onClick={() => handlePathSelect(path)}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all duration-300 bg-gradient-to-r ${
              selectedPath?.id === path.id
                ? "from-purple-500 to-cyan-400 text-white"
                : isDarkMode
                ? "from-gray-800 to-gray-700 text-white border border-gray-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                : "from-white to-gray-100 text-black border border-gray-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            }`}
          >
            {path.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Roadmap Section */}
      {selectedPath && (
        <motion.div
          className={`mt-8 max-w-full md:max-w-4xl mx-auto p-6 md:p-10 rounded-2xl shadow-2xl transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900/80 backdrop-blur-md border border-gray-700"
              : "bg-white/90 backdrop-blur-sm border border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
            {selectedPath.name} Roadmap
          </h3>

          <div className="space-y-4 md:space-y-6">
            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-4 p-4 md:p-5 rounded-xl shadow-md transition-all duration-300 ${
                  item.completed
                    ? "bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400"
                    : isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]`}
                whileHover={{ scale: 1.03, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Status Icon */}
                <motion.button
                  onClick={() => handleMilestoneCompletion(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-xl md:text-2xl"
                >
                  {item.completed ? (
                    <FaCheckCircle className="text-green-400" />
                  ) : (
                    <FaCircle className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                  )}
                </motion.button>

                {/* Milestone Text */}
                <div className="flex-1">
                  <h4
                    className={`text-base md:text-lg font-semibold ${
                      item.completed
                        ? "text-green-400"
                        : isDarkMode
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {item.milestone}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 md:mt-8">
            <div className="text-lg md:text-xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
              Progress: {progress}%
            </div>
            <motion.div
              className={`w-full h-3 md:h-4 mt-3 rounded-full overflow-hidden shadow-inner ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
              ></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LearningPathPage;