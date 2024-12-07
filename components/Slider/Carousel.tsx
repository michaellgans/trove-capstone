import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"; // Import pagination CSS
import { Slide } from "./Slide";
import { slides } from "./slides";

export const Carousel: React.FC = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]} // Use the correct modules
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }} // Auto-slide every 4 seconds
      loop={true} // Enables infinite looping
      slidesPerView={1} // Display one slide at a time

      speed={1000}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} >
          <Slide slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
