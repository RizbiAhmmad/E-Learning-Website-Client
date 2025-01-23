import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);

  // Fetch all classes
  useEffect(() => {
    axiosSecure
      .get("/classes")
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, [axiosSecure]);

  // Handle Approve
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/classes/${id}`, { status: "approved" });
      Swal.fire("Success!", "Class approved successfully.", "success");
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === id ? { ...cls, status: "approved" } : cls
        )
      );
    } catch (error) {
      Swal.fire("Error!", "Failed to approve class.", "error");
      console.error(error);
    }
  };

  // Handle Reject
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/classes/${id}`, { status: "rejected" });
      Swal.fire("Success!", "Class rejected successfully.", "success");
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === id ? { ...cls, status: "rejected" } : cls
        )
      );
    } catch (error) {
      Swal.fire("Error!", "Failed to reject class.", "error");
      console.error(error);
    }
  };

  // Render Table
  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">All Classes</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
            <th className="border border-gray-300 px-4 py-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{cls.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={cls.image} alt={cls.title} className="h-12 w-12" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{cls.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {cls.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cls.status === "pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-green-600"
                      onClick={() => handleApprove(cls._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleReject(cls._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {cls.status !== "pending" && (
                  <span className="text-gray-600 capitalize">
                    {cls.status}
                  </span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className={`px-4 py-1 rounded-md ${
                    cls.status === "approved"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={cls.status !== "approved"}
                >
                  Progress
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllClasses;
