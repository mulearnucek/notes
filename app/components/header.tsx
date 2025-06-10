"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState("Scheme");
  const schemes = ["2020"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (scheme: string) => {
    setSelectedScheme(scheme);
    setIsOpen(false);
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center text-white absolute top-0 left-0 z-10">
      <h1 className="md:ml-8 text-3xl font-bold">KU NOTES</h1>

      <div className="relative md:mr-5">
        <button
          onClick={toggleDropdown}
          className="cursor-pointer flex justify-between items-center focus:outline-none"
        >
          <span className="text-lg font-medium mr-[3px]">{selectedScheme}</span>
          <svg
            className="mt-[2px] size-6 text-gray-200"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-black/70 text-white rounded-md shadow-lg z-20 border-[1px] border-gray-600">
            {schemes.map((year) => (
              <div
                key={year}
                onClick={() => handleSelect(year)}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer rounded-md"
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
