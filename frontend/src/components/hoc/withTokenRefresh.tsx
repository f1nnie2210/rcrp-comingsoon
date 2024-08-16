'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, setToken, removeToken } from '@/utils/tokenStorage';
import { refreshAccessToken } from '@/utils/auth';
import { Spinner } from '@nextui-org/spinner';

const WithTokenRefresh: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
      if (!token) {
        try {
          const data = await refreshAccessToken();
          setToken(data.accessToken);
        } catch (error) {
          removeToken();
          router.push('/login');
        }
      }
      setIsTokenChecked(true);
    };

    checkToken();
  }, [router]);

  if (!isTokenChecked) {
    return <Spinner>Loading...</Spinner>; 
  }

  return <>{children}</>;
};

export default WithTokenRefresh;