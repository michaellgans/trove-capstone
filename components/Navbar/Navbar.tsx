'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import Image from 'next/image';
import DropdownButton from './DropdownButton';
import DropdownMenu from './DropdownMenu';
import { useRouter } from 'next/navigation';
import MobileDropdownMenu from './MobileDropdownMenu';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { getChildrenByParent, getParentAccountByParentId } from '@/lib/server-actions';
import { Child, Parent_Account } from '@/types/types';
import { centsToDollars } from '@/lib/utils';
import lessonsData from '@/components/Lessons/LessonsData';


interface MobileDropdownItem {
  id: number | string;
  label: string;
  icon?: React.ReactNode; // Optional icon (can be a React node or a string)
  children?: MobileDropdownItem[]; // Recursive type for nested dropdowns
  action?: () => void; // Optional action for clickable items
}


const Navbar: FC = () => {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string | number>('');
  const [selectedLesson, setSelectedLesson] = useState<string | number>('');
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState<boolean>(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState<boolean>(false);
  const [isMyBalanceDropdownOpen, setIsMyBalanceDropdownOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [parentAccount, setParentAccount] = useState<Parent_Account>({id: "", stripe_acct_id: null, balance: 0, withholding_balance: 0, parent_id: ""});
  const [userChildren, setUserChildren] = useState<Child[]>([{id: "", name: "", username: "", avatar_img: "", parent_id: ""}]);

  const familyDropdownRef = useRef<HTMLDivElement>(null);
  const learningDropdownRef = useRef<HTMLDivElement>(null);
  const myBalanceDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Pull Parent Account info
  useEffect(() => {
    const fetchParentAccount = async () => {
      if (session?.user.id) {
        const account = await getParentAccountByParentId(session?.user.id);
        setParentAccount(account);
      }
    }

    fetchParentAccount();
  }, [session?.user.id])

  // Pull Child Info
  useEffect(() => {
    const fetchChildInfo = async () => {
      if (session?.user.id) {
        const children = await getChildrenByParent(session?.user.id);
        setUserChildren(children);
      }
    }

    fetchChildInfo();
  }, [session?.user.id])

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  // Dummy data for family members and lessons

  const familyMemberActions = [
    {
      id: 'send-money',
      label: 'Send Money',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor" // Use currentColor to inherit color from the parent
          className="h-6 w-6 transition-colors"
          >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>

      ),
      action: (member: Child) => {
        router.push(`/send?to=${member.id}`);
      },
    },
    {
      id: 'view-history',
      label: 'View History',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 transition-colors"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>

      ),
      action: (member: Child) => {
        router.push(`/home/#history?member=${member.id}`);
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6 transition-colors"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  />
</svg>

      ),
      action: (member: Child) => {
        router.push(`/settings?member=${member.id}`);
      },
    },
  ];
  
  const familyMembers = userChildren.map((member) => ({
    ...member,
    children: familyMemberActions.map((action) => ({
      ...action,
      action: () => action.action(member), // Pass the member context to the action
    })),
  }));
  
  const lessonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  );

  const lessons = lessonsData.map((lesson) => ({
    id: lesson.id,
    label: lesson.majorTitle, // Use the title for display
  }));

  const handleLessonSelect = (lessonId: string) => {
    router.push(`/lessons/${lessonId}`); // Navigate to the lesson page
    setIsLearningDropdownOpen(false); // Close dropdown
  };
  
  const lessonsMobile: MobileDropdownItem[] = lessonsData.map((lesson) => ({
    id: String(lesson.id), // Ensure id is a string
    label: lesson.majorTitle,
    icon: lessonIcon, // Use the shared lesson icon
    action: () => handleLessonSelect(lesson.id), // Navigate to the lesson page
  }));
  
  const myBalanceItems = [
    {
      id: 'balance1',
      label: `Trove Checking Account ${parentAccount.id.slice(-4)}`,
      icon: (
        <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6 transition-colors"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
  />
</svg>

      ),
      children: [
        {
          id: 'balance',
          label: `$ ${centsToDollars(parentAccount.balance).toString()}`,
          icon: (
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6 transition-colors"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
  />
</svg>

          ),
          // className: 'hover:cursor-default',
          action: () => alert('Balance clicked!'),
        },
        {
          id: 'add-balance',
          label: 'Add to My Balance',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 transition-colors"
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
    
          ),
          action: () => router.push('/add-balance'),
        },
      ],
    },
    {
      id: 'withholdings',
      label: 'Withholdings Balance',
      icon: (
        <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6 transition-colors"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
  />
</svg>

      ),
      children: [
        {
          id: 'transfer-withholdings',
          label: `$ ${centsToDollars(parentAccount.withholding_balance).toString()}`,
          icon: (
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6 transition-colors"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
  />
</svg>

          ),
          // className: 'cursor-pointer',
          action: () => alert('Transfer Withholdings clicked!'),
        },
        {
          id: 'transfer-withholdings2',
          label: 'Transfer Withholdings',
          icon: (
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6 transition-colors"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
  />
</svg>

          ),
          // className: 'cursor-pointer',
          action: () => alert('Transfer Withholdings clicked!'),
        },
      ],
    },
  ];
  

  const handleLogout = async (): Promise<void> => {
    setIsLoggedIn(false);
    await signOut();
    router.push("/");
  };
  const handleClose = () => setIsOpen(false);

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
      <nav className="bg-white backdrop-blur-md border-b px-5 md:px-8 xl:px-16 py-2 flex justify-between items-center font-inter fixed top-0 left-0 z-50 w-full">
        {/* Logo */}
        <div className="flex space-x-10 xl:space-x-20">
            <Link href={isLoggedIn ? "/home" : "/"}>
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


          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-10">
          {isLoggedIn && (
            <div className='flex items-center space-x-5 xl:space-x-10 mt-1.5'>
              <div className='relative' ref={myBalanceDropdownRef}

              >
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
              <div className="relative" ref={familyDropdownRef}
              >
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
                    icon: member.avatar_img,
                    children: member.children, // Pass children for nested dropdowns
                  }))}
                  selectedId={selectedFamilyMember}
                  onSelect={(item) => setSelectedFamilyMember(item.id)}
                  closeMenu={() => setIsFamilyDropdownOpen(false)}
                />
                )}
              </div>
              <div className="relative" ref={learningDropdownRef}
              >
              <DropdownButton
                label="Learning Center"
                onClick={() => setIsLearningDropdownOpen((prev) => !prev)}
                isOpen={isLearningDropdownOpen}
                className="relative"
              />
                {isLearningDropdownOpen && (
                  <DropdownMenu
                  items={lessons.map((lesson) => ({
                    id: String(lesson.id), // Use index as ID
                    label: lesson.label,
                  }))}
                  showLessonIcon={true}
                  selectedId={String(selectedLesson)}
                  onSelect={(item) => {
                    handleLessonSelect(String(item.id)); // Store the selected lesson's ID
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
        </div>
        {/* Hamburger Menu */}
        <div className="flex lg:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-brightRed/10 rounded-md p-2 focus:outline-none hover:brightness-110 transition-transform duration-300 ease-in-out shadow-sm"
          >
            <svg
              className="w-7 h-7 text-brightRed drop-shadow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
            </svg>
          </button>
        </div>

        {/* Desktop Not loggedIn */}
        <div className="lg:flex hidden items-center space-x-7 mt-1.5">
          {!isLoggedIn ? (
            <>
              <Link href="/login" passHref>
                <span className="text-gray-800 hover:text-brightRed transition duration-300 ease-in-out cursor-default">Log in</span>
              </Link>
              <Link href="/signup" passHref>
                <span className="bg-brightRed text-white px-4 py-2 rounded-md hover:brightness-110 cursor-default transition ease-in-out duration-300"> {/* border border-darkRed */}
                  Sign up
                </span>
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-800 font-semibold">Welcome, <span className='text-brightGreen'>{session?.user.name}!</span></span>
              <button
                onClick={handleLogout}
                className="flex items-center font-semibold space-x-2 text-gray-800 hover:text-brightGreen transition duration-300 ease-in-out"
              >
                <span className='hidden lg:hidden xl:inline-block md:inline-block sm:inline-block'>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </>
          )}
          
        </div>
      </nav>

      {/* Mobile Variant */}
{isOpen && (
  <div className="fixed inset-0 z-40 flex">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/70"
      onClick={() => setIsOpen(false)}
    ></div>

    {/* Mobile/Tablet Menu */}
    <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-white p-6 shadow-lg transition-transform duration-300 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Menu</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-600 hover:text-brightRed transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-4">
        {!isLoggedIn ? (
          <>
          {/* About Trove */}
          <div className='border-b font-semibold flex flex-col w-full space-y-4 py-5 ps-5'>
          <Link onClick={() => setIsOpen(false)} href="/" passHref>
            <span className="text-gray-800 hover:text-brightRed transition duration-300 ease-in-out cursor-default">
              About Trove
            </span>
          </Link>
    
          {/* Get the App */}
          <Link onClick={() => setIsOpen(false)} href="/get-the-app" passHref>
            <span className="text-gray-800 hover:text-brightRed transition duration-300 ease-in-out cursor-default">
              Get the App
            </span>
          </Link>

          </div>
          {/* Log in and Sign up */}
          <div className="flex flex-col space-x-5 space-y-5 py-5">
            <Link onClick={() => setIsOpen(false)} href="/login" passHref>
              <span>Already have an account?</span>
              <span className="hover:brightness-110 font-bold text-brightRed transition duration-300 ease-in-out cursor-default ms-3">
                Log in
              </span>
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/signup" passHref>
              <span>New user?</span>
              <span className="bg-brightRed text-white px-4 ms-3 py-2 rounded-md hover:brightness-110 cursor-default transition ease-in-out duration-300">
                Sign up
              </span>
            </Link>
          </div>

          {/* Footer Content */}
  <div className="mt-auto border-t border-gray-200 pt-10">
    <footer className="text-gray-600 font-semibold">
      <div className="flex flex-col items-center space-y-3">
        {/* About the Authors */}
        <div className="flex items-center space-x-3">
          <Link href="" passHref>
            <span className="cursor-pointer hover:text-gray-800 transition duration-300 hover:scale-110">
              About the Authors
            </span>
          </Link>
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
        <div className="text-center text-sm">
          &copy; 2025 Trove LLC | All Rights Reserved
        </div>

        {/* About the Artist */}
        <div className="flex items-center space-x-3">
          <Link href="/about-artist" passHref>
            <span className="cursor-pointer hover:text-gray-800 transition duration-300">
              About the Artist
            </span>
          </Link>
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
  </div>
        </>
        ) : (
          <>
            <MobileDropdownMenu
  items={[
    {
      id: 'my-balance',
      label: 'My Balance',
      children: myBalanceItems, // Directly include the existing array
    },
    {
      id: 'my-family',
      label: 'My Family',
      children: familyMembers.map((member) => ({
        id: member.id,
        label: member.name,
        icon: member.avatar_img,
        children: member.children,
      })),
    },
    {
      id: 'learning-center',
      label: 'Learning Center',
      children: lessonsMobile, // Use the dynamically generated lessonsMobile
    },
    {
      id: 'settings',
      label: 'Settings',
      action: () => router.push('/settings'),
    },
  ]}
  closeMenu={() => setIsOpen(false)}
  handleLogout={handleLogout}
/>
         {/* Footer Content */}
         <div className="mt-auto border-t border-gray-200 pt-10">
    <footer className="text-gray-600 font-semibold">
      <div className="flex flex-col items-center space-y-3">
        {/* About the Authors */}
        <div className="flex items-center space-x-3">
          <Link href="https://linktr.ee/troveteam" passHref target='_blank'>
            <span className="cursor-pointer hover:text-gray-800 transition duration-300 hover:scale-110">
              About the Authors
            </span>
          </Link>
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
        <div className="text-center text-sm">
          &copy; 2025 Trove LLC | All Rights Reserved
        </div>

        {/* About the Artist */}
        <div className="flex items-center space-x-3">
          <Link href="https://instagram.com/macks_tatts" passHref>
            <span className="cursor-pointer hover:text-gray-800 transition duration-300">
              About the Artist
            </span>
          </Link>
          <Link
            href="https://instagram.com/macks_tatts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#E4405F] transition duration-300 hover:scale-110"
          >
            <FaInstagram className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  </div>

          </>
        )}
      </nav>
    </div>
  </div>
)}
    </>
  );
};

export default Navbar;
