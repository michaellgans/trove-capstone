import React from 'react';

type ProgressCircleProps = {
  label: string;
  percentage: number;
  strokeColor: string;
  svgPaths: {
    base: string;
    progress: string;
  };
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ label, percentage, strokeColor, svgPaths }) => {
  return (
    <div className="relative">
      {/* SVG Circle */}
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 161 161" fill="none">
        <path
          d={svgPaths.base}
          stroke="#F3F3F1"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Progress Path */}
        <path
          d={svgPaths.progress}
          stroke={strokeColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="100"
          strokeDashoffset={`${100 - percentage}`}
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
