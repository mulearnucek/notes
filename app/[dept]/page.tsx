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
    <div className="flex items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-6xl">
        {/* Heading */}
        <div className="text-white text-3xl font-bold mb-14 text-center bg-black/40 px-6 py-4 rounded-2xl backdrop-blur-md shadow-md">
          Select the Semester
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
          {semesters.map((sem) => (
            <Link href={`${link}/${sem}`} key={sem}>
              <div className="bg-black/40 hover:bg-black/60 p-3 md:p-10 transition text-white rounded-2xl backdrop-blur-md  w-full shadow-md text-center text-xl font-semibold flex items-center justify-center aspect-square  border-1 border-gray-700">
                S{sem}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
