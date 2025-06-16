"use client";
import { getSubjects } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as React from "react";

export default function Page({ params }: { params: Promise<{ sem: string; dept: string }> }) {
  // Unwrap params using React.use()
  const { sem, dept } = React.use(params);
  const [subjects, setSubjects] = useState<string[]>();

  const semNumber = sem;
  const deptLower = dept.toLowerCase();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjects(await getSubjects(deptLower, semNumber));
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!["cse", "ece", "it"].includes(deptLower)) {
    return <div className="text-center mt-10 text-white">Invalid department: {deptLower}</div>;
  }

  if (!subjects) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading subjects ...
      </div>
    );
  }
  if (subjects.length === 0) {
    return (
      <div className="text-center mt-10 text-white">
        No subjects found for semester {semNumber} in department {deptLower}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full px-2 sm:px-0">
      <h1 className="text-white -mt-20 text-2xl sm:text-4xl font-bold mb-8 sm:mb-14 text-center bg-black/40 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-lg backdrop-blur-md">
        Select Subject
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl items-stretch">
        {subjects.map((sub, index) => (
          <Link
            key={index}
            href={`/${deptLower}/${semNumber}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative flex flex-col items-center justify-center bg-black/60 border border-white/20 rounded-xl shadow-md px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden h-full min-h-[72px]"
            style={{ minWidth: "260px", maxWidth: "260px", margin: "0 auto" }}
          >
            <span className="z-10 text-white text-base sm:text-lg font-semibold capitalize text-center break-words">
              {sub}
            </span>
            {/* Glow on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/10 to-black/10 pointer-events-none" />
          </Link>
        ))}
      </div>
    </div>
  );
}
