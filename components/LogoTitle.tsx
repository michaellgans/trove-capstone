import Image from "next/image";

const LogoTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex w-full">
        <Image
          src="/images/Trove_Logo.png"
          alt="Trove Logo"
          width={60}
          height={60}
          priority
          className="w-1/3"
        />
        <div className="text-6xl flex justify-center items-center w-2/3 font-basker text-gray-800 mt-4 [font-variant:small-caps]">
          Trove
        </div>
      </div>
      <p className="text-3xl font-basker text-gray-700 mt-2">Let's learn together.</p>
    </div>
  )
}

export default LogoTitle;