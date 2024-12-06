'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import Image from 'next/image';
import DropdownButton from './DropdownButton';
import DropdownMenu from './DropdownMenu';
import { useRouter } from 'next/navigation';


interface FamilyMember {
  id: number;
  name: string;
  avatar: string;
}


const Navbar: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string | number>('');
  const [selectedLesson, setSelectedLesson] = useState<string | number>('');
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState<boolean>(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState<boolean>(false);
  const [isMyBalanceDropdownOpen, setIsMyBalanceDropdownOpen] = useState<boolean>(false);

  const familyDropdownRef = useRef<HTMLDivElement>(null);
  const learningDropdownRef = useRef<HTMLDivElement>(null);
  const myBalanceDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Dummy data for family members and lessons

  const familyMemberActions = [
    {
      id: 'send-money',
      label: 'Send Money',
      icon: '/images/add.svg',
      action: (member: FamilyMember) => {
        console.log(`Sending money to ${member.name}`);
        router.push(`/send?to=${member.id}`);
      },
    },
    {
      id: 'view-history',
      label: 'View History',
      icon: '/images/history.svg',
      action: (member: FamilyMember) => {
        console.log(`Viewing history for ${member.name}`);
        router.push(`/home/#history?member=${member.id}`);
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '/images/settings.svg',
      action: (member: FamilyMember) => {
        console.log(`Viewing settings for ${member.name}`);
        router.push(`/settings?member=${member.id}`);
      },
    },
  ];
  
  const familyMembers = [
    { id: 1, name: 'Mei', avatar: '/images/avatar.svg' },
    { id: 2, name: 'Michael', avatar: '/images/avatar.svg' },
    { id: 3, name: 'Chris', avatar: '/images/avatar.svg' },
    { id: 4, name: 'Lee', avatar: '/images/avatar.svg' },
    { id: 5, name: 'Svitlana', avatar: '/images/avatar.svg' },
  ].map((member) => ({
    ...member,
    children: familyMemberActions.map((action) => ({
      ...action,
      action: () => action.action(member), // Pass the member context to the action
    })),
  }));

  const lessons: string[] = [
    'All Lessons',
    'Bills and Payments',
    'Loans and Interest',
    'Savings and Checking',
    'Taxes and Withholding',
  ];
  const myBalanceItems = [
    {
      id: 'balance1',
      label: 'Trove Checking Account 5555',
      icon: '/images/dollars.svg',
      children: [
        {
          id: 'balance',
          label: '$1,000',
          icon: '/images/dollars.svg',
          action: () => alert('Balance clicked!'),
        },
        {
          id: 'add-balance',
          label: 'Add to My Balance',
          icon: '/images/add.svg',
          action: () => router.push('/add-balance'),
        },
      ],
    },
    {
      id: 'withholdings',
      label: 'Withholdings Balance',
      icon: '/images/bank.svg',
      children: [
        {
          id: 'transfer-withholdings',
          label: '$50.05',
          icon: '/images/dollars.svg',
          action: () => alert('Transfer Withholdings clicked!'),
        },
        {
          id: 'transfer-withholdings',
          label: 'Transfer Withholdings',
          icon: '/images/logout.svg',
          action: () => alert('Transfer Withholdings clicked!'),
        },
      ],
    },
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

    if (myBalanceDropdownRef.current && !myBalanceDropdownRef.current.contains(event.target as Node)) {
      setIsMyBalanceDropdownOpen(false);
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
      <nav className="bg-white shadow-md px-5 md:px-16 py-3 flex justify-between items-center font-inter"> {/* The shadow-md to see the limits of navbar */}
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
                <span className="text-2xl md:text-3xl flex font-basker font-regular text-gray-800 [font-variant:small-caps]">
                  Trove
                </span>
              </div>
            </Link>
          {isLoggedIn && (
            <div className='flex items-center space-x-10 mt-1.5'>
              <div className='relative' ref={myBalanceDropdownRef}>
              <DropdownButton
                label="My Balance"
                onClick={() => setIsMyBalanceDropdownOpen((prev) => !prev)}
                isOpen={isMyBalanceDropdownOpen}
                className="relative"
              />
              {isMyBalanceDropdownOpen && (
                <DropdownMenu
                items={myBalanceItems}
                selectedId={null}
                onSelect={(item) => setSelectedFamilyMember(item.id)}
                closeMenu={() => setIsMyBalanceDropdownOpen(false)}
              />
              )}
              </div>
              <div className="relative" ref={familyDropdownRef}>
              <DropdownButton
                label="My Family"
                onClick={() => setIsFamilyDropdownOpen((prev) => !prev)}
                isOpen={isFamilyDropdownOpen}
                className="relative"
              />
                {isFamilyDropdownOpen && (
                  <DropdownMenu
                  items={familyMembers.map((member) => ({
                    id: member.id,
                    label: member.name,
                    icon: member.avatar,
                    children: member.children, // Pass children for nested dropdowns
                  }))}
                  selectedId={selectedFamilyMember}
                  onSelect={(item) => setSelectedFamilyMember(item.id)}
                  closeMenu={() => setIsFamilyDropdownOpen(false)}
                />
                )}
              </div>
              <div className="relative" ref={learningDropdownRef}>
              <DropdownButton
                label="Learning Center"
                onClick={() => setIsLearningDropdownOpen((prev) => !prev)}
                isOpen={isLearningDropdownOpen}
                className="relative"
              />
                {isLearningDropdownOpen && (
                  <DropdownMenu
                  items={lessons.map((lesson, index) => ({
                    id: index, // Use index as ID
                    label: lesson,
                  }))}
                  showLessonIcon={true}
                  selectedId={selectedLesson} // Pass selected lesson ID
                  onSelect={(item) => {
                    setSelectedLesson(item.id); // Store the selected lesson's ID
                  }}
                  closeMenu={() => setIsLearningDropdownOpen(false)} // Close dropdown
                />
                )}
              </div>
              <div className='relative'>
              <DropdownButton
                label="Settings"
                className="relative"
                showIcon={false}
                onClick={() => router.push('/settings')}
                />
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
