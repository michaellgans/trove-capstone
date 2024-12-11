'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoTitle from '../LogoTitle';
import { signIn } from 'next-auth/react';
import { mockUsers } from "./mockdata";

const EmailSignInCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newError = { email: "", password: "" };
  
    // Validate email format
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      newError.email = "Enter a valid email address";
      isValid = false;
    }
  
    if (password.length < 6) {
      newError.password = "Password must be at least 6 characters";
      isValid = false;
    }

    try {
      await signIn("credentials", {email: email, password: password, callbackUrl: "/home"});
    } catch (error) {
      newError.email = "Invalid email or password";
      newError.password = "Invalid email or password";
      isValid = false;
      setError(newError);
      throw new Error("Login attempt failed");
    }

    // Check mock user credentials
    // const user = mockUsers.find((user) => user.email === email && user.password === password);
    // if (!user) {
    //   newError.email = "Invalid email or password";
    //   newError.password = "Invalid email or password";
    //   isValid = false;
    // }
  
    // setError(newError);
  
    // if (isValid) {
    //   console.log("Mock sign-in successful");
    //   router.push("/home"); // Redirect to the home page
    // }
  };
  

  return (
    <div
    ref={cardRef}
    className="flex relative my-0 sm:my-5 flex-col items-center bg-white p-10 sm:rounded-lg border border-gray-100 sm:shadow-lg max-w-md mx-auto mt-0 sm:mt-10">
      <LogoTitle />
      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <div className="relative">
            {error.email && emailFocused && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.email}
              </div>
            )}
            <input
              type="email"
              placeholder="kash@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            {error.password && passwordFocused && (
              <div className="absolute left-0 bottom-full mb-1 bg-red-400 text-white text-xs rounded py-1 px-2">
                {error.password}
              </div>
            )}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brightBlue'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            />
          </div>
        </div>

        <div className="flex justify-between mb-6">
          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 border-gray-50 rounded hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-500">
              Remember me
            </label>
          </div>
          <Link href="/reset-password" passHref>
            <span className="hover:text-brightRed cursor-pointer text-gray-500">Forgot password?</span>
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Login
        </button>
        {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <span className="text-gray-500">Don't have an account? </span>
        <Link href="/signup/email" passHref>
          <span className="text-brightRed opacity-75 font-semibold hover:opacity-100 hover:brightness-105 cursor-pointer">Sign up now</span>
        </Link>
      </div>
      </form>
    </div>
  );
};

export default EmailSignInCard;
