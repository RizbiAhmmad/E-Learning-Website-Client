import { Link } from "react-router-dom";

const BecomeInstructor = () => {
  return (
    <section className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Become an Instructor
            </h2>
            <p className="text-gray-600 mb-6">
              Share your expertise, connect with learners globally, and help
              shape the future. Join us to make an impact as an instructor.
            </p>
            <Link to='/teach'>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:from-teal-500 hover:to-green-500 transition duration-300">
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
