import React from 'react';

type KeywordsSectionProps = {
  keywords: { term: string; definition: string }[];
};

const KeywordsSection: React.FC<KeywordsSectionProps> = ({ keywords }) => {
  return (
    <div className="mb-8 bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Keywords</h2>
      <div className="w-[110px] md:w-[120px] h-[4px] mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keywords.map((keyword, index) => (
          <div key={index} className="mb-2">
            <strong className="text-brightBlue">{keyword.term}</strong> - {keyword.definition}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsSection;
