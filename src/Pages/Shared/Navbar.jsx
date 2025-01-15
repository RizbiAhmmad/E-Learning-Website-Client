// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-6 ">
      <div className="container mx-auto flex justify-between items-center">
        
      <div className="flex items-center gap-2">
        <div >
        <img className="h-12 w-12 object-cover" src="https://img.freepik.com/premium-vector/e-learning-concept_24911-16717.jpg" alt="" />
        </div>
        <div>
            <h2 className="font-bold text-purple-600">E-Learning</h2>
        </div>
      </div>

        
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
            to=""
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            All Classes
          </NavLink>
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            Teach
          </NavLink>
          
        </div>

        
        <button  className="btn btn-primary">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
