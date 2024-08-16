import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axiosInstance from "./axiosInstance";
import { setCookie } from "cookies-next";
import axios from "axios";

export const login = async (
  userInputs: TUserInputs,
  setUserInput: React.Dispatch<React.SetStateAction<TUserInputs>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance
) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      Username: userInputs.username,
      Password: userInputs.password,
    });

    const { data } = response;
    if (response.status === 200) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('username', userInputs.username);
      setCookie('refreshToken', data.refreshToken, { maxAge: 60 * 60 * 24 });
      router.push(`/`);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      setError(error.response.data.message || "Invalid login credentials");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setUserInput({ username: "", password: "" });
  }
};