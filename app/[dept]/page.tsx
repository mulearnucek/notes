import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ dept: "cse" }, { dept: "ece" }, { dept: "it" }];
}

export default async function Dept({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const title = (await params).dept;
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  if (!["cse", "ece", "it"].includes(title.toLowerCase())) return notFound();
  const link = `/${title.toLowerCase()}`;

  return (
    <div className="flex flex-col items-center w-full max-w-6xl px-2 sm:px-0 justify-center">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold break-words">
                SELECT SEMESTER
              </div>
              <div className="text-sm text-gray-300 mt-1 capitalize">
                {title.toUpperCase()}
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
                <li className="text-gray-400 capitalize">
                  {title.toUpperCase()}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full">
          {semesters.map((sem) => (
            <Link href={`${link}/${sem}`} key={sem} className="group">
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
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="4"
                          strokeWidth={2}
                          stroke="currentColor"
                          fill="none"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 2v4M8 2v4M3 10h18"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <span className="z-10 text-white text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-4">
                  S{sem}
                </span>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-white/10 to-black/10 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
