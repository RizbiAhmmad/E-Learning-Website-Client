import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MyClasses = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/classes?teacherEmail=${user.email}`)
        .then((response) => {
          setClasses(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
          setLoading(false);
        });
    }
  }, [axiosPublic, user]);

  const handleDelete = (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/classes/${classId}`)
          .then(() => {
            setClasses(classes.filter((cls) => cls._id !== classId));
            Swal.fire("Deleted!", "Your class has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting class:", error);
            Swal.fire("Error!", "Failed to delete the class.", "error");
          });
      }
    });
  };

  const handleUpdate = (classId) => {
    navigate(`/dashboard/update-class/${classId}`);
  };

  const handleDetails = (classId) => {
    navigate(`/dashboard/my-class/${classId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {classes.map((cls) => (
            <motion.div
              key={cls._id}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <motion.img
                src={cls.image}
                alt={cls.title}
                className="w-full h-40 object-cover rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-lg font-bold mt-4">{cls.title}</h2>
                <p className="text-sm text-gray-600">Teacher: {cls.name}</p>
                <p className="text-sm text-gray-600">Email: {cls.email}</p>
                <p className="text-sm text-gray-600">Price: ${cls.price}</p>
                <p className="text-sm text-gray-600">Status: {cls.status}</p>
                <p className="mt-2">{cls.description}</p>
              </motion.div>
              <motion.div
                className="mt-auto flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={() => handleUpdate(cls._id)}
                  className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-transform"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 transition-transform"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDetails(cls._id)}
                  disabled={cls.status !== "Approved"}
                  className={`px-3 py-1.5 rounded text-sm ${
                    cls.status === "Approved"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  See Details
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyClasses;
