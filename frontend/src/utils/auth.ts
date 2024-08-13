import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { removeToken } from './tokenStorage';

export const getRoleFromToken = (token: string): string | null => {
    try {
        const decoded: any = jwtDecode(token);
        return decoded.Role || null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

export const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/auth/refresh-token', { token });
      const { token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  };

  export const logout = () => {
    removeToken();
    localStorage.removeItem('username');
    window.location.href = '/login';
  };