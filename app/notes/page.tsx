"use client";

import Link from "next/link";
import { useState } from "react";

export default function Notes() {
  const departments = [
    {
      name: "CSE",
      href: "/cse",
      fullName: "Computer Science & Engineering",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    },
    {
      name: "ECE",
      href: "/ece",
      fullName: "Electronics & Communication Engineering",
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    },
    {
      name: "IT",
      href: "/it",
      fullName: "Information Technology",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
  ];
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center w-full max-w-6xl px-2 sm:px-0">
      <div className="text-white text-[1.4rem] sm:text-3xl font-bold mb-5 sm:mb-18 text-center bg-black/40 px-3 sm:px-6 py-3 sm:py-4 rounded-xl backdrop-blur-md shadow-md w-full sm:w-auto">
        Select Your Department
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 w-full">
        {departments.map((dept) => (
          <Link href={dept.href} key={dept.name} className="transform transition-all duration-300 hover:scale-105">
            <div
              className="bg-black/40 relative overflow-hidden rounded-xl backdrop-blur-md p-4 sm:p-6 h-full border border-white/20 shadow-xl"
              onMouseEnter={() => setHoveredDept(dept.name)}
              onMouseLeave={() => setHoveredDept(null)}
              onTouchStart={() => setHoveredDept(dept.name)}
              onTouchEnd={() => setTimeout(() => setHoveredDept(null), 1000)}
            >
              <div className="absolute top-0 left-0 w-full h-1"></div>

              <div className="flex flex-col h-full items-center justify-center text-center">
                
                <div className="w-11 h-11 sm:w-16 sm:h-16 mb-2 sm:mb-4 rounded-full bg-black/40 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dept.icon} />
                  </svg>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{dept.name}</h2>

                <p className={`text-white text-[13px] sm:text-md transition-opacity duration-300 ${hoveredDept === dept.name ? 'opacity-100' : 'opacity-70'}`}>
                  {dept.fullName}
                </p>

                <div className={`mt-2 sm:mt-4 inline-flex items-center text-white text-sm sm:text-sm font-medium transition-all duration-300 ${hoveredDept === dept.name ? 'translate-x-1' : ''}`}>
                  View Notes
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-br from-black/20 to-white/20 transition-opacity duration-300 ${hoveredDept === dept.name ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
