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
    <div className="flex flex-col mx-auto justify-center items-start gap-3 p-10 max-w-6xl bg-white border border-gray-200 rounded-lg shadow-lg">
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
            svgPaths={{
              base: 'M80.3333 8.5C89.7885 8.5 99.1511 10.3623 107.887 13.9807C116.622 17.599 124.559 22.9025 131.245 29.5883C137.931 36.2741 143.234 44.2114 146.853 52.9468C150.471 61.6822 152.333 71.0448 152.333 80.5C152.333 89.9552 150.471 99.3178 146.853 108.053C143.234 116.789 137.931 124.726 131.245 131.412C124.559 138.098 116.622 143.401 107.887 147.019C99.1511 150.638 89.7885 152.5 80.3333 152.5C70.8781 152.5 61.5155 150.638 52.7801 147.019C44.0446 143.401 36.1074 138.097 29.4216 131.412C22.7358 124.726 17.4323 116.789 13.814 108.053C10.1956 99.3177 8.33331 89.9551 8.33331 80.5C8.33332 71.0448 10.1957 61.6822 13.814 52.9468C17.4323 44.2113 22.7358 36.2741 29.4217 29.5883C36.1075 22.9025 44.0447 17.599 52.7801 13.9807C61.5156 10.3623 70.8782 8.49999 80.3334 8.5L80.3333 8.5Z',
              progress: 'M80.3333 8.5C95.5382 8.5 110.353 13.3136 122.654 22.2508C134.955 31.188 144.111 43.7901 148.809 58.2508C153.508 72.7115 153.508 88.2885 148.809 102.749C144.111 117.21 134.955 129.812 122.654 138.749',
            }}
          />

          {/* Loan Repayment Circle */}
          <ProgressCircle
            label="Loan Repayment"
            percentage={loanRepaymentPercentage}
            strokeColor="#0255EE"
            svgPaths={{
              base: 'M80 8.5C89.4552 8.5 98.8178 10.3623 107.553 13.9807C116.289 17.599 124.226 22.9025 130.912 29.5883C137.598 36.2741 142.901 44.2114 146.519 52.9468C150.138 61.6822 152 71.0448 152 80.5C152 89.9552 150.138 99.3178 146.519 108.053C142.901 116.789 137.597 124.726 130.912 131.412C124.226 138.098 116.289 143.401 107.553 147.019C98.8177 150.638 89.4552 152.5 80 152.5C70.5448 152.5 61.1822 150.638 52.4468 147.019C43.7113 143.401 35.7741 138.097 29.0883 131.412C22.4025 124.726 17.099 116.789 13.4807 108.053C9.86233 99.3177 8 89.9551 8 80.5C8 71.0448 9.86234 61.6822 13.4807 52.9468C17.099 44.2113 22.4025 36.2741 29.0883 29.5883C35.7742 22.9025 43.7114 17.599 52.4468 13.9807C61.1823 10.3623 70.5449 8.49999 80 8.5L80 8.5Z',
              progress: 'M80 8.5C97.1434 8.5 113.724 14.617 126.76 25.7508C139.796 36.8845 148.432 52.3044 151.114 69.2367C153.795 86.1691 150.348 103.503 141.39 118.12C132.433 132.737 118.554 143.678 102.249 148.976C85.9448 154.274 68.2852 153.58 52.4468 147.019C36.6083 140.459 23.6305 128.462 15.8475 113.187C8.06457 97.9124 5.98731 80.3617 9.98937 63.6919C13.9914 47.0222 23.8102 32.3274 37.6795 22.2508',
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <ActionButtons />
    </div>
  );
};

export default ChildProfileCard;
