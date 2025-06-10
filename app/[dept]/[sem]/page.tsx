import { cse, ece, it } from "@/app/components/details";
import Link from "next/link";

export default async function Sub({ params }: { params: Promise<{ sem: string; dept: string }> }) {
  const resolvedParams = await params;
  const semNumber = parseInt(resolvedParams.sem, 10);
  const dept = resolvedParams.dept.toLowerCase();

  const departmentData = { cse, ece, it };
  const selectedDept = departmentData[dept as keyof typeof departmentData];

  if (!selectedDept) {
    return <div className="text-center mt-10 text-white">Invalid department: {dept}</div>;
  }

  const filteredSubjects = selectedDept.filter((entry) => entry.id === semNumber);

  if (filteredSubjects.length === 0) {
    return (
      <div className="text-center mt-10 text-white">
        No subjects found for semester {semNumber} in department {dept}
      </div>
    );
  }

  const subjects = filteredSubjects.flatMap((subject) => {
    return [subject.sub1, subject.sub2, subject.sub3, subject.sub4, subject.sub5, subject.sub6].filter(Boolean);
  });

  return (
    <div className="min-h-screen text-white flex flex-col justify-center items-center p-6"
      style={{
        backgroundImage: "url('/ucek.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "sepia(0.4) saturate(1) contrast(1) brightness(0.9)",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center -mt-3 sm:mt-3 sm:mb-10 px-6 py-2 rounded-xl shadow-md bg-black/50 backdrop-blur-md border-1 border-gray-700">
        Select the Subject
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
        {subjects.map((sub, index) => (
          <Link
            key={index}
            href={`/${dept}/${semNumber}/${sub.toLowerCase()}`}
            className="text-center bg-black/50 hover:bg-black/60 px-6 py-4 rounded-2xl text-lg font-semibold shadow-md transition-all duration-200 backdrop-blur-md border-1 border-gray-700"
          >
            {sub}
          </Link>
        ))}
      </div>
    </div>
  );
}
