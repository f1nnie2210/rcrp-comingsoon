'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { getRoleFromToken } from '@/utils/auth';

interface RoleProtectedRouteProps {
    roles: string[];
    children: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ roles, children }) => {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userRole = token ? getRoleFromToken(token) : null;

    React.useEffect(() => {
        if (!userRole || !roles.includes(userRole)) {
            router.push('/...not-found');
        }
    }, [userRole, roles, router]);

    return userRole && roles.includes(userRole) ? <>{children}</> : null;
};

export default RoleProtectedRoute;