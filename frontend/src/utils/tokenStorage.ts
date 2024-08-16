export function getToken() {
    if (typeof window != "undefined") {
      const token = localStorage?.getItem('accessToken');
      return token || null;
    }
  }
  
export const setToken = (token: string) => {
    localStorage.setItem("accessToken", token);
};

export const removeToken = () => localStorage.removeItem('accessToken');

export const getRefreshToken = () => {
    const name = "refreshToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const setRefreshToken = (token: string) => {
    console.log(token)
    document.cookie = `refreshToken=${token}; path=/; samesite=strict`;
};

export const removeRefreshToken = () => {
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict';
};