import { toast } from "sonner";
import axiosInstance from "./axiosInstance";
import { setToken } from "./tokenStorage";

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
        toast.error(error?.response?.data?.error?.message);  
    }
};