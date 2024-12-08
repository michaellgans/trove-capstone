interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col mt-7 w-full items-center text-center font-['Darker Grotesque'] text-[35px] lg:text-[40px] text-gray-800 relative">
      {/* Text with shadow and gradient overlay */}
      <h1
        className="relative z-10"
        style={{
          fontWeight: 600,
        }}
      >
        <span className="relative">
          {title}
          {/* Subtle shadow */}
          <span
            className="absolute inset-0 text-black blur-xl opacity-10 select-none pointer-events-none"
            aria-hidden="true"
          >
            {title}
          </span>
        </span>
      </h1>

      {/* Decorative Underline */}
      <div className="w-72 lg:w-96 h-1 mt-1 mb-6 rounded-full overflow-hidden mx-auto flex">
        <div className="flex-1 bg-brightRed"></div>
        <div className="flex-1 bg-brightYellow"></div>
        <div className="flex-1 bg-brightBlue"></div>
      </div>
    </header>
  );
};


export default Header;
