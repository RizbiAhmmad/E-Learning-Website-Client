import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../providers/ThemeProvider";

const CallToAction = () => {
  const { isDarkMode } = useContext(ThemeContext); // Get theme state

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`mt-8 py-12 transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          Ready to Start Your Learning Journey?
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-6"
        >
          Join thousands of learners and access the best courses for your success.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.a
            href="/signup"
            className={`${
              isDarkMode ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-purple-500 text-white hover:bg-purple-400"
            } font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
