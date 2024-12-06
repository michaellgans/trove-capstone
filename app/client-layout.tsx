'use client';

import React, { useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';

const mockFamilyMembers = [
  { id: 1, name: 'Mei', avatar: '/images/avatar.svg' },
  { id: 2, name: 'Michael', avatar: '/images/avatar.svg' },
  { id: 3, name: 'Chris', avatar: '/images/avatar.svg' },
];

const mockLessons = [
  'All Lessons',
  'Bills and Payments',
  'Loans and Interest',
  'Savings and Checking',
  'Taxes and Withholding',
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClientContent>{children}</ClientContent>
    </SessionProvider>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); // Ensure this is within SessionProvider
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Update isLoggedIn based on session state
    setIsLoggedIn(!!session);
  }, [session]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <>
      <Navbar/>
      <main className="flex-grow pb-10">{children}</main>
    </>
  );
}
