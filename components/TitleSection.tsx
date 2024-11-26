import React from 'react';

type TitleSectionProps = {
  childName: string;
};

const TitleSection: React.FC<TitleSectionProps> = ({ childName }) => {
  return (
    <div className="w-full flex flex-col items-start">
      <h1 className="text-[#090A05] text-center font-['Darker Grotesque'] text-[40px] font-medium">
        {childName}
      </h1>
      {/* Underline */}
      <div className="w-[159px] h-[4px] mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="159" height="4" viewBox="0 0 159 4" fill="none">
          <rect width="53" height="4" fill="#FE3302" />
          <rect x="53" width="53" height="4" fill="#FEC001" />
          <rect x="106" width="53" height="4" fill="#0255EE" />
        </svg>
      </div>
    </div>
  );
};

export default TitleSection;
