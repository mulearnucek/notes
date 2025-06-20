"use client";

import React, { useEffect, useState } from "react";
import { GITHUB_API_URL } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import GithubLogo from "@/public/github-logo.svg";
import { AvatarCard } from "@/components/avatar-card";

const NOTE_CONTRIBUTORS = [
  "Abhi",
  "Jane Doe",
  "Another Name",
  // Add more names as needed
];

function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(GITHUB_API_URL)
      .then(async (resp) => {
        setData(await resp.json());
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return data.length == 0 ? (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <div className="text-2xl mb-4">Loading Contributors...</div>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="flex flex-col h-full">
      <Header />
      <div className="mt-20 sm:mt-30 flex-1 justify-center mb-8 flex-col">
        <div className="text-2xl flex items-center justify-center mb-5 font-bold">
          CONTRIBUTORS
        </div>
        <div className="items-center flex-col sm:flex-row w-full justify-evenly flex md:gap-x-4 gap-y-6 mb-10">
          {data.map(
            (contr: {
              login: string;
              avatar_url: string;
              html_url: string;
            }) => (
              <div
                key={contr.login}
                className="rounded-[24px] backdrop-blur flex flex-col border border-slate-600 p-5"
              >
                <AvatarCard url={contr.avatar_url} className="w-53 sm:w-44" />
                <a
                  href={contr.html_url}
                  target="_blank"
                  className="transition-all hover:scale-105 scale-100"
                >
                  <div className="flex justify-center gap-2 items-center mt-5 rounded-lg p-2 border border-white/30">
                    <Image src={GithubLogo} height={30} width={30} alt="Github Icon" />
                    <span className="text-md">@{contr.login}</span>
                  </div>
                </a>
              </div>
            )
          )}
        </div>

        {/* Note Contributors Section */}
        <div className="text-xl flex items-center justify-center mb-5 font-bold mt-12">
          NOTE CONTRIBUTORS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center w-full mb-10">
          {NOTE_CONTRIBUTORS.map((name) => (
            <div
              key={name}
              className="bg-black/40 text-white rounded-xl px-3 py-2 text-sm sm:text-base font-semibold shadow border border-slate-600 text-center"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
