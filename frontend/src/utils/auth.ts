import { jwtDecode } from 'jwt-decode';

export const getRoleFromToken = (token: string): string | null => {
    try {
        const decoded: any = jwtDecode(token);
        return decoded.Role || null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};