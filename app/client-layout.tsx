'use client';

import React from 'react';
import { SessionProvider} from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClientContent>{children}</ClientContent>
    </SessionProvider>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
    </>
  );
}
