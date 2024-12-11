'use client';
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Slide } from "./Slide";
import { slides } from "./slides";
import "../../app/globals.css";

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    // Update current index based on the active slide
    setCurrentIndex(swiper.realIndex); // Use `realIndex` to handle looping correctly
  };

  const goToSlide = (index: number) => {
    const swiperEl = document.querySelector(".swiper") as HTMLElement & { swiper: any }; // Cast to include 'swiper'
    swiperEl?.swiper?.slideToLoop(index); // Navigate to the slide using its loop-safe index
  };
  

  return (
    <div className="carousel-wrapper relative bg-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        speed={1500}
        onSlideChange={handleSlideChange} // Sync index with active slide
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide
              slide={slide}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="wave-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1270 160"
          className="wave-svg"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,120L48,116C96,112,192,104,288,116C384,128,480,160,576,160C672,160,768,128,864,112C960,96,1056,96,1152,108C1248,120,1344,144,1392,156L1440,160L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
