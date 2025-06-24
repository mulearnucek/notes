import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import { DataProvider } from "@/lib/DataContext";
import { GoogleAnalytics } from "@next/third-parties/google";

// Replace this with your actual image URL (1200x630 recommended)
const ogImageUrl = "https://notes.uck.ac.in/og-image.jpg";

export const metadata: Metadata = {
  title: "Notes UCEK",
  description: "An initiative by Mulearn UCEK.",
  metadataBase: new URL("https://notes.uck.ac.in"),
  openGraph: {
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    url: "https://notes.uck.ac.in",
    siteName: "Notes UCEK",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Notes UCEK Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    images: [ogImageUrl],
    creator: "@notesucek",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  themeColor: "#000000",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-no-repeat bg-cover bg-center bg-[url('https://random-image-pepebigotes.vercel.app/api/random-image')] backdrop-brightness-50 bg-black/50">
        <DataProvider>
          <Header />
          <div className="min-h-screen text-white flex flex-col justify-center items-center p-4 sm:p-6">
            <div className="absolute inset-0 -z-10">
              <div className="w-full h-full bg-[url('https://random-image-pepebigotes.vercel.app/api/random-image')] bg-no-repeat bg-cover bg-center sepia-50 brightness-75" />
            </div>
            {children}
          </div>
        </DataProvider>
        <GoogleAnalytics gaId="G-4VMW6ZQRS1" />
      </body>
    </html>
  );
}
