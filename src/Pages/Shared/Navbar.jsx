import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
  
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-sky-800 text-white p-6 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <div>
            <img
              className="h-12 w-12 object-cover"
              src="https://img.freepik.com/premium-vector/e-learning-concept_24911-16717.jpg"
              alt="Logo"
            />
          </div>
          <div>
            <h2 className="font-bold text-purple-600 text-2xl">E-Learning</h2>
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
            Teach
          </NavLink>
        </div>


        {user ? (
        <>
          {" "}
          <span>{user?.displayName}</span>
          <button onClick={handleLogOut} className="btn btn-ghost">
            LogOut
          </button>
        </>
      ) : (
        <>
          {" "}
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
