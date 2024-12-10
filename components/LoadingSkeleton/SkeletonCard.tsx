const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col self-center mx-auto justify-center items-start gap-3 px-6 py-8 w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="w-[40%] h-10 skeleton-bg mb-5"></div>
      {/* Layout for large screens */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 w-full">
        {/* Left Column */}
        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="h-44 w-44 skeleton-circle"></div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="w-full h-52 skeleton-bg"></div>
        </div>

        {/* Right Column */}
        <div className="flex flex-row items-center space-x-6 w-full">
        <div className="h-32 w-32 skeleton-circle"></div>
        <div className="h-32 w-32 skeleton-circle"></div>
        </div>
      </div>

      {/* Layout for tablet */}
      <div className="hidden md:grid lg:hidden md:grid-cols-2 md:gap-8 w-full">
        {/* Left Column */}
        <div className="flex flex-col items-center space-y-6 w-full">
        <div className="h-36 w-36 skeleton-circle"></div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center space-y-6 w-full">
        <div className="w-full h-28 skeleton-bg"></div>
        </div>
        {/* Bottom Row */}
        <div className="flex flex-row items-center space-x-3 w-full">
        <div className="w-full h-12 skeleton-bg"></div>
        <div className="w-full h-12 skeleton-bg"></div>
        <div className="w-full h-12 skeleton-bg"></div>
        </div>
      </div>

      {/* Layout for mobile */}
      <div className="md:hidden flex flex-col space-y-6 w-full">
        <div className="w-24 h-24 skeleton-circle"></div>
        <div className="w-full h-28 skeleton-bg"></div>
        <div className="w-28 self-center h-28 skeleton-circle"></div>
        <div className="w-28 self-center h-28 skeleton-circle"></div>
        <div className="w-[80%] h-10 skeleton-bg self-center"></div>
        <div className="w-[80%] h-10 skeleton-bg self-center"></div>
        <div className="w-[80%] h-10 skeleton-bg self-center"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
