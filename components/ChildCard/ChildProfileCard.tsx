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
    <>
    <div className="flex flex-col self-center mx-5 md:mx-auto justify-center items-start gap-3 p-10 mx-w-md md:max-w-3xl lg:max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Title */}
      <TitleSection childName={childName} />

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full mt-5 md:space-x-5">
        {/* Left Section - Profile Image */}
        <div className="w-full md:w-3/2 flex flex-col md:flex-row lg:justify-center md:space-x-10">
          <div className='flex justify-center flex-shrink-0'>
            <ProfileImage profileImageUrl={profileImageUrl} />
          </div>
          {/* Middle Section - Account Balances */}
          <div className="flex mt-5 md:mt-0 flex-col justify-center">
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
        </div>



        {/* Right Section - Progress Circles */}
        <div className="w-full mt-5 lg:mt-0 lg:w-2/5 flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-center md:space-x-12 lg:space-x-5">
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
    </>
  );
};

export default ChildProfileCard;
