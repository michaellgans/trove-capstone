import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface SlideProps {
  slide: {
    id: string;
    header: string;
    description: string;
    buttonText: string;
    image: StaticImageData;
    imageAlt: string;
    textAlign: string;
    reverseLayout: boolean;
    flipImage?: boolean;
    phoneIcon?: boolean;
  };
  totalSlides: number;
  currentIndex: number;
  onPaginationClick: (index: number) => void;
}

export const Slide: React.FC<SlideProps> = ({ 
  slide,
  totalSlides,
  currentIndex,
  onPaginationClick,
 }) => (
  <div
    id={slide.id}
    className={`relative flex-shrink-0 w-full h-auto md:h-[630px] py-10 md:py-0 flex px-10 xl:px-20 ${
      slide.reverseLayout
        ? "flex-col-reverse md:flex-row-reverse"
        : "flex-col-reverse md:flex-row"
    } justify-evenly items-center`}
  >
    {/* Content */}
    <div
      className={`w-full lg:w-1/2 flex flex-col justify-center px-0 md:px-6 ${slide.textAlign}`}
    >
      <header className="font-bold text-3xl md:text-4xl lg:text-5xl text-text mb-4">
        {slide.header}
        <div className="w-102 h-1 mt-2 mb-6 rounded-full overflow-hidden mx-auto flex">
          <div className="flex-1 bg-brightRed"></div>
          <div className="flex-1 bg-brightYellow"></div>
          <div className="flex-1 bg-brightBlue"></div>
        </div>
      </header>
      <p className="text-gray-600 font-normal text-lg md:text-xl lg:text-2xl">
        {slide.description}
      </p>
      <button className="flex items-center mt-10 mb-5 justify-center rounded-lg bg-brightRed hover:brightness-110 font-bold border text-white text-xl lg:text-2xl px-4 py-2 transition duration-300 ease-in-out">
        {slide.phoneIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
            <path
              fillRule="evenodd"
              d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span>{slide.buttonText}</span>
      </button>
    </div>

    {/* Image */}
    <Image
      src={slide.image}
      alt={slide.imageAlt}
      className={`w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 h-auto object-contain ${
        slide.id === "gradial-point" ? "pb-10" : ""
      } ${
        slide.id === "gradial-walk" ? "-mt-3" : ""
      }
      lg:pt-6 ${
        slide.flipImage ? "-scale-x-100" : ""
      }`}
    />
  </div>
);
