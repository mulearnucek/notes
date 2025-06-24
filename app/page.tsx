import Main from "@/components/main";

export const metadata = {
  title: "Notes UCEK",
  description: "An initiative by Mulearn UCEK.",
  openGraph: {
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    url: "https://notes.uck.ac.in/",
    images: [
      {
        url: "https://notes.uck.ac.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Notes UCEK Image",
      },
    ],
    type: "website",
    siteName: "Notes UCEK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    images: ["https://notes.uck.ac.in/og-image.jpg"],
  },
};

export default function Home() {
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
                className="bg-black/30 hover:bg-black/60 cursor-pointer transition text-white text-sm sm:text-base lg:text-lg font-semibold px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full flex items-center justify-center text-center hover:scale-105"
              >
                {item}
              </Link>
            ) : item === "Question Paper" ? (
              <button
                key={item}
                onClick={() => {
                  if (dept) {
                    router.push(`/question-paper/${dept.toLowerCase()}`);
                  } else {
                    setErrorMsg("Please select a department first.");
                  }
                }}
                className={`bg-black/30 hover:bg-black/50 transition text-white text-sm sm:text-base lg:text-lg font-semibold px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full text-center hover:scale-105 ${!dept ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                disabled={!dept}
              >
                {item}
              </button>
            ) : (
              <button
                key={item}
                className="bg-black/30 hover:bg-black/50 cursor-pointer transition text-white text-sm sm:text-base lg:text-lg font-semibold px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full text-center hover:scale-105"
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