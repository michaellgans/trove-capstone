import React, { useEffect, useRef, useState } from 'react';

type TitleSectionProps = {
  childName: string;
};

const TitleSection: React.FC<TitleSectionProps> = ({ childName }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [underlineWidth, setUnderlineWidth] = useState(240); // Default minimum width
  const [extraWidth, setExtraWidth] = useState(15); // Default extra width for desktop

  useEffect(() => {
    if (titleRef.current) {
      // Measure the rendered width of the title
      const titleWidth = titleRef.current.getBoundingClientRect().width;
      setUnderlineWidth(titleWidth); // Update the underline width
    }

    // Adjust extra width based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setExtraWidth(15); // Desktop
      } else if (window.innerWidth >= 768) {
        setExtraWidth(10); // Tablet
      } else {
        setExtraWidth(5); // Mobile
      }
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [childName]);

  return (
    <div className="w-full flex flex-col items-start">
      {/* Title */}
      <h1
        ref={titleRef}
        className="text-gray-800 text-center font-['Darker Grotesque'] text-[28px] md:text-[35px] font-medium"
      >
        {childName}
      </h1>

      {/* Dynamic Underline */}
      <div
        className="h-[4px] mt-2"
        style={{ width: `${Math.max(underlineWidth + extraWidth, 180)}px` }} // Add dynamic extra width
      >
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
};

export default TitleSection;
