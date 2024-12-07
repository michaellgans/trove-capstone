import React, { FC, useState } from 'react';
import Image from 'next/image';

interface DropdownItem {
  id: number | string;
  label: string;
  icon?: React.ReactNode; // Allow React elements (e.g., inline SVGs) or strings (image paths)
  children?: DropdownItem[];
  action?: () => void;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  selectedId: string | number | null; // ID of the selected item
  onSelect: (item: DropdownItem) => void; // Callback for item selection
  closeMenu: () => void; // Function to close the dropdown
  showLessonIcon?: boolean;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  items,
  selectedId,
  onSelect,
  closeMenu,
  showLessonIcon = false,
}) => {
  const [openNestedId, setOpenNestedId] = useState<string | number | null>(null);

  const handleItemClick = (item: DropdownItem) => {
    if (item.children) {
      setOpenNestedId((prev) => (prev === item.id ? null : item.id));
    } else {
      if (item.action) item.action();
      onSelect(item);
      closeMenu();
    }
  };

  return (
    <div className="absolute -ml-5 mt-3 w-72 text-gray-800 bg-white border border-gray-100 rounded-lg shadow-lg z-50 overflow-hidden">
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => handleItemClick(item)}
            className="flex items-center w-full px-4 py-2 hover:bg-brightGreen hover:bg-opacity-10 hover:text-brightGreen text-left"
          >
            {item.icon &&
              (typeof item.icon === 'string' ? (
                <Image
                  src={item.icon} // Handle string paths for images
                  alt="icon"
                  className="h-6 w-6 rounded-full mr-2"
                  width={24}
                  height={24}
                />
              ) : (
                <span className="mr-2">{item.icon}</span> // Render ReactNode directly
              ))}
            {showLessonIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            )}
            <span>{item.label}</span>
            {selectedId === item.id && (
              <span className="ml-auto text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            )}
            {item.children && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4 ml-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    openNestedId === item.id
                      ? 'm4.5 15.75 7.5-7.5 7.5 7.5' // "Up" arrow path
                      : 'm19.5 8.25-7.5 7.5-7.5-7.5' // "Down" arrow path
                  }
                />
              </svg>
            )}
          </button>
          {item.children && openNestedId === item.id && (
            <div className="relative">
              {item.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleItemClick(child)}
                  className="flex items-center w-full px-4 py-2 hover:bg-brightGreen hover:text-brightGreen hover:bg-opacity-10 text-left space-x-2"
                >
                  <span className="relative pl-6">{child.label}</span>
                  {child.icon &&
                    (typeof child.icon === 'string' ? (
                      <Image
                        src={child.icon}
                        alt="child icon"
                        className="h-6 w-6 rounded-full mr-2"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <span className="mr-2">{child.icon}</span>
                    ))}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
