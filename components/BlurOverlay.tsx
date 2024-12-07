'use client';

import React from 'react';
import { useOverlay } from './OverlayContext';

const BlurOverlay = () => {
  const { isOverlayActive, modalContent } = useOverlay();

  return (
    <div
      className={`absolute inset-0 z-10 transition-opacity duration-300 ${
        isOverlayActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Black Blurry Background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Modal Content */}
      <div className="relative z-20 flex justify-center items-center h-full">
        {modalContent}
      </div>
    </div>
  );
};

export default BlurOverlay;
