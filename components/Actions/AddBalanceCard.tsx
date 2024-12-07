'use client';
import React, { useState, useEffect, useRef } from 'react';
import LogoTitle from '../LogoTitle';
import Image from 'next/image';
import FeedbackMessage from './FeedbackMessage';
import { useRouter } from 'next/navigation';

const AddBalanceCard: React.FC = () => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [troveBalance, setTroveBalance] = useState('');
  const [stripeBalance, setStripeBalance] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState({ trove: false, stripe: false });
  const [transactionStatus, setTransactionStatus] = useState<'success' | 'error' | null>(null);

  // Trove Balance Input State
  const [selectedTroveCurrency, setSelectedTroveCurrency] = useState('USD');
  const [isTroveCurrencyDropdownOpen, setIsTroveCurrencyDropdownOpen] = useState(false);

  // Stripe Balance Input State
  const [selectedStripeCurrency, setSelectedStripeCurrency] = useState('USD');
  const [isStripeCurrencyDropdownOpen, setIsStripeCurrencyDropdownOpen] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP'];
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const troveDropdownRef = useRef<HTMLDivElement>(null);
  const stripeDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        troveDropdownRef.current &&
        !troveDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTroveCurrencyDropdownOpen(false);
      }

      if (
        stripeDropdownRef.current &&
        !stripeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStripeCurrencyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'trove' | 'stripe') => {
    const value = e.target.value;
    if (type === 'stripe') {
      setStripeBalance(value);
    } else if (type === 'trove') {
      setTroveBalance(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripeBalance || parseFloat(stripeBalance) <= 0 || !troveBalance) {
      setError('Please fill out all fields correctly before transferring.');
      return;
    }

    setTransactionStatus('success');
    setError('');
  };

  const handleBack = () => {
    setTransactionStatus(null);
  };

  const handleClose = () => {
    setTransactionStatus(null);
    window.location.href = '/';
  };

  return (
    <div
    ref={cardRef}
    className="flex flex-col items-center bg-white p-10 lg:p-14 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-10">
      <LogoTitle />

      {transactionStatus === 'success' && (
        <FeedbackMessage
          status="success"
          message="Transfer Successful!"
          onClose={handleClose}
          onBack={handleBack}
        />
      )}
      {transactionStatus === 'error' && (
        <FeedbackMessage
          status="error"
          message="Your transfer was not successful. Please try again."
          onClose={handleClose}
          onBack={handleBack}
        />
      )}

      {transactionStatus === null && (
        <>
          <div className="flex items-center justify-center space-x-5 mb-4">
            <Image src="/images/Trove_Logo.png" alt="Trove Logo" width={60} height={60} />
            <div className="flex flex-col items-center justify-center">
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
            <Image src="/images/Stripe.jpeg" className="rounded-full" alt="Stripe Logo" width={60} height={60} />
          </div>
          <button className="bg-[#635BFF] w-full lg:w-[80%] py-3 rounded-lg text-white flex items-center justify-center space-x-2 hover:brightness-110 transition ease-in-out duration-300 mb-5">
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
          <form onSubmit={handleSubmit} className="w-full" noValidate>
            <div className="mb-4 relative">
              <label htmlFor="troveBalance" className="block text-gray-700 font-semibold mb-2">
                Current Trove Account Balance
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">{currencySymbols[selectedTroveCurrency]}</span>
                <input
                  type="number"
                  id="troveBalance"
                  value={troveBalance}
                  onChange={(e) => handleInputChange(e, 'trove')}
                  className={`w-full pl-8 pr-20 py-3 rounded-lg border ${
                    error && !troveBalance ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    error && !troveBalance ? 'focus:ring-red-500' : 'focus:ring-brightBlue'
                  }`}
                  placeholder="100.00"
                />
                <div className="absolute right-3 flex items-center">
                  <button
                    type="button"
                    className="flex items-center px-3 py-2 bg-white rounded-lg focus:outline-none ms-3"
                    onClick={() => setIsTroveCurrencyDropdownOpen((prev) => !prev)}
                  >
                    <span>{selectedTroveCurrency}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ml-2 mt-0.5 transition-transform duration-200 ${
                        isTroveCurrencyDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isTroveCurrencyDropdownOpen && (
                    <div
                      ref={troveDropdownRef}
                      className="absolute top-12 -right-2.5 w-32 bg-white border rounded-lg shadow-lg z-10"
                    >
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          type="button"
                          onClick={() => {
                            setSelectedTroveCurrency(currency);
                            setIsTroveCurrencyDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                        >
                          <span>{currency}</span>
                          {selectedTroveCurrency === currency && (
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
              {error && !troveBalance && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="stripeBalance" className="block text-gray-700 font-semibold mb-2">
                Transfer from Stripe Account
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">{currencySymbols[selectedTroveCurrency]}</span>
                <input
                  type="number"
                  id="stripeBalance"
                  value={stripeBalance}
                  onChange={(e) => handleInputChange(e, 'stripe')}
                  className={`w-full pl-8 pr-20 py-3 rounded-lg border ${
                    error && !stripeBalance ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    error && !stripeBalance ? 'focus:ring-red-500' : 'focus:ring-brightBlue'
                  }`}
                  placeholder="10.00"
                />
                <div className="absolute right-3 flex items-center">
                  <button
                    type="button"
                    className="flex items-center px-3 py-2 bg-white rounded-lg focus:outline-none"
                    onClick={() => setIsStripeCurrencyDropdownOpen((prev) => !prev)}
                  >
                    <span>{selectedStripeCurrency}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ml-2 mt-0.5 transition-transform duration-200 ${
                        isStripeCurrencyDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isStripeCurrencyDropdownOpen && (
                    <div
                      ref={stripeDropdownRef}
                      className="absolute top-12 -right-2.5  w-32 bg-white border rounded-lg shadow-lg z-10"
                    >
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          type="button"
                          onClick={() => {
                            setSelectedStripeCurrency(currency);
                            setIsStripeCurrencyDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                        >
                          <span>{currency}</span>
                          {selectedStripeCurrency === currency && (
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
              {error && !stripeBalance && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="bg-brightRed w-full py-3 rounded-lg text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
            >
              Transfer
            </button>
            <div className="flex w-full justify-center">
              <button
                onClick={() => router.push('/')}
                className="mt-4 text-base text-gray-500 hover:text-gray-600 transition ease-in-out duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddBalanceCard;
