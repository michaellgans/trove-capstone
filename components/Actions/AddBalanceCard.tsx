'use client';
import React, { useState } from 'react';
import LogoTitle from '../LogoTitle';
import Image from 'next/image';

const AddBalanceCard: React.FC = () => {
  const [troveBalance, setTroveBalance] = useState('');
  const [stripeBalance, setStripeBalance] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState({ trove: false, stripe: false });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'trove' | 'stripe') => {
    if (type === 'trove') {
      setTroveBalance(e.target.value);
    } else {
      setStripeBalance(e.target.value);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    let newError = '';

    // Validation
    const balanceNum = parseFloat(stripeBalance);
    if (isNaN(balanceNum) || balanceNum <= 0) {
      newError = 'Please enter a valid amount to transfer.';
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      // Proceed with the balance transfer
      console.log('Balance transfer initiated');
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 lg:p-14 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-10">
      {/* Logo Title */}
      <LogoTitle />

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
        className="bg-[#635BFF] w-full lg:w-[80%] py-3 rounded-lg text-white flex items-center justify-center space-x-2 hover:brightness-110 transition ease-in-out duration-300 mb-5"
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* Trove Balance Input */}
        <div className="mb-4 relative">
          <label htmlFor="troveBalance" className="block text-gray-700 font-semibold mb-2">
            Current Trove Account Balance
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              id="troveBalance"
              value={troveBalance}
              onChange={(e) => handleInputChange(e, 'trove')}
              onFocus={() => setFocused({ ...focused, trove: true })}
              onBlur={() => setFocused({ ...focused, trove: false })}
              className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="100.00"
              readOnly
            />
            <div className="absolute right-3 flex items-center">
              <select
                id="currency"
                className="bg-transparent focus:outline-none"
                disabled
              >
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stripe Balance Input */}
        <div className="mb-4 relative">
          <label htmlFor="stripeBalance" className="block text-gray-700 font-semibold mb-2">
            Transfer from Stripe Account
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="number"
              id="stripeBalance"
              value={stripeBalance}
              onChange={(e) => handleInputChange(e, 'stripe')}
              onFocus={() => setFocused({ ...focused, stripe: true })}
              onBlur={() => setFocused({ ...focused, stripe: false })}
              className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="0.00"
            />
            <div className="absolute right-3 flex items-center">
              <select
                id="currency"
                className="bg-transparent focus:outline-none"
                disabled
              >
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">How much would you like to add?</p>
          {error && focused.stripe && (
            <div className="text-red-500 text-xs mt-1">{error}</div>
          )}
        </div>

        {/* Transfer Button */}
        <button
          type="submit"
          className="bg-brightRed w-full py-3 rounded-lg text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Transfer
        </button>
      </form>
    </div>
  );
};

export default AddBalanceCard;
