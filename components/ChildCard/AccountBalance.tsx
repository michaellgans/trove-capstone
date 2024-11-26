import React, { useState } from 'react';

type AccountBalanceProps = {
  label: string;
  balance: number;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
};

const AccountBalance: React.FC<AccountBalanceProps> = ({
  label,
  balance,
  selectedCurrency,
  onCurrencyChange,
}) => {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const currencies = ['USD', 'EUR', 'GBP'];

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-500">$</span>
        <input
          type="number"
          value={balance}
          readOnly
          className="w-full pl-8 pr-28 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brightBlue focus:ring-opacity-50"
        />
        {/* Currency Dropdown */}
        <div className="absolute right-3 flex items-center">
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
                    onCurrencyChange(currency);
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
  );
};

export default AccountBalance;