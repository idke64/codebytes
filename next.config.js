// const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    domains: ["i.postimg.cc", "firebasestorage.googleapis.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
