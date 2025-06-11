import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "random-image-pepebigotes.vercel.app",
        port: "",
        pathname: "/api/random-image",
      }
    ]
  }
};

export default nextConfig;
