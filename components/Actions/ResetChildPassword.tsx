'use client';
import React, { useState, useEffect, useRef } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';

const ResetChildPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [focusedFields, setFocusedFields] = useState({
    username: false,
    newPassword: false,
    confirmNewPassword: false,
    currentPassword: false,
  });
  const [errors, setErrors] = useState({
    username: '',
    newPassword: '',
    confirmNewPassword: '',
    currentPassword: '',
  });

  const router = useRouter();

  const handleFocus = (field: keyof typeof focusedFields) => {
    setFocusedFields({ ...focusedFields, [field]: true });
  };

  const handleBlur = (field: keyof typeof focusedFields) => {
    setFocusedFields({ ...focusedFields, [field]: false });
  };

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

    let isValid = true;
    const newErrors = { username: '', newPassword: '', confirmNewPassword: '', currentPassword: '' };

    if (username.trim() === '') {
      newErrors.username = 'Child username is required';
      isValid = false;
    }

    if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
      isValid = false;
    }

    if (currentPassword.length < 6) {
      newErrors.currentPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    alert(`Password for ${username} has been reset`);
    setUsername('');
    setNewPassword('');
    setConfirmNewPassword('');
    setCurrentPassword('');
    setErrors({ username: '', newPassword: '', confirmNewPassword: '', currentPassword: '' });
  };

  return (
    <div
    ref={cardRef}
    className="flex flex-col items-center bg-white p-10 sm:rounded-lg border border-gray-100 shadow-lg max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-0 sm:mt-10">
      <LogoTitle />

      {/* Heading */}
      <h2 className="text-xl font-semibold text-mediumGreen mb-6">Reset Child Password</h2>

      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* Username Input */}
        <div className="mb-4 relative">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            Child Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => handleFocus('username')}
            onBlur={() => handleBlur('username')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
            } focus:outline-none focus:ring-2`}
            placeholder="Enter child's username"
          />
          {errors.username && focusedFields.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        {/* New Password and Confirm New Password */}
        <div className="flex flex-col md:flex-row gap-0 md:gap-5 justify-between">
          {/* New Password Input */}
          <div className="mb-4 relative w-full md:w-[50%]">
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleFocus('newPassword')}
              onBlur={() => handleBlur('newPassword')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.newPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2`}
            />
            {errors.newPassword && focusedFields.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm New Password Input */}
          <div className="mb-4 relative w-full md:w-[50%]">
            <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onFocus={() => handleFocus('confirmNewPassword')}
              onBlur={() => handleBlur('confirmNewPassword')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.confirmNewPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2`}
            />
            {errors.confirmNewPassword && focusedFields.confirmNewPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>
            )}
          </div>
        </div>

        {/* Current Password */}
        <div className="mb-4 relative">
          <label htmlFor="currentPassword" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            onFocus={() => handleFocus('currentPassword')}
            onBlur={() => handleBlur('currentPassword')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.currentPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
            } focus:outline-none focus:ring-2`}
            placeholder="Enter your current password"
          />
          {errors.currentPassword && focusedFields.currentPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
          )}
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Reset Password
        </button>
        {/* Cancel Button */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push('/settings')}
            className="text-sm text-gray-500 hover:text-gray-600 transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetChildPassword;
