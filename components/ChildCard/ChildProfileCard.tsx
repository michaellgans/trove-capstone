'use client'
import React, { useState, useEffect } from 'react';
import TitleSection from '../TitleSection';
import ProfileImage from './ProfileImage';
import AccountBalance from './AccountBalance';
import ProgressCircle from './ProgressCircle';
import ActionButtons from './ActionButtons';
import { useSession } from 'next-auth/react';
import { getChildAccountByChildId, getLoanWhereChildIsBorrower } from '@/lib/server-actions';
import { Child_Account, Loans } from '@/types/types';
import { centsToDollars } from '@/lib/utils';

type Props = {
  child_id: string;
  childName: string;
  profileImageUrl: string | null | undefined;
};

const ChildProfileCard: React.FC<Props> = ({
  child_id,
  childName,
  profileImageUrl,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { data: session } = useSession();
  const [childAccountInfo, setChildAccountInfo] = useState<Child_Account>({id: "", checking_balance: 0, savings_balance: 0, savings_goal: 0, child_id: "", parent_id: ""});
  const [childLoanInfo, setChildLoanInfo] = useState<Loans>();

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    const fetchChildAccountInfo = async () => {
      if (session?.user.id) {
        console.log(child_id);
        const childAccount = await getChildAccountByChildId(child_id);
        setChildAccountInfo(childAccount[0]);
      }
    }

    const fetchChildLoanInfo = async () => {
      if (session?.user.id) {
        const childLoan = await getLoanWhereChildIsBorrower(child_id);
        setChildLoanInfo(childLoan[0]);
      }
    }

    fetchChildAccountInfo();
    fetchChildLoanInfo();
  }, [session?.user.id])

  return (
    <>
    <div className="flex flex-col self-center mx-auto justify-center items-start gap-3 p-10 max-w-md md:max-w-3xl lg:max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg">
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
            balance={centsToDollars(childAccountInfo.checking_balance)}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
            />

            {/* Trove Savings Account */}
            <AccountBalance
              label="Trove Savings Account:"
              balance={!childAccountInfo.savings_balance ? "N/A" : centsToDollars(childAccountInfo.savings_balance)}
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
            percentage={!childAccountInfo.savings_balance ? 0 : Math.floor((childAccountInfo.savings_balance / childAccountInfo.savings_goal!) * 100)}
            strokeColor="#4B701F"
            
          />

          {/* Loan Repayment Circle */}
          <ProgressCircle
            label="Loan Repayment"
            percentage={!childLoanInfo ? 0 : Math.floor((childLoanInfo.current_balance / childLoanInfo.loan_amount) * 100)}
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
