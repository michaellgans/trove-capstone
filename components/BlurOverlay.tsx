'use client';

import React from 'react';
import { useOverlay } from './OverlayContext';

const BlurOverlay = () => {
  const { isOverlayActive } = useOverlay(); // Use isOverlayActive

  return (
    <div
      className={`absolute inset-0 z-10 transition-opacity duration-300 ${
        isOverlayActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Blurry Background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    </div>
  );
};

export default BlurOverlay;
