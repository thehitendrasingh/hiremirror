/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["framer-motion"],
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    serverComponentsExternalPackages: ["pdf-parse"],
  },
};

export default nextConfig;
