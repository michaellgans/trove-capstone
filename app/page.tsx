'use client'
import React from 'react';
import "./globals.css";
import { Carousel } from "@/components/Slider/Carousel";
import Image from 'next/image';


export default function LandingPage() {
  return (
    <>
    
    <Carousel />
    {/* Banner Image */}
    <div className="relative w-full mt-5">
      {/* Blurry Overlay */}
      <div className="absolute inset-x-0 top-0 h-[100px] md:h-[150px] lg:h-[200px] bg-gradient-to-b from-white via-white/70 to-transparent z-10 pointer-events-none"></div>
        <Image
          src="/images/advertisement_web.png"
          alt="Advertisement Banner"
          layout="responsive"
          width={1440}
          height={2235}
          priority
        />
      </div>
    </>
  )
}
