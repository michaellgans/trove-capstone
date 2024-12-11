'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import "./globals.css";
import { Carousel } from "@/components/Slider/Carousel";
import Image from 'next/image';


export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-[120px] h-[120px] rounded-full animate-spin">
          <div className="absolute inset-0 rounded-full border-[16px] border-solid border-t-[16px] border-t-brightBlue border-b-brightRed border-l-brightYellow"></div>
          <div className="absolute inset-3 rounded-full bg-white"></div>
        </div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return null;
  }

  if (status === 'unauthenticated') {
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
}
