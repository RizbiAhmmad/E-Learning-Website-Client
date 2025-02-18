import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider"; // Import Theme Context

const BecomeInstructor = () => {
  const { isDarkMode } = useContext(ThemeContext); // Get dark mode state

  return (
    <section className={`py-6 transition-all duration-300 ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      <div className="container mx-auto px-8">
        <div className={`flex flex-col lg:flex-row items-center shadow-lg rounded-lg overflow-hidden transition duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
          {/* Left Side: Image */}
          <div className="lg:w-1/2 w-full">
            <img
              src="https://media.istockphoto.com/id/1474330053/vector/vector-illustration-of-online-study-design-concept.jpg?b=1&s=612x612&w=0&k=20&c=YbFFc3Ee-vSA1xsSpaYQnne2S0gSEUBReNyYr9SY9yk="
              alt="Become an Instructor"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2 w-full p-8">
            <h2 className="text-2xl font-bold mb-4">
              Become an Instructor
            </h2>
            <p className="mb-6">
              Share your expertise, connect with learners globally, and help shape the future. Join us to make an impact as an instructor.
            </p>
            <Link to='/teach'>
              <button className={`px-6 py-3 font-bold rounded-full shadow-lg transition duration-300 ${
                isDarkMode 
                  ? "bg-purple-600 hover:bg-purple-500 text-white" 
                  : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-teal-500 hover:to-green-500"
              }`}>
                Join as an Instructor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
