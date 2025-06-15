"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(localStorage.getItem("dept") || "Select");
  const dept = ["CSE", "ECE", "IT"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (dept: string) => {
    setSelectedDept(dept);
    setIsOpen(false);
    localStorage.setItem("dept", dept);
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center text-white absolute top-0 left-0 z-10">
      <Link href={'/'}>
       <Logo className="text-xl sm:" />
      </Link>

      <div className="relative items-center flex-col">
        <div className="hidden md:block">Department</div>
        <button
          onClick={toggleDropdown}
          className="cursor-pointer flex justify-between items-center focus:outline-none"
        >
          <span className="text-lg font-medium mr-[3px]">{selectedDept}</span>
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
            {dept.map((d) => (
              <div
                key={d}
                onClick={() => handleSelect(d)}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer rounded-md"
              >
                {d}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
