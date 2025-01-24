import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateClass = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axiosSecure
      .get(`/classes/${id}`)
      .then((response) => {
        if (response.data) {
          reset(response.data); 
        } else {
          Swal.fire("Error!", "Failed to fetch class data.", "error");
          navigate("/dashboard/my-classes"); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
        Swal.fire("Error!", "Failed to fetch class data.", "error");
        setLoading(false);
        navigate("/dashboard/my-classes");
      });
  }, [id, axiosSecure, reset, navigate]);

  const onSubmit = async (data) => {
    
    const { _id, ...updateData } = data;

    

    try {
      const response = await axiosSecure.put(`/class/${id}`, updateData);
      
      if (response.data.modifiedCount  > 0) {
        Swal.fire("Updated!", "Class has been updated successfully.", "success");
        navigate("/dashboard/my-classes"); 
      } 
      else {
        Swal.fire("Info!", "No changes were made.", "info");
      }
    } catch (error) {
      console.error("Error updating class:", error);
      Swal.fire("Error!", "Failed to update class. Please try again.", "error");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Update Class</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true, maxLength: 100 })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter class title"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: true, min: 0, valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter class price"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter class description"
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="url"
            {...register("image", { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter image URL"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;
