import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const ClassDetails = () => {
  const { classId } = useParams(); 
  console.log("classId:", classId);

  const axiosPublic = useAxiosPublic();
  const [classData, setClassData] = useState(null);
  const [totalEnrollment, setTotalEnrollment] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [totalSubmits, setTotalSubmits] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
const [payments, setPayments] = useState([]);
  useEffect(() => {
    axiosPublic
      .get(`/classes/${classId}`)
      .then((response) => {
        const classData = response.data;
        setClassData(classData);

        const assignments = Array.isArray(classData.assignments) ? classData.assignments : [];
        
        setTotalEnrollment(classData.totalEnrollment || 0);
        setTotalAssignments(assignments.length || 0); // Safely access length
        setTotalSubmits(classData.submits || 0);
      })
      .catch((error) => console.error("Error fetching class details:", error));

      const fetchPayments = async () => {
        try {
          const response = await fetch("https://e-learning-server-theta.vercel.app/payments"); // Fetch all payments
          const data = await response.json();
          // Filter payments where BuyerEmail matches user.email
          const filteredPayments = data.filter(payment => payment.courseId === classId);
          setPayments(filteredPayments); // Update state with filtered data
        } catch (error) {
          console.error("Error fetching payments:", error);
        }
      };
      fetchPayments()
  }, [classId, axiosPublic]);

 

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAssignment = {
      title: formData.get("title"),
      deadline: formData.get("deadline"),
      description: formData.get("description"),
    };

    axiosPublic
      .post(`/classes/${classId}/assignments`, newAssignment)
      .then(() => {
        axiosPublic.get(`/classes/${classId}`)
          .then((response) => {
            const classData = response.data;
            setClassData(classData);

            const assignments = Array.isArray(classData.assignments) ? classData.assignments : [];
            setTotalAssignments(assignments.length || 0);

            Swal.fire("Success!", "Assignment added successfully.", "success");

            // Close the modal
            setModalOpen(false);
          })
          .catch((error) => {
            console.error("Error fetching updated class details:", error);
            Swal.fire("Error!", "Failed to load updated class details.", "error");
          });
      })
      .catch((error) => {
        console.error("Error adding assignment:", error);
        Swal.fire("Error!", "Failed to add the assignment.", "error");
      });
  };
  console.log(payments);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Class Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-bold">Total Enrollment:</h2>
          <p className="text-xl">{payments.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-bold">Total Assignments</h2>
          <p className="text-xl">{totalAssignments}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-bold">Total Submits</h2>
          <p className="text-xl">{totalSubmits}</p>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => setModalOpen(true)}
      >
        Create Assignment
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Assignments</h2>
        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Submits</th>
              <th className="px-4 py-2">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {(classData?.assignments || []).map((assignment, index) => (
              <tr key={assignment.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{assignment.title}</td>
                <td className="border px-4 py-2">{assignment.description}</td>
                <td className="border px-4 py-2">{assignment.marks}</td>
                <td className="border px-4 py-2">{assignment.submits}</td>
                <td className="border px-4 py-2">{assignment.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for creating assignments */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleAddAssignment}
          >
            <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                name="title"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Deadline</label>
              <input
                type="date"
                name="deadline"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                name="description"
                className="border p-2 w-full rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Add Assignment
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
