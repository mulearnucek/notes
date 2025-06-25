// app/question-paper/page.tsx
"use client";
import Link from "next/link";

const departments = ["CSE", "ECE", "IT"];

export default function QuestionPaperDeptPage() {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-6">Select Department</h1>
      <div className="flex flex-col gap-4">
        {departments.map((dept) => (
          <Link
            key={dept}
            href={`/question-paper/${dept.toLowerCase()}`}
            className="bg-black/40 px-6 py-3 rounded-xl text-white font-semibold text-lg hover:bg-black/60"
          >
            {dept}
          </Link>
        ))}
      </div>
    </div>
  );
}