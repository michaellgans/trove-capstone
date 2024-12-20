'use client';
import React, { useState } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import { ChildDataType, ParentDataType } from '@/types/types';
import { handleSignupWithCredentials, handleSignupWithGoogle } from '@/lib/server-actions';
import { signIn } from 'next-auth/react';
import { dollarsToCents } from '@/lib/utils';

interface StripeConnectionCardProps {
  prevStep: () => void;
  parentData: ParentDataType;
  childData: ChildDataType[];
  parent_id?: string | null;
}

const StripeConnectionCard: React.FC<StripeConnectionCardProps> = ({ prevStep, parentData, childData, parent_id }) => {
  const router = useRouter();
  const [startingBalance, setStartingBalance] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  // Handle starting balance input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartingBalance(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    let isValid = true;
    let newError = '';

    // Starting Balance validation
    const balanceNum = parseInt(startingBalance);
    if (isNaN(balanceNum) || balanceNum < 10) {
      newError = 'Minimum starting balance is $10.00';
      isValid = false;
    }

    setError(newError);

    try {
      if (isValid) {
        if (parent_id) {
          await handleSignupWithGoogle({parent_id: parent_id, startingBalance: startingBalance, children: childData});
          router.push("/home")
        } else if (!parent_id) {
          await handleSignupWithCredentials({
            email: parentData.email,
            password: parentData.password,
            name: parentData.firstName + " " + parentData.lastName,
            startingBalance: startingBalance,
            children: childData
          });
  
          await signIn("credentials", { email: parentData.email, password: parentData.password, callbackUrl: "/home" });
        }
      }
    } catch (error) {
      router.push("/signup");
      throw new Error("Failed to register new user");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 lg:p-14 sm:rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-0 sm:mt-10">
      {/* Logo and Title */}
      <LogoTitle />

      {/* Instruction Text */}
      <p className="text-lg w-full lg:w-[80%] text-gray-500 font-semibold text-center mt-2">
        To finish setting up your account, you will need to connect your Trove account to Stripe.
      </p>

      {/* Logos Section */}
      <div className="flex items-center justify-center space-x-5 my-8">
        <Image src='/images/Trove_Logo.png' alt="Trove Logo" width={60} height={60} />
  {/* Arrows in Column */}
  <div className="flex flex-col items-center justify-center">
    {/* Top Arrow (Left Pointing) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-gray-500"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>

    {/* Bottom Arrow (Right Pointing) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-gray-500"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  </div>
        <Image src='/images/Stripe.jpeg' className='rounded-full' alt="Stripe Logo" width={60} height={60} />
      </div>
      <button
        className="bg-[#635BFF] w-full lg:w-[80%] py-3 rounded-lg text-white flex items-center justify-center space-x-2 hover:brightness-110 transition ease-in-out duration-300"
      >
      <span>Sign in to Stripe</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#fff"
        className="w-5 h-5"
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
      </svg>
    </button>

      {/* Stripe Sign Up Link */}
<div className="flex items-center text-gray-700 justify-center mt-3">
  <p className="flex items-center">
    Don't have an account?{' '}
    <span className="cursor-pointer font-semibold text-[#635BFF] flex items-center ml-1 hover:brightness-110 transition ease-in-out duration-300">
      <span>Sign up</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="#635BFF"
        className="w-5 h-5 ml-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </span>
  </p>
</div>



      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* Starting Balance Input */}
        <div className="mb-4 relative mt-6">
          <label htmlFor="startingBalance" className="block text-gray-700 font-semibold mb-2">
            Your Balance
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              id="startingBalance"
              value={startingBalance}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              min="10"
              step="1"
              placeholder="10"
            />
            {/* Currency selector */}
            <div className="absolute right-3 flex items-center">
            <select
              id="currency"
              className="bg-transparent focus:outline-none"
            >
            <option value="USD">USD</option>
            {/* Add more currencies as needed */}
            </select>
          </div>
          </div>
          {error && focused && (
            <div className="text-red-500 text-xs mt-1">{error}</div>
          )}
          <p className="text-gray-500 text-sm mt-1">
            This is your minimum starting balance.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="flex justify-between gap-4 mt-7">
          {/* Back Button */}
          <button
            onClick={prevStep}
            type="button"
            className="w-full py-3 rounded-lg bg-transparent border-[1px] border-gray-200 text-gray-600 font-semibold hover:bg-gray-200 transition ease-in-out duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
          >
            Get Started
          </button>
        </div>
        {/* Cancel Button */}
        <div className='flex mt-3 w-full justify-center'>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-base text-gray-500 hover:text-gray-600 transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeConnectionCard;
