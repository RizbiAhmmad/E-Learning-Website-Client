import React from "react";
import { CgProfile } from "react-icons/cg";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const {isAdmin}= useAdmin();
  
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
            <>
            </>
          )}
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
