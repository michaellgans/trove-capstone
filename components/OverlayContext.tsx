'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the shape of your overlay context
interface OverlayContextProps {
  isOverlayActive: boolean;
  setOverlayActive: (state: boolean) => void;
  currentPage: 'landing' | 'home';
  setCurrentPage: (page: 'landing' | 'home') => void;
}

// Create the context
const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

// Provide the context to the app
export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [currentPage, setCurrentPage] = useState<'landing' | 'home'>('landing');

  return (
    <OverlayContext.Provider
      value={{
        isOverlayActive,
        setOverlayActive: setIsOverlayActive,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

// Custom hook to access overlay context
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};
