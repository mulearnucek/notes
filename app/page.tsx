"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentModules, setRecentModules] = useState<
        { module: string; subject: string; sem: string; dept: string; url: string }[]
    >([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const recent = JSON.parse(localStorage.getItem("recent-modules") || "[]");
                setRecentModules(recent.slice(0, 5));
            } catch {
                setRecentModules([]);
            }
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/results?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="bg-cover bg-center px-4 md:pt-40 flex flex-col items-center pt-32 -mt-12">
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
                <div
                    className="flex flex-col gap-4 overflow-y-auto max-h-72 pr-2 no-scrollbar"
    >
                    {recentModules.length === 0 ? (
                        <div className="bg-black/50 px-6 py-4 rounded-xl flex justify-between items-center backdrop-blur-[.17rem] text-lg text-gray-400">
                            No recent modules viewed.
                        </div>
                    ) : (
                        recentModules.slice(0, 5).map((mod, i) => (
                            <Link
                                key={mod.url}
                                href={mod.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black/50 px-6 py-3 sm:py-3 rounded-xl flex justify-between items-center backdrop-blur-[.17rem] hover:bg-black/70 transition group"
                            >
                                <div>
                                    <div className="text-md sm:text-lg font-bold capitalize">
                                        {mod.subject} - Module {mod.module}
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

        </div>
    );
}