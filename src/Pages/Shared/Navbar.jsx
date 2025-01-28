import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-cyan-950 text-white p-6 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div>
            <img
              className="h-10 w-10 object-cover"
              src="https://img.freepik.com/premium-vector/e-learning-concept_24911-16717.jpg"
              alt="Logo"
            />
          </div>
          <div>
            <h2 className="font-bold text-purple-600 text-2xl">E-Learning</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/classes"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            All Classes
          </NavLink>
          <NavLink
            to="/teach"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            Teach on Skill Development
          </NavLink>
        </div>

        {/* User Profile Section */}
        {user ? (
          <div className="relative">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div
                className="absolute right-0 p-2 mt-2  bg-white text-black rounded shadow-lg w-40"
                onMouseLeave={closeDropdown}
              >
                <p className="block px-4 py-2 font-semibold border-b border-gray-200">
                  {user.displayName || "User"}
                </p>
                <Link to="/dashboard">
                  <button className="w-full text-left px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full mt-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded">
            LogIn
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
