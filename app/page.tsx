'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import "./globals.css";
import { Slider } from "@/components/Slider/Slider";

// import Kash_Flying from '@/public/images/Kash_Flying.png';
// import Kash_Pointing from '@/public/images/Kash_Pointing_Cropped.png';
// import Kash_Walking from '@/public/images/Kash_Walking.png';

// export default function Home() {
//   const [currentIndex, setCurrentIndex] = useState(1); // Start from the first real slide
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const sliderRef = useRef<HTMLDivElement | null>(null);
//   const isResettingRef = useRef(false);

//   const slides = [
//     {
//       id: "gradial-fly",
//       header: "Trove On The Go",
//       description:
//         "With the Trove Mobile App, it's easy to request or send their sibling money or they can request a loan from you for something they can't currently afford.",
//       buttonText: "Download the App!",
//       image: Kash_Flying,
//       imageAlt: "Kash Flying",
//       textAlign: "text-center items-center md:text-right md:items-end",
//       reverseLayout: true,
//       phoneIcon: true,
//     },
//     {
//       id: "gradial-point",
//       header: "What Is Trove",
//       description:
//         "With Trove, your child can learn financial literacy and critical life skills like how to create a savings account, what it means to borrow money, and even what taxes are in a safe environment.",
//       buttonText: "Get Started Today!",
//       image: Kash_Pointing,
//       imageAlt: "Kash Pointing",
//       textAlign: "text-center items-center md:text-left md:items-start",
//       reverseLayout: false,
//     },
//     {
//       id: "gradial-walk",
//       header: "Money Management",
//       description:
//         "Once you've created your Trove Account, keeping track of which child did what chore and how much allowance each one gets just got a whole lot easier.",
//       buttonText: "Start Managing Money!",
//       image: Kash_Walking,
//       imageAlt: "Kash Walking",
//       textAlign: "text-center items-center md:text-left md:items-start",
//       reverseLayout: false,
//       flipImage: true,
//     },
//   ];
//   const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
//   useEffect(() => {
//     // Ensure smooth transitions are restored after resetting position
//     if (!isResettingRef.current) {
//       sliderRef.current!.style.transition = "transform 0.7s ease-in-out";
//     }
//   }, [currentIndex]);
  
//   useEffect(() => {
//     const handleTransitionEnd = () => {
//       if (currentIndex === 0) {
//         setTimeout(() => {
//           sliderRef.current!.style.transition = "none";
//           setCurrentIndex(slides.length); // Move to last real slide
//         }, 20); // Small delay to allow CSS transition to reset
//       } else if (currentIndex === extendedSlides.length - 1) {
//         setTimeout(() => {
//           sliderRef.current!.style.transition = "none";
//           setCurrentIndex(1); // Move to first real slide
//         }, 10);
//       }
//       setIsTransitioning(false);
//     };

//     sliderRef.current!.addEventListener("transitionend", handleTransitionEnd);
//     return () =>
//       sliderRef.current!.removeEventListener("transitionend", handleTransitionEnd);
//   }, [currentIndex, slides.length, extendedSlides.length]);
  
  

//   const handleNext = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//   };
  
//   const handlePrev = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrentIndex((prevIndex) => prevIndex - 1);
//   };
  

//   return (
//     <div className="relative w-full h-screen overflow-hidden group"
//     >
//       {/* Slide container */}
//       <div
//       ref={sliderRef}
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`,
//         }}
//       >
//         {extendedSlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             id={slide.id}
//             className={`relative flex-shrink-0 w-full py-5 md:py-0 flex px-10 xl:px-20 ${
//               slide.reverseLayout ? "flex-col-reverse md:flex-row-reverse" : "flex-col-reverse md:flex-row"
//             } justify-evenly items-center`}
//           >
//             {/* Left or Right words Content */}
//             <div
//               className={`w-full lg:w-1/2 flex flex-col justify-center px-0 md:px-6 ${slide.textAlign}`}
//             >
//               <header className="font-bold text-3xl md:text-4xl lg:text-5xl text-text mb-4">
//                 {slide.header}
//                 <div className="w-102 h-1 mt-2 mb-6 rounded-full overflow-hidden mx-auto flex">
//                   <div className="flex-1 bg-brightRed"></div>
//                   <div className="flex-1 bg-brightYellow"></div>
//                   <div className="flex-1 bg-brightBlue"></div>
//                 </div>
//               </header>
//               <p className="text-gray-600 font-normal text-lg md:text-xl lg:text-2xl">
//                 {slide.description}
//               </p>
//               <button className="flex items-center mt-10 justify-center rounded-lg bg-brightRed hover:brightness-110 font-bold border text-white text-xl lg:text-2xl px-4 py-2 transition duration-300 ease-in-out">
//                 {slide.phoneIcon && ( 
//                   <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor" 
//                   className="w-6 h-6 mr-2"
//                   >
//                   <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
//                   <path
//                     fillRule="evenodd"
//                     d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
//                     clipRule="evenodd"
//                   />
//                   </svg>
//                 )}
//                 <span>{slide.buttonText}</span>
//               </button>
//             </div>

//             <Image
//               src={slide.image}
//               alt={slide.imageAlt}
//               className={`w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 h-auto object-contain ${
//                 slide.flipImage ? "-scale-x-100" : ""
//               }`}
//             />
//             {/* Dots Navigation */}
//             <div className="w-1/2 absolute bottom-6 flex justify-start space-x-3 z-10">
//   {slides.map((_, dotIndex) => (
//     <div
//       key={dotIndex}
//       onClick={() => setCurrentIndex(dotIndex + 1)} // Adjusted for extendedSlides
//       className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${
//         currentIndex === dotIndex + 1 ? "bg-brightBlue" : "bg-gray-200"
//       }`}
//     ></div>
//   ))}
// </div>

//           </div>
//         ))}
//       </div>
      

//       <button
//         onClick={handlePrev}
//         className="absolute left-5 top-[30%] transform -translate-y-1/2 text-lg text-gray-400 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ transform: 'translateY(-50%) scaleY(6)' }}
//       >
//         &lt;
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-5 top-[30%] transform -translate-y-1/2 text-lg text-gray-400 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ transform: 'translateY(-50%) scaleY(6)' }}
//       >
//         &gt;
//       </button>
//     </div>
//   );
// }

export default function LandingPage() {
  return <Slider />;
}
