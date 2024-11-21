// pages/login/email.tsx or app/login/email/page.tsx
'use client';
import React from 'react';
import EmailSignInCard from '@/components/Signup-Signin/EmailSigninCard';

const EmailLoginPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <EmailSignInCard />
    </div>
  );
};

export default EmailLoginPage;
