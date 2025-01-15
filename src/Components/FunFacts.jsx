import { motion } from "framer-motion";
import { FaGlobe, FaGraduationCap, FaLightbulb } from "react-icons/fa";

const FunFacts = () => {
  const facts = [
    {
      icon: <FaGlobe size={50} />,
      title: "Global Learners",
      fact: "Over 4 billion people worldwide use the internet for learning every day.",
    },
    {
      icon: <FaGraduationCap size={50} />,
      title: "Growing Education",
      fact: "E-learning grows 15% faster every year than traditional methods.",
    },
    {
      icon: <FaLightbulb size={50} />,
      title: "Creativity Boost",
      fact: "Learning new skills increases creativity by 60%, say researchers.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Did You Know?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="text-purple-600 mb-4">{fact.icon}</div>
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
