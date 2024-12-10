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
    <div className="relative w-full">
    
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
