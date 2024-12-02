'use client';
import React, { useState } from 'react';
import LogoTitle from '../LogoTitle';
import ProgressIndicator from './ProgressIndicator';
import { ChildDataType } from '@/types/types';
import { useRouter } from 'next/navigation';
import '../../app/globals.css';

interface ChildAccountSetupProps {
  prevStep: () => void;
  nextStep: () => void;
  childData: ChildDataType[];
  setChildData: React.Dispatch<React.SetStateAction<ChildDataType[]>>;
}

const ChildAccountSetup: React.FC<ChildAccountSetupProps> = ({
  prevStep,
  nextStep,
  childData,
  setChildData,
}) => {
  // State for focused fields (indexed by child)
  const [focusedFields, setFocusedFields] = useState(
    childData.map(() => ({
      childFirstName: false,
      childLastName: false,
      username: false,
      pin: false,
      confirmPin: false,
      startingBalance: false,
    }))
  );

  // State for errors (indexed by child)
  const [errors, setErrors] = useState(
    childData.map(() => ({
      childFirstName: '',
      childLastName: '',
      username: '',
      pin: '',
      confirmPin: '',
      startingBalance: '',
    }))
  );

  // Handler for adding a new child form
  const addChildForm = () => {
    setChildData((prev) => [
      ...prev,
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

    setFocusedFields((prev) => [
      ...prev,
      {
        childFirstName: false,
        childLastName: false,
        username: false,
        pin: false,
        confirmPin: false,
        startingBalance: false,
      },
    ]);

    setErrors((prev) => [
      ...prev,
      {
        childFirstName: '',
        childLastName: '',
        username: '',
        pin: '',
        confirmPin: '',
        startingBalance: '',
      },
    ]);
  };

  // Handler for removing a child form
  const removeChildForm = (index: number) => {
    setChildData((prev) => prev.filter((_, i) => i !== index));
    setFocusedFields((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { id, value } = e.target;
    const updatedChildData = [...childData];
    updatedChildData[index] = { ...updatedChildData[index], [id]: value };
    setChildData(updatedChildData);
  };

  const handleFocus = (field: string, index: number) => {
    const updatedFocusedFields = [...focusedFields];
    updatedFocusedFields[index] = { ...updatedFocusedFields[index], [field]: true };
    setFocusedFields(updatedFocusedFields);
  };

  const handleBlur = (field: string, index: number) => {
    const updatedFocusedFields = [...focusedFields];
    updatedFocusedFields[index] = { ...updatedFocusedFields[index], [field]: false };
    setFocusedFields(updatedFocusedFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = childData.map((child, index) => {
      const error = {
        childFirstName: '',
        childLastName: '',
        username: '',
        pin: '',
        confirmPin: '',
        startingBalance: '',
      };

      // First Name validation
      if (child.childFirstName.trim() === '') {
        error.childFirstName = 'First name is required';
        isValid = false;
      }

      // Last Name validation
      if (child.childLastName.trim() === '') {
        error.childLastName = 'Last name is required';
        isValid = false;
      }

      // Username validation
      if (child.username.trim() === '') {
        error.username = 'Username is required';
        isValid = false;
      }

      // PIN validation (e.g., 4-digit number)
      const pinPattern = /^\d{4}$/;
      if (!pinPattern.test(child.pin)) {
        error.pin = 'PIN must be a 4-digit number';
        isValid = false;
      }

      // Confirm PIN validation
      if (child.confirmPin !== child.pin) {
        error.confirmPin = 'PINs do not match';
        isValid = false;
      }

      // Starting Balance validation (should be a number >= 10)
      const startingBalanceNum = parseFloat(child.startingBalance);
      if (isNaN(startingBalanceNum) || startingBalanceNum < 10) {
        error.startingBalance = 'Minimum starting balance is $10.00';
        isValid = false;
      }

      return error;
    });

    setErrors(newErrors);

    if (isValid) {
      // Proceed to the next step
      console.log('Child account setup completed');
      nextStep();
    }
  };

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const currencies = ['USD', 'EUR', 'GBP'];
  const router = useRouter();

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-5">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={2} totalSteps={3} />
      <LogoTitle />

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {childData.map((child, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-4 text-mediumGreen">
              Child {index + 1} Account Setup
            </h2>
            {index > 0 && (
                <button
                type="button"
                onClick={() => removeChildForm(index)}
                className="group text-brightYellow flex items-center lg:space-x-2 font-semibold bg-brightYellow bg-opacity-10 py-1.5 rounded-full px-2 lg:px-4 transition ease-in-out duration-300 hover:bg-opacity-25"
              >
                <span className="hidden lg:inline-block transition-all ease-in-out duration-300">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="size-4 mt-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              )}
              </div>
            <div className='flex flex-col md:flex-row gap-0 md:gap-5 justify-between'>
              {/* First Name Input */}
              <div className="mb-4 relative w-full md:w-[50%]">
                <label htmlFor="childFirstName" className="block text-gray-700 font-semibold mb-2">
                  First Name
                </label>
                <div className="relative">
                  {errors[index].childFirstName && focusedFields[index].childFirstName && (
                    <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                      {errors[index].childFirstName}
                    </div>
                  )}
                  <input
                    type="text"
                    id="childFirstName"
                    placeholder='Kash Jr.'
                    value={child.childFirstName}
                    onChange={(e) => handleInputChange(e, index)}
                    onFocus={() => handleFocus('childFirstName', index)}
                    onBlur={() => handleBlur('childFirstName', index)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[index].childFirstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
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
                  {errors[index].childLastName && focusedFields[index].childLastName && (
                    <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                      {errors[index].childLastName}
                    </div>
                  )}
                  <input
                    type="text"
                    id="childLastName"
                    placeholder='Troveson'
                    value={child.childLastName}
                    onChange={(e) => handleInputChange(e, index)}
                    onFocus={() => handleFocus('childLastName', index)}
                    onBlur={() => handleBlur('childLastName', index)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[index].childLastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
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
                {errors[index].username && focusedFields[index].username && (
                  <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                    {errors[index].username}
                  </div>
                )}
                <input
                  type="text"
                  id="username"
                  placeholder='kash_troveson'
                  value={child.username}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={() => handleFocus('username', index)}
                  onBlur={() => handleBlur('username', index)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors[index].username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                />
              </div>
            </div>

            {/* PIN and Confirm PIN Input */}
            <div className='flex flex-col md:flex-row gap-0 md:gap-5 justify-between'>
              {/* PIN Input */}
              <div className="mb-4 relative w-full md:w-[50%]">
                <label htmlFor="pin" className="block text-gray-700 font-semibold mb-2">
                  PIN Number
                </label>
                <input
                  type="password"
                  id="pin"
                  value={child.pin}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={() => handleFocus('pin', index)}
                  onBlur={() => handleBlur('pin', index)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors[index].pin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  maxLength={4}
                />
              </div>

              {/* Confirm PIN Input */}
              <div className="mb-4 relative w-full md:w-[50%]">
                <label htmlFor="confirmPin" className="block text-gray-700 font-semibold mb-2">
                  Confirm PIN Number
                </label>
                <input
                  type="password"
                  id="confirmPin"
                  value={child.confirmPin}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={() => handleFocus('confirmPin', index)}
                  onBlur={() => handleBlur('confirmPin', index)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors[index].confirmPin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  maxLength={4}
                />
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
                  value={child.startingBalance}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={() => handleFocus('startingBalance', index)}
                  onBlur={() => handleBlur('startingBalance', index)}
                  className={`w-full pl-8 pr-20 py-3 rounded-lg border ${
                    errors[index].startingBalance ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  min="10"
                  step="0.01"
                  placeholder="10.00"
                />
              {/* Currency Dropdown */}
            <div className="absolute right-1 flex items-center">
              <button
                type="button"
                className="flex items-center px-3 py-2 rounded-lg bg-white focus:outline-none"
                onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
              >
                <span>{selectedCurrency}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 ml-1 transition-transform duration-200 ${
                    isCurrencyDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {isCurrencyDropdownOpen && (
                <div className="absolute top-12 right-0 w-32 bg-white border rounded-lg shadow-lg z-10">
                  {currencies.map((currency) => (
                    <button
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      <span>{currency}</span>
                      {selectedCurrency === currency && (
                        <span className="ml-auto text-green-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Child Button */}
        <div className="flex justify-start mt-5">
          <button
            type="button"
            onClick={addChildForm}
            className="w-full md:w-auto py-3 px-7 rounded-lg bg-brightBlue bg-opacity-10 text-brightBlue font-semibold hover:bg-opacity-25 hover:brightness-110 transition ease-in-out duration-300"
          >
            + Add Child
          </button>
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

export default ChildAccountSetup;
