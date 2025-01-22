import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [userRole, setUserRole] = React.useState(null);

  useEffect(() => {
    if (user && user.email) {
      // Ensure `user` is not null
      const userEmail = user?.email;
      console.log(userEmail);
      axiosPublic
        .get("/users/role", { params: { email: userEmail } })
        .then((response) => {
          setUserRole(response.data.role); // Update the state with the role
          console.log("User Role:", response.data.role);
        })
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [axiosPublic, user]);

  console.log(userRole);




  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">My Profile : {userRole}</h2>
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">{user?.displayName || "N/A"}</h3>
        <p className="text-gray-500 mb-2">{user?.email || "N/A"}</p>
        <p className="text-gray-700 font-medium">
          Role: {userRole || "User"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
