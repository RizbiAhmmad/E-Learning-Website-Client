import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axiosPublic
        .get("/users/role", { params: { email: user.email } })
        .then((response) => {
          setUserRole(response.data.role);
        })
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [axiosPublic, user]);

  const joiningDate = user?.metadata?.creationTime || "N/A";
  const lastLogin = user?.metadata?.lastSignInTime || "N/A";

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQspr4podzfs-7WekEAt6gID4ugafkDT-LqAg&s')" }}
    >
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-white">{user?.displayName || "N/A"}</h2>
        <p className="text-blue-200 text-lg">{user?.email || "N/A"}</p>

        <div className="mt-4 text-white">
          <p className="text-lg font-semibold">
            Role:{" "}
            <span className="font-medium text-blue-300">
              {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "N/A"}
            </span>
          </p>
          <p className="mt-2">
            <span className="font-semibold">Joining Date:</span> {new Date(joiningDate).toLocaleDateString()}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Last Login:</span> {new Date(lastLogin).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
