import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TeacherRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch teacher applications
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teach-applications");
      return res.data;
    },
  });

  // Approve Teacher Application
  const handleApprove = (application) => {
    axiosSecure
      .patch(`/teach-applications/approve/${application._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${application.name} has been approved as a teacher!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // Reject Teacher Application
  const handleReject = (application) => {
    axiosSecure
      .patch(`/teach-applications/reject/${application._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${application.name}'s request has been rejected.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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
                    application.status === "Pending"
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
                    onClick={() => handleApprove(application)}
                    className="btn btn-sm bg-green-500 text-white mr-2"
                    disabled={application.status !== "Pending"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(application)}
                    className="btn btn-sm bg-red-500 text-white"
                    disabled={application.status !== "Pending"}
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
