'use client'
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/tokenStorage';
import { Spinner } from '@nextui-org/spinner';

interface WithAuthRedirectProps {
  children: ReactNode;
}

const WithAuthRedirect = ({ children }: WithAuthRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace('/'); 
    }
  }, [router]);

  const token = getToken();
  if (token) {
    return <Spinner>Loading...</Spinner>; 
  }

  return <>{children}</>;
};

export default WithAuthRedirect;