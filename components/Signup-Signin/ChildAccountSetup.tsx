'use client';
import React, { useState } from 'react';
import LogoTitle from '../LogoTitle';
import ProgressIndicator from './ProgressIndicator';
import { ChildDataType } from '@/types/types';
import '../../app/globals.css';

interface ChildAccountSetupProps {
  prevStep: () => void;
  nextStep: () => void;
  childData: ChildDataType;
  setChildData: React.Dispatch<React.SetStateAction<ChildDataType>>;
}

const ChildAccountSetup: React.FC<ChildAccountSetupProps> = ({
  prevStep,
  nextStep,
  childData,
  setChildData,
}) => {
  // State for focused fields
  const [focusedFields, setFocusedFields] = useState({
    childFirstName: false,
    childLastName: false,
    username: false,
    pin: false,
    confirmPin: false,
    startingBalance: false,
  });

  // State for errors
  const [error, setError] = useState({
    childFirstName: '',
    childLastName: '',
    username: '',
    pin: '',
    confirmPin: '',
    startingBalance: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setChildData({ ...childData, [id]: value });
  };

  const handleFocus = (field: string) => {
    setFocusedFields({ ...focusedFields, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocusedFields({ ...focusedFields, [field]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic here
    let isValid = true;
    const newError = {
      childFirstName: '',
      childLastName: '',
      username: '',
      pin: '',
      confirmPin: '',
      startingBalance: '',
    };

    // First Name validation
    if (childData.childFirstName.trim() === '') {
      newError.childFirstName = 'First name is required';
      isValid = false;
    }

    // Last Name validation
    if (childData.childLastName.trim() === '') {
      newError.childLastName = 'Last name is required';
      isValid = false;
    }

    // Username validation
    if (childData.username.trim() === '') {
      newError.username = 'Username is required';
      isValid = false;
    }

    // PIN validation (e.g., 4-digit number)
    const pinPattern = /^\d{4}$/;
    if (!pinPattern.test(childData.pin)) {
      newError.pin = 'PIN must be a 4-digit number';
      isValid = false;
    }

    // Confirm PIN validation
    if (childData.confirmPin !== childData.pin) {
      newError.confirmPin = 'PINs do not match';
      isValid = false;
    }

    // Starting Balance validation (should be a number >= 10)
    const startingBalanceNum = parseFloat(childData.startingBalance);
    if (isNaN(startingBalanceNum) || startingBalanceNum < 10) {
      newError.startingBalance = 'Minimum starting balance is $10.00';
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      // Proceed to the next step
      console.log('Child account setup completed');
      nextStep();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-5">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={2} totalSteps={2} />
      <LogoTitle />

      {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 self-start text-mediumGreen">Child Account Setup</h2>
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        <div className='flex flex-col md:flex-row gap-0 md:gap-5 justify-between'>
        {/* First Name Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="childFirstName" className="block text-gray-700 font-semibold mb-2">
            First Name
          </label>
          <div className="relative">
            {error.childFirstName && focusedFields.childFirstName && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.childFirstName}
              </div>
            )}
            <input
              type="text"
              id="childFirstName"
              placeholder='Kash Jr.'
              value={childData.childFirstName}
              onChange={handleInputChange}
              onFocus={() => handleFocus('childFirstName')}
              onBlur={() => handleBlur('childFirstName')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.childFirstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Last Name Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="childLastName" className="block text-gray-700 font-semibold mb-2">
            Last Name
          </label>
          <div className="relative">
            {error.childLastName && focusedFields.childLastName && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.childLastName}
              </div>
            )}
            <input
              type="text"
              id="childLastName"
              placeholder='Troveson'
              value={childData.childLastName}
              onChange={handleInputChange}
              onFocus={() => handleFocus('childLastName')}
              onBlur={() => handleBlur('childLastName')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.childLastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>
        </div>
        {/* Username Input */}
        <div className="mb-4 relative">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <div className="relative">
            {error.username && focusedFields.username && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.username}
              </div>
            )}
            <input
              type="text"
              id="username"
              placeholder='kash_troveson'
              value={childData.username}
              onChange={handleInputChange}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
            <p className="text-gray-500 text-sm mt-1">This information will be displayed.</p>
          </div>
        </div>
        
        <div className='flex flex-col md:flex-row gap-0 md:gap-5 justify-between'>
        {/* PIN Number Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="pin" className="block text-gray-700 font-semibold mb-2">
            PIN Number
          </label>
          <div className="relative">
            {error.pin && focusedFields.pin && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.pin}
              </div>
            )}
            <input
              type="password"
              id="pin"
              value={childData.pin}
              onChange={handleInputChange}
              onFocus={() => handleFocus('pin')}
              onBlur={() => handleBlur('pin')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.pin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              maxLength={4}
            />
          </div>
        </div>

        {/* Confirm PIN Number Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="confirmPin" className="block text-gray-700 font-semibold mb-2">
            Confirm PIN Number
          </label>
          <div className="relative">
            {error.confirmPin && focusedFields.confirmPin && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.confirmPin}
              </div>
            )}
            <input
              type="password"
              id="confirmPin"
              value={childData.confirmPin}
              onChange={handleInputChange}
              onFocus={() => handleFocus('confirmPin')}
              onBlur={() => handleBlur('confirmPin')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.confirmPin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              maxLength={4}
            />
          </div>
        </div>
        </div>
        {/* Starting Balance Input */}
        <div className="mb-4 relative">
          <label htmlFor="startingBalance" className="block text-gray-700 font-semibold mb-2">
            Starting Balance
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              id="startingBalance"
              value={childData.startingBalance}
              onChange={handleInputChange}
              onFocus={() => handleFocus('startingBalance')}
              onBlur={() => handleBlur('startingBalance')}
              className={`w-full pl-8 pr-20 py-3 rounded-lg border ${
                error.startingBalance ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              min="10"
              step="0.01"
              placeholder="10.00"
            />
            <div className="absolute right-3 flex items-center">
              <select
                id="currency"
                value={childData.currency}
                onChange={(e) => setChildData({ ...childData, currency: e.target.value })}
                className="bg-transparent focus:outline-none"
              >
                <option value="USD">USD</option>
                {/* We will add other currencies if needed */}
              </select>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            This is {childData.childFirstName || "your child's"} starting balance.
          </p>
        </div>

        <div className='flex justify-between gap-4 mt-7'>
{/* Back Button */}
<button
    type="button"
    onClick={prevStep}
    className="w-full py-3 rounded-lg bg-transparent border-[1px] border-gray-200 text-gray-600 font-semibold hover:bg-gray-200 transition ease-in-out duration-300"
  >
    Back
  </button>
        {/* Get Started Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Next
        </button>
        </div>
      </form>

    </div>
  );
};

export default ChildAccountSetup;
