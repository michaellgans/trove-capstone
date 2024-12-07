import React from "react";

interface DotsNavigationProps {
  totalSlides: number;
  currentIndex: number;
  onClick: (index: number) => void;
}

export const DotsNavigation: React.FC<DotsNavigationProps> = ({
  totalSlides,
  currentIndex,
  onClick,
}) => (
  <div className="relative -mt-6 w-full flex justify-center space-x-3 carousel-pagination">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <div
        key={index}
        onClick={() => onClick(index + 1)}
        className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${
          currentIndex === index + 1 ? "bg-brightBlue" : "bg-gray-200"
        }`}
      ></div>
    ))}
  </div>
);