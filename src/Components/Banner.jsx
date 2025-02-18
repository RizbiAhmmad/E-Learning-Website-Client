import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";


const Banner = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center bg-center bg-no-repeat bg-cover transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/e-learning-technology-concept_46706-901.jpg?semt=ais_hybrid')`,
      }}
    >
      {/* Dark Mode Overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? "bg-black bg-opacity-50" : "bg-white bg-opacity-10"}`}></div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Welcome to E-Learning</h1>
        <p className="text-lg lg:text-xl mb-6">
          Discover knowledge and grow your skills with our platform.
        </p>
        <a
          href="/classes"
          className="px-6 py-3 rounded-lg font-semibold transition bg-purple-500 hover:bg-purple-600 text-white"
        >
          Explore Classes
        </a>
      </div>
    </section>
  );
};

export default Banner;
