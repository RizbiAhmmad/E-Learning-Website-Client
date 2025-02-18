import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { ThemeContext } from "../../providers/ThemeProvider";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  return (
    <nav className={`bg-cyan-950 text-white px-8 py-4 sticky top-0 z-10 shadow-md ${isDarkMode ? "dark bg-gray-900" : "bg-cyan-950"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 cursor-pointer">
          <img className="h-8 w-8 object-cover" src="https://img.freepik.com/premium-vector/e-learning-concept_24911-16717.jpg" alt="Logo" />
          <h2 className="font-bold text-purple-600 text-xl md:text-2xl">E-Learning</h2>
        </Link>

        <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-cyan-950 md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none ${isDarkMode ? "dark:bg-gray-800" : ""}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>Home</NavLink>
          <NavLink to="/classes" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>All Classes</NavLink>
          <NavLink to="/teach" className={({ isActive }) => isActive ? "text-purple-500 font-bold border-b-2 border-purple-500 pb-1" : "text-white hover:text-purple-500"}>Teach on Skill Development</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-2xl cursor-pointer">
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>

          {user ? (
            <div className="relative">
              <img src={user.photoURL || "/default-avatar.png"} alt="User Avatar" className="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer border" onClick={() => setDropdownOpen(!dropdownOpen)} />
              {dropdownOpen && (
                <div className="absolute right-0 p-2 mt-2 bg-white text-black rounded shadow-lg w-40 dark:bg-gray-700 dark:text-white" onMouseLeave={() => setDropdownOpen(false)}>
                  <p className="block px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-600">{user.displayName || "User"}</p>
                  <Link to="/dashboard">
                    <button className="w-full text-left px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded">Dashboard</button>
                  </Link>
                  <button onClick={handleLogOut} className="w-full mt-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded dark:bg-gray-800 dark:text-white">LogIn</Link>
          )}

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
