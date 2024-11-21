'use client';
import React, { useState } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';

interface SignUpCardProps {
  nextStep: () => void;
  parentData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  setParentData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }>
  >;
}

const EmailSignupCard: React.FC<SignUpCardProps> = ({
  nextStep,
  parentData,
  setParentData,
}) => {
  const router = useRouter();
  // State for confirmPassword (since it's not part of parentData)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // State for focused fields
  const [focusedFields, setFocusedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  // State for errors
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setParentData({ ...parentData, [id]: value });
  };

  const handleFocus = (field: string) => {
    setFocusedFields({ ...focusedFields, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocusedFields({ ...focusedFields, [field]: false });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newError = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // First Name validation
    if (parentData.firstName.trim() === '') {
      newError.firstName = 'First name is required';
      isValid = false;
    }

    // Last Name validation
    if (parentData.lastName.trim() === '') {
      newError.lastName = 'Last name is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(parentData.email)) {
      newError.email = 'Enter a valid email address';
      isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(parentData.password)) {
      newError.password = 'Password must be at least 8 characters and include numbers and letters';
      isValid = false;
    }

    // Confirm Password validation
    if (confirmPassword !== parentData.password) {
      newError.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      // Handle successful form submission
      console.log('Form submitted successfully');
      nextStep(); // Move to the next step
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-10">
      {/* Logo and Title */}
      <LogoTitle />

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        <div className='flex flex-col md:flex-row gap-0 md:gap-5 justify-between'>
        {/* First Name Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
            First Name
          </label>
          <div className="relative">
            {error.firstName && focusedFields.firstName && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.firstName}
              </div>
            )}
            <input
              type="text"
              id="firstName"
              placeholder='Kash'
              value={parentData.firstName}
              onChange={handleInputChange}
              onFocus={() => handleFocus('firstName')}
              onBlur={() => handleBlur('firstName')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Last Name Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
            Last Name
          </label>
          <div className="relative">
            {error.lastName && focusedFields.lastName && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.lastName}
              </div>
            )}
            <input
              type="text"
              id="lastName"
              placeholder='Troveson'
              value={parentData.lastName}
              onChange={handleInputChange}
              onFocus={() => handleFocus('lastName')}
              onBlur={() => handleBlur('lastName')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>
        </div>
        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <div className="relative">
            {error.email && focusedFields.email && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.email}
              </div>
            )}
            <input
              type="email"
              id="email"
              value={parentData.email}
              placeholder="kash@gmail.com"
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-0 md:gap-5 justify-between'>
        {/* Password Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            {error.password && focusedFields.password && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.password}
              </div>
            )}
            <input
              type="password"
              id="password"
              value={parentData.password}
              onChange={handleInputChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4 relative w-full md:w-[50%]">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
            Confirm Password
          </label>
          <div className="relative">
            {error.confirmPassword && confirmPasswordFocused && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.confirmPassword}
              </div>
            )}
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>
        </div>
        
        <div className='flex justify-between gap-4 mt-7'>
          {/* Back Button */}
          <button
          onClick={() => router.push('/')}
            type="button"
            className="w-full py-3 rounded-lg bg-transparent border-[1px] border-gray-200 text-gray-600 font-semibold hover:bg-gray-200 transition ease-in-out duration-300"
          >
            Cancel
          </button>
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

export default EmailSignupCard;
