'use client'
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/tokenStorage';

interface WithAuthRedirectProps {
  children: ReactNode;
}

const WithAuthRedirect = ({ children }: WithAuthRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace('/'); // Redirect to home page if already logged in
    }
  }, [router]);

  const token = getToken();
  if (token) {
    return null; // Render nothing while checking authentication
  }

  return <>{children}</>;
};

export default WithAuthRedirect;