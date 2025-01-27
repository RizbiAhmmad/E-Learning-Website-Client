import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AddClass = () => {
  const { user } = useAuth(); 
  const { register, handleSubmit, reset } = useForm(); 
  const axiosSecure = useAxiosSecure(); 

  const onSubmit = async (data) => {

    const classData = {
      ...data,
      teacherName: user?.displayName || "Unknown",
      teacherEmail: user?.email || "Unknown",
      status: "pending",
    };



    try {
      const response = await axiosSecure.post("/classes", classData); 
      if (response.data.insertedId) {
        Swal.fire({
          title: "Class Added!",
          text: "Your class has been added successfully and is pending approval.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset(); 
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add class. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error adding class:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter class title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ""}
            
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ""}
            
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Enter class price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter class description"
            rows="2"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="url"
            {...register("image", { required: true })}
            placeholder="Enter image URL"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
