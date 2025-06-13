"use client";

import React, { useEffect, useState } from "react";
import { GITHUB_API_URL } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import GithubLogo from "@/public/github-logo.svg";
import { AvatarCard } from "@/components/avatar-card";

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

function Page() {
  const [data, setData] = useState<Contributor[]>([]);

  useEffect(() => {
    fetch(GITHUB_API_URL)
      .then(async (resp) => {
        setData(await resp.json());
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return data.length === 0 ? (
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
      <div className="mt-40 flex-1 justify-center mb-8 flex-col">
        <div className="text-2xl flex items-center justify-center mb-5">
          Contributors
        </div>
        <div className="items-center flex-col sm:flex-row w-full justify-evenly flex md:gap-x-4 gap-y-6 mb-10">
          {data.map((contr) => (
            <div
              key={contr.login}
              className="rounded-[24px] backdrop-blur flex flex-col border border-slate-600 p-5"
            >
              <AvatarCard url={contr.avatar_url} className="w-44" />
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
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
