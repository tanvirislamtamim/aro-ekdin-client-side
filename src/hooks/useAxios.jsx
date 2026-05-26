import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://aro-ekdin-server-side.onrender.com`
}); 

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;