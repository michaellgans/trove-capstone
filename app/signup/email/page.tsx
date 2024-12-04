// pages/login/email.tsx or app/login/email/page.tsx
'use client';
import React from 'react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import EmailSignupCard from '@/components/Signup-Signin/EmailSignupCard';
import ChildAccountSetup from '@/components/Signup-Signin/ChildAccountSetup';
import ProgressIndicator from '@/components/Signup-Signin/ProgressIndicator';
import { ChildDataType } from '@/types/types';
import StripeConnectionCard from '@/components/Signup-Signin/StripeConnectionCard';

const EmailLoginPage: React.FC = () => {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // State for form data
  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (session?.user) {
      setParentData((prev) => ({
        ...prev,
        firstName: session.user.name?.split(" ")[0] || "",
        lastName: session.user.name?.split(" ")[1] || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const [childData, setChildData] = useState<ChildDataType[]>([
    {
      childFirstName: '',
      childLastName: '',
      username: '',
      pin: '',
      confirmPin: '',
      startingBalance: '10.00',
      currency: 'USD',
    },
  ]);
  return (
    <div className="container mx-auto">
       {/* Progress Indicator */}
       <ProgressIndicator currentStep={step} totalSteps={3} />

      {/* Conditional Rendering based on step */}
      {step === 1 && (
      <EmailSignupCard
        nextStep={nextStep}
        parentData={parentData}
        setParentData={setParentData}
      />
      )}
      {step === 2 && (
      <ChildAccountSetup
        prevStep={prevStep}
        nextStep={nextStep}
        childData={childData}
        setChildData={setChildData}
      />
    )}
      {step === 3 && (
      <StripeConnectionCard
        prevStep={prevStep}
      />
      )}
    </div>
  );
};

export default EmailLoginPage;
