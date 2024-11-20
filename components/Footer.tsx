import React from 'react';
import Link from 'next/link';
import { FaGithub, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-600 font-semibold py-6 border-t-2 border-t-gray-200">
      <div className="container mx-auto flex justify-center items-center space-x-10">
        {/* About the Authors Link */}
        <div className='flex space-x-3'>
        <Link href="/about-authors" passHref>
          <span className="cursor-pointer hover:text-gray-800 transition duration-300 hover:scale-110">
            About the Authors
          </span>
        </Link>
        {/* GitHub Icon */}
        <Link
          href="https://github.com/michaellgans/trove-capstone"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FaGithub className="w-6 h-6" />
        </Link>
        </div>

        {/* Copyright Information */}
        <div className='flex space-x-3'>
          <span className="text-sm md:text-base">
            &copy; 2025 Trove LLC | All Rights Reserved
          </span>
        </div>

        {/* About the Artist Link */}
        <div className='flex space-x-3'>
          <Link href="/about-artist" passHref>
            <span className="cursor-pointer hover:text-gray-800 transition duration-300">
              About the Artist
            </span>
          </Link>
        {/* Instagram Icon */}
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#E4405F] transition duration-300 hover:scale-110"
        >
          <FaInstagram className="w-6 h-6" />
        </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;