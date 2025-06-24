"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/footer";
import { getSubjectSlug, subjectMap } from "@/lib/utils";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { useDataContext } from "@/lib/DataContext";
import { useRouter } from "next/navigation";


export const metadata = {
  title: "Notes UCEK",
  description: "An initiative by Mulearn UCEK.",
  openGraph: {
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    url: "https://notes.uck.ac.in/",
    siteName: "Notes UCEK",
    images: [
      {
        url: "https://notes.uck.ac.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Notes UCEK Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    images: ["https://notes.uck.ac.in/og-image.jpg"],
  },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { db, dept } = useDataContext();
  const [recentModules, setRecentModules] = useState<
    { module: string; subject: string; sem: string; dept: string; url: string }[]
  >([]);

  // Load recent searches from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const recent = JSON.parse(localStorage.getItem("recent-modules") || "[]");
        setRecentModules(recent.slice(0, 5));
      } catch {
        setRecentModules([]);
      }
    }
  }, []);

  function handleSearch(event: { preventDefault: () => void }) {
    setLoading(true);
    event.preventDefault();
    try {
      parseAndBuildQuery(searchQuery);
    } catch (error) {
      console.error("Error parsing search query:", error);
    }
  }

  function parseAndBuildQuery(searchQuery: string) {
    const parts = searchQuery
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);

    let sem, module_, subject;

    const getStandardSubject = (word: string) => {
      for (const [standard, variants] of Object.entries(subjectMap)) {
        if (variants.includes(word)) {
          return standard;
        }
      }
      return word; // fallback to original if no match
    };

    for (const part of parts) {
      if (/^(s|sem)[-]?\d+$/i.test(part)) {
        const match = part.match(/\d+/);
        if (match) sem = match[0];
      } else if (/^m(od(ule)?)?-?\d+$/i.test(part)) {
        const match = part.match(/\d+/);
        if (match) module_ = match[0];
      } else if (!subject) {
        subject = getStandardSubject(part);
      }
    }

    // Condition: If only subject is provided
    if (!sem && !module_ && subject !== undefined) {
      const r1 = db?.query({
        where: {
          Department: dept.toUpperCase(),
          Subject: subject.toUpperCase(),
        }
      });

      const r2 = db?.query({
        where: {
          Subject: subject.toUpperCase(),
        },
      });

      const result = r1?.length == 0 ? r2 : r1;

      if (result && result.length > 0) {
        router.push(`/${result[0].Department}/${result[0].Semester}/${getSubjectSlug(result[0].Subject)}`);
        setLoading(false);
        return;
      }
    }

    // Condition: If only semester is provided
    if (sem && !subject && !module_) {
      const result = db?.query({
        where: {
          Department: dept.toUpperCase(),
          Semester: sem,
        },
      });

      if (result && result.length > 0) {
        router.push(`/${result[0].Department}/${result[0].Semester}`);
        setLoading(false);
        return;
      }
    }

    // Condition: If semester and subject are provided
    if (sem && subject && !module_) {
      const r1 = db?.query({
        where: {
          Department: dept.toUpperCase(),
          Semester: sem,
          Subject: subject.toUpperCase(),
        },
      });

      const r2 = db?.query({
        where: {
          Semester: sem,
          Subject: subject.toUpperCase(),
        },
      });

      const result = r1?.length == 0 ? r2 : r1;

      if (result && result.length > 0) {
        router.push(`/${result[0].Department}/${result[0].Semester}/${getSubjectSlug(result[0].Subject)}`);
        setLoading(false);
        return;
      }
    }

    if (!sem || !subject || !module_) {
      setLoading(false);
      setErrorMsg(
        "Please provide a valid search query in the format: semester, subject, module (e.g., 's2, engineering mechanics, mod1')"
      );
      throw new Error("Invalid input format");
    }

    // --- Normalize module_ to match your data format ---
    // If your data uses "1", leave as is.
    // If your data uses "01", uncomment the next line:
    // if (module_.length === 1) module_ = "0" + module_;
    // If your data uses "Module 1", uncomment the next line:
    // module_ = `Module ${module_}`;

    // Debug: log the query
    // console.log({
    //   Department: dept.toUpperCase(),
    //   Semester: sem,
    //   Subject: subject.toUpperCase(),
    //   Module: module_,
    // });

    const response = db?.query({
      where: {
        Department: dept.toUpperCase(),
        Semester: sem,
        Subject: subject.toUpperCase(),
        Module: module_,
      },
    });

    setLoading(false);
    if (!response || response.length === 0) {
      setErrorMsg(
        `No data found for ${dept} - Semester ${sem}, Subject: ${subject}, Module: ${module_}`
      );
      console.error("No data found for the given query.");
      return;
    }

    setErrorMsg("");

    // --- Add to recent modules ---
    const newRecent = {
      module: response[0].Title,
      subject,
      sem,
      dept,
      url: response[0].File,
    };
    let recentArr: typeof newRecent[] = [];
    try {
      recentArr = JSON.parse(localStorage.getItem("recent-modules") || "[]");
    } catch { }
    recentArr = recentArr.filter((item) => item.url !== newRecent.url);
    recentArr.unshift(newRecent);
    if (recentArr.length > 5) recentArr = recentArr.slice(0, 5);
    localStorage.setItem("recent-modules", JSON.stringify(recentArr));
    setRecentModules(recentArr);
    // --- End add to recent modules ---

    window.open(response[0].File, "_blank");
  }

  const departmentPlaceholders = {
    CSE: ['s3 dsa mod1', 's5 os m2', 's4, dbms, module3'],
    ECE: ['s4, signals, mod2', 's3, circuits, mod1', 's5, control, mod2'],
    IT: ['s6, networks, mod3', 's4, webdev, mod1', 's5, security, mod2'],
    default: ['s2, subject, mod1', 's3, topic, mod2', 's4, course, mod3']
  };

  useEffect(() => {
    if (!dept) return;

    const interval = setInterval(() =>
      setPlaceholderIndex(prev =>
        (prev + 1) % (departmentPlaceholders[dept as keyof typeof departmentPlaceholders] ||
          departmentPlaceholders.default).length
      ), 3000);

    return () => clearInterval(interval);
  }, [dept]);

  const getPlaceholderText = () => {
    if (!dept) return "Select department first";
    const placeholders = departmentPlaceholders[dept as keyof typeof departmentPlaceholders] ||
      departmentPlaceholders.default;
    return placeholders[placeholderIndex];
  };

  return (
    <div className=" flex flex-col bg-cover bg-center px-4 sm:px-6 lg:px-8">
      <main className="flex-1 flex flex-col items-center pt-16 sm:pt-20 w-full">
        <form onSubmit={handleSearch} className="w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-4">
          <div className="bg-black/40 p-3 sm:p-4 rounded-2xl flex items-center backdrop-blur-md">
            <input
              placeholder={"Search: " + getPlaceholderText()}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={!dept}
              className={`flex-grow bg-transparent text-white outline-none px-2 sm:px-4 text-base sm:text-lg placeholder-white/70 ${!dept ? "cursor-not-allowed opacity-60" : ""
                } transition-colors duration-300`}
            />
            {!loading ? (
              <button
                className={`px-2 sm:px-3 ${!dept
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                  } transition-all duration-200`}
                type="submit"
                disabled={!dept}
              >
                <IoSearchSharp size={20} className="sm:w-6 sm:h-6" />
              </button>
            ) : (
              <button
                className="px-2 sm:px-3 cursor-not-allowed opacity-50"
                type="button"
                disabled
              >
                <AiOutlineLoading size={20} className="sm:w-6 sm:h-6 animate-spin" />
              </button>
            )}
          </div>
          <div className="mt-2 text-center px-2">
            <p className="text-white/60 text-xs sm:text-sm mb-0">
              Search format: semester, subject, module (e.g., &quot;s2, engineering mechanics, mod1&quot;)
            </p>
          </div>
          {errorMsg && (
            <div className="mt-2 -mb-2 sm:mb-0 text-center px-3 py-2 rounded-lg mx-2 bg-white/10 backdrop-blur-md shadow text-sm text-white border border-white/20">
              <p>{errorMsg}</p>
            </div>
          )}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-4 sm:mb-4">
          {["Question Paper", "Notes", "Syllabus"].map((item) =>
            item === "Notes" ? (
              <Link
                key={item}
                href={dept ? dept.toLowerCase() : "/"}
                className="bg-black/30 hover:bg-black/60 cursor-pointer transition text-white text-sm sm:text-base lg:text-lg font-semibold px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full flex items-center justify-center text-center  hover:scale-105"
              >
                {item}
              </Link>
            ) : (
              <button
                key={item}
                className="bg-black/30 hover:bg-black/50 cursor-pointer transition text-white text-sm sm:text-base lg:text-lg font-semibold px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full text-center  hover:scale-105"
              >
                {item}
              </button>
            )
          )}
        </div>

        {recentModules.length > 0 && (
          <div className="w-full max-w-2xl text-white flex flex-col flex-shrink-0 mb-8 sm:mb-4">
            <p className="text-base font-semibold mb-2 sm:mb-4">RECENT</p>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-72 pr-2 no-scrollbar">
              {recentModules.length === 0 ? (
                <div className="bg-black/50 px-6 py-4 rounded-xl flex justify-between items-center backdrop-blur-[.17rem] text-lg text-gray-400">
                  No recent modules viewed.
                </div>
              ) : (
                recentModules.slice(0, 5).map((mod, idx) => (
                  <Link
                    key={mod.url + mod.subject + mod.module + idx}
                    href={mod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/50 px-6 py-3 sm:py-3 rounded-xl flex justify-between items-center backdrop-blur-[.17rem] hover:bg-black/70 transition group"
                  >
                    <div>
                      <div className="text-[.95rem] sm:text-lg font-bold capitalize">
                        {mod.subject} - {mod.module}
                      </div>
                      <div className="text-sm text-gray-300 mt-1 uppercase">
                        {mod.dept} | Sem {mod.sem}
                      </div>
                    </div>
                    <span className="ml-4 text-2xl text-gray-400 group-hover:text-white transition">
                      &gt;
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}