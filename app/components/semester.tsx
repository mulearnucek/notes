import Link from "next/link";

export const Semester = ({ link }: { link: string }) => {
  const semesters = [1,2,3, 4, 5, 6, 7, 8];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/ucek.jpg')",
        filter: "sepia(0.4) saturate(1) contrast(1) brightness(0.9)",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-6xl">
        {/* Heading */}
        <div className="text-white text-3xl font-bold mb-14 text-center bg-black/40 px-6 py-4 rounded-2xl backdrop-blur-md shadow-md">
          Select the Semester
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
          {semesters.map((sem) => (
            <Link href={`${link}/${sem}`} key={sem}>
              <div className="bg-black/40 hover:bg-black/60 transition text-white rounded-2xl backdrop-blur-md h-19 w-full shadow-md text-center text-xl font-semibold flex items-center justify-center aspect-square sm:aspect-auto sm:h-20 border-1 border-gray-700">
                S{sem}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
