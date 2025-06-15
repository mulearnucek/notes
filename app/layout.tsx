import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import { DataProvider } from "@/lib/DataContext";

export const metadata: Metadata = {
  title: "Notes UCEK",
  description: "An initiative by Mulearn UCEK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-no-repeat bg-cover bg-center bg-[url('https://random-image-pepebigotes.vercel.app/api/random-image')] backdrop-brightness-50 bg-black/50">
        <DataProvider>
        <Header />
          <div className="min-h-screen text-white flex flex-col justify-center items-center p-6">
            <div className="absolute inset-0 -z-10">
              <div className="w-full h-full bg-[url('https://random-image-pepebigotes.vercel.app/api/random-image')] bg-no-repeat bg-cover bg-center sepia-50 brightness-75 "></div>
            </div>
            {children}
          </div>
        </DataProvider>
      
      </body>
    </html>
  );
}
