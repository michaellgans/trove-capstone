import React from "react";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
}) => (
  <>
    <button
      onClick={onPrev}
        className="absolute left-5 top-[30%] transform -translate-y-1/2 text-lg text-gray-400 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ transform: 'translateY(-50%) scaleY(6)' }}
      >
        &lt;
      </button>
      <button
        onClick={onNext}
        className="absolute right-5 top-[30%] transform -translate-y-1/2 text-lg text-gray-400 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ transform: 'translateY(-50%) scaleY(6)' }}
      >
        &gt;
      </button>
  </>
);
