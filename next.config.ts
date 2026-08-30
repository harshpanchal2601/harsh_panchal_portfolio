import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920],
    qualities: [82],
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#work",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/#work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
