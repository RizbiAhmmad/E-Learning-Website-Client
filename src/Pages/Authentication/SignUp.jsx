import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic=useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log("Logged user", loggedUser);
      updateUserProfile(data.name, data.photoURL)
      .then(()=>{
        console.log("User profile updated");

        // create user entry in the database
        const userInfo={
          name: data.name,
          email:data.email,
          photoURL: data.photoURL,
        }
        console.log(userInfo);
        axiosPublic.post ('/users', userInfo)
        .then(res=>{
          if (res.data.insertedId){
            console.log('user added to the database');

            reset();
            Swal.fire({
              title: "User created successfully",
              icon: "success",
              draggable: true
            });
            navigate ('/');
          }
        })

       
      })
      .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <Helmet>
        <title>E-Learning | Sign Up</title>
      </Helmet>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content ">
         
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be at least 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password must be less than 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must include one uppercase, one lowercase, and one
                    number
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
           <div className="text-center mb-4">
           <p>
              
                Already have an Account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              
            </p>
            <div className="divider"></div>
            <SocialLogin></SocialLogin>
            
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
