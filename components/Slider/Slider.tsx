import React, { useState, useEffect, useRef } from "react";
import { Slide } from "./Slide";
import { DotsNavigation } from "./DotsNavigation";
import { NavigationButtons } from "./NavigationButtons";
import { slides } from "./slides";

export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with first real slide
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    if (sliderRef.current && !isTransitioning) {
      sliderRef.current.style.transition = "transform 0.7s ease-in-out";
    }
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === 0) {
        sliderRef.current!.style.transition = "none";
        setCurrentIndex(slides.length); // Jump to last real slide
      } else if (currentIndex === extendedSlides.length - 1) {
        sliderRef.current!.style.transition = "none";
        setCurrentIndex(1); // Jump to first real slide
      }
      setIsTransitioning(false);
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      }
    };
  }, [currentIndex, extendedSlides.length, slides.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden group">
      {/* Slide Container */}
      <div
        ref={sliderRef}
        className="flex"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <Slide key={index} slide={slide} />
        ))}
      </div>

      {/* Navigation Dots */}
      <DotsNavigation
        totalSlides={slides.length}
        currentIndex={currentIndex === slides.length + 1 ? 1 : currentIndex}
        onClick={(index) => {
          setCurrentIndex(index);
          setIsTransitioning(true);
        }}
      />

      {/* Navigation Buttons */}
      <NavigationButtons onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};
