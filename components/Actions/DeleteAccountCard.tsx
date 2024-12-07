'use client';
import React, { useState, useEffect, useRef } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';

const DeleteAccountCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmationFocused, setConfirmationFocused] = useState(false);
  const [error, setError] = useState({ email: '', password: '', confirmation: '' });
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Close card when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        router.push('/'); // Redirect or close the card
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
    const newError = { email: '', password: '', confirmation: '' };
    let isValid = true;

    if (!emailPattern.test(email)) {
      newError.email = 'Enter a valid email address';
      isValid = false;
    }
    if (password.length < 6) {
      newError.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (confirmationText !== 'DELETE MY TROVE') {
      newError.confirmation = 'You must type DELETE MY TROVE exactly';
      isValid = false;
    }

    if (!isValid) {
      setError(newError);
      return;
    }

    // Simulate account deletion
    alert('Your account has been deleted.');
    setEmail('');
    setPassword('');
    setConfirmationText('');
    setError({ email: '', password: '', confirmation: '' });
    router.push('/');
  };

  return (
    <div
    ref={cardRef}
    className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md mx-auto mt-10">
      <LogoTitle />
      {/* Title and Danger Zone */}
      <div className="text-center mb-4">
        <p className="text-brightRed font-semibold text-lg">Delete Account</p>
        <p className="text-brightRed opacity-70 mt-2">
          Danger Zone: Please confirm you want to delete your account!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
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
            } focus:outline-none focus:ring-2`}
          />
          {error.email && emailFocused && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className={`w-full px-4 py-3 rounded-lg border ${
              error.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
            } focus:outline-none focus:ring-2`}
          />
          {error.password && passwordFocused && (
            <p className="text-red-500 text-xs mt-1">{error.password}</p>
          )}
        </div>

        {/* Confirmation Input */}
        <div className="mb-4 relative">
          <label htmlFor="confirmation" className="block text-gray-700 font-semibold mb-2">
            Type: <span className="text-brightRed">DELETE MY TROVE</span> to Confirm
          </label>
          <input
            type="text"
            id="confirmation"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            onFocus={() => setConfirmationFocused(true)}
            onBlur={() => setConfirmationFocused(false)}
            className={`w-full px-4 py-3 rounded-lg border ${
              error.confirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
            } focus:outline-none focus:ring-2`}
          />
          {error.confirmation && confirmationFocused && (
            <p className="text-red-500 text-xs mt-1">{error.confirmation}</p>
          )}
        </div>

        {/* Delete Account Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountCard;
