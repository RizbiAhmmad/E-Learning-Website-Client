import { useContext } from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaGraduationCap, FaLightbulb } from "react-icons/fa";
import { ThemeContext } from "../providers/ThemeProvider";

const FunFacts = () => {
  const { isDarkMode } = useContext(ThemeContext); // Get theme state

  const facts = [
    {
      icon: <FaGlobe size={50} />,
      title: "Global Learners",
      fact: "Over 4 billion people worldwide use the internet for learning every day.",
      color: "text-blue-500",
    },
    {
      icon: <FaGraduationCap size={50} />,
      title: "Growing Education",
      fact: "E-learning grows 15% faster every year than traditional methods.",
      color: "text-green-500",
    },
    {
      icon: <FaLightbulb size={50} />,
      title: "Creativity Boost",
      fact: "Learning new skills increases creativity by 60%, say researchers.",
      color: "text-yellow-500",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`py-12 transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Did You Know?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <div className={`mb-4 ${fact.color}`}>{fact.icon}</div>
              <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
              <p className="text-sm text-center">{fact.fact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FunFacts;
