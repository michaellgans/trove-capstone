import React from 'react';

type TitleSectionProps = {
  lessonName: string;
};

const TitleSection: React.FC<TitleSectionProps> = ({ lessonName }) => (
  <div className="w-full flex flex-col items-center mb-8">
    <h1 className="text-gray-800 text-center font-['Darker Grotesque'] text-[28px] md:text-[35px] font-medium">
      {lessonName}
    </h1>
    <div className="w-[140px] md:w-[180px] h-[4px] mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="4"
        viewBox="0 0 100 4"
        preserveAspectRatio="none"
        fill="none"
      >
        <rect x="0" width="33.3333" height="4" fill="#FE3302" />
        <rect x="33.3333" width="33.3333" height="4" fill="#FEC001" />
        <rect x="66.6666" width="33.3334" height="4" fill="#0255EE" />
      </svg>
    </div>
  </div>
);

export default TitleSection;
