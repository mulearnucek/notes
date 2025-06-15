"use client";

import { Note } from "@/lib/data";
import { useDataContext } from "@/lib/DataContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ sem: string; dept: string }>;
}) {
  const [subjects, setSubjects] = useState<Note[]>();
  const [resolvedParams, setResolvedParams] = useState<{
    sem: string;
    dept: string;
  } | null>(null);
  const {db} = useDataContext();

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchSubjects = async () => {
      try {
        setSubjects(
          db?.query({
            where: {
              Department: resolvedParams.dept.toUpperCase(),
              Semester: resolvedParams.sem,
            },
            distinct: "Subject"
          }) || []
        );
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [resolvedParams]);

  if (!resolvedParams) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading...
      </div>
    );
  }

  const semNumber = resolvedParams.sem;
  const dept = resolvedParams.dept.toLowerCase();

  if (!["cse", "ece", "it"].includes(dept)) {
    return (
      <div className="text-center mt-10 text-white">
        Invalid department: {dept}
      </div>
    );
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
        No subjects found for semester {semNumber} in department {dept}
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col justify-center items-center p-6">
      <div className="text-3xl font-bold mb-8 text-center -mt-3 sm:mt-3 sm:mb-10 px-6 py-2 rounded-xl shadow-md bg-black/50 backdrop-blur-md border-1 border-gray-700">
        Select Subject
        <div className="w-full border-t border-gray-700 mt-3 pt-2 text-center text-gray-400 text-sm">
          <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
            <ol className="list-reset flex">
              <li>
                <Link href="/" className="hover:underline text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href={`/${dept}`}
                  className="hover:underline text-gray-300"
                >
                  {dept.toUpperCase()}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href={`/${dept}/${resolvedParams.sem}`}
                  className="hover:underline text-gray-300"
                >
                  Semester {resolvedParams.sem}
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
        {subjects.map((sub, index) => (
          <Link
            key={index}
            href={`/${dept}/${semNumber}/${sub.Subject
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="text-center bg-black/50 hover:bg-black/60 px-6 py-4 rounded-2xl text-lg capitalize items-center font-semibold shadow-md transition-all duration-200 backdrop-blur-md border-1 border-gray-700"
          >
            {sub.Subject.toLowerCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
