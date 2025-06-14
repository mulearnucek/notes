"use client";

import { Key, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/footer";
import { getModule } from "@/lib/data";
import { subjectMap } from "@/lib/utils";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { link } from "fs";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [errorMsg, setErrorMsg] = useState<String>();
  const [loading, setLoading] = useState(false);
  const [recentItems, setRecentItems] = useState(
    localStorage.getItem("recentSearches")
      ? JSON.parse(localStorage.getItem("recentSearches") || "[]")
      : []
  );

  const router = useRouter();

  function handleSearch(event: { preventDefault: () => void }) {
    setLoading(true);
    event.preventDefault();
    try {
      parseAndBuildQuery(searchQuery);
    } catch (error) {
      console.error("Error parsing search query:", error);
    }
  }

  function parseAndBuildQuery(searchQuery: string, dept = selectedDepartment) {
    const parts = searchQuery
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);

    let sem, module, subject;

    const getStandardSubject = (word: string) => {
      for (const [standard, variants] of Object.entries(subjectMap)) {
        if (variants.includes(word)) {
          return standard;
        }
      }
      return word; // fallback to original if no match
    };

    for (let part of parts) {
      if (/^(s|sem)[-]?\d+$/i.test(part)) {
        const match = part.match(/\d+/);
        if (match) sem = match[0];
      } else if (/^m(od(ule)?)?-?\d+$/i.test(part)) {
        const match = part.match(/\d+/);
        if (match) module = match[0];
      } else if (!subject) {
        subject = getStandardSubject(part);
      }
    }

    if (!sem || !subject || !module) {
      setLoading(false);
      setErrorMsg(
        "Please provide a valid search query in the format: semester, subject, module (e.g., 's2, chem, mod1')"
      );
      throw new Error("Invalid input format");
    }

    const response = getModule(dept, sem, subject, module);
    setLoading(false);

    response
      .then((data) => {
        if (data.length === 0) {
          setErrorMsg(
            `No data found for ${dept} - Semester ${sem}, Subject: ${subject}, Module: ${module}`
          );
          console.error("No data found for the given query.");
          return;
        }
        setErrorMsg("");
        const existingSearches = JSON.parse(
          localStorage.getItem("recentSearches") || "[]"
        );

        const newSearch = {
          subject: subject,
          module: `Module ${module}`,
          department: dept,
          link: data[0][0],
        };

        // Add new search to beginning of array and limit to 5 items
        const updatedSearches = [
          newSearch,
          ...existingSearches.filter(
            (item: any) =>
              !(
                item.subject === subject &&
                item.module === `Module ${module}` &&
                item.department === dept
              )
          ),
        ].slice(0, 3);

        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

        window.open(data[0][0], "_blank");
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }

  const departments = ["CSE", "ECE", "IT"];

  const getPlaceholderText = () => {
    if (!selectedDepartment) return "Select department first";

    switch (selectedDepartment) {
      case "CSE":
        return 'e.g., "s3, dsa, mod1"';
      case "ECE":
        return 'e.g., "s4, signals, mod2"';
      case "IT":
        return 'e.g., "s6, networks, mod3"';
      default:
        return 'e.g., "s2, subject, mod1"';
    }
  };

  return (
    <div className="bg-cover bg-center px-4 md:pt-40 flex flex-col items-center pt-32">
      <form onSubmit={handleSearch} className="w-full max-w-2xl mb-6">
        <div className="bg-black/40 p-4 rounded-2xl flex items-center backdrop-blur-md">
          <input
            placeholder={getPlaceholderText()}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!selectedDepartment}
            className={`flex-grow bg-transparent text-white outline-none px-4 text-lg placeholder-white/70 ${
              !selectedDepartment ? "cursor-not-allowed opacity-60" : ""
            }`}
          />

          {!loading ? (
            <button
              className={`px-3  ${
                !selectedDepartment
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              } transition-all duration-200`}
              type="submit"
              disabled={!selectedDepartment}
            >
              <IoSearchSharp size={25} />
            </button>
          ) : (
            <button
              className="px-3 cursor-not-allowed opacity-50"
              type="button"
              disabled
            >
              <AiOutlineLoading size={25} className="animate-spin" />
            </button>
          )}
        </div>

        {/* Format suggestion */}
        <div className="mt-2 text-center">
          <p className="text-white/60 text-sm">
            Search format: semester, subject, module (e.g., "s2, chem, mod1")
          </p>
        </div>
        {/* Error message */}
        {errorMsg && (
          <div className="mt-2 text-center bg-black p-1 px-3 rounded-lg">
            <p className="text-red-600 text-sm">{errorMsg}</p>
          </div>
        )}
      </form>

      {/* Department Toggle Buttons */}
      <div className="w-full max-w-2xl mb-8">
        <p className="text-white text-base font-semibold mb-3 text-center">
          Select Department
        </p>
        <div className="flex gap-3 justify-center">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                selectedDepartment === dept
                  ? "bg-white text-black shadow-lg transform scale-105"
                  : "bg-black/30 text-white hover:bg-black/50 backdrop-blur-md"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-12">
        {["Question Paper", "Notes", "Syllabus"].map((item) =>
          item === "Notes" ? (
            <Link
              key={item}
              href={selectedDepartment.toLowerCase()}
              className="bg-black/30 hover:bg-black/60 transition text-white text-lg font-semibold md:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full flex items-center justify-center"
            >
              {item}
            </Link>
          ) : (
            <button
              key={item}
              className="bg-black/30 hover:bg-black/50 transition text-white text-lg font-semibold md:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full"
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="w-full max-w-2xl text-white">
        <p className="text-base font-semibold mb-4">RECENT SEARCHES</p>
        {recentItems.length > 0 ? (
          recentItems.map(
            (
              item: {
                subject: any;
                module: any;
                department: string;
                link: string;
              },
              i: Key | null | undefined
            ) => (
              <Link
                href={item.link}
                target="_blank"
                key={i}
                className="bg-black/50 px-6 py-4 rounded-xl mb-4 flex justify-between items-center backdrop-blur-[.17rem] text-lg cursor-pointer hover:bg-black/70 transition-all duration-200 group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {item.subject}
                  </span>
                  <span className="text-sm text-white/70 mt-1">
                    {item.module}
                  </span>
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors transform group-hover:translate-x-1">
                  &gt;
                </span>
              </Link>
            )
          )
        ) : (
          <div className="bg-black/30 px-6 py-4 rounded-xl mb-4 text-center text-white/70">
            {selectedDepartment
              ? `No recent items for ${selectedDepartment}`
              : "Select a department to see recent items"}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
