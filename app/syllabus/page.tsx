'use client';

import Link from 'next/link';
import Footer from '@/components/footer';

export default function SyllabusPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 text-white flex flex-col justify-center items-center py-8">
        <div className="w-full max-w-6xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border mt-8 sm:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold break-words">SYLLABUS</div>
              <div className="text-sm text-gray-300 mt-1">
                Select Your Department
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
                <li className="text-gray-400">
                  Syllabus
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 w-full max-w-6xl items-stretch">
          {['CSE', 'ECE', 'IT'].map((dept) => (
            <Link
              key={dept}
              href={`/syllabus/${dept.toLowerCase()}`}
              className="group relative flex flex-col items-center justify-center bg-black/60 border border-white/20 rounded-xl shadow-md px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden h-full min-h-[72px]"
              style={{ minWidth: "290px", maxWidth: "290px", margin: "0 auto" }}
            >
              <span className="z-10 text-white text-base sm:text-lg font-semibold text-center break-words">
                {dept}
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/10 to-black/10 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}