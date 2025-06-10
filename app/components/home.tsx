"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/results?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center px-4 md:pt-40 flex flex-col items-center pt-32"
            style={{
                backgroundImage: "url('/ucek.jpg')",
                filter: "sepia(0.4) saturate(1) contrast(1) brightness(0.9)",
            }}

        >
            <form onSubmit={handleSearch} className="w-full max-w-2xl mb-10">
                <div className="bg-black/40 p-4 rounded-2xl flex items-center backdrop-blur-md">
                    <input
                        placeholder="Search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow bg-transparent text-white outline-none px-4 text-lg placeholder-white"
                    />
                    <button className="px-3" type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="#fff"
                            className="w-6 h-6"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </button>
                </div>
            </form>


            <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-12">
                {["Question Paper", "Notes", "Syllabus"].map((item) =>
                    item === "Notes" ? (
                        <Link
                            key={item}
                            href="/notes"
                            className="bg-black/30 hover:bg-black/60 transition text-white text-lg font-semibold md:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full flex items-center justify-center"
                        >
                            {item}
                        </Link>
                    ) : (
                        <button
                            key={item}
                            className="bg-black/30 text-white text-lg font-semibold md:px-6 py-3 rounded-xl backdrop-blur-md shadow-md w-full"
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            <div className="w-full max-w-2xl text-white">
                <p className="text-base font-semibold mb-4">RECENT</p>
                {["Module 1", "Module 2", "Module 3"].map((mod, i) => (
                    <div
                        key={i}
                        className="bg-black/50 px-6 py-4 rounded-xl mb-4 flex justify-between items-center backdrop-blur-[.17rem] text-lg"
                    >
                        <span className="pointer-events-none">{mod}</span>
                        <span className="pointer-events-none">&gt;</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
