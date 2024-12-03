// Dropdown.tsx
import React from 'react';
import Image from 'next/image';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  image?: string;
}

interface DropdownProps {
  selectedValue: string;
  onSelect: (value: string) => void;
  options: Option[];
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedValue,
  onSelect,
  options,
  placeholder,
  isOpen,
  onToggle,
  className,
}) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    onToggle(); // Close the dropdown after selection
  };

  return (
    <div className={`relative ${className || ''}`}>
      <button
        type="button"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brightBlue"
        onClick={onToggle}
      >
        <span>{selectedValue || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              {option.image && (
                <Image src={option.image} alt={option.label} className="h-6 w-6 mr-2" width={24} height={24} />
              )}
              {option.icon && <span className="mr-2">{option.icon}</span>}
              <span>{option.label}</span>
              {selectedValue === option.value && (
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
  );
};

export default Dropdown;
