import { removeToken, removeRefreshToken } from '@/utils/tokenStorage';

export const logout = () => {
  removeToken();
  removeRefreshToken();
  localStorage.removeItem('username');
  window.location.href = '/login';
};