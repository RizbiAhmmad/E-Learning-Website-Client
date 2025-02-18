import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { ThemeContext } from "../providers/ThemeProvider";

const Teach = () => {
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext); // Get dark mode state
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);

  // Fetch user role on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axiosSecure.get(`/users/role?email=${user?.email}`);
        setRole(response.data.role || "user");
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("user");
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user, axiosSecure]);

  const onSubmit = async (data) => {
    data.status = "pending";
    data.photoURL = user?.photoURL;
    data.role = role; // Include the role

    try {
      const response = await axiosSecure.post("/teach-application", data);
      if (response.data.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application is under review.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Failed to submit the application.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto mb-10 mt-10 p-8 rounded-lg shadow-md transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Teach on S.D</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ""}
            {...register("name", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              isDarkMode ? "bg-gray-800 text-purple-400 border-gray-600" : "bg-white text-black"
            }`}
            readOnly
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Profile Picture</label>
          <div className="flex items-center">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-20 h-20 rounded-xl mr-4"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ""}
            {...register("email", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              isDarkMode ? "bg-gray-800 text-purple-400 border-gray-600" : "bg-white text-black"
            }`}
            readOnly
          />
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Role</label>
          <input
            type="text"
            value={role || "Loading..."}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              isDarkMode ? "bg-gray-800 text-purple-400 border-gray-600" : "bg-white text-black"
            }`}
            readOnly
          />
        </div>

        {/* Experience Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Experience</label>
          <select
            {...register("experience", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
            }`}
          >
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
            }`}
            placeholder="Enter your teaching title (e.g., Frontend Developer)"
          />
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Category</label>
          <select
            {...register("category", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
            }`}
          >
            <option value="web development">Web Development</option>
            <option value="digital marketing">Digital Marketing</option>
            <option value="graphic design">Graphic Design</option>
            <option value="data science">Data Science</option>
            <option value="content writing">Content Writing</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg focus:outline-none focus:ring ${
              isDarkMode
                ? "bg-purple-600 text-white hover:bg-purple-500 focus:ring-purple-400"
                : "bg-purple-600 text-white hover:bg-purple-500 focus:ring-purple-400"
            }`}
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default Teach;
