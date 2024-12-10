import React from 'react';

type RealWorldSectionProps = {
  descriptiveText: string[];
};

const RealWorldSection: React.FC<RealWorldSectionProps> = ({ descriptiveText }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">What is it in the Real World?</h2>
      <div className="w-[140px] md:w-[180px] h-[4px] mb-4">
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
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {descriptiveText.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <img
            src="/images/real-world-examples.png"
            alt="Illustration"
            className="w-full h-auto md:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default RealWorldSection;
