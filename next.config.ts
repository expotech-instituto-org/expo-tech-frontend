import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    
    // Ensure proper module resolution
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
    
    return config;
  },
  typedRoutes: false,
};

export default nextConfig;
