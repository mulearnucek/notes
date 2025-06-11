"use client";
import { getSubjects } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { sem: string; dept: string } }) {
  const [subjects, setSubjects] = useState<string[]>();

  const resolvedParams = params;
  const semNumber = resolvedParams.sem;
  const dept = resolvedParams.dept.toLowerCase();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjects(await getSubjects(dept, semNumber));
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  if (!["cse", "ece", "it"].includes(dept)) {
    return <div className="text-center mt-10 text-white">Invalid department: {dept}</div>;
  }

  if(!subjects) {
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
        No subjects found for semester {semNumber} in department {dept}
      </div>
    );
  }

  return <div className="text-white flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-center -mt-3 sm:mt-3 sm:mb-10 px-6 py-2 rounded-xl shadow-md bg-black/50 backdrop-blur-md border-1 border-gray-700">
        Select Subject
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
        {subjects.map((sub, index) => (
          <Link
            key={index}
            href={`/${dept}/${semNumber}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-center bg-black/50 hover:bg-black/60 px-6 py-4 rounded-2xl text-lg capitalize items-center font-semibold shadow-md transition-all duration-200 backdrop-blur-md border-1 border-gray-700"
          >
            {sub.toLowerCase()}
          </Link>
        ))}
      </div>
    </div>;
    
}
