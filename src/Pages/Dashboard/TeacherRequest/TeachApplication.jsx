import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TeacherRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch teacher applications
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teach-applications");
      return res.data;
    },
  });

  // Approve Teacher Application
  const handleMakeTeacher = async (application) => {
    try {
      const res = await axiosSecure.patch(`/teach-applications/approve/${application._id}`);
      if (res.data.applicationUpdate.modifiedCount > 0) {
        // Invalidate cache to ensure fresh data
        queryClient.invalidateQueries("teacherRequests");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${application.name} has been approved as a teacher!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("No data modified in the backend.");
      }
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  // Reject Teacher Application
  const handleReject = async (application) => {
    try {
      const res = await axiosSecure.patch(`/teach-applications/reject/${application._id}`);
      if (res.data.modifiedCount > 0) {
        // Invalidate cache to ensure fresh data
        queryClient.invalidateQueries("teacherRequests");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${application.name}'s request has been rejected.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("No data modified in the backend.");
      }
    } catch (error) {
      console.error("Error rejecting teacher:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold my-6 text-center">
        Teacher Requests Management
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <td>{index + 1}</td>
                <td>{application.name}</td>
                <td>
                  <img
                    src={application.photoURL}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{application.experience}</td>
                <td>{application.title}</td>
                <td>{application.category}</td>
                <td
                  className={`font-bold ${
                    application.status === "pending"
                      ? "text-yellow-500"
                      : application.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {application.status}
                </td>
                <td>
                  <button
                    onClick={() => handleMakeTeacher(application)}
                    className="btn btn-sm bg-green-500 text-white mr-2 hover:bg-green-600"
                    disabled={application.status !== "pending"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(application)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    disabled={application.status !== "pending"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequests;
