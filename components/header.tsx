"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { useDataContext } from "@/lib/DataContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { dept, setDept } = useDataContext();
  const departments = ["CSE", "ECE", "IT"];
  const pathname = usePathname();
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (newDept: string) => {
    setDept(newDept);
    setIsOpen(false);

    // If on home page, don't navigate
    if (pathname === "/") return;

    // Split the current path
    const parts = pathname.split("/").filter(Boolean);

    // If path is just /, go to /[newDept]
    if (parts.length === 0) {
      router.push(`/${newDept.toLowerCase()}`);
      return;
    }

    // Check if current path is a syllabus route
    if (parts[0] === "syllabus") {
      // If on syllabus route, redirect to /syllabus/[newDept]
      router.push(`/syllabus/${newDept.toLowerCase()}`);
      return;
    }

    // If path starts with a department, replace it
    if (departments.map(d => d.toLowerCase()).includes(parts[0])) {
      parts[0] = newDept.toLowerCase();
      router.push("/" + parts.join("/"));
      return;
    }

    // Fallback: just go to /[newDept]
    router.push(`/${newDept.toLowerCase()}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-white absolute top-0 left-0 z-10">
      <Link href={'/'}>
        <Logo className="size-15 md:size-20" />
      </Link>

      <div className="relative items-center flex-col">
        <div className="hidden md:block text-md font-bold">Department</div>
        <button
          onClick={toggleDropdown}
          className="cursor-pointer flex justify-between items-center focus:outline-none mr-3 sm:ml-7"
        >
          <span className="text-base sm:text-lg font-medium mr-1 sm:mr-[3px]">{dept == '' ? "Select" : dept}</span>
          <svg
            className="mt-[2px] w-5 h-5 sm:w-6 sm:h-6 text-gray-200"
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
          <div className="absolute right-0 mt-2 w-24 sm:w-28 bg-black/70 text-white rounded-md shadow-lg z-20 border-[1px] border-gray-600">
            {departments.map((d) => (
              <div
                key={d}
                onClick={() => handleSelect(d)}
                className={`px-3 sm:px-4 py-2 cursor-pointer text-sm sm:text-base
                  ${dept === d
                    ? "bg-white/20 text-white"
                    : "hover:bg-white/10"}`}
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