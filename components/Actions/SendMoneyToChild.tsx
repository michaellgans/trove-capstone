'use client';
import React, { useState, useEffect, useRef } from 'react';
import LogoTitle from '../LogoTitle';
import { useRouter } from 'next/navigation';
import FeedbackMessage from './FeedbackMessage';
import Dropdown from './Dropdown';
import { InterestRateIcon, TimeframeIcon, TaxIcon } from './Icons';
import '../../app/globals.css';

const SendMoneyToChildCard: React.FC = () => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [transactionType, setTransactionType] = useState('Transfer');
  const [selectedAccount, setSelectedAccount] = useState('Trove Checking Account 5555');
  const [amount, setAmount] = useState('');
  const [selectedChild, setSelectedChild] = useState('Chris');
  const [description, setDescription] = useState('');
  const [transactionStatus, setTransactionStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

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

  const currencies = ['USD', 'EUR', 'GBP'];
  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const transactionTypes = [
    { value: 'Transfer', label: 'Transfer' },
    { value: 'Create Loan', label: 'Create Loan' },
    { value: 'Transfer With Withholdings', label: 'Transfer With Withholdings' },
  ];

  const interestRates = [
    { value: '5%', label: '5%', icon: <InterestRateIcon /> },
    { value: '10%', label: '10%', icon: <InterestRateIcon /> },
    { value: '20%', label: '20%', icon: <InterestRateIcon /> },
  ];

  const timeframes = [
    { value: '1 week', label: '1 week', icon: <TimeframeIcon /> },
    { value: '2 weeks', label: '2 weeks', icon: <TimeframeIcon /> },
    { value: '1 month', label: '1 month', icon: <TimeframeIcon /> },
  ];

  const taxRates = [
    { value: '5%', label: '5%', icon: <TaxIcon /> },
    { value: '10%', label: '10%', icon: <TaxIcon /> },
    { value: '20%', label: '20%', icon: <TaxIcon /> },
  ];

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

  const checkingAccountOptions = checkingAccounts.map((account) => ({
    value: account.name,
    label: account.name,
    image: account.avatar,
  }));

  const familyMemberOptions = familyMembers.map((member) => ({
    value: member.name,
    label: member.name,
    image: member.avatar,
  }));

  const [interestRate, setInterestRate] = useState(interestRates[0].value);
  const [timeframe, setTimeframe] = useState(timeframes[0].value);
  const [taxRate, setTaxRate] = useState(taxRates[0].value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!transactionType) newErrors.transactionType = 'All fields must be filled';
    if (!selectedAccount) newErrors.selectedAccount = 'All fields must be filled';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'All fields must be filled';
    if (!selectedChild) newErrors.selectedChild = 'All fields must be filled';

    if (transactionType === 'Create Loan') {
      if (!interestRate) newErrors.interestRate = 'All fields must be filled';
      if (!timeframe) newErrors.timeframe = 'All fields must be filled';
    }

    if (transactionType === 'Transfer With Withholdings' && !taxRate) {
      newErrors.taxRate = 'All fields must be filled';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setTransactionStatus('success');
    setTransactionType('Transfer');
    setSelectedAccount('Trove Checking Account 5555');
    setAmount('');
    setSelectedChild('Chris');
    setDescription('');
    setInterestRate(interestRates[0].value); // Reset to first value
    setTimeframe(timeframes[0].value); // Reset to first value
    setTaxRate(taxRates[0].value); // Reset to first value
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleTransactionTypeChange = (value: string) => {
    setTransactionType(value);
    if (value === 'Create Loan') {
      setInterestRate(interestRates[0].value);
      setTimeframe(timeframes[0].value);
    } else if (value === 'Transfer With Withholdings') {
      setTaxRate(taxRates[0].value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, transactionType: '' }));
  };

  return (
    <div
    ref={cardRef}
    className="flex flex-col items-center bg-white p-10 lg:p-14 rounded-lg border border-gray-100 shadow-lg max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10">
      <LogoTitle />
      {transactionStatus ? (
        <FeedbackMessage
          status={transactionStatus}
          message="Transaction Successful!"
          onClose={() => router.push('/')}
          onBack={() => setTransactionStatus(null)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="w-full" noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
            {errors.transactionType && (
              <div className="text-red-500 mb-2">{errors.transactionType}</div>
            )}
            <Dropdown
              selectedValue={transactionType}
              onSelect={handleTransactionTypeChange}
              options={transactionTypes}
              isOpen={openDropdown === 'transactionType'}
              onToggle={() => handleDropdownToggle('transactionType')}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Send From</label>
            {errors.selectedAccount && (
              <div className="text-red-500 mb-2">{errors.selectedAccount}</div>
            )}
            <Dropdown
              selectedValue={selectedAccount}
              onSelect={(value) => {
                setSelectedAccount(value);
                setErrors((prevErrors) => ({ ...prevErrors, selectedAccount: '' }));
              }}
              options={checkingAccountOptions}
              isOpen={openDropdown === 'sendFrom'}
              onToggle={() => handleDropdownToggle('sendFrom')}
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            {errors.amount && <div className="text-red-500 mb-2">{errors.amount}</div>}
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-500">
                {currencySymbols[selectedCurrency]}
              </span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-28 py-3 rounded-lg border ${
                  errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
                } focus:outline-none focus:ring-2`}
                placeholder="0.00"
              />
              <div className="absolute -right-1">
                <Dropdown
                  selectedValue={selectedCurrency}
                  onSelect={(value) => {
                    setSelectedCurrency(value);
                    setErrors((prevErrors) => ({ ...prevErrors, currency: '' }));
                  }}
                  options={currencies.map((currency) => ({
                    value: currency,
                    label: currency,
                  }))}
                  placeholder="Select"
                  isOpen={openDropdown === 'currency'}
                  onToggle={() => handleDropdownToggle('currency')}
                  className="border-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Send To</label>
            {errors.selectedChild && (
              <div className="text-red-500 mb-2">{errors.selectedChild}</div>
            )}
            <Dropdown
              selectedValue={selectedChild}
              onSelect={(value) => {
                setSelectedChild(value);
                setErrors((prevErrors) => ({ ...prevErrors, selectedChild: '' }));
              }}
              options={familyMemberOptions}
              isOpen={openDropdown === 'sendTo'}
              onToggle={() => handleDropdownToggle('sendTo')}
            />
          </div>

          {transactionType === 'Create Loan' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Interest Rate</label>
                {errors.interestRate && (
                  <div className="text-red-500 mb-2">{errors.interestRate}</div>
                )}
                <Dropdown
                  selectedValue={interestRate}
                  onSelect={(value) => {
                    setInterestRate(value);
                    setErrors((prevErrors) => ({ ...prevErrors, interestRate: '' }));
                  }}
                  options={interestRates}
                  isOpen={openDropdown === 'interestRate'}
                  onToggle={() => handleDropdownToggle('interestRate')}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Timeframe</label>
                {errors.timeframe && (
                  <div className="text-red-500 mb-2">{errors.timeframe}</div>
                )}
                <Dropdown
                  selectedValue={timeframe}
                  onSelect={(value) => {
                    setTimeframe(value);
                    setErrors((prevErrors) => ({ ...prevErrors, timeframe: '' }));
                  }}
                  options={timeframes}
                  isOpen={openDropdown === 'timeframe'}
                  onToggle={() => handleDropdownToggle('timeframe')}
                />
              </div>
            </>
          )}

          {transactionType === 'Transfer With Withholdings' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Taxes</label>
              {errors.taxRate && <div className="text-red-500 mb-2">{errors.taxRate}</div>}
              <Dropdown
                selectedValue={taxRate}
                onSelect={(value) => {
                  setTaxRate(value);
                  setErrors((prevErrors) => ({ ...prevErrors, taxRate: '' }));
                }}
                options={taxRates}
                isOpen={openDropdown === 'taxes'}
                onToggle={() => handleDropdownToggle('taxes')}
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brightBlue"
            />
          </div>

          <button
            type="submit"
            className="bg-brightRed w-full py-3 rounded-lg text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
          >
            Send
          </button>
          {/* Cancel Button */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-sm text-gray-500 hover:text-gray-600 transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </div>
        </form>
      )}
    </div>
  );
};

export default SendMoneyToChildCard;
