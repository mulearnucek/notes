"use client";
import { getVideoPlaylists, Note, PlaylistItem } from "@/lib/data";
import { useDataContext } from "@/lib/DataContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlaylistCard } from "@/components/PlaylistCard";

export default function Page({
  params,
}: {
  params: Promise<{ sem: string; dept: string; subject: string }>;
}) {
  const [modules, setModules] = useState<Note[]>();
  const [playlists, setPlaylists] = useState<PlaylistItem[]>();
  const [paramsData, setParamsData] = useState<{
    sem: string;
    dept: string;
    subject: string;
  } | null>(null);
  const { db, vldb } = useDataContext();

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setParamsData(resolvedParams);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!paramsData) return;

    const dept = paramsData.dept.toLowerCase();
    const subject = paramsData.subject.toLowerCase().replace(/-/g, " ");

    const fetchModules = async () => {
      try {
        setModules(
          db?.query({
            where: {
              Department: dept.toUpperCase(),
              Semester: paramsData.sem,
              Subject: subject.toUpperCase(),
            },
            orderBy: "Module",
          }) || []
        );
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = vldb?.query({
          where: {
            Subject: subject.toUpperCase(),
          },
          orderBy: "Module",
        }) || [];
        if (response.length == 0) {
          setPlaylists([]);
          return;
        }
        setPlaylists(response as PlaylistItem[]);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchModules();
    fetchPlaylists();
  }, [paramsData]);

  if (!paramsData) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading...
      </div>
    );
  }

  const { sem, dept: branch, subject: sub } = paramsData;
  const dept = branch.toLowerCase();
  const subject = sub.toLowerCase().replace(/-/g, " ");

  if (!["cse", "ece", "it"].includes(dept)) {
    return (
      <div className="text-center mt-10 text-white">
        Invalid department: {dept}
      </div>
    );
  }

  if (!modules) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading modules ...
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col justify-center items-center p-6 mt-12 md:mt-14 lg:mt-10">
      <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold break-words">{subject.toUpperCase()}</div>
            <div className="text-sm text-gray-300 mt-1 capitalize">
              {dept.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col sm:items-end">
            <div className="text-md font-medium">
              Semester: <span className="font-bold">{sem}</span>
            </div>
            <div className="text-md font-medium" >
              Scheme:{" "}
              <span className="font-bold">
                {(modules[0] && modules[0].Scheme) || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Breadcrumb Nav */}
        <div className="w-full border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-sm">
          <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
            <ol className="list-reset flex flex-wrap justify-center">
              <li>
                <Link href="/" className="hover:underline text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href={`/${dept}`}
                  className="hover:underline text-gray-300"
                >
                  {dept.toUpperCase()}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href={`/${dept}/${sem}`}
                  className="hover:underline text-gray-300"
                >
                  Semester {sem}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-400 capitalize">{subject}</li>
            </ol>
          </nav>
        </div>
      </div>{" "}
      {/* Notes/Modules Section */}
      <div className="w-full max-w-4xl mb-6">
        <div className="bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
            {modules.length > 0 ? (
              modules.map((module, index) => (
                <Link
                  key={index}
                  href={module.File}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const newRecent = {
                        module: module.Title,
                        subject,
                        sem,
                        dept,
                        url: module.File,
                      };
                      let recentArr: typeof newRecent[] = [];
                      try {
                        recentArr = JSON.parse(localStorage.getItem("recent-modules") || "[]");
                      } catch { }
                      recentArr = recentArr.filter((item) => item.url !== newRecent.url);
                      recentArr.unshift(newRecent);
                      if (recentArr.length > 5) recentArr = recentArr.slice(0, 5);
                      localStorage.setItem("recent-modules", JSON.stringify(recentArr));
                    }
                  }}
                  className="text-center bg-black/50 hover:bg-black/60 px-4 py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-md transition-all duration-200 backdrop-blur-md border border-gray-700 hover:scale-105 hover:shadow-2xl break-words w-full"
                >
                  Module {module.Module}
                  <span className="block text-xs sm:text-sm text-gray-400 mt-1 break-words w-full">
                    {module.Title}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-center mt-10 text-white col-span-full">
                No modules found for {subject} in semester {sem}.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* YouTube Video Lectures Section */}
      {playlists == undefined ?
        <div className="text-center mt-10 text-white flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        </div> :
        playlists.length > 0 && <div className="w-full max-w-4xl mb-6">
          <div className="bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              Video Lectures
            </h2>{" "}
            {/* Playlists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>{" "}
        </div>}
    </div>
  );
}
