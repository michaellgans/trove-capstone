'use client';

import React, { createContext, useContext, useState } from 'react';

interface OverlayContextProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOverlayActive: boolean;
  setOverlayActive: (active: boolean) => void;
  modalContent: React.ReactNode;
  setModalContent: (content: React.ReactNode) => void;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

export const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState('landing'); // "landing" or "home"
  const [isOverlayActive, setOverlayActive] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  return (
    <OverlayContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isOverlayActive,
        setOverlayActive,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};
