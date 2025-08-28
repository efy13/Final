import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "xstore.b-cdn.net" },
      { protocol: "https", hostname: "xstore.8theme.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "xstore2.8theme.com" }, // 🔥 eğer farklı subdomain çıkarsa
      { protocol: "https", hostname: "xstore.elementor.com" }, // 🔥 olası başka domain
    ],
  },
};

export default nextConfig;

