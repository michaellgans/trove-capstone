import React from 'react';

type ProgressCircleProps = {
  label: string;
  percentage: number;
  strokeColor: string;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ label, percentage, strokeColor }) => {
  const size = 160; // Size of the SVG element
  const strokeWidth = 16; // Width of the circle stroke
  const center = size / 2; // Center point of the circle
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the strokeDashoffset based on the percentage
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#F3F3F1"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`} // Rotate to start from top
        />
      </svg>
      {/* Percentage Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
