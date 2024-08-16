'use client'
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getRefreshToken, setToken, removeToken, removeRefreshToken } from '@/utils/tokenStorage';
import { refreshAccessToken } from '@/utils/auth';

interface WithTokenRefreshProps {
    children: ReactNode;
  }
    const WithTokenRefresh = ({ children }: WithTokenRefreshProps) => {
        const router = useRouter();
    
        useEffect(() => {
            const checkAccessToken = async () => {
                try {
                    const token = getToken();
                    if (!token) {
                        await refreshAccessToken();
                    }
                } catch (error) {
                    router.push('/login');
                }
            };
    
            checkAccessToken();
        }, [router]);
    
        return <>{children}</>;
    };
export default WithTokenRefresh;