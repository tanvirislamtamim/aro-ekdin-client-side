import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    // ✅ REQUEST INTERCEPTOR
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // Firebase ID Token
          const token = await user.getIdToken();

          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // ✅ RESPONSE INTERCEPTOR
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // unauthorized / forbidden
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.error("Unauthorized access");

          // optional logout
          await logOut();
        }

        return Promise.reject(error);
      }
    );

    // ✅ CLEANUP
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);

      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;