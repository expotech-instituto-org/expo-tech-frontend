import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("./src"),
    };

    // Ensure proper module resolution
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];

    return config;
  },
  typedRoutes: false,
};

export default nextConfig;
