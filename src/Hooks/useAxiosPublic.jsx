import Axios  from "axios";

const axiosPublic=Axios.create({
    baseURL: "https://e-learning-server-theta.vercel.app",
    // baseURL: "https://e-learning-server-theta.vercel.app",
   
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;