'use client';
import React, { useState } from 'react';
import TitleSection from '../TitleSection';
import ProfileImage from './ProfileImage';
import AccountBalance from './AccountBalance';
import ProgressCircle from './ProgressCircle';
import ActionButtons from './ActionButtons';

type Props = {
  childName: string;
  profileImageUrl: string;
  checkingBalance: number;
  savingsBalance: number;
  savingsGoalPercentage: number;
  loanRepaymentPercentage: number;
};

const ChildProfileCard: React.FC<Props> = ({
  childName,
  profileImageUrl,
  checkingBalance,
  savingsBalance,
  savingsGoalPercentage,
  loanRepaymentPercentage,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <div className="flex flex-col mx-5 lg:mx-auto mt-10 justify-center items-start gap-3 p-10 lg:max-w-6xl bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Title */}
      <TitleSection childName={childName} />

      {/* Content */}
      <div className="flex w-full mt-5 space-x-5">
        {/* Left Section - Profile Image */}
        <div className="w-1/5 flex justify-center">
          <ProfileImage profileImageUrl={profileImageUrl} />
        </div>

        {/* Middle Section - Account Balances */}
        <div className="w-2/5 flex flex-col justify-center px-5">
          {/* Trove Checking Account */}
          <AccountBalance
            label="Trove Checking Account:"
            balance={checkingBalance}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
          />

          {/* Trove Savings Account */}
          <AccountBalance
            label="Trove Savings Account:"
            balance={savingsBalance}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
          />
        </div>

        {/* Right Section - Progress Circles */}
        <div className="w-2/5 flex items-center justify-center space-x-5">
          {/* Savings Goal Circle */}
          <ProgressCircle
            label="Savings Goal"
            percentage={savingsGoalPercentage}
            strokeColor="#4B701F"
            
          />

          {/* Loan Repayment Circle */}
          <ProgressCircle
            label="Loan Repayment"
            percentage={loanRepaymentPercentage}
            strokeColor="#0255EE"
            
          />
        </div>
      </div>

      {/* Buttons */}
      <ActionButtons />
    </div>
  );
};

export default ChildProfileCard;
