import React from 'react';

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
      <h2 className="text-lg font-semibold mb-4">Resources</h2>
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
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            {resource.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
