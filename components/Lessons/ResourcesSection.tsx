import React from 'react';
import Link from 'next/link';

type Resource = {
  title: string;
  url: string;
};

type ResourcesSectionProps = {
  resources: Resource[];
};

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Resources</h2>
      <div className="w-[110px] md:w-[130px] h-[4px] mb-4">
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
      <div className="space-y-4 space-x-0 md:space-x-4">
        {resources.map((resource, index) => (
          <Link
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-brightBlue bg-opacity-25 text-brightBlue font-medium rounded hover:bg-opacity-30 transition ease-in-out duration-300"
          >
            {resource.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
