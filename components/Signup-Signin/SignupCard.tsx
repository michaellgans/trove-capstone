'use client';
import React, { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import LogoTitle from '../LogoTitle';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const handleGoogleSignUp = async () => {
  await signIn("google", { callbackUrl: "/signup/google" }); // Redirect to email sign-up with Google session
};

const SignUpCard: React.FC = () => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Close card when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        router.push('/'); // Redirect or close the card
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router]);

  return (
    <div
    ref={cardRef}
    className="flex flex-col items-center bg-white p-10 rounded-lg border border-1 border-gray-100 shadow-lg max-w-xs md:max-w-md mx-auto mt-10">
      <LogoTitle />

      {/* Sign Up Buttons */}
      <div className="w-full flex flex-col space-y-4">
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center w-full md:w-[80%] px-4 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition ease-in-out duration-300 mx-auto"
        >
          <FcGoogle className="mr-3 w-6 h-6" />
          Sign up with Google
        </button>
        <Link href="/signup/email" passHref>
          <button
            className="flex items-center justify-center w-full md:w-[80%] px-4 py-3 rounded-full bg-brightRed text-white hover:brightness-110 transition ease-in-out duration-300 mx-auto"
          >
            <FaEnvelope className="mr-3 w-6 h-6" />
            Sign up with Email
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpCard;
