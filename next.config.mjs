import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — no server, perfect for Vercel, Netlify, Cloudflare Pages, S3
  output: 'export',

  // Set explicit workspace root to avoid parent directory lockfile detection issues
  outputFileTracingRoot: __dirname,

  // Consistent URL policy: all URLs end with /
  trailingSlash: true,

  // Images pre-optimized for static export
  images: { unoptimized: true },

  // Security & performance
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  eslint: {
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
