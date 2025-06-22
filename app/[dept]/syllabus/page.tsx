"use client";

import Footer from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define syllabus links for each department
const syllabusLinks = {
  cse: {
    "S1-S2": "https://drive.google.com/open?id=1jyZmct_kuXDCyrDVubaa5THRSIbt6W_f",
    "S3": "https://drive.google.com/open?id=1fRSBNsS0eNLLK6-pWF9V7tKaAGAyAvlx",
    "S4": "https://drive.google.com/open?id=1vEPJhUXnfoCW3hpv6YceodsXoIt14OY6",
    "S5": "https://drive.google.com/open?id=1FSzkSznP32sJcP72z1JZ7NesT14wVGMB",
    "S6": "https://drive.google.com/open?id=17XfHsOHmCG0n8EUduUejSYmglkUNJWAm",
    "S7": "https://drive.google.com/open?id=1U7iOz8n0U0HM7gix1kry6Znsoowx4se2",
    "S8": "https://drive.google.com/open?id=1p2gW1XhPJQYr-8TY-eMzcKro8gZTan-G",
  },
  ece: {
    "S1-S2": "https://drive.google.com/open?id=1ne-63gkQYtBel5CPfAGTmik36mHczGEQ",
    "S3": "https://drive.google.com/open?id=1lK0gNtnfRFsvJbM7KJmt2xVUG2tl0fnY",
    "S4": "https://drive.google.com/open?id=1q4giFeYed16PNZ26VLoCDBWScE-3sIPg",
    "S5": "https://drive.google.com/open?id=1WwXOpcz_GGhBwolaIUhbdFHEspzaM2ZV",
    "S6": "https://drive.google.com/open?id=1xQc-4Rs79CayzXyQQ4KVP5r4pKQIJZMR",
    "S7": "https://drive.google.com/open?id=14EgfEOfU8CQ9myRXHaWSGKZSsJtl7mUF",
    "S8": "https://drive.google.com/open?id=1m1FrEeDfDXpRSfspERR_QKaz2HnHNG_1",
  },
  it: {
    "S1-S2": "https://drive.google.com/open?id=1qiX0A8my5lFcaCuUgLYN5hmHfnNadu9J",
    "S3": "https://drive.google.com/open?id=1G7kIYZ9yV9jkQAmqOAeBDn287kf5ioTk",
    "S4": "https://drive.google.com/open?id=1vHPs1MTLP0MY7veAEUn_IofB-JqZ7eJE",
    "S5": "https://drive.google.com/open?id=1luMrf5w34FWw19w7zKOfnEuzbAVBU20o",
    "S6": "https://drive.google.com/open?id=1gu3laCU3ewFh5J7OOj0VwK7l2HvYJ8_U",
    "S7": "https://drive.google.com/open?id=1Iwp8UPnMSLqAlZzs19rQOQJMA8xqYO-5",
    "S8": "https://drive.google.com/open?id=1Iwp8UPnMSLqAlZzs19rQOQJMA8xqYO-5",
  },
};

export default function SyllabusPage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{ dept: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading...
      </div>
    );
  }

  const dept = resolvedParams.dept.toLowerCase();

  if (!["cse", "ece", "it"].includes(dept)) {
    return notFound();
  }

  const currentSyllabusLinks = syllabusLinks[dept as keyof typeof syllabusLinks];
  const semesterGroups = ["S1-S2", "S3", "S4", "S5", "S6", "S7", "S8"];

  return (
    <div className="flex flex-col items-center w-full max-w-6xl px-2 sm:px-0 justify-center">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border mt-10 sm:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold break-words">
                SYLLABUS
              </div>
              <div className="text-sm text-gray-300 mt-1 capitalize">
                {dept.toUpperCase()}
              </div>
            </div>
          </div>
          {/* Breadcrumb Nav */}
          <div className="w-full border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-sm">
            <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
              <ol className="list-reset flex flex-wrap justify-center">
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
                <li className="text-gray-400 capitalize">Syllabus</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {semesterGroups.map((semGroup) => (
            <a
              key={semGroup}
              href={currentSyllabusLinks[semGroup as keyof typeof currentSyllabusLinks]}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative bg-black/50 border border-white/20 rounded-2xl backdrop-blur-md shadow-xl flex flex-col items-center justify-center aspect-square h-24 sm:h-32 w-full cursor-pointer overflow-hidden
                transition-all duration-300
                group-hover:scale-105 group-hover:shadow-2xl
                ">
                <div className="flex items-center justify-center mt-2 sm:mt-4">
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 mb-1 sm:mb-2 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/60 group-hover:shadow-[0_0_16px_4px_rgba(255,255,255,0.15)] transition-all duration-300 pointer-events-none" />
                    <div className="rounded-full bg-black/60 w-full h-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <span className="z-10 text-white text-lg sm:text-xl font-extrabold mb-2 sm:mb-4">
                  {semGroup}
                </span>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-white/10 to-black/10 pointer-events-none" />
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
