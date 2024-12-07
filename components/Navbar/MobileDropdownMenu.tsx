import React, { FC, useState } from 'react';
import Image from 'next/image';

interface MobileDropdownItem {
  id: number | string;
  label: string;
  icon?: React.ReactNode; // Allow React elements or strings
  children?: MobileDropdownItem[];
  action?: () => void;
}

interface MobileDropdownMenuProps {
  items: MobileDropdownItem[];
  closeMenu: () => void;
  handleLogout: () => void;
}

const MobileDropdownMenu: FC<MobileDropdownMenuProps> = ({ items, closeMenu, handleLogout }) => {
  const [openIds, setOpenIds] = useState<Record<number, string | number | null>>({});



  const handleItemClick = (item: MobileDropdownItem, depth: number) => {
    if (item.children) {
      setOpenIds((prev) => ({
        ...prev,
        [depth]: prev[depth] === item.id ? null : item.id, // Toggle the current level
      }));
    } else {
      if (item.action) item.action();
      closeMenu();
    }
  };
  


  const renderChildren = (children: MobileDropdownItem[], depth: number = 1) => (
    <div className="bg-gray-50">
      {children.map((child) => (
        <div key={child.id} className="">
          <button
            onClick={() => handleItemClick(child, depth)} // Pass the current depth
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-brightGreen hover:text-brightGreen hover:bg-opacity-10 text-left"
            style={{ paddingLeft: `${depth * 16}px` }}
          >
            <div className="flex items-center space-x-2">
              {depth === 1 ? (
                // First level: Icon first, then label
                <>
                  {child.icon &&
                    (typeof child.icon === 'string' ? (
                      <Image
                        src={child.icon}
                        alt="child icon"
                        className="h-6 w-6 rounded-full ml-4"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <span className="mr-2 pl-4">{child.icon}</span>
                    ))}
                  <span>{child.label}</span>
                </>
              ) : (
                // Second level or deeper: Label first, then icon
                <>
                  <span>{child.label}</span>
                  {child.icon &&
                    (typeof child.icon === 'string' ? (
                      <Image
                        src={child.icon}
                        alt="child icon"
                        className="h-6 w-6 rounded-full ml-4"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <span className="mr-2 pl-2">{child.icon}</span>
                    ))}
                </>
              )}
            </div>
            {child.children && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    openIds[depth] === child.id
                      ? 'M4.5 15.75l7.5-7.5 7.5 7.5' // "Up" arrow
                      : 'M8.25 19.5l7.5-7.5-7.5-7.5' // "Down" arrow
                  }
                />
              </svg>
            )}
          </button>
          {child.children && openIds[depth] === child.id && renderChildren(child.children, depth + 4)}

        </div>
      ))}
    </div>
  );
  

  return (
    <>
    <div className="w-full h-full bg-white font-semibold text-gray-800 overflow-auto border-b pb-4">
      {/* Welcome Section */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-gray-800 font-semibold text-xl">
          Welcome, <span className="text-brightGreen">User!</span>
        </span>
      </div>

      {/* Dropdown Section */}
      <div className="flex-1 overflow-y-auto">
      {items.map((item) => (
        <div key={item.id} className="">
          <button
            onClick={() => handleItemClick(item, 0)} // Depth 0 for top level
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-brightGreen hover:bg-opacity-10 hover:text-brightGreen text-left"
          >
            <div className="flex items-center space-x-2">
              {item.icon &&
                (typeof item.icon === 'string' ? (
                  <Image
                    src={item.icon}
                    alt="icon"
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                  />
                ) : (
                  <span>{item.icon}</span>
                ))}
              <span>{item.label}</span>
            </div>
            {item.children && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    Object.values(openIds).includes(item.id)
                      ? 'M4.5 19.5l7.5-7.5 7.5 7.5' // "Down" arrow for open
                      : 'M8.25 19.5l7.5-7.5-7.5-7.5' // "Right" arrow for closed
                  }
                />
              </svg>
            )}
          </button>
          {item.children && Object.values(openIds).includes(item.id) && renderChildren(item.children)}
        </div>
      ))}
    </div>
    </div>
            {/* Logout Section */}
            <div className="py-3">
        <button
          onClick={handleLogout} // Assuming this handles logout
          className="flex items-center font-semibold text-gray-800 hover:text-brightGreen transition duration-300 ease-in-out"
        >
          <span className='me-1 px-4'>Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-brightGreen"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
  </>
  );
};

export default MobileDropdownMenu;
