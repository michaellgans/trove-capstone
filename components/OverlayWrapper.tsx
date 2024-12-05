'use client';

import React from "react";
import { usePathname } from "next/navigation";

const OverlayWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Check if the current route requires a modal
  const isModalRoute = ["/login", "/login/email"].includes(pathname);

  return (
    <div className={`relative ${isModalRoute ? "overflow-hidden" : ""}`}>
      {isModalRoute && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-40 pointer-events-none" />
      )}
      {children}
    </div>
  );
};

export default OverlayWrapper;
