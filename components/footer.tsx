import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full px-6 py-2 text-white flex flex-col justify-center items-center ">
      <p className="text-sm font-medium">
        © {new Date().getFullYear()} | All rights reserved | {" "}
        <Link
          href={"/contributors"}
          className="text-sm font-medium underline"
        >
          Contributors
        </Link>
      </p>{" "}
      <p className="text-sm font-medium">
        Designed and developed by MuLearn UCEK
      </p>
    </div>
  );
}
