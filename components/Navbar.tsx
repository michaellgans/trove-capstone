'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import Image from 'next/image';

interface FamilyMember {
  id: number;
  name: string;
  avatar: string;
}


const Navbar: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState<boolean>(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState<boolean>(false);

  const familyDropdownRef = useRef<HTMLDivElement>(null);
  const learningDropdownRef = useRef<HTMLDivElement>(null);

  // Dummy data for family members and lessons
  const familyMembers: FamilyMember[] = [
    { id: 1, name: 'Mei', avatar: '/images/avatar.svg' },
    { id: 2, name: 'Michael', avatar: '/images/avatar.svg' },
    { id: 3, name: 'Chris', avatar: '/images/avatar.svg' },
    { id: 4, name: 'Lee', avatar: '/images/avatar.svg' },
    { id: 5, name: 'Svitlana', avatar: '/images/avatar.svg' },
  ];

  const lessons: string[] = [
    'All Lessons',
    'Bills and Payments',
    'Loans and Interest',
    'Savings and Checking',
    'Taxes and Withholding',
  ];

  const handleLogout = (): void => {
    setIsLoggedIn(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (familyDropdownRef.current && !familyDropdownRef.current.contains(event.target as Node)) {
      setIsFamilyDropdownOpen(false);
    }

    if (learningDropdownRef.current && !learningDropdownRef.current.contains(event.target as Node)) {
      setIsLearningDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md px-10 py-3 flex justify-between items-center font-inter"> {/* The shadow-md to see the limits of navbar */}
        <div className="flex space-x-20">
            <Link href="/" passHref>
              <div className='flex items-center space-x-4 cursor-pointer'>
                <Image 
                  src='/images/Trove_Logo.png'
                  alt="Trove Logo" 
                  width={40}
                  height={40}
                  priority
                />
                <span className="text-4xl flex font-basker font-regular text-gray-800">
                  Trove
                </span>
              </div>
            </Link>
          {isLoggedIn && (
            <div className='flex items-center space-x-10 mt-1.5'>
              <div className='relative'>
                <button
                  className="flex items-center font-semibold space-x-1 text-gray-800 hover:text-brightRed transition duration-300 ease-in-out"
                >
                  <span>My Balance</span>
                </button>
              </div>
              <div className="relative" ref={familyDropdownRef}>
                <button
                  className="flex items-center font-semibold space-x-2 text-gray-800 hover:text-brightRed transition duration-300 ease-in-out"
                  onClick={() => setIsFamilyDropdownOpen((prev) => !prev)}
                >
                  <span>My Family</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isFamilyDropdownOpen && (
                  <div className="absolute mt-2 -ml-2 w-48 bg-white border rounded-lg shadow-lg">
                    {familyMembers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => {
                          setSelectedFamilyMember(member.name);
                        }}
                        
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        <Image
                          src={member.avatar}
                          alt="avatar"
                          className="h-6 w-6 rounded-full mr-2 border-1 border-black"
                          width={40}
                          height={40}
                        />
                        <span>{member.name}</span>
                        {selectedFamilyMember === member.name && (
                          <span className="ml-auto text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={learningDropdownRef}>
                <button
                  className="flex items-center font-semibold space-x-2 text-gray-800 hover:text-brightRed transition duration-300 ease-in-out"
                  onClick={() => setIsLearningDropdownOpen((prev) => !prev)}
                >
                  <span>Learning Center</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isLearningDropdownOpen && (
                  <div className="absolute mt-2 -ml-2 w-72 bg-white border rounded-lg shadow-lg">
                    {lessons.map((lesson, index) => (
                      <button
                        key={index}
                        onClick={() => { 
                          setSelectedLesson(lesson);
                        }}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <span>{lesson}</span>
                        {selectedLesson === lesson && (
                          <span className="ml-auto text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-7 mt-1.5">
          {!isLoggedIn ? (
            <>
              <Link href="/login" passHref>
                <span className="text-gray-800 hover:text-brightRed transition duration-300 ease-in-out cursor-pointer">Log in</span>
              </Link>
              <Link href="/signup" passHref>
                <span className="bg-brightRed text-white px-4 py-2 rounded-md hover:brightness-110 cursor-pointer transition ease-in-out duration-300"> {/* border border-darkRed */}
                  Sign up
                </span>
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-800 font-semibold">Welcome, User!</span>
              <button
                onClick={handleLogout}
                className="flex items-center font-semibold space-x-2 text-gray-800 hover:text-brightRed transition duration-300 ease-in-out"
              >
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
