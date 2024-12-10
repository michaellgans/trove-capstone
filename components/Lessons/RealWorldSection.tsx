import React from 'react';

type RealWorldSectionProps = {
  descriptiveText: string[];
  keywords: { term: string; definition: string }[];
};

const RealWorldSection: React.FC<RealWorldSectionProps> = ({ descriptiveText, keywords }) => {
  // Highlight function
  const highlightKeywords = (text: string) => {
    const regex = new RegExp(
      `\\b(${keywords.map((k) => `${k.term}(s)?`).join('|')})\\b`,
      'gi'
    );
    return text.replace(
      regex,
      (matched) => `<span class="text-brightBlue font-bold">${matched}</span>`
    );
  };

  return (
    <div className="mb-8 px-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">What is it in the Real World?</h2>
      <div className="w-[270px] md:w-[310px] h-[4px] mb-4">
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
            <p
              key={index}
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: highlightKeywords(paragraph) }}
            ></p>
          ))}
        </div>
        <div className='flex items-center justify-center h-[20dvh] md:h-auto'>
          <img
            src="/images/real-world-examples.png"
            alt="Illustration"
            className="max-h-full max-w-full h-full md:h-auto md:w-1/2 object-contain md:scale-95"
          />
        </div>
      </div>
    </div>
  );
};

export default RealWorldSection;
