import React from 'react';

type TitleSectionProps = {
  childName: string;
};

const TitleSection: React.FC<TitleSectionProps> = ({ childName }) => {
  return (
    <div className="w-full flex flex-col items-start">
      <h1 className="text-[#090A05] text-center font-['Darker Grotesque'] text-3xl md:text-4xl font-medium">
        {childName}
      </h1>
      {/* Underline */}
      <div className="w-[180px] h-[4px] mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="4"
          viewBox="0 0 180 4"
          fill="none"
        >
          <rect x="0" width="60" height="4" fill="#FE3302" />
          <rect x="60" width="60" height="4" fill="#FEC001" />
          <rect x="120" width="60" height="4" fill="#0255EE" />
        </svg>
      </div>
    </div>
  );
};

export default TitleSection;
