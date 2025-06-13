"use client";
import { getModules } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { sem: string, dept: string, subject: string } }) {
    
    const [modules, setModules] = useState<string[][]>();
    const { sem, dept: branch, subject: sub } = params;
    const dept = branch.toLowerCase();
    const subject = sub.toLowerCase().replace(/-/g, " ");

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setModules(await getModules(dept, sem, subject));
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };

        fetchModules();
    }, []);
    
    
    
    if (!["cse", "ece", "it"].includes(dept)) {
        return <div className="text-center mt-10 text-white">Invalid department: {dept}</div>;
    }

    if(!modules) {
        return (
            <div className="text-center mt-10 text-white flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
                Loading modules ...
            </div>
        );
    }
  
    return (
        <div className="text-white flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="text-xl font-bold">{subject.toUpperCase()}</div>
                        <div className="text-sm text-gray-300 mt-1 capitalize">{dept.toUpperCase()}</div>
                    </div>
                    <div className="flex flex-col sm:items-end">
                        <div className="text-md font-medium">Semester: <span className="font-bold">{sem}</span></div>
                        <div className="text-md font-medium">Scheme: <span className="font-bold">{modules[0]?.[1] || "N/A"}</span></div>
                    </div>
                </div>
               
                <div className="w-full border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-sm">
                     <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
                        <ol className="list-reset flex">
                            <li>
                                <Link href="/" className="hover:underline text-gray-300">Home</Link>
                            </li>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            <li>
                                <Link href={`/${dept}`} className="hover:underline text-gray-300">{dept.toUpperCase()}</Link>
                            </li>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            <li>
                                <Link href={`/${dept}/${sem}`} className="hover:underline text-gray-300">Semester {sem}</Link>
                            </li>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="text-gray-400 capitalize">{subject}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
                {modules.length > 0 ? (
                    modules.map((module, index) => (
                        <Link
                            key={index}
                            href={module[6]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center bg-black/50 hover:bg-black/60 px-6 py-4 rounded-2xl text-lg font-semibold shadow-md transition-all duration-200 backdrop-blur-md border-1 border-gray-700"
                        >
                            Module {module[5]}
                        </Link>
                    ))
                ) : (
                    <div className="text-center mt-10 text-white">No modules found for {subject} in semester {sem}.</div>
                )}
            </div>
        </div>
    );
};
