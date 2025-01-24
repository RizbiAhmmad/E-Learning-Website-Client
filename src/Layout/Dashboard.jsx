import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userRole, setUserRole] = useState(null);

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

  return (
    <div className="flex">
      {/* Dashboard side bar */}
      <div className="w-64 min-h-screen bg-sky-800 text-white">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requests">
                  <FaChalkboardTeacher></FaChalkboardTeacher> Teacher Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allClasses">
                  <FaBookOpen></FaBookOpen> All classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <CgProfile></CgProfile> Profile
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}

          {userRole === "teacher" && (
            <div className="">
              Current User Role: {userRole}
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-class">
                  <FaChalkboardTeacher /> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-classes">
                  <FaBookOpen /> My Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <CgProfile /> Profile
                </NavLink>
              </li>
            </div>
          )}

          {/* {userRole === "user" && (
            <div className="">
              Current User Role: {userRole}
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <CgProfile></CgProfile> Profile
                </NavLink>
              </li>
            </div>
          )} */}
        </ul>
      </div>
      <div className="flex-1">
        {/* dashboard content */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
