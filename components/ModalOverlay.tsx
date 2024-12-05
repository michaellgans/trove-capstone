'use client';
import React from "react";

interface ModalOverlayProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default ModalOverlay;
