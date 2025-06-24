import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full px-4 sm:px-6 py-2 text-white flex flex-col justify-center items-center">
      <p className="text-xs sm:text-sm text-center">
        © {new Date().getFullYear()} - All rights reserved ● {" "}
        <Link
          href={"/contributors"}
          className="text-xs sm:text-sm font-medium underline"
        >
          Contributors
        </Link>
      </p>{" "}
      <p className="text-xs sm:text-sm font-semibold text-center">
        Designed and developed by <Link href={"https://mulearn.uck.ac.in"} className="hover:text-gray-200 text-blue-200 hover:shadow transition-all">μLearn UCEK</Link>
      </p>
    </div>
  );
}
