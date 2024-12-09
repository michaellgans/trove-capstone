'use client';
import React, { useState, useEffect, useRef } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';

const ResetPasswordCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [confirmEmailFocused, setConfirmEmailFocused] = useState(false);
  const [error, setError] = useState({ email: '', confirmEmail: '' });
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Close card when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        router.push('/home'); // Redirect or close the card
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^\S+@\S+\.\S+$/;
    const newError = { email: '', confirmEmail: '' };

    if (!emailPattern.test(email)) {
      newError.email = 'Enter a valid email address';
    }
    if (email !== confirmEmail) {
      newError.confirmEmail = 'Emails do not match';
    }

    if (newError.email || newError.confirmEmail) {
      setError(newError);
      return;
    }

    // Simulate sending reset link
    alert(`Password reset link sent to ${email}`);
    setEmail('');
    setConfirmEmail('');
    setError({ email: '', confirmEmail: '' });
  };

  return (
    <div
    ref={cardRef}
    className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md mx-auto mt-10">
      <LogoTitle />

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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder="kash@gmail.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                error.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Confirm Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="confirmEmail" className="block text-gray-700 font-semibold mb-2">
            Confirm Email
          </label>
          <div className="relative">
            {error.confirmEmail && confirmEmailFocused && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.confirmEmail}
              </div>
            )}
            <input
              type="email"
              id="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              onFocus={() => setConfirmEmailFocused(true)}
              onBlur={() => setConfirmEmailFocused(false)}
              placeholder="kash@gmail.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                error.confirmEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Send Reset Link
        </button>
        {/* Cancel Button */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push('/home')}
            className="text-sm text-gray-500 hover:text-gray-600 transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordCard;
