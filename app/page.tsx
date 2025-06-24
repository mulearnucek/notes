import Main from "@/components/main";

export const metadata = {
  title: "Notes UCEK",
  description: "An initiative by Mulearn UCEK.",
  openGraph: {
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    url: "https://notes.uck.ac.in/",
    images: [
      {
        url: "https://notes.uck.ac.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Notes UCEK Image",
      },
    ],
    type: "website",
    siteName: "Notes UCEK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes UCEK",
    description: "An initiative by Mulearn UCEK.",
    images: ["https://notes.uck.ac.in/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <Main/>
  )
}