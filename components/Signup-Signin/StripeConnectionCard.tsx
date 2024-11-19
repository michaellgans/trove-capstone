'use client';
import React, { useState } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

interface StripeConnectionCardProps {
  prevStep: () => void;
}

const StripeConnectionCard: React.FC<StripeConnectionCardProps> = ({ prevStep }) => {
  const router = useRouter();
  const [startingBalance, setStartingBalance] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  // Handle starting balance input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartingBalance(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    let newError = '';

    // Starting Balance validation
    const balanceNum = parseFloat(startingBalance);
    if (isNaN(balanceNum) || balanceNum < 10) {
      newError = 'Minimum starting balance is $10.00';
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      // Proceed to the next step or finalize the setup
      console.log('Stripe connection setup completed');
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-10">
      {/* Logo and Title */}
      <LogoTitle />

      {/* Instruction Text */}
      <p className="text-lg font-semibold text-gray-700 text-center mt-6">
        To finish setting up your account, you will need to connect your Trove account to Stripe.
      </p>

      {/* Logos Section */}
      <div className="flex items-center justify-center space-x-5 my-8">
        <Image src='/images/Trove_Logo.png' alt="Trove Logo" width={60} height={60} />
        <FaArrowRight className="text-brightBlue w-6 h-6" />
        <Image src='/images/Stripe-Emblem.png' alt="Stripe Logo" width={60} height={60} />
      </div>
      <button className='bg-[#5433FF] py-3 rounded-lg text-white w-full'>Sign in to Stripe</button>

      {/* Stripe Sign Up Link */}
      <div className="flex items-center text-gray-700 justify-center space-x-2">
        <p>Don't have an account? <span className='cursor-pointer font-semibold text-[#5433FF] flex items-center gap-1'>Sign up <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#5433FF" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg></span>
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
              step="0.01"
              placeholder="10.00"
            />
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
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center space-x-2 text-brightRed font-semibold hover:underline"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
          >
            Get Started
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeConnectionCard;
