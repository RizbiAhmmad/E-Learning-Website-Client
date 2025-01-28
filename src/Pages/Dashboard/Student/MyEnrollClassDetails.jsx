import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [classDetails, setClassDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const { data } = await axiosSecure.get(`/classes/${id}`);
        setClassDetails(data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    if (id) {
      fetchClassDetails();
    }
  }, [id, axiosSecure]);

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setSubmissionText("");
  };

  const handleSubmit = async () => {
    if (!submissionText.trim()) {
      alert("Submission text cannot be empty.");
      return;
    }
  
    try {
      const { data } = await axiosSecure.patch(`/classes/${id}/assignments/${assignmentId}`, {
        submits: submissionText,
      });
  
      if (data.modifiedCount > 0) {
        alert("Assignment submitted successfully!");
        closeModal();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("An error occurred while submitting.");
    }
  };
  

  if (!classDetails) {
    return <p className="text-center text-gray-500">Loading class details...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{classDetails.title}</h1>

      {/* Class Information Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-semibold">Title:</td>
              <td className="p-4">{classDetails.title}</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Teacher:</td>
              <td className="p-4">{classDetails.teacherName || "Unknown"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Description:</td>
              <td className="p-4">{classDetails.description || "No description available"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Price:</td>
              <td className="p-4">${classDetails.price}</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold">Image:</td>
              <td className="p-4">
                <img src={classDetails.image} alt={classDetails.title} className="w-48 h-32 object-cover rounded" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button className="btn btn-primary">Review</button>
      </div>

      {/* Assignments Table */}
      <h2 className="text-2xl font-bold text-center mb-4">Assignments ({classDetails.assignments?.length || 0})</h2>

      {classDetails.assignments?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Deadline</th>
                <th className="p-4 text-left">Marks</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {classDetails.assignments.map((assignment) => (
                <tr key={assignment._id} className="border-b">
                  <td className="p-4">{assignment.title}</td>
                  <td className="p-4">{assignment.description}</td>
                  <td className="p-4">{assignment.deadline}</td>
                  <td className="p-4">{assignment.marks}</td>
                  <td className="p-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={() => openModal(assignment)}
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No assignments assigned yet.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
            <p className="mb-2 text-gray-700">Assignment: {selectedAssignment?.title}</p>
            <input
              type="text"
              placeholder="Enter submission text..."
              className="w-full border border-gray-300 p-2 rounded mb-4"
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2 hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
