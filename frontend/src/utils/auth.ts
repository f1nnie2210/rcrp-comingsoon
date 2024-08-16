import { toast } from "sonner";
import axiosInstance from "./axiosInstance";

export const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.get(`/auth/refresh-token`, {
          withCredentials: true,
        });
        const { data } = response;
        return data;
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.error?.message);  
    }
};