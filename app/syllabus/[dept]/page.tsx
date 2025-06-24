'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DepartmentPage() {
  const params = useParams();
  const dept = params.dept as string;

  const handleRedirect = (semester: string) => {
    // Department-specific Google Drive links
    const departmentLinks: { [dept: string]: { [semester: string]: string } } = {
      'CSE': {
        '1-2': 'https://drive.google.com/open?id=1jyZmct_kuXDCyrDVubaa5THRSIbt6W_f',
        '3': 'https://drive.google.com/open?id=1fRSBNsS0eNLLK6-pWF9V7tKaAGAyAvlx',
        '4': 'https://drive.google.com/open?id=1vEPJhUXnfoCW3hpv6YceodsXoIt14OY6',
        '5': 'https://drive.google.com/open?id=1FSzkSznP32sJcP72z1JZ7NesT14wVGMB',
        '6': 'https://drive.google.com/open?id=17XfHsOHmCG0n8EUduUejSYmglkUNJWAm',
        '7': 'https://drive.google.com/open?id=1U7iOz8n0U0HM7gix1kry6Znsoowx4se2',
        '8': 'https://drive.google.com/open?id=1p2gW1XhPJQYr-8TY-eMzcKro8gZTan-G',
      },
      'ECE': {
        '1-2': 'https://drive.google.com/open?id=1ne-63gkQYtBel5CPfAGTmik36mHczGEQ',
        '3': 'https://drive.google.com/open?id=1lK0gNtnfRFsvJbM7KJmt2xVUG2tl0fnY',
        '4': 'https://drive.google.com/open?id=1q4giFeYed16PNZ26VLoCDBWScE-3sIPg',
        '5': 'https://drive.google.com/open?id=1WwXOpcz_GGhBwolaIUhbdFHEspzaM2ZV',
        '6': 'https://drive.google.com/open?id=1xQc-4Rs79CayzXyQQ4KVP5r4pKQIJZMR',
        '7': 'https://drive.google.com/open?id=14EgfEOfU8CQ9myRXHaWSGKZSsJtl7mUF',
        '8': 'https://drive.google.com/open?id=1m1FrEeDfDXpRSfspERR_QKaz2HnHNG_1',
      },
      'IT': {
        '1-2': 'https://drive.google.com/open?id=1qiX0A8my5lFcaCuUgLYN5hmHfnNadu9J',
        '3': 'https://drive.google.com/open?id=1G7kIYZ9yV9jkQAmqOAeBDn287kf5ioTk',
        '4': 'https://drive.google.com/open?id=1vHPs1MTLP0MY7veAEUn_IofB-JqZ7eJE',
        '5': 'https://drive.google.com/open?id=1luMrf5w34FWw19w7zKOfnEuzbAVBU20o',
        '6': 'https://drive.google.com/open?id=1gu3laCU3ewFh5J7OOj0VwK7l2HvYJ8_U',
        '7': 'https://drive.google.com/open?id=1Iwp8UPnMSLqAlZzs19rQOQJMA8xqYO-5',
        '8': 'https://drive.google.com/open?id=1Iwp8UPnMSLqAlZzs19rQOQJMA8xqYO-5',
      }
    };

    const deptUpper = dept?.toUpperCase();
    const deptLinks = departmentLinks[deptUpper];
    const url = deptLinks?.[semester];
    
    if (url) {
      window.open(url, '_blank');
    } else {
      console.warn(`No drive link found for ${deptUpper} department, semester ${semester}`);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border mt-8 sm:mt-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold break-words">SYLLABUS</div>
            <div className="text-sm text-gray-300 mt-1 capitalize">
              {dept?.toUpperCase()} Department
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
                  href={`/${dept?.toLowerCase()}`}
                  className="hover:underline text-gray-300"
                >
                  {dept?.toUpperCase()}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-400 capitalize">
                Syllabus
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 w-full max-w-4xl items-stretch">
        <button
          onClick={() => handleRedirect('1-2')}
          className="group relative flex flex-col items-center justify-center bg-black/60 border border-white/20 rounded-xl shadow-md px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden h-full min-h-[72px]"
          style={{ minWidth: "290px", maxWidth: "290px", margin: "0 auto" }}
        >
          <span className="z-10 text-white text-base sm:text-lg font-semibold text-center break-words">
            Semester 1 & 2
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/10 to-black/10 pointer-events-none" />
        </button>
        
        {[3, 4, 5, 6, 7, 8].map((sem) => (
          <button
            key={sem}
            onClick={() => handleRedirect(sem.toString())}
            className="group relative flex flex-col items-center justify-center bg-black/60 border border-white/20 rounded-xl shadow-md px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden h-full min-h-[72px]"
            style={{ minWidth: "290px", maxWidth: "290px", margin: "0 auto" }}
          >
            <span className="z-10 text-white text-base sm:text-lg font-semibold text-center break-words">
              Semester {sem}
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/10 to-black/10 pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
}
