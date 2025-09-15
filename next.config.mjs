
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    optimizePackageImports: ["recharts"]
  }
};
export default nextConfig;

