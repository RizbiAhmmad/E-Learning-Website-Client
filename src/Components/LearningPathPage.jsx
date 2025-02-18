import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../providers/ThemeProvider";

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

    const completedMilestones = newRoadmap.filter((milestone) => milestone.completed).length;
    setProgress(Math.floor((completedMilestones / newRoadmap.length) * 100));
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-all duration-300 ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      <motion.h2 
        className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Learning Path
      </motion.h2>

      {/* Learning Path Selection */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {learningPaths.map((path) => (
          <motion.button
            key={path.id}
            onClick={() => handlePathSelect(path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 md:px-8 py-2 md:py-3 rounded-lg border-2 transition-all duration-300 font-semibold text-sm md:text-base
              ${selectedPath?.id === path.id ? "bg-purple-500 text-white" 
              : isDarkMode ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-200"}`}
          >
            {path.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Roadmap Section */}
      {selectedPath && (
        <motion.div 
          className="mt-6 max-w-full md:max-w-3xl mx-auto bg-opacity-90 p-4 md:p-8 rounded-xl shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4">{selectedPath.name} Roadmap</h3>

          <div className=" space-y-3 md:space-y-4">
            {roadmap.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => handleMilestoneCompletion(index)}
                  className={`w-full py-2 md:py-3 px-3 md:px-4 rounded-lg text-center transition-all duration-300 font-medium shadow-md text-sm md:text-base
                    ${item.completed ? "bg-green-500 text-white" 
                    : isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" 
                    : "bg-gray-300 hover:bg-gray-400"}`}
                >
                  {item.milestone}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 md:mt-6">
            <div className="text-lg md:text-xl font-semibold text-center">Progress: {progress}%</div>
            <motion.div 
              className={`w-full h-2 md:h-3 mt-2 rounded-lg overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-500 h-2 md:h-3 rounded-lg"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LearningPathPage;
