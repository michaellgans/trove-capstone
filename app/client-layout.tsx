'use client';

import React, { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';
import { useOverlay } from '@/components/OverlayContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClientContent>{children}</ClientContent>
    </SessionProvider>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { setCurrentPage, setOverlayActive } = useOverlay();

  useEffect(() => {
    if (session) {
      setCurrentPage('home');
      setOverlayActive(false);
    } else {
      setCurrentPage('landing');
      setOverlayActive(false);
    }
  }, [session, setCurrentPage, setOverlayActive]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pb-10">{children}</main>
    </>
  );
}
