import { toast } from "sonner";
import axiosInstance from "./axiosInstance";
import { removeRefreshToken, removeToken, setToken } from "./tokenStorage";

export const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post(`/auth/refresh-token`, {
          withCredentials: true,
        });
        const { data } = response;
        console.log(data);
        setToken(data.accessToken);
        return data;
      } catch (error: any) {
        console.error(error);
        if (error?.response?.status === 403) {
          removeToken();
          removeRefreshToken();
          localStorage.removeItem('username');
          toast.error("Session expired. Please log in again.");
          // Redirect to login page
          window.location.href = "/login";
      } else {
          toast.error(error?.response?.data?.error?.message);
      }
    }
};