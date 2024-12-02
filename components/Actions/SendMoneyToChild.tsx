'use client';
import React, { useState, useRef } from 'react';
import LogoTitle from '../LogoTitle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FeedbackMessage from './FeedbackMessage';

const SendMoneyToChildCard: React.FC = () => {
  const router = useRouter();
  const [account, setAccount] = useState('Trove Checking Account 5555');
  const [amount, setAmount] = useState('');
  const [selectedChild, setSelectedChild] = useState('Chris');
  const [selectedAccount, setSelectedAccount] = useState('Trove Checking Account 5555');
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const familyDropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const currencies = ['USD', 'EUR', 'GBP'];
  const currencySymbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' };
  const [transactionStatus, setTransactionStatus] = useState<'success' | 'error' | null>(null);

  const familyMembers = [
    { id: 1, name: 'All', avatar: '/images/all.svg' },
    { id: 2, name: 'Chris', avatar: '/images/avatar.svg' },
    { id: 3, name: 'Mei', avatar: '/images/avatar.svg' },
    { id: 4, name: 'Svitlana', avatar: '/images/avatar.svg' },
    { id: 5, name: 'Lee', avatar: '/images/avatar.svg' },
  ];

  const checkingAccounts = [
    { id: 1, name: 'Trove Checking Account 5555', avatar: '/images/money.svg' },
    { id: 2, name: 'Trove Checking Account 6666', avatar: '/images/money.svg' },
    { id: 3, name: 'Trove Checking Account 7777', avatar: '/images/money.svg' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(amount);

    if (isNaN(balanceNum) || balanceNum <= 0) {
      setTransactionStatus('error');
      setError('Your transfer was not successful. Please try again.');
      return;
    }

    setTransactionStatus('success');
    setError('');
  };

  const handleClose = () => {
    router.push('/');
  };

  const handleBack = () => {
    setTransactionStatus(null);
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 lg:p-14 rounded-lg border border-gray-100 shadow-lg max-w-md mx-auto mt-10">
      <LogoTitle />

      {/* Conditional Rendering Based on Transaction Status */}
      {transactionStatus !== null ? (
        <FeedbackMessage
          status={transactionStatus}
          message={
            transactionStatus === 'success'
              ? 'Transfer Successful!'
              : 'Your transfer was not successful. Please try again.'
          }
          onClose={handleClose}
          onBack={handleBack}
        />
      ) : (
        <form onSubmit={handleSubmit} className="w-full" noValidate>
          {/* Account Dropdown */}
          <div className="mb-4 relative" ref={accountDropdownRef}>
            <label htmlFor="account" className="block text-gray-700 font-semibold mb-2">
              Send From
            </label>
            <button
              type="button"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brightBlue focus:ring-opacity-50"
              onClick={() => setIsAccountDropdownOpen((prev) => !prev)}
            >
              <span>{selectedAccount}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className={`w-5 h-5 transition-transform ${
                  isAccountDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {isAccountDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
                {checkingAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => {
                      setSelectedAccount(account.name);
                      setIsAccountDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <Image src={account.avatar} alt="account" className="h-6 w-6 mr-2" width={40} height={40} />
                    <span>{account.name}</span>
                    {selectedAccount === account.name && (
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

          {/* Amount Input */}
          <div className="mb-4 relative">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-500">{currencySymbols[selectedCurrency]}</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleInputChange}
                className={`w-full pl-8 pr-28 py-3 rounded-lg border ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
                } focus:outline-none focus:ring-2`}
                placeholder="0.00"
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

          {/* Family Dropdown */}
          <div className="mb-4 relative" ref={familyDropdownRef}>
            <label htmlFor="sendTo" className="block text-gray-700 font-semibold mb-2">
              Send To
            </label>
            <button
              type="button"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brightBlue"
              onClick={() => setIsFamilyDropdownOpen((prev) => !prev)}
            >
              <span>{selectedChild}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className={`w-5 h-5 transition-transform ${
                  isFamilyDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {isFamilyDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
                {familyMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => {
                      setSelectedChild(member.name);
                      setIsFamilyDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <Image src={member.avatar} alt="avatar" className="h-6 w-6 mr-2" width={40} height={40} />
                    <span>{member.name}</span>
                    {selectedChild === member.name && (
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

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-brightRed w-full py-3 rounded-lg text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
          >
            Send Money
          </button>
        </form>
      )}
    </div>
  );
};

export default SendMoneyToChildCard;
