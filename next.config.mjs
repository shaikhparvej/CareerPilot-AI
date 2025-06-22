/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable environment variables
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  // Add image domains if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Ensure CSS modules work correctly
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    });
    
    return config;
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb' // Match your previous limit
    }
  },
};

export default nextConfig;
