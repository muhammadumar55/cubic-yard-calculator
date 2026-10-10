/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static, multi-page export (excellent for indexing and hosting anywhere)
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
