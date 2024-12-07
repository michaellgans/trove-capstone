import React from 'react';

interface IconProps {
  className?: string; // Allow custom styles
}

const AddIcon: React.FC<IconProps> = ({ className = 'h-6 w-6 text-gray-800' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 4v16m8-8H4" />
  </svg>
);

export default AddIcon;
