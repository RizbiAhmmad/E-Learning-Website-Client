import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { ThemeContext } from "../../providers/ThemeProvider";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  return (
    <nav className={`px-8 py-4 sticky top-0 z-10 shadow-md ${isDarkMode ? "bg-[#0B0716]" : "bg-cyan-950"} text-white`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 cursor-pointer">
          <img className="h-8 w-8 object-cover" src="https://img.freepik.com/premium-vector/e-learning-concept_24911-16717.jpg" alt="Logo" />
          <h2 className="font-bold text-purple-600 text-xl md:text-2xl">E-Learning</h2>
        </Link>

        {/* Navigation Links */}
        <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 w-full md:w-auto ${isDarkMode ? "bg-black" : "bg-cyan-950"} md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none justify-center items-center`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>Home</NavLink>
          <NavLink to="/classes" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>All Classes</NavLink>
          <NavLink to="/teach" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>Teach</NavLink>
          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>Dashboard</NavLink>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button onClick={toggleDarkMode} className="text-2xl cursor-pointer">
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>

          {/* User photo + login/logout */}
          {user ? (
            <>
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border"
              />
              <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded dark:bg-gray-800 dark:text-white">
              LogIn
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            {menuOpen ? (
              <AiOutlineClose className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
            ) : (
              <AiOutlineMenu className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
