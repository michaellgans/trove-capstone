import React from 'react';

type ConclusionSectionProps = {
  conclusion: string;
};

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ conclusion }) => {
  return (
    <div className="mb-8 px-5">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
  {/* Paragraph Section */}
  <div className="text-gray-800 text-base leading-relaxed md:col-span-2 lg:col-span-1">
    {conclusion}
  </div>

  {/* Image Section */}
  <div className="flex justify-center md:justify-end">
    <img
      src="/images/conclusion.avif"
      alt="conclusion"
      className="rounded-full w-full max-w-[200px] md:max-w-[150px] lg:max-w-[200px]"
    />
  </div>
</div>

    </div>
  );
};

export default ConclusionSection;
