// pages/login/email.tsx or app/login/email/page.tsx
'use client';
import React from 'react';
import { useState } from 'react';
import EmailSignupCard from '@/components/Signup-Signin/EmailSignupCard';
import ChildAccountSetup from '@/components/Signup-Signin/ChildAccountSetup';
import ProgressIndicator from '@/components/Signup-Signin/ProgressIndicator';
import { ChildDataType } from '@/types/types';

const EmailLoginPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // State for form data
  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    numChildren: '',
  });

  const [childData, setChildData] = useState<ChildDataType>({
    childFirstName: '',
    childLastName: '',
    username: '',
    pin: '',
    confirmPin: '',
    startingBalance: '10.00', // Default starting balance
    currency: 'USD', // Default currency
  });
  return (
    <div className="container mx-auto">
       {/* Progress Indicator */}
       <ProgressIndicator currentStep={step} totalSteps={2} />

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
        childData={childData}
        setChildData={setChildData}
      />
    )}
    </div>
  );
};

export default EmailLoginPage;
