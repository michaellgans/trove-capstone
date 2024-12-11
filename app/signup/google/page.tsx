// pages/signup/email.tsx or app/signup/email/page.tsx
'use client';
import React from 'react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import EmailSignupCard from '@/components/Signup-Signin/EmailSignupCard';
import ChildAccountSetup from '@/components/Signup-Signin/ChildAccountSetup';
import ProgressIndicator from '@/components/Signup-Signin/ProgressIndicator';
import { ChildDataType } from '@/types/types';
import StripeConnectionCard from '@/components/Signup-Signin/StripeConnectionCard';

const GoogleSignupPage: React.FC = () => {
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

  const [parentId, setParentId] = useState("");

  useEffect(() => {
    if (session?.user) {
      setParentData((prev) => ({
        ...prev,
        firstName: session.user.name?.split(" ")[0] || "",
        lastName: session.user.name?.split(" ")[1] || "",
        email: session.user.email || "",
      }));

      setParentId(session?.user.id);
    }
  }, [session]);

  const [childData, setChildData] = useState<ChildDataType[]>([
    {
      childFirstName: '',
      childLastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      startingBalance: '',
      currency: 'USD',
    },
  ]);
  return (
    <div className="container mx-auto">
       {/* Progress Indicator */}
       <div className="fixed top-[var(--navbar-height)] left-0 w-full z-40">
        <ProgressIndicator currentStep={step} totalSteps={2} />
       </div>
      {/* Conditional Rendering based on step */}
      {step === 1 && (
      <ChildAccountSetup
        prevStep={prevStep}
        nextStep={nextStep}
        childData={childData}
        setChildData={setChildData}
      />
    )}
      {step === 2 && (
      <StripeConnectionCard
        prevStep={prevStep}
        parentData={parentData}
        childData={childData}
        parent_id={parentId}
      />
      )}
    </div>
  );
};

export default GoogleSignupPage;
