import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const SocialLogin = () => {
  const {googleSignIn}= useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result =>{
      console.log(result.user);
      const userInfo ={
        email:result.user?.email,
        name:result.user?.displayName,
        
      }
      axiosPublic.post('/users', userInfo)
      .then(res =>{
        console.log(res.data);
        navigate ('/')
      })
    })
  }
  return (
    <div className="">
      <div>
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
