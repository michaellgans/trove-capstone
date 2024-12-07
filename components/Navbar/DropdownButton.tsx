import React, { FC } from 'react';

interface DropdownButtonProps {
  label: string;
  onClick?: () => void;
  showIcon?: boolean;
  className?: string;
  isOpen?: boolean;
}

const DropdownButton: FC<DropdownButtonProps> = ({ label, onClick, showIcon = true, className = '', isOpen = false, }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center font-semibold space-x-1 text-gray-800 hover:text-brightGreen transition duration-300 ease-in-out ${className}`}
    >
      <span>{label}</span>
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-4 h-4 mt-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={
              isOpen
                ? 'm4.5 15.75 7.5-7.5 7.5 7.5' // "Up" arrow path
                : 'm19.5 8.25-7.5 7.5-7.5-7.5' // "Down" arrow path
            } />
        </svg>
      )}
    </button>
  );
};

export default DropdownButton;
