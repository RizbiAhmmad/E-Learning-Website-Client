import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signIn(email, password).then((result) => {
      Swal.fire({
        title: "User Login Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/background-abstract-realistic-technology-particle_23-2148431264.jpg?semt=ais_hybrid')" }}>
      <Helmet>
        <title>E-Learning | Login</title>
      </Helmet>

      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mt-4">
            <button type="submit" className="w-full py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-lg transition-all duration-300 cursor-pointer">
              Login
            </button>
          </div>
        </form>

        {/* Social Login and Signup Link */}
        <div className="text-center text-white mt-4">
          <p>New here? <Link to="/signup" className="text-blue-300 hover:underline">Create an account</Link></p>
          <div className="divider my-3"></div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
