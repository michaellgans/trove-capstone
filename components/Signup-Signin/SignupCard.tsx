'use client';
import React from 'react';
import LogoTitle from '../LogoTitle';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const SignUpCard: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-lg border border-1 border-gray-100 shadow-lg max-w-md mx-auto mt-10">
      <LogoTitle />

      {/* Sign Up Buttons */}
      <div className="w-full flex flex-col space-y-4">
        <button
          className="flex items-center justify-center w-[80%] px-4 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition ease-in-out duration-300 mx-auto"
        >
          <FcGoogle className="mr-3 w-6 h-6" />
          Sign up with Google
        </button>
        <Link href="/signup/email" passHref>
          <button
            className="flex items-center justify-center w-[80%] px-4 py-3 rounded-full bg-brightRed text-white hover:brightness-110 transition ease-in-out duration-300 mx-auto"
          >
            <FaEnvelope className="mr-3 w-6 h-6" />
            Sign up with Email
          </button>
        </Link>
        {/* Cancel Button */}
      <button
        onClick={() => router.push('/')}
        className="mt-4 text-sm text-gray-500 hover:text-gray-600 transition ease-in-out duration-300"
      >
        Cancel
      </button>
      </div>
    </div>
  );
};

export default SignUpCard;
