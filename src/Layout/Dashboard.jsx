import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userRole, setUserRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      const userEmail = user?.email;
      // console.log(userEmail);
      axiosPublic
        .get("/users/role", { params: { email: userEmail } })
        .then((response) => {
          setUserRole(response.data.role);
          // console.log("User Role:", response.data.role);
        })
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [axiosPublic, user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* top */}
      <div className="flex justify-between items-center p-4">        
          <button
            onClick={toggleSidebar}
            className=" w-full text-4xl text-black focus:outline-none"
          >
             {!isSidebarOpen ? (
              <MdOutlineDashboardCustomize />
            ) : (
              <LuLayoutDashboard />
            )}
          </button>
        </div>

      <div className="flex h-screen">
        {/* Dashboard side bar */}
        <div className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between`}>
          <ul onClick={toggleSidebar} className=" p-8">
            {isAdmin ? (
              <>
                <li >
                  <NavLink to="/" className="flex py-2 space-x-3 items-center">
                    <FaHome></FaHome> <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/requests" className="flex py-2 space-x-3 items-center">
                    <FaChalkboardTeacher></FaChalkboardTeacher> <span>Teacher Request</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users"className="flex py-2 space-x-3 items-center">
                    <FaUsers></FaUsers> <span>Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allClasses"className="flex py-2 space-x-3 items-center">
                    <FaBookOpen></FaBookOpen> <span>All classes</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile"className="flex py-2 space-x-3 items-center">
                    <CgProfile></CgProfile> <span>Profile</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}

            {userRole === "teacher" && (
              <div className="">
                <li>
                  <NavLink to="/"className="flex py-2 space-x-3 items-center">
                    <FaHome></FaHome> <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-class" className="flex py-2 space-x-3 items-center">
                    <FaChalkboardTeacher /> <span>Add Class</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-classes" className="flex py-2 space-x-3 items-center">
                    <FaBookOpen /> <span>My Classes</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile" className="flex py-2 space-x-3 items-center">
                    <CgProfile /> <span>Profile</span>
                  </NavLink>
                </li>
              </div>
            )}

            {userRole === "user" && (
              <div className="">
                <li>
                  <NavLink to="/" className="flex py-2 space-x-3 items-center">
                    <FaHome></FaHome> <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-enroll" className="flex py-2 space-x-3 items-center">
                    <FaHome></FaHome> <span>My Enroll Class</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile" className="flex py-2 space-x-3 items-center">
                    <CgProfile></CgProfile> <span>Profile</span>
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>

        <div className="flex-1 p-4">
          {/* Welcome Message */}
          {user && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg text-center shadow">
              <h1 className="text-xl font-semibold">
                Hey, {user.displayName || "User"} ! Welcome to your Dashboard.
              </h1>
            </div>
          )}

          {/* dashboard content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
