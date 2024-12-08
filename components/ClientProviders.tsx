'use client';

import { SessionProvider } from 'next-auth/react';
import { OverlayProvider } from '@/components/OverlayContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <OverlayProvider>
        {children}
      </OverlayProvider>
    </SessionProvider>
  );
}
