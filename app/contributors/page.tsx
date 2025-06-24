"use client";

import React, { useEffect, useState } from "react";
import { getContributors, GITHUB_API_URL, SHEET_ID } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import GithubLogo from "@/public/github-logo.svg";
import { AvatarCard } from "@/components/avatar-card";

function Page() {
  const [data, setData] = useState([]);
  const [contributors, setContributors] = useState<string[][]>([]);
  useEffect(() => {
    Promise.all([
      fetch(GITHUB_API_URL),
      getContributors(),
    ]).then(async ([githubResp, sheetResp]) => {
        setData(await githubResp.json());
        setContributors(sheetResp);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return <div className="flex flex-col ">
    <Header />
    {data.length == 0 ? (<div className="flex flex-col ">
      <div className="flex flex-col items-center justify-center  text-white">
        <div className="text-2xl mb-4">Loading Contributors...</div>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
      <Footer />
    </div>
  ) : (
      <div className="mt-20 sm:mt-0 flex-1 justify-center flex-col">
        {/* Note Contributors Section */}
        <div className="text-xl flex items-center justify-center mb-5 font-bold mt-12">
          NOTE CONTRIBUTORS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center w-full mb-10">
          {contributors.filter(x=> x[1] == "Note").map((contributor,i) => (
            <div
            key={"note-contributor-" + i}
              className="bg-black/40 text-white rounded-xl px-3 py-2 text-sm sm:text-base font-semibold shadow border border-slate-600 text-center"
            >
              {contributor[0]}
              <span className="text-xs text-gray-400 block">
                {contributor[2] ? `${contributor[2]}` : ""}
              </span>
            </div>
          ))}
        </div>

        <div className="text-xl flex items-center justify-center mb-5 font-bold">
          DEVELOPERS
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
      <Footer />
    </div>
  )}
</div>
}

export default Page;