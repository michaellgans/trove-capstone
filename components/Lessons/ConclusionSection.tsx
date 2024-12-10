import React from 'react';

type ConclusionSectionProps = {
  conclusion: string;
};

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ conclusion }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Conclusion</h2>
      <div className="w-[130px] md:w-[150px] h-[4px] mb-4">
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
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
        <div className="text-gray-800 text-base leading-relaxed w-full md:w-2/3 lg:w-4/5">
          {conclusion}
        </div>
      </div>
    </div>
  );
};

export default ConclusionSection;
