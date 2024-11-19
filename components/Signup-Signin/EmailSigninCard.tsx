'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EmailSignInCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newError = { email: '', password: '' };

    // Improved email validation using regex
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      newError.email = 'Enter a valid email address';
      isValid = false;
    }

    if (password.length < 6) {
      newError.password = 'Wrong Password';
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      // Handle successful form submission
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md mx-auto mt-10">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex w-full">
          <Image
            src="/images/Trove_Logo.png"
            alt="Trove Logo"
            width={60}
            height={60}
            priority
            className="w-1/3"
          />
          <div className="text-6xl flex justify-center items-center w-2/3 font-basker text-gray-800 mt-4">
            Trove
          </div>
        </div>
        <p className="text-3xl font-basker text-gray-800 mt-2">Let's learn together.</p>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <div className="relative">
            {error.email && emailFocused && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.email}
              </div>
            )}
            <input
              type="email"
              placeholder="kash@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            {error.password && passwordFocused && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.password}
              </div>
            )}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link href="/forgot-password" passHref>
            <span className="hover:text-brightRed cursor-pointer text-gray-400">Forgot password?</span>
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Login
        </button>
        {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <span className="text-gray-700">Don't have an account? </span>
        <Link href="/signup/email" passHref>
          <span className="text-brightRed opacity-75 font-semibold hover:opacity-100 hover:brightness-105 cursor-pointer">Sign up now</span>
        </Link>
      </div>
      </form>
    </div>
  );
};

export default EmailSignInCard;
