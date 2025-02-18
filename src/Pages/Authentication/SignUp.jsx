import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log("Logged user", loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("User profile updated");

          // Create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User added to the database");

              reset();
              Swal.fire({
                title: "User created successfully",
                icon: "success",
                draggable: true,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/free-vector/background-abstract-realistic-technology-particle_23-2148431264.jpg?semt=ais_hybrid')` }}>
      <Helmet>
        <title>E-Learning | Sign Up</title>
      </Helmet>

      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-white font-medium">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              placeholder="Profile image URL"
              className="w-full px-4 py-2 mt-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.photoURL && <span className="text-red-400 text-sm">Photo URL is required</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
              })}
              placeholder="Enter password"
              className="w-full px-4 py-2 mt-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password?.type === "required" && <span className="text-red-400 text-sm">Password is required</span>}
            {errors.password?.type === "minLength" && <span className="text-red-400 text-sm">At least 6 characters</span>}
            {errors.password?.type === "maxLength" && <span className="text-red-400 text-sm">Max 20 characters</span>}
            {errors.password?.type === "pattern" && <span className="text-red-400 text-sm">Must include uppercase, lowercase, and number</span>}
          </div>

          {/* Sign Up Button */}
          <div className="mt-4">
            <input
              type="submit"
              value="Sign Up"
              className="w-full py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-lg transition-all duration-300 cursor-pointer"
            />
          </div>
        </form>

        {/* Social Login */}
        <div className="text-center text-white mt-4">
          <p>Already have an account? <Link to="/login" className="text-blue-300 hover:underline">Login</Link></p>
          <div className="divider my-3"></div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
