interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col mt-10 w-full items-center text-center font-base font-inter text-2xl md:text-3xl lg:text-4xl text-text">
            {title}
            <div className="w-64 md:w-72 lg:w-96 h-1 mt-2 mb-6 rounded-full overflow-hidden mx-auto flex">
              <div className="flex-1 bg-brightRed"></div>
              <div className="flex-1 bg-brightYellow"></div>
              <div className="flex-1 bg-brightBlue"></div>
            </div>
    </header>
  )
}

export default Header;