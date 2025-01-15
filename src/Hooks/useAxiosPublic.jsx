import Axios  from "axios";

const axiosPublic=Axios.create({
    baseURL: "http://localhost:5000",
   
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;