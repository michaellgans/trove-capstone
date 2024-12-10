import React from 'react';

type ExamplesSectionProps = {
  example: string[];
  mathEquations: string[]; // Updated to string[]
  imageSrc?: string;
  imageAlt?: string;
  keywords: { term: string; definition: string }[];
};

const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  example,
  mathEquations,
  imageSrc,
  imageAlt,
  keywords
}) => {
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
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Examples</h2>
      <div className="w-[100px] md:w-[130px] h-[4px] mb-4">
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
      <div className="flex flex-col items-start space-y-6">
        {example.map((paragraph, index) => (
          <div key={index} className="w-full">
            <p 
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: highlightKeywords(paragraph) }}
            ></p>

            {/* Display the image and math equation between paragraphs */}
            {index === 0 && (
              <div className="flex flex-col md:flex-row justify-center items-center my-6">
                <div className='flex items-center justify-center'>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full max-w-[200px] md:max-w-[30%] mb-4"
                  />
                )}
                </div>
                <div className='flex flex-col items-center justify-center'>
                {mathEquations.map((math, i) => (
                  <div
                    key={i}
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2 text-center"
                  >
                    {math} {/* Directly render the string */}
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamplesSection;
