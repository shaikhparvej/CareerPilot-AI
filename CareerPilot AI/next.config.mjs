/** @type {import('next').NextConfig} */
const nextConfig = {
  // Specify that the app directory is inside src
  experimental: {
    appDir: true,
  },
  // Enable environment variables
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  }
};

export default nextConfig;
