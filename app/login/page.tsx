'use client';

import React, { useEffect } from 'react';
import SigninCard from '@/components/Signup-Signin/SigninCard';
import { useOverlay } from '@/components/OverlayContext';

const LoginPage: React.FC = () => {

  return (
    <div className="container mx-auto">
      <SigninCard />
    </div>
  );
};

export default LoginPage;
